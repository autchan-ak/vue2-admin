<!-- 顶部通知-->
<template>
  <el-tabs class="dropdowns" v-model="activeName" :stretch="true">
    <el-tab-pane
      class="dropdowns-dropBox"
      v-for="(item, i) in dataList"
      :key="i"
      :label="item.title"
      :name="i"
    >
      <div class="dropdowns-list-box">
        <template v-if="i === 'notice'">
          <!-- 通知 -->
          <Drop
            v-for="list in item.list"
            :key="list.id"
            :type="list.type"
            :text="list.title"
            :time="list.createTime"
            :id="list.id"
          />
          <!-- <Drop
          type="email"
          iconColor="#ffffff"
          iconBgColor="#3593FE"
          text="您有一封新邮件,注意查收"
          time="04-01 12:20"
          style="background: #affcdd"
        /> -->
        </template>
        <template v-if="i === 'news'">
          <!-- 消息 -->
          <NewsBox v-for="list in item.list" :key="list.uid" :msg="list" />
        </template>
        <template v-if="i === 'agency'">
          <!-- 代办 -->
          <Matter
            v-for="list in item.list"
            :key="list.id"
            type="danger"
            text="小明给你发了一条消息"
            time="需要在下午五点前完成"
          />
        </template>
      </div>
      <div class="dropdowns-foots" v-if="item.list.length" @click="empty">
        <i class="el-icon-delete" /><span>清空通知</span>
      </div>
      <Empy v-else :type="item.icon" :text="`你还没有新的${item.title}`" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
// 通知 每一栏
import Drop from "./drop";
// 消息 每一栏
import NewsBox from "./newsBox";
// 代办 每一栏
import Matter from "./matter";

// 空
import Empy from "./empy";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      activeName: "notice",
    };
  },
  watch: {},
  components: {
    Drop,
    NewsBox,
    Empy,
    Matter,
  },
  computed: {
    ...mapState("notification", ["dataList"]),
  },
  mounted() {
    this.getNotification();
  },
  methods: {
    ...mapActions("notification", ["getNotification", "setDataListRome"]),
    // handleClick(tab, event) {
    //   console.log(tab, event);
    // },
    empty() {
      this.setDataListRome({ name: this.activeName });
    },
    label(v) {
      if (v === "notice") return "通知";
      if (v === "agency") return "代办";
      if (v === "news") return "消息";
    },
  },
};
</script>

<style  lang="scss" scoped>
.dropdowns {
  width: 300px;
  height: auto;
  position: absolute;
  right: 0;
  top: 60px;
  z-index: 2;
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}
.el-tabs__nav-scroll {
  display: flex;
  justify-content: center;
}
.el-tabs__nav {
  /* width: 320px!important; */
  display: flex !important;
  justify-content: center !important;
}
.el-tabs__header {
  margin-bottom: 0 !important;
}
.dropdowns-dropBox {
  width: 100%;
  min-height: 250px;
  max-height: 400px;
  overflow: hidden;
  position: relative;
}
.dropdowns-list-box {
  max-height: 400px;
  overflow-x: hidden;
  overflow-y: auto;
  -ms-overflow-style: none;
  overflow: "-moz-scrollbars-none";
  scrollbar-width: none; /*  火狐   */
  position: relative;
  padding-bottom: 40px;
  box-sizing: border-box;
}
.dropdowns-list-box::-webkit-scrollbar {
  display: none; /*  Chrome  */
  width: 0 !important ; /*  Chrome  */
}
.dropdowns-list-box .drop:nth-last-child(1) {
  border-bottom: transparent;
}
.dropdowns-dropBox-scroll {
  width: 300px;
  /* height: 328px; */
}
.happy-scroll-container {
  width: 300px !important;
}
.happy-scroll-container .happy-scroll-content {
  /* padding-bottom: 38px !important; */
  box-sizing: border-box !important;
  width: 300px !important;
}
.happy-scroll-container {
  height: 290px !important;
}
.dropdowns-more {
  width: 100%;
  height: 30px;
  color: #2d8cf0;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
}
.dropdowns-foots {
  width: 100%;
  line-height: 38px;
  background: #f7f7f7;
  text-align: center;
  font-size: 14px;
  color: #515a6e;
  border-top: 1px solid #dcdfe6;
  position: absolute;
  bottom: 0px;
  left: 0;
  span {
    margin-left: 5px;
  }
  &:hover {
    background: #e8f6fd;
  }
}
</style>