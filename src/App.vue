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
import { mapState,mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("widget", ["loading"]),
    
  },
  mounted() {
    document.addEventListener("visibilitychange", this.handleVisiable);
  },
  destroyed() {
    document.removeEventListener("visibilitychange", this.handleVisiable);
  },

  watch: {},
  methods: {
    ...mapMutations("theme", ["SET_LEAVE"]),
    handleVisiable(e) {
      switch (e.target.visibilityState) {
        case "hidden":
          this.SET_LEAVE(true)
          // 内容不可见，处理后台、最小化、锁屏状态
          break;
        case "visible":
          // 内容可见
          this.SET_LEAVE(false)
          break;
      }
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
// 自定义进度条颜色
#nprogress .bar {
  background: #f811b2 !important; //自定义颜色
}
</style>
