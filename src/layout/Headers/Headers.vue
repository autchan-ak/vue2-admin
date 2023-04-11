<template>
  <div class="headers">
    <div class="headers-left">
      <div
        class="headers-left-box"
        :class="showSidebar ? '' : 'headers-left-active'"
        @click="targetIcon"
      >
        <i class="el-icon-s-fold"></i>
      </div>
      <Breadcrumb />
    </div>
    <div class="headers-right">
      <div class="headers-right-left">
        <div
          class="headers-right-left-seach"
          :style="{ width: search ? '150px' : '0' }"
        >
          <el-autocomplete
            ref="showSearch"
            class="inline-input"
            v-model="searchValue"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @blur="showSearch"
            :trigger-on-focus="false"
            @select="handleSelect"
          />
        </div>
        <el-tooltip effect="dark" content="搜索" placement="bottom">
          <i v-if="!search" class="el-icon-search" @click="showSearch"></i>
        </el-tooltip>
        <el-tooltip
          effect="dark"
          :content="isFullscreen ? '取消全屏' : '全屏'"
          placement="bottom"
        >
          <div @click="buttoncli">
            <svg-icon
              class="headers-right-left-screenIcon"
              :icon="isFullscreen ? 'reduction' : 'screen'"
            />
          </div>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="主题"
          placement="bottom"
        >
          <i class="el-icon-picture-outline-round" @click="theme = true"></i>
        </el-tooltip>
        <el-badge :is-dot="noticeBadge" class="item">
          <i
            class="el-icon-bell headers-right-left-newsIcon"
            @mouseout.self="dropHideBtn"
            @mouseover.self="dropShowBtn"
          ></i>
        </el-badge>
        <!-- 通知栏 -->
        <!-- <div
          class="header-right-dropdown"
          @mouseover="dropdownBtn"
          @mouseout="dropShow = false"
        >
          <el-collapse-transition>
            <Dropdowns v-show="dropShow" />
          </el-collapse-transition>
        </div> -->
        <el-tooltip
          class="item"
          effect="dark"
          content="Gitee"
          placement="bottom"
        >
          <div @click="github">
            <svg-icon class="headers-right-left-githubIcon" icon="github2" />
          </div>
        </el-tooltip>
      </div>
      <!-- 天气 -->
      <div id="he-plugin-simple"></div>
      <div class="headers-right-right">
        <div class="block" @click="goHome">
          <el-avatar
            shape="square"
            size="large"
            :src="$host + userInfo.avatar"
          ></el-avatar>
        </div>
        <el-dropdown size="medium" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <span>
              {{ userInfo.uname }}
            </span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided command="modify"
              >修改密码</el-dropdown-item
            >
            <el-dropdown-item divided command="quit">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <!-- 主题 -->
    <DrawerTheme :theme="theme" @themeClose="themeClose" />
    <!-- 修改密码 -->
    <ModifyPass :show="dialogFormVisible" @_close="themeClose" />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
// 全屏组件
import screenfull from "screenfull";

// 面包屑
import Breadcrumb from "../Breadcrumb/Breadcrumb.vue";
import DrawerTheme from "./theme.vue";
// 通知栏组件
import Dropdowns from "../Dropdown/index.vue";
import squareUrl from "@/assets/image/UserHead.png";

export default {
  data() {
    return {
      squareUrl,
      isFullscreen: false,
      dropShow: false, // 是否现实通知栏
      setTime: null, //定时器
      theme: false, // 主题 开关
      search: false, // 搜索开关
      searchValue: "",
      restaurants: [], // 所有路由
      dialogFormVisible: false, // 密码
    };
  },
  components: {
    DrawerTheme,
    Breadcrumb,
    Dropdowns,
  },
  computed: {
    ...mapState("user", ["userInfo"]),
    ...mapState("theme", ["showSidebar"]),
    ...mapState("permission", ["addRoutes"]),
    ...mapState("notification", ["noticeBadge"]),
  },
  methods: {
    ...mapActions("user", ["resetToken"]),
    ...mapMutations("theme", ["SET_SHOW_SIDEBAR"]),
    showSearch() {
      this.searchValue = "";
      this.search = !this.search;
      if (this.search) {
        this.restaurants = [];
        this.loadAll(this.addRoutes);
        this.$refs.showSearch.focus();
      }
    },
    loadAll(array, path) {
      path = path === "/" ? "" : path;
      array.forEach((item) => {
        if (item.meta && item.meta.title) {
          this.restaurants.push({
            value: item.meta.title,
            path: (path ? path + "/" : "") + item.path,
          });
        }
        if (item.children && item.children.length) {
          this.loadAll(item.children, item.path);
        }
      });
    },
    // 搜索目录
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect(item) {
      if (this.$route.path !== item.path) {
        this.$router.push(item.path);
      }
    },
    // 自定义 切换 侧边栏 事件
    targetIcon() {
      this.SET_SHOW_SIDEBAR(!this.showSidebar);
    },
    github() {
      window.open("https://gitee.com/kk0719/autchan/tree/master/ak_vue");
    },
    // 全屏
    buttoncli() {
      // if (!screenfull.enabled) { // 如果不允许进入全屏，发出不允许提示
      //     this.$message({
      //         message: '不支持全屏',
      //         type: 'warning'
      //     })
      //     return false
      // }
      screenfull.toggle();
      this.checkFull();
    },
    // 监控屏幕变化
    checkFull() {
      var isFull =
        document.fullscreenEnabled ||
        window.fullScreen ||
        document.webkitIsFullScreen ||
        document.msFullscreenEnabled;
      // 是否全屏判断
      this.isFullscreen = !this.isFullscreen;
      if (isFull === undefined) {
        isFull = false;
      }
      return isFull;
    },
    // 用户名 下拉菜单
    handleCommand(command) {
      switch (command) {
        case "quit":
          this.resetToken().then(()=>{
            this.$router.replace("/login");
          });
          break;
        case "modify":
          this.dialogFormVisible = true;
          break;
      }
    },
    goHome() {
      this.$router.push("/home");
    },
    // 展开通知
    dropShowBtn() {
      clearTimeout(this.setTime);
      this.dropShow = true;
    },
    // 收起通知
    dropHideBtn() {
      let This = this;
      this.setTime = setTimeout(function () {
        This.dropShow = false;
      }, 1000);
    },
    // 鼠标移入 通知栏
    dropdownBtn() {
      this.dropShow = true;
      clearTimeout(this.setTime);
    },
    themeClose() {
      this.theme = false;
      this.dialogFormVisible = false;
    },
  },
  mounted() {
    //     // 浏览器窗口改变事件
    this.isFullscreen = document.body.scrollHeight === window.screen.height;
    // 配置天气
        window.WIDGET = {
      "CONFIG": {
        "modules": "0124",
        "background": "5",
        "tmpColor": "434343",
        "tmpSize": "16",
        "cityColor": "434343",
        "citySize": "16",
        "aqiSize": "16",
        "weatherIconSize": "24",
        "alertIconSize": "18",
        "padding": "10px 10px 10px 10px",
        "shadow": "0",
        "language": "zh",
        "fixed": "false",
        // "vertical": "center",
        // "horizontal": "center",
        "key": "e32d7b799f9b4c8081739c64f099f2ec"
    }
        };
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src =
          "https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0";
        document.getElementsByTagName("head")[0].appendChild(script);
  },
};
</script>
<style>
#he-plugin-simple{
  z-index: 9999;
  animation: all .5s;
}
#he-plugin-simple>div:last-child>div{
  top: calc(100% - 2px) !important;
}
#he-plugin-simple>div:last-child>div>div{
  height: auto !important;
}
  
</style>
