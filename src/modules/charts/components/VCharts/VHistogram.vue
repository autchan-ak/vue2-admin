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
              >本季</el-button
            >
            <el-button
              :type="index == 3 ? 'primary' : ''"
              size="mini"
              @click="showData(3)"
              >本年</el-button
            >
          </el-button-group>
        </div>
        <div class="mg-top">
          <ve-histogram v-if="index==0" height="350px" :data="chartData[index]" :extend="chartExtend[index]"></ve-histogram>
          <ve-histogram v-else-if="index==1" height="350px" :data="chartData[index]"></ve-histogram>
          <ve-bar v-else-if="index==2" height="350px" :data="chartData[index]" ></ve-bar>
          <ve-bar v-else height="350px" :data="chartData[index]" ></ve-bar>
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
            color:['#E4004F','#64C9FA'],
            settings:{
                dataOrder:{label:'销售额-1季度',order:'asc'}
            },
            yAxis:{
               // 坐标轴轴线
              axisLine:{
                show:false,
              },
               // 坐标轴刻度
              axisTick:{
                show:false,
              },
              // x轴对应的竖线
              splitLine: {
                show: true,
              },
            boundaryGap:false,
              
            },
            // series:{label: { show: true, position: "top" }},
            series(v) {
            // 设置柱子的样式
            v.forEach(i => {
              i.barWidth = 20;
              // i.itemStyle={
              //   barBorderRadius:[10,10,10,10],
              //   color:'#FF6633',
              //   borderWidth:0,
              // };
              i.label={
                color:'#666',
                show:true,
                position:'top',
                // backgroundColor:'yellow',
              };

            });
            return v;
          },
        },
      ],
      chartData: [
        {
            columns: ['日期', '销售额-1季度', '销售额-2季度'],
            rows: [
                {'日期': '1月1日', '销售额-1季度': 2523, '销售额-2季度': 1523},
                {'日期': '1月2日', '销售额-1季度': 4933, '销售额-2季度': 1232},
                {'日期': '1月3日', '销售额-1季度': 9523, '销售额-2季度': 3768},
                {'日期': '1月4日', '销售额-1季度': 7588, '销售额-2季度': 3252},
                {'日期': '1月5日', '销售额-1季度': 5632, '销售额-2季度': 2536},
                {'日期': '1月6日', '销售额-1季度': 4454, '销售额-2季度': 6565},
            ]
        },
        {
            columns: ['日期', '销售额-1季度', '销售额-2季度','销售额-3季度'],
            rows: [
                {'日期': '1月1日', '销售额-1季度': 1523, '销售额-2季度': 3523, '销售额-3季度': 4523},
                {'日期': '1月2日', '销售额-1季度': 3533, '销售额-2季度': 1232, '销售额-3季度': 2232},
                {'日期': '1月3日', '销售额-1季度': 2523, '销售额-2季度': 9768, '销售额-3季度': 5768},
                {'日期': '1月4日', '销售额-1季度': 4588, '销售额-2季度': 5252, '销售额-3季度': 6252},
                {'日期': '1月5日', '销售额-1季度': 5632, '销售额-2季度': 2536, '销售额-3季度': 1536},
                {'日期': '1月6日', '销售额-1季度': 6773, '销售额-2季度': 4454, '销售额-3季度': 2454},
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
        {
          columns: ["支付方式", "排序"],
          rows: [
            { 支付方式: "小程序", 排序: 25 },
            { 支付方式: "IOS客户端", 排序: 39 },
            { 支付方式: "安卓客户端", 排序: 50 },
            { 支付方式: "H5移动端", 排序: 10 },
            { 支付方式: "PC端", 排序: 5 },
          ],
        },
      ],
        interval:null, // 定时器
    };
  },
  mounted() {
    
  },
  methods: {
    showData(i) {
      this.index = i;
       this.interval && (clearInterval(this.interval),
       this.interval = null)
      if(i ==3){
        this.interval = setInterval(()=>{
            this.chartData[i].rows.forEach(item => {
                item['排序'] +=(Math.round(Math.random() * 20))
            });
            this.chartData[i].rows = this.chartData[i].rows.sort((a,b)=>a['排序']-b['排序'])
        },1000)

      }
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
