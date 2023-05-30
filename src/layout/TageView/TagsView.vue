<!-- 顶部历史便签 -->
<template>
  <div class="tags-view-container">
    <scroll-pane class="tags-view-wrapper" ref="scrollPane">
      <router-link
        ref="tag"
        class="tags-view-item"
        :class="isActive(tag) ? 'active' : ''"
        v-for="tag in Array.from(visitedViews)"
        :to="tag.path"
        :key="tag.path"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        ></span>
      </router-link>
    </scroll-pane>
  </div>
</template>

<script>
import ScrollPane from "./ScrollPane";
import { mapActions, mapState } from "vuex";
import elementResizeDetectorMaker from "element-resize-detector";
export default {
  components: { ScrollPane },
  data() {
    return {
      selectedTag: {},
    };
  },
  computed: {
    ...mapState("tagsView", ["visitedViews"]),
  },
  watch: {
    $route() {
      this.addViewTags();
      this.moveToCurrentTag();
    },
  },
  mounted() {
    this.addViewTags();
  },
  methods: {
    ...mapActions("tagsView", [
      "delAllViews",
      "delOthersViews",
      "addVisitedViews",
      "delVisitedViews",
    ]),
    // 监听可视区域宽,浏览器窗口大小改变执行
    listenFun(monitor, dom) {
      let boxWidth = this.$refs.box.offsetWidth,
        tagsWidth = this.$refs.tags.offsetWidth,
        erd = elementResizeDetectorMaker();
      erd.listenTo(monitor, (ele) => {
        this.$nextTick(() => {
          if (
            (dom == "box" && ele.offsetWidth >= tagsWidth) ||
            (dom == "tags" && ele.offsetWidth <= boxWidth)
          ) {
            this.arrowVisible = false;
            this.$refs.box.style.paddingLeft = "16px";
            this.$refs.box.style.paddingRight = "16px";
            this.$refs.box.style.transform = "TranslateX(0px)";
            this.num = 0;
          } else {
            this.arrowVisible = true;
            this.$refs.box.style.paddingLeft = "56px";
            this.$refs.box.style.paddingRight = "56px";
          }
        });
      });
    },
    generateRoute() {
      if (this.$route.meta.title) {
        return this.$route;
      }
      return false;
    },
    isActive(route) {
      return route.path === this.$route.path; // || route.name === this.$route.name
    },
    addViewTags() {
      const route = this.generateRoute();
      if (!route) {
        return false;
      }
      this.addVisitedViews(route);
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag;
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag.$el);
            break;
          }
        }
      });
    },
    closeSelectedTag(view) {
      this.delVisitedViews(view).then((views) => {
        if (this.isActive(view)) {
          const latestView = views.slice(-1)[0];
          if (latestView) {
            this.$router.push(latestView.path);
          } else {
            if (this.generateRoute().path === "/index") {
              this.addViewTags();
            }
            this.$router.push("/");
          }
        }
      });
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag.path);
      this.delOthersViews(this.selectedTag).then(() => {
        this.moveToCurrentTag();
      });
    },
    closeAllTags() {
      this.delAllViews();
      if (this.generateRoute().path === "/index") {
        this.addViewTags();
      }
      this.$router.push("/");
    },
    openMenu(tag, e) {
      this.selectedTag = tag;
      this.$contextmenu({
        items: [
          {
            label:'关闭',
            onClick: () => {
              this.closeSelectedTag(this.selectedTag)
            },
          },
          {
            label:'关闭其它',
            onClick: () => {
              this.closeOthersTags()
            },
          },
          {
            label:'关闭所有',
            onClick: () => {
              this.closeAllTags()
            },
          }
        ],
        event: e,
        zIndex: 3,
      })
      return false
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
