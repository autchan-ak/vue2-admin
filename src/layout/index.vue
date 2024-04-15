<template>
  <div class="app-wrapper" :style="themeColor[themeIndex].container">
    <el-container class="app-box">
      <el-aside
        v-if="PC"
        :width="showSidebar ? '200px' : '60px'"
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
          <TagsViews :style="themeColor[themeIndex].header" />
          <div
            class="main-container-views"
            :style="themeColor[themeIndex].container"
          >
            <transition name="nodebook" mode="out-in">
              <router-view />
            </transition>
          </div>
        </el-main>
        <div class="phone-drawer">
        <el-drawer
          v-if="!PC"
          size="60%"
          :visible.sync="showSidebar"
          direction="ltr"
          :before-close="handleClose"
        >
        <div class="main-aside" :style="themeColor[themeIndex].aside">
          <sidebar class="sidebar-container" :showSidebar="showSidebar"></sidebar>
        </div>
        </el-drawer>
        </div>
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
    };
  },

  computed: {
    ...mapState("theme", ["themeColor", "themeIndex", "showSidebar", "PC"]),
  },
  mounted() {
  },
  methods: {
    ...mapMutations("theme", ["SET_SHOW_SIDEBAR"]),
    // 配色方案 子元素自定义事件
    SET_THEME_INDEX(index) {
      this.themeIndex = index;
      setTheme(index);
    },
    handleClose() {
      this.SET_SHOW_SIDEBAR(!this.showSidebar);
    },
  },
};
</script>
