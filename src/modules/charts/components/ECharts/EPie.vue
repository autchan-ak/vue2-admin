<!-- 实心饼图 -->
<template>
  <div class="box_card">
    <div class="box_card_border">
      <span class="box_card_title">实心饼图</span>
      <el-row :gutter="20">
        <div class="right">
          <el-button-group style="height: 20px">
            <el-button
              :type="index == 0 ? 'primary' : ''"
              size="mini"
              @click="showData(0)"
              >近七天</el-button
            >
            <el-button
              :type="index == 1 ? 'primary' : ''"
              size="mini"
              @click="showData(1)"
              >本月</el-button
            >
            <el-button
              :type="index == 2 ? 'primary' : ''"
              size="mini"
              @click="showData(2)"
              >本年</el-button
            >
          </el-button-group>
        </div>
        <div class="mg-top">
          <div v-if="index == 0" style="height: 350px" ref="pie0"></div>
          <div
            ref="pie1"
            v-else-if="index == 1"
            style="height: 350px"
          ></div>
          <div ref="pie2" v-else style="height: 350px" ></div>
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
      mychart:null,
      chartData: [
        [
          { value: 418, name: "支付宝" },
          { value: 735, name: "微信" },
          { value: 580, name: "银行卡" },
          { value: 184, name: "现金" },
        ],
        [
          { name: "支付宝", value: 35 },
          { name: "微信", value: 39 },
          { name: "余额", value: 26 },
        ],
        [
          { name: "小程序", value: 25 },
          { name: "IOS客户端", value: 39 },
          { name: "安卓客户端", value: 50 },
          { name: "H5移动端", value: 10 },
          { name: "PC端", value: 5 },
        ],
      ],
    };
  },
  mounted() {
    this.pieShow();
  },
  methods: {
    showData(i) {
      this.index = i;
      this.mychart&&this.mychart.dispose();
      this.$nextTick(() => {
        this.pieShow();
      });
    },
    pieShow() {
      this.myChart = this.$echarts5.init(this.$refs["pie" + this.index]);
      let option = [
        {
        title: {
          show:true,
          text: "余额",
          subtext: "占比",
          left: "center",
        },
        tooltip: {
          show:true,
          trigger: "item",
          formatter: '兄弟你{a}不多了<br/>{b}:{c}元'
        },
        legend: {
          show: true,
          // orient: "vertical",
          // left: "left",
          top: "50",
        },
        series: [
          {
            color: [ "#F141AF","#F85E1F","#9830FA","#0C99FD","#25D9B4","#1AA2FC"],
            name: "所剩余额",
            type: "pie",
            radius: "60%",
            top: 50,
            roseType: '',
            data: this.chartData[this.index],
            emphasis: {
              //  悬停阴影
              itemStyle: {
                shadowBlur: 0,
                shadowOffsetX: 0,
                shadowColor: "#ff00ff",
              },
            },
          },
        ],
      },{
        title:{
          show:false,
        },
        tooltip: {
          show:true,
          trigger: "item",
          formatter: '{b}:{c}({d}%)'
        },
        series:{
          type: "pie",
          top: 50,
          data:this.chartData[this.index],
          roseType: 'radius',  // angle area
          }
      },{
        title:{
          show:false,
        },
        tooltip:{show:false},
        legend:{
          show:true,
          top:10
        },
        series:{
          type: "pie",
          radius:'65%',
          roseType: '',
          top:0,
          color: [ "#F141AF","#F85E1F","#9830FA","#0C99FD","#25D9B4",],
          data:this.chartData[this.index],
        }
      }
      ]
      this.myChart.setOption(option[this.index]);
      // 屏幕发送变化时自适应
      window.addEventListener("resize", ()=> {
        this.myChart.resize();
      });
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
