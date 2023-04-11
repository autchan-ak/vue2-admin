<template>
  <div class="app-wrapper">
    <el-container class="app-box">
      <el-aside
        :width="showSidebar ? '200px' : '50px'"
        class="main-aside"
        :style="themeColor[themeIndex].aside"
      >
        <sidebar class="sidebar-container" :showSidebar="showSidebar"></sidebar>
      </el-aside>
      <el-container class="main">
        <el-header
          class="heads"
          height="50px"
          :style="themeColor[themeIndex].header"
        >
          <Headers />
        </el-header>
        <el-main class="main-container">
          <TagsViews :style="themeColor[themeIndex].header"/>
          <div
            class="main-container-views"
            :style="themeColor[themeIndex].container"
          >
            <transition name="nodebook" mode="out-in">
              <router-view />
            </transition>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <el-backtop target=".main-container-views" :bottom="50">
      <div class="scrollTop">
        <i class="el-icon-upload2"></i>
      </div>
    </el-backtop>
  </div>
</template>

<script>
import Sidebar from "./Sidebar/index.vue";
import Headers from "./Headers/Headers.vue";
import TagsViews from "./TageView/TagsView.vue";
import { mapMutations, mapState } from "vuex";
// 获取本地存储的主题
import { setTheme } from "@/utils/theme";
export default {
  components: {
    Sidebar,
    Headers,
    TagsViews,
  },
  data() {
    return {
      // 全屏幕宽度
      windowWidth:null,
    }
  },
  watch: {
    windowWidth(v){
      if(v>=1200){
        // 展开
        this.SET_SHOW_SIDEBAR(true)
      }else if(v>=750){
        // 收起
        this.SET_SHOW_SIDEBAR(false)
      }else{
        // 影藏---暂时先收起
        this.SET_SHOW_SIDEBAR(false)
      }
      this.$nextTick(()=>{
        this.$forceUpdate()
      })
    }
  },
  computed: {
    ...mapState("theme", ["themeColor", "themeIndex","showSidebar"]),
  },
  mounted(){
    // 获取屏幕宽度来确定目录的显示状态
      var that = this;
      that.windowWidth = document.documentElement.clientWidth
      window.onresize = () => {
        return (() => {
          window.fullWidth = document.documentElement.clientWidth;
          that.windowWidth = window.fullWidth; //获取屏幕宽度
        })();
      }
  },
  methods: {
    ...mapMutations("theme",["SET_SHOW_SIDEBAR"]),
    // 配色方案 子元素自定义事件
    SET_THEME_INDEX(index) {
      this.themeIndex = index;
      setTheme(index);
    },
  },
};
</script>