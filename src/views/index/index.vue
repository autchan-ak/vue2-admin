<template>
  <div class="index">
    <!-- 头部 -->
    <div class="index-head">
      <el-row>
        <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="16">
          <div class="index-head-left">
            <el-avatar
              class="index-head-left-avatar"
              :src="$host + userInfo.avatar"
            ></el-avatar>
            <div class="index-head-left-text">
              <div>
                <span>{{ getTimeState }}</span>
                <span>{{ userInfo.nickName }}，</span>
                <span>{{ welcome }}</span>
              </div>
              <iframe
                id="tianqi"
                src="http://i.tianqi.com/?c=code&id=1"
                width="375"
                height="30"
                frameborder="0"
              />
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="10" :lg="8" :xl="8">
          <div class="index-head-centent-right">
            <div class="index-head-centent-right-list">
              <div class="index-head-centent-right-list-icon">
                <svg-icon
                  icon="daiban"
                  style="color: #fd7f07; background: #fbeee1"
                  class="index-head-centent-right-list-icon-is"
                />
                代办事项
              </div>
              <div class="index-head-centent-right-list-text">
                3 &nbsp;&nbsp;/&nbsp;&nbsp; 26
              </div>
            </div>
            <div class="index-head-centent-right-list">
              <div class="index-head-centent-right-list-icon">
                <svg-icon
                  icon="github"
                  style="color: #2294fc; background: #ddedfd"
                  class="index-head-centent-right-list-icon-is"
                />
                开源项目
              </div>
              <div class="index-head-centent-right-list-text">7</div>
            </div>
            <div class="index-head-centent-right-list">
              <div class="index-head-centent-right-list-icon">
                <svg-icon
                  icon="daiban"
                  class="index-head-centent-right-list-icon-is"
                />
                代办事项
              </div>
              <div class="index-head-centent-right-list-text">
                3 &nbsp;&nbsp;/&nbsp;&nbsp; 26
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 图标 -->
    <div class="index-centent">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
          <!-- 项目 -->
          <div class="grid-content">
            <div class="index-centent-title">
              <div class="index-centent-title-left">
                <svg-icon icon="sort" class="index-centent-title-left-icon" />
                我的项目
              </div>
              <div class="index-centent-title-right">全部项目</div>
            </div>
            <div class="index-centent-box">
              <project-box />
            </div>
          </div>
          <!-- 动态 -->
          <div class="grid-content">
            <div class="index-centent-title">
              <div class="index-centent-title-left">
                <svg-icon
                  icon="dynamic"
                  class="index-centent-title-left-icontwo"
                />
                动态
              </div>
              <div class="index-centent-title-right">全部动态</div>
            </div>
            <div class="index-centent-box">
              <dynamic-box />
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
          <div class="grid-content">
            <div class="index-centent-title">
              <div class="index-centent-title-left">
                <svg-icon
                  icon="operating"
                  class="index-centent-title-left-iconthree"
                />
                快捷操作
              </div>
              <div class="index-centent-title-right">
                <!-- 全部动态 -->
              </div>
            </div>
            <div class="index-centent-box">
              <FastBox />
            </div>
          </div>
          <div class="grid-content">
            <div class="index-centent-title">
              <div class="index-centent-title-left">
                <svg-icon
                  icon="group"
                  class="index-centent-title-left-iconfour"
                />
                部门成员 (6)
              </div>
              <div class="index-centent-title-right">
                <!-- 全部动态 -->
              </div>
            </div>
            <div class="index-centent-box">
              <ColleagueBox />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import DynamicBox from "./component/dynamicBox";
import ProjectBox from "./component/project";
import FastBox from "./component/fast";
import ColleagueBox from "./component/colleague";
export default {
  data() {
    return {
      welcome: "祝您新的一天工作愉快",
    };
  },
  components: {
    ColleagueBox,
    FastBox,
    ProjectBox,
    DynamicBox,
  },
  computed: {
    ...mapState("user", ["userInfo"]),
    ...mapState("theme", ["greetings", "PC"]),
    getTimeState() {
      // 获取当前时间
      let timeNow = new Date();
      // 获取当前小时
      let hours = timeNow.getHours();
      // 设置默认文字
      let state = ``;
      // 随机下标
      let index = Math.floor(Math.random() * 6);
      // 判断当前时间段
      if (hours >= 0 && hours <= 10) {
        state = `早上好!`;
        this.welcome = this.greetings[0][index];
      } else if (hours > 10 && hours <= 14) {
        state = `中午好!`;
        this.welcome = this.greetings[1][index];
      } else if (hours > 14 && hours <= 18) {
        state = `下午好!`;
        this.welcome = this.greetings[2][index];
      } else if (hours > 18 && hours <= 24) {
        state = `晚上好!`;
        this.welcome = this.greetings[3][index];
      }
      return state;
    },
  },
};
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  min-height: 100%;
  &-head {
    padding: 5px 15px;
    box-sizing: border-box;
    border-bottom: 1px solid #dcdfe6;
    background: rgba(255, 255, 255, 0.7);
    &-left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      &-avatar {
        width: 70px;
        height: 70px;
        margin-right: 10px;
      }
      &-text {
        color: #606266;
        > div:first-child {
          font-weight: 600;
          font-size: 20px;
          color: #292929;
          padding: 0;
          letter-spacing: 0.1em;
          margin: 0;
          margin-bottom: 7px;
          span {
            margin-right: 3px;
          }
        }
      }
    }
  }
}
.index-head-centent-left {
  width: 100%;
  height: 70px;
  display: flex;
}
.index-head-centent-left-text {
  height: 56px;
}
.index-head-centent-left-text p:nth-child(1) {
  font-size: 20px;
  color: #292929;
  letter-spacing: 0.1em;
}
.index-head-centent-left-text p:nth-child(2) {
  font-size: 12px;
  color: #999999;
  letter-spacing: 0.1em;
}
.index-head-centent-right {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.index-head-centent-right-list {
  height: 56px;
  cursor: pointer;
}
.index-head-centent-right-list-icon {
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  color: #808695;
}
.index-head-centent-right-list-icon-is {
  width: 14px;
  height: 14px;
  fill: currentColor;
  margin-right: 5px;
  padding: 5px;
  border-radius: 12px;
}

.index-head-centent-right-list-text {
  height: 28px;
  line-height: 28px;
  font-weight: bold;
  text-align: center;
  font-size: 20px;
}
.index-centent {
  width: 100%;
  min-height: 100%;
  padding: 25px;
  box-sizing: border-box;
}

.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  background: #ffffff;
  width: 100%;
  margin-bottom: 25px;
}
.index-centent-title {
  width: 100%;
  height: 52px;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 15px;
  box-sizing: border-box;
  justify-content: space-between;
  font-size: 14px;
}
.index-centent-title-left {
  display: flex;
  justify-content: flex-start;
  font-size: 14px;
  /* border-radius: 11px;
    overflow: hidden; */
}
.index-centent-title-left-icon {
  width: 12px;
  height: 12px;
  font-size: 12px;
  color: #1890ff;
  padding: 5px;
  background: #e6f3fe;
  /* border-radius: 11px; */
  fill: currentColor;
  margin-right: 10px;
}
.index-centent-title-left-icontwo {
  width: 12px;
  height: 12px;
  font-size: 12px;
  color: #f371fa;
  padding: 5px;
  background: #fdf4fd;
  /* border-radius: 11px; */
  fill: currentColor;
  margin-right: 10px;
}
.index-centent-title-left-iconthree {
  width: 12px;
  height: 12px;
  font-size: 12px;
  color: #fc1d1d;
  padding: 5px;
  background: #fdf4fd;
  /* border-radius: 11px; */
  fill: currentColor;
  margin-right: 10px;
}
.index-centent-title-left-iconfour {
  width: 12px;
  height: 12px;
  font-size: 12px;
  color: #18b2fa;
  padding: 5px;
  background: #fdf4fd;
  /* border-radius: 11px; */
  fill: currentColor;
  margin-right: 10px;
}
.index-centent-title-right {
  color: #3ca0fd;
  cursor: pointer;
}
.index-centent-box {
  width: 100%;
  padding: 15px 15px 0;
  box-sizing: border-box;
}
@media screen and (max-width: 750px) {
  .index {
    &-head {
      &-left-avatar {
        display: none;
      }
    }
    &-centent {
      padding: 8px;
    }
  }
}
</style>
