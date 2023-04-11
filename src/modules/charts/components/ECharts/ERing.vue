<!-- 空心圆环 -->
<template>
  <div class="box_card">
    <div class="box_card_border">
      <span class="box_card_title">空心圆环</span>
        <div class="mg-top">
          <div ref="pie" class="ve-ring" style="height: 370px"></div>
          <div class="ring-detailed">
            <div v-for="(item, index) in data" :key="index">
              <div>
                <span :style="{ color: colors[index] }">●</span>
                <span> {{ item['name'] }}</span>
              </div>
              <span>￥{{ item.value }}</span>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      colors: [
        "#F141AF",
        "#F85E1F",
        "#9830FA",
        "#0C99FD",
        "#25D9B4",
        "#1AA2FC",
      ],
      data: [
        { name: "安心蔬菜", value: 1393 },
        { name: "时令水果", value: 3530 },
        { name: "乳品早点", value: 2923 },
        { name: "酒水饮料", value: 1723 },
        { name: "速冻食品", value: 3792 },
        { name: "其他", value: 4593 },
      ],
    };
  },
  mounted() {
    this.showPie()
  },

  methods: {
    showPie(){
      let mychart = this.$echarts5.init(this.$refs.pie);
      let option = {
        legend:{show:true},
        itemStyle: { //间隙
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        series:{
          type:'pie',
          radius: ['20%', '70%'], // 圆环
          roseType:'angle',
          data:this.data,
          color:this.colors
        }
      }
      mychart.setOption(option)
      window.addEventListener("resize", function () {
        mychart.resize();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.mg-top {
  display: flex;
}
.ve-ring {
  flex: 1;
}
.ring-detailed {
  width: 30%;
  min-width: 150px;
  padding: 0 10px;
  border-left: 1px solid #e6e6e6;
  > div {
    display: flex;
    line-height: 2;
    justify-content: space-between;
    color: #8c8c8c;
    > div > span {
      color: #595959;
    }
  }
}
</style>
