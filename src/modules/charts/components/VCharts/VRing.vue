<!-- 空心圆环 -->
<template>
  <div class="box_card">
    <div class="box_card_border">
      <span class="box_card_title">空心圆环</span>
      <el-row :gutter="20">
        <div class="mg-top">
          <ve-ring :settings="{roseType: 'radius'}" class="ve-ring" height="370px" :data="scaleData" :colors="colors"></ve-ring>
          <!-- <ve-ring :settings="{roseType: 'area'}" class="ve-ring" height="370px" :data="scaleData" :colors="colors"></ve-ring> -->
          <div class="ring-detailed">
            <div v-for="(item, index) in scaleData.rows" :key="index">
              <div>
                <span :style="{ color: colors[index] }">●</span>
                <span> {{ item["类目"] }}</span>
              </div>
              <span>￥{{item['金额']}}</span>
            </div>
          </div>
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
      colors: [
        "#F141AF",
        "#F85E1F",
        "#9830FA",
        "#0C99FD",
        "#25D9B4",
        "#1AA2FC",
      ],
      scaleData: {
        columns: ["类目", "金额"],
        rows: [
          { 类目: "安心蔬菜", 金额: 1393 },
          { 类目: "时令水果", 金额: 3530 },
          { 类目: "乳品早点", 金额: 2923 },
          { 类目: "酒水饮料", 金额: 1723 },
          { 类目: "速冻食品", 金额: 3792 },
          { 类目: "其他", 金额: 4593 },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.mg-top {
  display: flex;
}
.ve-ring{
    flex: 1;
}
.ring-detailed{
    width: 30%;
    min-width: 150px;
    padding: 0 10px;
    border-left: 1px solid #e6e6e6;
    >div{
        display: flex;
        line-height: 2;
        justify-content: space-between;
        color: #8c8c8c;
        >div>span{
            color: #595959;
        }
    }
}
</style>
