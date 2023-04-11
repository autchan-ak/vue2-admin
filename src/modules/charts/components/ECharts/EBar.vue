<!-- 树状图 -->
<template>
  <div class="box_card">
    <div class="box_card_border">
      <span class="box_card_title">树状图</span>
      <el-row :gutter="20">
        <div class="right">
          <el-button-group style="height:20px">
            <el-button
              :type="index == 0 ? 'primary' : ''"
              size="mini"
              @click="init(0)"
              >近七天</el-button
            >
            <el-button
              :type="index == 1 ? 'primary' : ''"
              size="mini"
              @click="init(1)"
              >本月</el-button
            >
            <el-button
              :type="index == 2 ? 'primary' : ''"
              size="mini"
              @click="init(2)"
              >本季</el-button
            >
          </el-button-group>
        </div>
        <div class="mg-top">
          <div v-if="index==0" style="height:350px" ref="bar0"></div>
          <div v-else-if="index==1" style="height:350px" ref="bar1"></div>
          <div v-else style="height:350px" ref="bar2" ></div>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
      interval:null, // 定时器
      mychart:null,
    };
  },
  mounted() {
    this.showChart()
    window.addEventListener("resize", ()=>{
        this.mychart&&this.mychart.resize();
    });
  },
  methods: {
    init(i) {
      this.index = i;
      this.mychart.dispose();
      clearInterval(this.interval)
      this.$nextTick(()=>{
        this.showChart();
      })
    },
    showChart(){
      let i = this.index;
        this.mychart = this.$echarts5.init(this.$refs['bar'+i]);
      let option = [
        {
          color:["#ffa333","#a155e8","#aed75b"],
          legend:{},
          toolbox: {  // 工具栏
            show: true,
            top:20,
            feature: {
              magicType: { type: ['line', 'bar'] }, //  切换图像类型
              saveAsImage: {} // 下载
            }
          },
          xAxis: [
            {
              type: 'category',
              data: ['1月1日','1月2日','1月3日','1月4日','1月5日','1月6日'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisTick:{show:true}
            }
          ],
          series:[
            {
              name:"销售额-1季度",
              type:"bar",
              data:[1523,3533,2523,4588,5632,6773],
              label:{show:true,position:'top'}
            },
            {
              type:"bar",
              name:"销售额-2季度",
              label:{show:true},
              data:[3523,1232,9768,5252,2536,4454]
            },
            {
              type:"bar",
              name:"销售额-3季度",
              label:{show:true,position:"top"},
              data:[4523,2232,5768,6252,1536,2454]
            }
          ]
        },
        {
          title:{
            text:"访问渠道",
            left:0,
          },
          legend:{},
          xAxis: [
            {
              type: 'value',
            }
          ],
          yAxis: [
            {
              type: 'category',
              data: ["小程序","IOS客户端","安卓客户端","H5移动端","PC端"],
            }
          ],
          series:[
            {
              name:"上半年",
              type:'bar',
              data: [18203, 83489, 29034, 104970, 131744]
            },
            {
              name:"下半年",
              type:'bar',
              data: [19325, 23438, 31000, 134141, 81807]
            }
          ]
        },
        {
          color:'#8d8dd1',
          backgroundColor: '', //设置背景色
          xAxis: {
            // 以数据最大值，作为坐标轴刻度最大值
              max: 'dataMax',
          },
          yAxis: {
              type: 'category',
              data: ["小程序","IOS客户端","安卓客户端","H5移动端","PC端"],
              inverse: true,  //  降序
              animationDuration: 300, //  初始动画时长
              animationDurationUpdate: 300, //  数据更新动画时长
          },
          series: [{
              realtimeSort: true, // 开启动态排序
              name: '成交量',
              type: 'bar',
              data:[2,5,4,8,5],
              label: {
                  show: true,
                  position: 'right',
                  valueAnimation: true
              }
          }],
          legend: {
              show: true
          },
          animationDuration: 0,
          animationDurationUpdate: 3000,
          animationEasing: 'linear',
          animationEasingUpdate: 'linear'
        }
      ];
      if(i==2){
        this.interval = setInterval(()=>{
          let data = []
          option[i].series[0].data.forEach(item=>{
            // 随机生成数据
            data.push(item + Math.round(Math.random()*100));
          })
          option[i].series[0].data = [...data]
          this.mychart.setOption({
            series:[{
              type:'bar',
              data
            }]
          })
        },3000)
      }
      this.mychart.setOption(option[i]);
    },
  },
};
</script>

<style lang="scss" scoped>
.right {
  text-align: right;
  margin-right: 15px;
}
</style>
