<!-- 仪表盘 -->
<template>
  <div class="box_card">
    <div class="box_card_border">
      <span class="box_card_title">仪表盘</span>
      <el-row :gutter="20">
        <div class="right">
          <el-button-group style="height: 20px">
            <el-button
              :type="index == 0 ? 'primary' : ''"
              size="mini"
              @click="showData(0)"
              >内压</el-button
            >
            <el-button
              :type="index == 1 ? 'primary' : ''"
              size="mini"
              @click="showData(1)"
              >车速</el-button
            >
            <el-button
              :type="index == 2 ? 'primary' : ''"
              size="mini"
              @click="showData(2)"
              >钟表</el-button
            >
          </el-button-group>
        </div>
        <div :class="index == 1 ? 'mg-top2' : 'mg-top'">
          <ve-gauge
            v-if="index == 0"
            height="350px"
            :data="chartData[index]"
            :settings="chartSettings[index]"
          ></ve-gauge>
          <ve-gauge
            v-else-if="index == 1"
            height="300px"
            :data="chartData[index]"
            :settings="chartSettings[index]"
          ></ve-gauge>
          <ve-gauge v-else height="350px" :data="chartData[index]" :settings="chartSettings[index]"></ve-gauge>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  //配置写在data里
  data() {
    return {
      index: 0,
      chartData: [
        {
          columns: ["type", "value"],
          rows: [{ type: "内压", value: 48 }],
        },
        {
          columns: ["type", "value"],
          rows: [{ type: "时速", value: 48 }],
        },
        {
          columns: ["type", "value"],
          rows: [ { type: "时间", value: 0 }],
        },
      ],
      chartSettings: [
        {
          seriesMap: {
            '内压': {
              radius: "70%", // 大小
              axisLine: {
                //仪表盘轴线
                lineStyle: {
                  color: [
                    [0.2, "#30d8b6"],
                    [0.5, "#9830fa"],
                    [0.8, "#6ab9f1"],
                    [1, "#fa7c92"],
                  ],
                  width: 10, //环圆线宽
                  shadowBlur: 2, // 环圆阴影模糊
                  shadowColor: "red", // 环圆阴影模糊颜色
                },
              },
              axisTick: {
                //刻度 线
                length: 15, //刻度线长度
                lineStyle: {
                  color: "auto", //颜色
                  shadowColor: "#fff",
                  shadowBlur: 10,
                },
              },
              axisLabel: {
                //标签
                textStyle: {
                  fontWeight: "bolder", //标签数字的粗细
                  color: "#49a9f2", // 标签数字的颜色
                  shadowColor: "#fff",
                  shadowBlur: 100,
                },
              },
              splitLine: {
                //分割线-> 刻度线
                length: 15, //数字距离刻度线的位置
                lineStyle: {
                  width: 3,
                  color: "#fff", //刻度线颜色
                  shadowColor: "#fff", //刻度阴影
                  shadowBlur: 10, //模糊阴影大小 配合shadowColor,shadowOffsetX, shadowOffsetY设置使用
                },
              },
              pointer: {
                width: 5, //指针的宽度
                shadowColor: "red",
                shadowBlur: 50,
              },
              title: {
                //标题
                show: true,
              },
              detail: {
                //详情展示 数据 百分比
                show: true,
              },
            },
          },
        },
        {
          seriesMap: {
            '时速': {
              tooltip: {
                formatter: '{a}:{c}'
              },
              radius: "100%", // 大小
              startAngle: 180, // 外圈多大
              endAngle: 0,
              min: 0,
              max: 240,
              splitNumber: 12,
              itemStyle: {
                color: "#58D9F9",
                shadowColor: "rgba(0,138,255,0.45)",
                shadowBlur: 10,
                shadowOffsetX: 2,
                shadowOffsetY: 2,
              },
              progress: {
                show: true,
                roundCap: true,
                width: 180,
              },
              pointer: {
                length: "75%",
                width: 16,
                offsetCenter: [200, "50%"],
              },
              axisLine: {
                roundCap: true,
                lineStyle: {
                  width: 18,
                },
              },
              axisTick: {
                splitNumber: 2,
                lineStyle: {
                  width: 2,
                  color: "#999",
                },
              },
              splitLine: {
                length: 12,
                lineStyle: {
                  width: 3,
                  color: "#999",
                },
              },
              axisLabel: {
                distance: 10,
                color: "#999",
                fontSize: 14,
              },
              detail: {
                backgroundColor: "#fff",
                borderColor: "#999",
                borderWidth: 2,
                width: "60%",
                lineHeight: 40,
                height: 40,
                borderRadius: 8,
                offsetCenter: [0, "35%"],
                valueAnimation: true,
                formatter: function (value) {
                  return "{value|" + value.toFixed(0) + "}{unit|km/h}";
                },
                rich: {
                  value: {
                    fontSize: 20,
                    fontWeight: "bolder",
                    color: "#777",
                  },
                  unit: {
                    fontSize: 20,
                    color: "#999",
                    padding: [0, 0, 0, 10],
                  },
                },
              },
              data: [
                {
                  value: 200,
                },
              ],
            },
          },
        },
        {
          seriesMap: {
          '时间':{
              tooltip: {
                formatter: '北京时间'
              },
            min: 0,
            max: 12,
            splitNumber: 12,   // 计算
            startAngle: 90,
            endAngle: -269.999,
            animation: 0,   // 动画
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [[1, '#d73d32']],
                width: 10
              }
            },
            axisLabel: {
                // 刻度
              show: false,
            },
            axisTick: {
              // 坐标轴小标记|小刻度
              show: true
            },
            splitLine: {
              // 分隔线|大刻度
              show: true,
              length: 15,
              lineStyle: {
                  width: 2,
                  color: "#999",
                },
            },
            pointer: {
              // 分隔线
              shadowColor: '#000', //默认透明
              shadowBlur: 10,
              length: '50%',
              width: 3,
              color: '#000',
              itemStyle: {
                color: '#000'
              }
            },
            detail: {
              show: false
            },
            data: [{ value: 0, name:'' },{ value:0, name:"" },{ value: 0, name:"" }]
          },
          },
        },
      ],
    TimeInterval:null
    };
  },
  mounted(){
    if(this.index==2){
        this.getTime()
    }
  },
  methods: {
    showData(i) {
      this.index = i;
      if(i==2){
        this.getTime()
      }else{
        clearInterval(this.TimeInterval)
      }
    },
    getTime(){
        this.TimeInterval = setInterval(()=>{
            let time = new Date();
            let h = time.getHours();
            // 60为一圈
            let m = time.getMinutes()/5;
            let s = time.getSeconds()/5;
            // 小时根据分钟算小数
            h +=time.getMinutes()/60;
            // 修改数值
            this.chartSettings[2].seriesMap['时间'].data[0].value = h
            this.chartSettings[2].seriesMap['时间'].data[1].value = m
            this.chartSettings[2].seriesMap['时间'].data[2].value = s
            this.chartSettings[2].seriesMap['时间'].data[0].name = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
        },1000)
    },
  },
};
</script>

<style lang="scss" scoped>
.right {
  text-align: right;
  margin-right: 15px;
}
.mg-top2 {
  margin-top: 65px;
}
</style>
