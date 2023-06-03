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
          <ve-pie
            v-if="index == 0"
            height="350px"
            :data="chartData[index]"
            :settings="{ roseType: 'area' }"
          ></ve-pie>
          <ve-pie v-else-if="index==1" height="350px" :data="chartData[index]" :settings="{roseType: 'radius'}"></ve-pie>
          <ve-pie v-else height="350px" :data="chartData[index]" ></ve-pie>
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
      chartData: [
        {
          columns: ["name", "proportion"],
          rows: [
            { name: "支付宝", proportion: 35 },
            { name: "微信", proportion: 39 },
            { name: "余额", proportion: 26 },
          ],
        },
        {
          columns: ["支付方式", "占比"],
          rows: [
            { 支付方式: "支付宝", 占比: 35 },
            { 支付方式: "微信", 占比: 39 },
            { 支付方式: "余额", 占比: 26 },
          ],
        },
        {
          columns: ["支付方式", "占比"],
          rows: [
            { 支付方式: "小程序", 占比: 25 },
            { 支付方式: "IOS客户端", 占比: 39 },
            { 支付方式: "安卓客户端", 占比: 50 },
            { 支付方式: "H5移动端", 占比: 10 },
            { 支付方式: "PC端", 占比: 5 },
          ],
        },
      ],
    };
  },
  mounted() {
    // 图表数据变化后视图没更新可用一下方法
    setTimeout(() => {
      this.chartData[0].rows[2].proportion = 80;
      var temp = this.chartData[0].rows;
      this.chartData[0].rows = [];
      this.$nextTick(() => {
        this.chartData[0].rows = temp;
      });
    }, 5000);
  },
  methods: {
    showData(i) {
      this.index = i;
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
