<!-- 销售数据统计 -->
<template>
  <!-- 小屏两个   中屏三个    大屏4个 -->
  <el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="6" style="margin-bottom: 20px">
    <div class="cards-list" :style="{ borderColor: bj }">
      <div class="cards-list-name">{{title}}</div>
      <div class="cards-list-main" :style="{background:bj}">
        <svg-icon :icon="img" class="icon-svg"/>
        <count-to :startVal="0" :endVal="number" :duration="3000"></count-to>
      </div>
    </div>
  </el-col>
</template>

<script>
import countTo from "vue-count-to";
export default {
  name: "Statistics",
  components: {
    countTo,
  },
  props: {
    number: {
      type: Number,
      default: 2022,
    },
    title: {
      type: String,
      required: true, //   属性的值必须有
    },
    bj: {
      type: String,
      default: "#0badf9",
    },
    img: {
      type: String,
      default:''
    },
  },
};
</script>

<style lang="scss" scoped>
.cards-list {
  border: 1px solid;
  border-radius: 5px;
  &-name{
      text-align: center;
      line-height: 3;
  }
  &-main{
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    color: #fff;
    font-size: 30px;
  }
  .icon-svg{
    height: 55%;
    width: auto;
    color: #ffffff;
    fill: currentColor; 
  }
}
</style>
