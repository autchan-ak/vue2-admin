<!--  -->
<template>
    <div>

<ve-histogram
    class="myve"
    :data="chartData"
    :settings="vchartsConfig.setting"
    :extend="vchartsConfig.extend"
    ></ve-histogram>
    </div>
</template>

<script>

export default {
    name: '',
    components: {
        
    },
    //js部分
  data() {
    return {
　　// v-charts配置参数
      vchartsConfig: {
        setting:{
          // 别称
          labelMap: {
            'area': '地区',
            'count': '拓展数',
          },
        },
        extend: {
          title:{
            show:false,
            text:'实时数据',
            subtext:'各城市对应的拓展',
            // textAlign:'center',
          },
          // 图标顶部的标题及按钮
          legend:{
            show:false,
          },
          //X轴线
          xAxis: {
            name: "地区",
            type:'category',
            show:true,
            // 坐标轴轴线
            axisLine:{
              show:true,
            },
            // 坐标轴刻度
            axisTick:{
              show:true,
            },
            // 坐标轴每项的文字
            axisLabel:{
              showMaxLabel:true,    // 最后一项
              showMinLabel:true,    // 第一项
              color:'#000',      // 文字颜色
              rotate:0,         // 刻度文字旋转，防止文字过多不显示
              margin:10,        // 文字离x轴的距离
              boundaryGap:false,
              backgroundColor:'#0f0',   // 背景颜色
              formatter:(v)=>{
                // 每一项展示文字
                if(v.length>3){
                  return v.substring(0,3)+'...'
                }
                return v
              },
            },
            // 每一项X轴下面的刻度小竖线
            axisTick:{
              show:true,
              alignWithLabel:true,// 居中   axisLabel.boundaryGap=true时有效
              interval:0,  // 间隔
              length:10,//长度
            },
            // 每一项x轴对应的竖线
            splitLine: {
              show: true,   
              interval: 0, // 间隔
              lineStyle:{
                color:'yellow', // 间隔线颜色
                // width:5,    // 宽度

              }
            }
          },
          yAxis: {
            show:true,
            offset:0,
            // 坐标轴轴线
            axisLine:{
              show:true,
            },
            // x轴对应的竖线
            splitLine: {
              show: true,
            },
            // 坐标轴刻度
            axisTick:{
              show:false,
            },
            boundaryGap:false,
            axisLabel:{
              color:'red',
            },
          },
          
          // 滚动组件参数
          dataZoom:[
            {
              type: 'inside',
              show: true,
              xAxisIndex: [0],
              startValue: 0,
              endValue: 4,
              zoomLock:true,//阻止区域缩放
            }
          ],

          // 柱形区域
          grid: {
            show: true,
            backgroundColor: "#FFF6F3",
            borderColor: "#FFF6F3",
            // containLabel:false,
          },

          // 每个柱子
          series(v) {
            // 设置柱子的样式
            v.forEach(i => {
              i.barWidth = 20;
            //   i.itemStyle={
            //     barBorderRadius:[10,10,10,10],
            //     color:'#FF6633',
            //     borderWidth:0,
            //   };
              i.label={
                color:'#666',
                show:true,
                position:'top',
                // backgroundColor:'yellow',
              };

            });
            return v;
          },
        }
      },
      // v-chats列表数据
      chartData: {
        columns: ["area", "count"],
        rows: [
          { "area": "广州市", "count": 20 },
          { "area": "战狼3", "count": 30 },
          { "area": "2222", "count": 12 },
          { "area": "3333", "count": 42 },
        ],
      },

    };
  },
    
};
</script>

<style lang="scss" scoped>

</style>



