<template>
  <div class="drop" @click="dropClick">
    <div class="drop-left" :style="{ background: iconBgColor }">
      <svg-icon :icon="type" :style="{ color: iconColor }" />
    </div>
    <div class="drop-right">
      <p>{{ text }}</p>
      <p>{{ time | dateFormat }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "system",
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return (
          [
            "system",
            "email",
            "friend",
            "approval",
            "refuse",
            "favorite", 
          ].indexOf(value) !== -1
        );
      },
    },
    text: {
      type: String,
      default: "system",
      required: true,
    },
    id:Number,
    time: {
      type: String,
      required: true,
    },
    iconColor: {
      type: String,
      default: "#fff",
      validator: function (value) {
        let colorHtml = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/;
        let colorRgba =
          /^[rR][gG][Bb][Aa]?[\(]((2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),){2}(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),?(0\.\d{1,2}|1|0)?[\)]{1}$/;
        // 必须匹配一个颜色的正则
        if (colorHtml.test(value)) {
          return true;
        }
        if (colorRgba.test(value)) {
          return true;
        }
        return false;
      },
    },
    iconBgColor: {
      type: String,
      default: "#ccc",
      validator: function (value) {
        let colorHtml = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/;
        let colorRgba =
          /^[rR][gG][Bb][Aa]?[\(]((2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),){2}(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),?(0\.\d{1,2}|1|0)?[\)]{1}$/;
        // 必须匹配一个颜色的正则
        if (colorHtml.test(value)) {
          return true;
        }
        if (colorRgba.test(value)) {
          return true;
        }
        return false;
      },
    },
  },
  methods: {
    dropClick() {
      this.$router.push('/home/Informationall?type=notice&id='+this.id)
    },
  },
};
</script>

<style scoped>
.drop {
  width: 300px;
  min-height: 65px !important;
  max-height: 87px !important;
  border-bottom: 1px solid #dcdfe6;
  padding: 12px 24px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.drop:hover {
  background: #e2effd;
}
.drop:hover .drop-left-icon {
  transform: rotate(360deg);
  opacity: 1;
}
.drop-left {
  width: 32px;
  height: 32px;
  background: burlywood;
  border-radius: 16px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.drop-left-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
  opacity: 0.9;
  transition: all 0.5s;
}
.drop-right {
  flex: 1;
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
}
.drop-right p {
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
}
.drop-right p:nth-child(1) {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #515a6e;
  margin-bottom: 5px;
  max-height: 44px;
  min-height: 22px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.drop-right p:nth-child(2) {
  font-size: 12px;
  color: #808695;
}
</style>
