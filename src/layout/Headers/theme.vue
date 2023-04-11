<!-- 主题 -->
<template>
  <el-drawer
    :visible.sync="theme"
    title="配色方案"
    show-close
    direction="rtl"
    size="400px"
    class="theme"
    :before-close="handleClose"
  >
    <div class="theme-title-box">
      <div
        class="theme-title-box-list"
        v-for="(item, index) in themeColor"
        :key="index"
        @click="ThemeIndex(index)"
        :class="themeIndex === index ? 'theme-active' : ''"
      >
        <div class="theme-title-box-list-left" :style="item.aside"></div>
        <div class="theme-title-box-list-right">
          <div
            class="theme-title-box-list-right-top"
            :style="item.header"
          ></div>
          <div
            class="theme-title-box-list-right-bottom"
            :style="item.container"
          ></div>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  props: {
    theme: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState("theme", ["themeColor", "themeIndex"]),
  },
  methods: {
    ...mapMutations("theme", ["SET_THEME_INDEX"]),
    ThemeIndex(index) {
      this.SET_THEME_INDEX(index);
      this.handleClose();
    },
    handleClose() {
      this.$emit("themeClose");
    },
  },
};
</script>

<style lang="scss" scoped>
.theme {
  ::v-deep .el-drawer__header {
    margin: 0;
    height: 50px;
    font-size: 16px;
    padding: 0 15px;
    font-weight: bold;
    line-height: 50px;
    border-bottom: 1px solid #dcdfe6;
  }
  &-title {
    &-box {
      padding: 10px;
      box-sizing: border-box;
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      height: calc(100vh - 51px);
      overflow-x: hidden;
      overflow-y: auto;
      -ms-overflow-style: none;
      overflow: "-moz-scrollbars-none";
      scrollbar-width: none;
      /*  火狐   */
      background: #f5f7f9;
      &-list {
        width: 180px;
        height: 150px;
        display: flex;
        padding: 10px;
        box-sizing: border-box;
        background: #999999;
        border-radius: 5px;
        cursor: pointer;
        margin-bottom: 10px;
        border: 5px solid transparent;
        &-left {
          width: 30px;
          height: 120px;
        }
        &-right {
          flex: 1;
          height: 160px;
          &-top {
            width: 100%;
            height: 20px;
            background: #ffffff;
          }
          &-bottom {
            width: 100%;
            height: 100px;
          }
        }
      }
    }
  }
  &-active {
    border: 5px solid #05da89;
  }
}
</style>
