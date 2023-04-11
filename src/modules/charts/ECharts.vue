<!-- ECharts -->
<template>
  <div>
    <div class="template-describe">
      <p>树状图动态排序echarts5+才支持，单独引入5</p>
      <a
        href="https://echarts.apache.org/zh/index.html"
        target="_blank"
        rel="noopener noreferrer"
        >查看文档</a
      ><br>
      <a href="https://www.shulanxt.com/visualization/echarts/echarts-tutorial" target="_blank" rel="noopener noreferrer" >查看文档(中文)</a><br>
      <a href="https://echarts.apache.org/zh/option.html" target="_blank" rel="noopener noreferrer" >查看配置项</a>
    </div>
    <!-- 销售统计 -->
    <div class="box_card">
      <div class="box_card_border">
        <span class="box_card_title">销售数据统计</span>
        <el-row :gutter="20">
          <Statistics
            bj="#FFA333"
            title="今日成交数量"
            :number="10"
            img="deal"
          />
          <Statistics
            bj="#A155E8"
            title="昨日成交数量"
            :number="120"
            img="deal"
          />
          <Statistics
            bj="#6D91FF"
            title="本月成交数量"
            :number="405"
            img="deal"
          />
          <Statistics
            bj="#A233A2"
            title="累计成交量(年)"
            :number="1100"
            img="deal"
          />
          <Statistics
            bj="#AED75B"
            title="今日成交金额"
            :number="123"
            img="money"
          />
          <Statistics
            bj="#A27B33"
            title="昨日成交金额"
            :number="1454"
            img="money"
          />
          <Statistics
            bj="#8D8DD1"
            title="本月成交金额"
            :number="2657"
            img="money"
          />
          <Statistics
            bj="#C14E4E"
            title="累计成交金额(年)"
            :number="112122"
            img="money"
          />
        </el-row>
      </div>
    </div>
    <div class="mg-top">
      <el-row :gutter="15">
        <!-- 饼图 -->
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="mg-bottom">
          <EPie />
        </el-col>
        <!-- 圆环 -->
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="mg-bottom">
          <ERing />
        </el-col>
        <!-- 折线 -->
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="mg-bottom">
          <ELine />
        </el-col>
        <!-- 树状 -->
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="mg-bottom">
          <EBar />
        </el-col>
        <!-- 漏斗 -->
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="mg-bottom">
          <EFunnel />
        </el-col>
        <!-- 仪表盘 -->
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="mg-bottom">
          <EGauge />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Statistics from "./components/Statistics.vue";
import EPie from "./components/ECharts/EPie.vue";
import ERing from "./components/ECharts/ERing.vue";
import ELine from "./components/ECharts/ELine.vue";
import EBar from "./components/ECharts/EBar.vue";
import EFunnel from "./components/ECharts/EFunnel.vue";
import EGauge from "./components/ECharts/EGauge.vue";

export default {
  name: "ECharts",
  components: {
    Statistics,
    EPie,
    ERing,
    ELine,
    EBar,
    EFunnel,
    EGauge,
  },
};
</script>
