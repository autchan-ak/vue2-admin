<!-- 折线图 -->
<template>
  <div class="box_card">
    <div class="box_card_border">
      <span class="box_card_title">折线图</span>
      <el-row :gutter="20">
        <div class="right">
          <el-button-group style="height:20px">
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
          <ve-line v-if="index==0" height="350px" :data="chartData[index]" :extend="chartExtend[index]"></ve-line>
          <ve-line v-else-if="index==1" height="350px" :data="chartData[index]" :extend="chartExtend[index]"></ve-line>
          <ve-line v-else height="350px" :data="chartData[index]" ></ve-line>
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
      chartExtend:[
        {
            series:{
                smooth: false,  // 将曲线变为直线
            },
            color:['#E4004F','#64C9FA']
        },
        {
            series:{
                smooth: false,  // 将曲线变为直线
                step: 'middle', // 阶梯折线图 start middle end
            },
        }
      ],
      chartData: [
        {
            columns: ['日期', '销售额-1季度', '销售额-2季度'],
            rows: [
                {'日期': '1月1日', '销售额-1季度': 1523, '销售额-2季度': 3523},
                {'日期': '1月2日', '销售额-1季度': 3533, '销售额-2季度': 1232},
                {'日期': '1月3日', '销售额-1季度': 2523, '销售额-2季度': 9768},
                {'日期': '1月4日', '销售额-1季度': 4588, '销售额-2季度': 5252},
                {'日期': '1月5日', '销售额-1季度': 5632, '销售额-2季度': 2536},
                {'日期': '1月6日', '销售额-1季度': 6773, '销售额-2季度': 4454},
            ]
            
        },
        {
            columns: ['日期', '销售额-1季度', '销售额-2季度'],
            rows: [
                {'日期': '1月1日', '销售额-1季度': 2523, '销售额-2季度': 1523},
                {'日期': '1月2日', '销售额-1季度': 4933, '销售额-2季度': 1232},
                {'日期': '1月3日', '销售额-1季度': 9523, '销售额-2季度': 3768},
                {'日期': '1月4日', '销售额-1季度': 7588, '销售额-2季度': 3252},
                {'日期': '1月5日', '销售额-1季度': 5632, '销售额-2季度': 2536},
                {'日期': '1月6日', '销售额-1季度': 6773, '销售额-2季度': 4454},
            ]
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
