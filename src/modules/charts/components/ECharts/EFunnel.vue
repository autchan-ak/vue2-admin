<!-- 漏斗图 -->
<template>
  <div class="box_card">
    <div class="box_card_border">
      <span class="box_card_title">漏斗图</span>
      <div class="mg-top">
        <div ref="funnel" style="height: 370px"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      funnelData:  [
        { value: 60, name: "支付宝" },
        { value: 40, name: "微信" },
        { value: 70, name: "现金" },
      ],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let myChart = this.$echarts.init(this.$refs.funnel);
      let option = {
        title: {
          text: "支付方式",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}%",
        },
        // toolbox: { // 工具栏
        //   feature: {
        //     dataView: { readOnly: false },
        //     restore: {},
        //     saveAsImage: {},
        //   },
        // },
        legend: {
          //  也可为空对象
          data: ["微信", "支付宝", "现金"],
        },
        series: [
          {
            name: "支付方式",
            type: "funnel",
            sort: "descending",
            gap: 12, // 间隔
            label: {
              show: true,
              position: "inside",
            },
            labelLine: {
              length: 100,
              lineStyle: {
                width: 1,
                type: "solid",
              },
            },
            itemStyle: {
              // 每一项
              borderColor: "#fff",
              borderWidth: 2,
            },
            emphasis: {
              label: {
                fontSize: 20,
              },
            },
            data:this.funnelData
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>
