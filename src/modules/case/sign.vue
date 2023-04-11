<!-- 电子签名 -->
<template>
  <div class="sign">
    <div class="sign-canvas">
      <vue-esign
        ref="esign"
        class="esign"
        :isCrop="isCrop"
        :lineWidth="lineWidth"
        :lineColor="lineColor"
      />
    </div>
    <div class="sign-btn">
      <el-button @click="emptySing" type="danger">清空</el-button>
      <el-button @click="okSign" type="success">确定</el-button>
      <el-button @click="viewSign" type="primary">查看签名</el-button>
    </div>
    <img class="img" :src="resultImg" v-if="imgShow" />
  </div>
</template>

<script>
import vueEsign from "vue-esign";
import { showError } from "@/utils";
export default {
  name: "sign",
  components: {
    vueEsign,
  },
  data() {
    return {
      title: "手写签名",
      lineWidth: 5,
      lineColor: "#303133",
      resultImg: "",
      isCrop: false,
      imgShow: false,
    };
  },
  mounted() {},

  methods: {
    emptySing() {
      this.imgShow = false;
      this.$refs.esign.reset();
    },
    okSign() {
      this.$refs.esign
        .generate()
        .then((res) => {
          this.resultImg = res;
        })
        .catch(() => {
          showError('您还没有签名')
        });
    },
    viewSign() {
      this.okSign();
      this.imgShow = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.sign {
  width: 100%;
  height: 100%;
  &-canvas {
    width: 100%;
    .esign {
      margin: 0 auto;
      background: #efefef !important;
    }
  }
  &-btn {
    text-align: center;
    margin-top: 20px;
  }
}
.img {
  width: 100%;
}
</style>
