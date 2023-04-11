<!-- 附件预览 -->
<template>
  <div class="FileView">
    <!-- 显示 PDF 预览 -->
    <div class="FileView-simple" @click="show">
      <div>{{ filename }}</div>
      <svg-icon icon="el-icon-paperclip" style="font-size: 40px; color: #ccc" />
    </div>
    <div v-if="isShow" class="FileView-max">
      <div class="close">
        <span></span>
        <span>{{ filename }}</span>
        <span @click="show" class="icon"
          ><svg-icon
            icon="el-icon-circle-close"
            style="font-size: 40px; color: #f56c6c"
        /></span>
      </div>
      <!-- pdf、txt... -->
      <div v-if="isPdf">
        <object
          :data="fileUrl"
          type="application/pdf"
          width="100%"
          :height="height"
        >
          <embed :src="fileUrl" type="application/pdf" />
        </object>
      </div>
      <!-- 显示 Word 预览 -->
      <div v-if="isWord">
        <div :id="'wordView_' + filename" v-html="vHtml" />
        <!-- <a :href="fileUrl" target="_blank">打开 Word 文档</a> -->
        <!-- <iframe
        :src="`https://view.officeapps.live.com/op/view.aspx?src=${fileUrl}`"
        width="100%"
        height="600px"
      ></iframe> -->
      </div>
    </div>
  </div>
</template>

<script>
import mammoth from "mammoth";
export default {
  name: "FileView",
  components: {},
  props: {
    fileUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isShow: false,
      vHtml: "",
    };
  },
  watch: {},
  created() {},
  mounted() {},

  computed: {
    height() {
      return document.body.clientHeight - 55;
    },
    filename() {
      // 文件名
      return this.fileUrl.replace(/^.*[\\/]/, "");
    },
    isPdf() {
      // 判断文件类型为 PDF
      return this.getFileType() === "application/pdf";
    },
    isWord() {
      // 判断文件类型为 Word
      return this.getFileType().includes("msword");
    },
  },
  methods: {
    show() {
      this.isShow = !this.isShow;
      if(this.isShow&&this.isWord){
        this.readExcelFromRemoteFile(this.fileUrl);
      }
    },
    getFileType() {
      // 获取文件类型
      const type = this.fileUrl.split(".").pop();
      if (
        [
          "pdf",
          "txt",
          "html",
          "java",
          "js",
          "json",
          "log",
          "md",
          "css",
        ].includes(type)
      ) {
        return `application/pdf`;
      } else if (["doc", "docx"].includes(type)) {
        return `application/msword`;
      }
    },
    readExcelFromRemoteFile(url) {
        console.log("word______________--");
      let that = this,
        xhr = new XMLHttpRequest();
      xhr.open("get", url, true);
      xhr.responseType = "arraybuffer";
      xhr.onload = function () {
        if (xhr.status == 200) {
          mammoth
            .convertToHtml({ arrayBuffer: new Uint8Array(xhr.response) })
            .then(function (resultObject) {
              that.$nextTick(() => {
                // document.querySelector("#wordView").innerHTML =
                //   resultObject.value;
                that.vHtml = resultObject.value;
              });
            });
        }
      };
      xhr.send();
    },
  },
};
</script>

<style lang="scss" scoped>
.FileView {
  &-simple {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    width: 250px;
    background: #fff;
    padding: 12px 18px;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    color: #7c7c7c;
    font-size: 14px;
    align-items: center;
    user-select: none;
  }
  &-max {
    background: #f5f5f5;
    z-index: 600;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    .close {
      height: 50px;
      display: flex;
      align-items: center;
      background-color: #dad9d8;
      justify-content: center;
      > span {
        flex: 1;
        text-align: center;
      }
      .icon {
        cursor: pointer;
        text-align: right;
      }
    }
  }
}
</style>
