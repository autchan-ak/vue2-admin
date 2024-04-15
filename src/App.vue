<template>
  <div
    id="app"
    v-loading="loading.isLoading"
    :element-loading-text="loading.text"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.1)"
  >
    <router-view />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("widget", ["loading"]),
  },
  data() {
    return {
      // 全屏幕宽度
      windowWidth: null,
      isOpenValue: null,
      debugger: null,
    };
  },
  mounted() {
    document.addEventListener("visibilitychange", this.handleVisiable);
    // 获取屏幕宽度来确定目录的显示状态
    var that = this;
    that.windowWidth = document.documentElement.clientWidth;
    window.onresize = () => {
      return (() => {
        window.fullWidth = document.documentElement.clientWidth;
        that.windowWidth = window.fullWidth; //获取屏幕宽度
      })();
    };
    this.isOpenValue = +new Date();
    localStorage.setItem("isOpen", this.isOpenValue);
  },
  destroyed() {
    document.removeEventListener("visibilitychange", this.handleVisiable);
    localStorage.removeItem("isOpen");
  },

  watch: {
    windowWidth(v) {
      if (v >= 1200) {
        // 展开
        this.SET_SHOW_SIDEBAR(true);
        this.SET_PC(true);
      } else if (v >= 750) {
        // 收起
        this.SET_PC(true);
        this.SET_SHOW_SIDEBAR(false);
      } else {
        this.SET_PC(false);
        // 影藏---暂时先收起
        this.SET_SHOW_SIDEBAR(false);
      }
      this.$nextTick(() => {
        this.$forceUpdate();
      });
    },
  },
  methods: {
    ...mapMutations("theme", ["SET_SHOW_SIDEBAR", "SET_PC", "SET_LEAVE"]),
    handleVisiable(e) {
      switch (e.target.visibilityState) {
        case "hidden":
          this.SET_LEAVE(true);
          // 内容不可见，处理后台、最小化、锁屏状态
          break;
        case "visible":
          // 内容可见
          this.SET_LEAVE(false);
          break;
      }
    },
  },
};
</script>
