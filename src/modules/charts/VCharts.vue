<!--  -->
<template>
  <div>
    <div class="template-describe">
      <p>依赖于echarts4+</p>
      <a href="https://v-charts.js.org/" target="_blank" rel="noopener noreferrer" >查看文档</a><br>
    </div>
    <div class="mg-top">
        <el-row :gutter="15">
          <!-- 饼图 -->
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="mg-bottom">
            <VPie/>
          </el-col>
          <!-- 圆环 -->
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="mg-bottom">
            <Ring/>
          </el-col>
          <!-- 折线 -->
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="mg-bottom">
            <VLine/>
          </el-col>
          <!-- 树状 -->
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="mg-bottom">
            <VHistogram/>
          </el-col>
          <!-- 漏斗 -->
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="mg-bottom">
            <VFunnel/>
          </el-col>
          <!-- 仪表盘 -->
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="mg-bottom">
            <VGauge/>
          </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
import Statistics from "./components/Statistics.vue";
import VPie from './components/VCharts/VPie.vue';
import Ring from './components/VCharts/VRing.vue';
import VLine from './components/VCharts/VLine.vue';
import VHistogram from './components/VCharts/VHistogram.vue'
import VFunnel from './components/VCharts/VFunnel.vue'
import VGauge from "./components/VCharts/VGauge.vue"

export default {
  name: "VCharts",
  components: {
    VHistogram,
    Statistics,
    VFunnel,
    VGauge,
    VPie,
    Ring,
    VLine
  },
};
</script>
