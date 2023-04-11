<template>
  <div class="map">
    <div class="search">
      <el-button size="mini" @click="mapBack" plain type="warning"
        >返回上级</el-button
      >
      <el-button size="mini" @click="mapBack1" plain type="primary"
        >返回全国</el-button
      >
	  <el-button size="mini" @click="returnCountry" plain type="info"
        >刷新地图</el-button
      >
    </div>
    <div class="main">
      <aMap :reContry="reContry" ref="aMap"></aMap>
    </div>
  </div>
</template>
<script>
import aMap from "./amap.vue";
export default {
  components: { aMap }, // 引入注册
  data() {
    return {
      reContry: true,
    };
  },
  methods: {
    //点击全国按钮
    returnCountry() {
      this.$refs.aMap.reset();
    },
    mapBack() {
      this.$refs.aMap.mapBack();
    },
	mapBack1() {
      this.$refs.aMap.mapBack(100000);
    },
  },
};
</script>
<style scoped lang="scss">
//地图
.map {
  width: 100%;
  height: 100%;
  position: relative;
  .search {
    position: absolute;
    z-index: 999;
    right: 10px;
    top: 10px;
  }
  .main {
    width: 100%;
    height: 100%;
  }
}
</style>
