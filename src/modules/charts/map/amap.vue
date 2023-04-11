<template>
  <div id="container"></div>
</template>
<script>
import MapLoader from "./amap.js";
import { showLoading, showError } from "@/utils";
export default {
  data() {
    return {
      amap: null,
      districtExplorer: null,
      tipMarker: null,
      $tipMarkerContent: null,
      currentAreaNode: null,
      mapBackAreaNode: [],
      styleRow: {
        cursor: "default",
        bubble: true,
        strokeColor: "#0066cc", //线颜色
        strokeOpacity: 1, //线透明度
        strokeWeight: 1, //线宽
        fillColor: "#0066cc",
        fillOpacity: 0, //填充透明度
      },
      styleRowHover: {
        cursor: "default",
        bubble: true,
        strokeColor: "#0066cc", //线颜色
        strokeOpacity: 1, //线透明度
        fillColor: "#0066cc",
        strokeWeight: 2, //线宽
        fillOpacity: 0.3, //填充透明度
      },
    };
  },
  mounted() {
    showLoading("加载中...");
    MapLoader("ff451690aeb5367bb52277d4393ff688").then((aMap) => {
      setTimeout(() => {
        this.drawArea();
      }, 1000);
    });
  },
  methods: {
    drawArea() {
      this.amap = new AMap.Map("container", {
        defaultCursor: "pointer",
        center: [103.714129, 38.150339], // 地图中心点
        zoom: 5, // 地图显示的缩放级别
        viewMode: "2D",
        resizeEnable: true, //是否监控地图容器尺寸变化
        //   mapStyle: "amap://styles/darkblue" // 地图样式
      });
      AMapUI.load(
        ["ui/geo/DistrictExplorer", "lib/$"],
        (DistrictExplorer, $) => {
          //创建一个实例
          this.districtExplorer = new DistrictExplorer({
            eventSupport: true, //打开事件支持
            map: this.amap,
          });
          //当前聚焦的区域
          this.$tipMarkerContent = $('<div class="tipMarker top"></div>');
          this.tipMarker = new AMap.Marker({
            content: this.$tipMarkerContent.get(0),
            offset: new AMap.Pixel(0, 0),
            bubble: true,
          });
          //监听feature的hover事件
          this.districtExplorer.on(
            "featureMouseout featureMouseover",
            (e, feature) => {
              this.toggleHoverFeature(
                feature,
                e.type === "featureMouseover",
                e.originalEvent ? e.originalEvent.lnglat : null
              );
            }
          );
          //监听鼠标在feature上滑动
          this.districtExplorer.on("featureMousemove", (e) => {
            //更新提示位置
            this.tipMarker.setPosition(e.originalEvent.lnglat);
          });
          //feature被点击
          this.districtExplorer.on("featureClick", (e, feature) => {
            const props = feature.properties;
            //  if (props.level === "province") {
            // 只下钻到省一级 （省：province，市：city，县：district）
            // 若是下钻到县一级，那么这个if判断就可以注释掉
            this.switch2AreaNode(props.adcode);
            // }
          });
          //全国
          showLoading(false);
          this.mapBack(100000);
        }
      );
    },
    //根据Hover状态设置相关样式
    toggleHoverFeature(feature, isHover, position) {
      this.tipMarker.setMap(isHover ? this.amap : null);
      if (!feature) {
        return;
      }
      const props = feature.properties;
      if (isHover) {
        //更新提示内容
        this.$tipMarkerContent.html(props.name);
        //更新位置
        this.tipMarker.setPosition(position || props.center);
      }
      //更新相关多边形的样式
      const polys = this.districtExplorer.findFeaturePolygonsByAdcode(
        props.adcode
      );
      polys.forEach((elemnt) => {
        elemnt.setOptions({
          fillOpacity: isHover ? 0.5 : 0,
        });
      });
    },
    //绘制某个区域的边界
    renderAreaPolygons(areaNode) {
      //更新地图视野
      if (!this.aReContry) {
        this.amap.setBounds(areaNode.getBounds(), null, null, true);
      } else {
        this.amap.setZoom(4);
        this.amap.setCenter(new AMap.LngLat(103.714129, 38.150339));
      }
      //清除已有的绘制内容
      this.districtExplorer.clearFeaturePolygons();
      //绘制子区域
      this.districtExplorer.renderSubFeatures(areaNode, this.styleRow);
      //绘制父区域
      this.districtExplorer.renderParentFeature(areaNode, this.styleRowHover);
    },
    //切换区域后刷新显示内容
    refreshAreaNode(areaNode) {
      this.districtExplorer.setHoverFeature(null);
      this.renderAreaPolygons(areaNode);
    },
    //切换区域
    switch2AreaNode(adcode, callback) {
      if (this.currentAreaNode && this.currentAreaNode.getAdcode() == adcode) {
        return;
      }
      if (!this.mapBackAreaNode.includes(adcode)) {
        this.mapBackAreaNode.push(adcode);
      }
      this.loadAreaNode(adcode, (error, areaNode) => {
        if (error) {
          if (callback) {
            callback(error);
          }
          return;
        }
        this.currentAreaNode = areaNode;
        //设置当前使用的定位用节点
        this.districtExplorer.setAreaNodesForLocating([this.currentAreaNode]);
        this.refreshAreaNode(areaNode);
        if (callback) {
          callback(null, areaNode);
        }
      });
    },
    //加载区域
    loadAreaNode(adcode, callback) {
      this.districtExplorer.loadAreaNode(adcode, (error, areaNode) => {
        if (error) {
          if (callback) {
            callback(error);
          }
          window.console.error(error);
          return;
        }
        if (callback) {
          callback(null, areaNode);
        }
      });
    },
    // 重新加载
    reset() {
      this.amap.destroy();
      this.mapBackAreaNode = [];
      this.districtExplorer = null;
      this.tipMarker = null;
      this.$tipMarkerContent = null;
      this.currentAreaNode = null;
      this.drawArea();
    },
    // 返回上级
    mapBack(v) {
      if (v) {
        return this.switch2AreaNode(v);
      }
      if (this.mapBackAreaNode.length == 1) {
        return showError("没有上级了！");
      }
      let node = this.mapBackAreaNode.splice(-2);
      this.$nextTick(() => {
        this.switch2AreaNode(node[0]);
      });
    },
  },
};
</script>
<style lang="scss">
#container {
  width: 100%;
  height: 100%;
}
.amap-marker-content {
  .tipMarker {
    color: #555;
    background-color: rgba(255, 254, 239, 0.8);
    border: 1px solid #7e7e7e;
    padding: 2px 6px;
    font-size: 12px;
    white-space: nowrap;
    display: inline-block;
    &:before,
    &:after {
      content: "";
      display: block;
      position: absolute;
      margin: auto;
      width: 0;
      height: 0;
      border: solid transparent;
      border-width: 5px 5px;
    }
    &.top {
      transform: translate(-50%, -110%);
      &:before,
      &:after {
        bottom: -9px;
        left: 0;
        right: 0;
        border-top-color: rgba(255, 254, 239, 0.8);
      }
      &:before {
        bottom: -10px;
        border-top-color: #7e7e7e;
      }
    }
  }
}
.amap-logo,
.amap-copyright {
  display: block !important;
  visibility: inherit !important;
}
</style>
