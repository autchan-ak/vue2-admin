<!-- 折线图 -->
<template>
  <div class="box_card">
    <div class="box_card_border">
      <span class="box_card_title">折线图</span>
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
          <div v-if="index == 0" style="height: 350px" ref="line0"></div>
          <div v-else-if="index == 1" style="height: 350px" ref="line1"></div>
          <div v-else style="height: 350px" ref="line2"></div>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      index: 0,
      mychart:null,
    };
  },
  mounted() {
    this.showLine();
  },
  methods: {
    showData(i) {
      this.index = i;
      this.mychart.dispose();
      this.$nextTick(() => {
        this.showLine();
      });
    },
    showLine() {
      let i = this.index;
      this.mychart = this.$echarts.init(this.$refs["line" + i]);
      let option = [
        {
          xAxis: {
            type: "category",
            data: ["1月1日","1月2日","1月3日","1月4日","1月5日","1月6日",],
          },
          yAxis: {
            type: "value",
          },
          toolbox: {
            feature: {
              saveAsImage: {
                show:false
              },
            },
          },
          series: [
            {
              data: [1523,3533,2523,4588,5632,6773],
              label:{show:true,position:"top"},
              type: "line",
              markLine:{ // 基线
                lineStyle: {
                    color: 'red',
                },
                data:[{
                  yAxis:4444,
                }]
              }
            },
            {
              data: [3523,1232,9768,5252,2536,4454],
              type: "line",
            },
          ],
        },
        {
          color: ["#FF0087", "#FFBF00"],
          title: {
            text: '最近一周气温'
          },
          tooltip: { // 悬浮提示
            trigger: 'axis'
          },
          legend: { //  标识
            right:0
          },
          toolbox: {  // 工具栏
            show: true,
            top:20,
            feature: {
              dataZoom: {}, // 区域放大
              dataView: { readOnly: true }, //  切换数据视图
              magicType: { type: ['line', 'bar'] }, //  切换图像类型
              restore: {},  //  还原
              saveAsImage: {} // 下载
            }
          },
          xAxis: {  // X轴  必备 
            type: 'category',
            // boundaryGap: false, // 是否顶头
            data: ['10/10', '10/11', '10/12', '10/13', '10/14', '10/15', '10/16']
          },
          yAxis: {  // Y轴  必备
            type: 'value',
            axisLabel: {
              formatter: '{value} °C'
            }
          },
          series: [ // 数据 必备
            {
              name: '最高温',
              type: 'line',
              data: [10, 13, 11, 16, 15, 12, 9],
              markPoint: {
                data: [
                  { type: 'max', name: 'Max' },
                ]
              },
              markLine: {
                data: [{ type: 'average', name: 'Avg' }]
              }
            },
            {
              name: '最低温',
              type: 'line',
              data: [1, 3, 4, 3, 3, 2, -2],
              markPoint: {
                data: [{ type: 'min', name: 'Min' },{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
              },
              markLine: {
                data: [
                  { type: 'average', name: 'Avg' },
                  [
                    {
                      symbol: 'none',
                      x: '90%',
                      yAxis: 'max'
                    },
                    {
                      symbol: 'circle',
                      label: {
                        position: 'start',
                        formatter: 'Max'
                      },
                      type: 'max',
                      name: '最高点'
                    }
                  ]
                ]
              }
            }
          ]
        },
        {
          color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
          title: {
            show: false,
            // text: "Gradient Stacked Area Chart",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985",
              },
            },
          },
          legend: {
            data: ["第1条", "第2条", "第3条", "第4条", "第5条"],
          },
          toolbox: {
            feature: {
              // 下载图片
              saveAsImage: {
                name: "啥也不是",
              },
            },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: [
                "星期一",
                "星期二",
                "星期三",
                "星期四",
                "星期五",
                "星期六",
                "星期日",
              ],
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: [
            {
              name: "第一条",
              type: "line",
              stack: "Total",
              smooth: true,
              lineStyle: {
                width: 0,
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: this.$echarts.graphic.LinearGradient(1, 2, 0, 1, [
                  {
                    offset: 0,
                    color: "red",
                  },
                  {
                    offset: 1,
                    color: "red",
                  },
                ]),
              },
              emphasis: {
                focus: "series",
              },
              data: [140, 232, 101, 264, 90, 340, 250],
            },
            {
              name: "第二条",
              type: "line",
              stack: "Total",
              smooth: true,
              lineStyle: {
                width: 0,
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgb(0, 221, 255)",
                  },
                  {
                    offset: 1,
                    color: "rgb(77, 119, 255)",
                  },
                ]),
              },
              emphasis: {
                focus: "series",
              },
              data: [120, 282, 111, 234, 220, 340, 310],
            },
            {
              name: "第三条",
              type: "line",
              stack: "Total",
              smooth: true,
              lineStyle: {
                width: 0,
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgb(55, 162, 255)",
                  },
                  {
                    offset: 1,
                    color: "rgb(116, 21, 219)",
                  },
                ]),
              },
              emphasis: {
                focus: "series",
              },
              data: [320, 132, 201, 334, 190, 130, 220],
            },
            {
              name: "第四条",
              type: "line",
              stack: "Total",
              smooth: true,
              lineStyle: {
                width: 0,
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgb(255, 0, 135)",
                  },
                  {
                    offset: 1,
                    color: "rgb(135, 0, 157)",
                  },
                ]),
              },
              emphasis: {
                focus: "series",
              },
              data: [220, 402, 231, 134, 190, 230, 120],
            },
            {
              name: "第五条",
              type: "line",
              stack: "Total",
              smooth: true,
              lineStyle: {
                width: 0,
              },
              showSymbol: false,
              label: {
                show: true,
                position: "top",
              },
              areaStyle: {
                opacity: 0.8,
                color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgb(255, 191, 0)",
                  },
                  {
                    offset: 1,
                    color: "rgb(224, 62, 76)",
                  },
                ]),
              },
              emphasis: {
                focus: "series",
              },
              data: [220, 302, 181, 234, 210, 290, 150],
            },
          ],
        },
      ];
      this.mychart.setOption(option[i]);
      window.addEventListener("resize", ()=>{
        this.mychart.resize();
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
