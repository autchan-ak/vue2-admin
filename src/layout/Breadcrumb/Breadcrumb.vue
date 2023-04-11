<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb" mode="out-in">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="index+item.path">
        <template v-if="item.meta.title">
          <span
            v-if="item.redirect === 'index' || index == levelList.length - 1"
            class="no-redirect"
            >{{ item.meta.title }}</span
          >
          <router-link v-else :to="item.redirect || item.path">{{
            item.meta.title
          }}</router-link>
        </template>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  name:'Breadcrumb',
  created() {
    this.getBreadcrumb();
  },
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );

      const first = matched[0];
      if (first && first.name !== "index") {
        matched = [{ path: "/index", meta: { title: "首页" } }].concat(matched);
      }
      this.levelList = matched;
    },
  },
};
</script>

<style scoped>
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}
.breadcrumb-move {
  transition: all 0.5s;
}
.breadcrumb-leave-active {
  position: absolute;
}
</style>
