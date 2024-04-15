<template>
  <section style="width: 100%; height: 100%">
    <v-md-editor
      v-model="content"
      :height="height + 'px'"
      :mode="mode"
      :placeholder="placeholder"
      :left-toolbar="toolbar.leftToolbar"
      :right-toolbar="toolbar.rightToolbar"
      :disabled-menus="toolbar.disabledMenus"
      @save="_save"
      @change="handleChange"
      @image-click="handleClickImage"
      @upload-image="handleUploadImage"
      @copy-code-success="handleCopyCodeSuccess"
    ></v-md-editor>
  </section>
</template>

<script>
/**
 * @dec: markdown 编辑器
 * @url: https://ckang1229.gitee.io/vue-markdown-editor/zh/#%E4%BB%8B%E7%BB%8D
 */
import toolbar from "./toolbar";
import "./plugins";
import { mapActions } from "vuex";
import { showLoading, showMessage, showError } from "@/utils";
import { copyTextToClipboard } from "@/utils/BaseUtil";
export default {
  name: "MdEditor",
  props: {
    height: {
      type: [Number, String],
      default() {
        return 500;
      },
    },
    placeholder: {
      type: String,
      default() {
        return "请输入内容";
      },
    },
    mode: {
      type: String,
      default() {
        //可选值：edit(纯编辑模式) editable(编辑与预览模式) preview(纯预览模式)。
        return "editable";
      },
    },
    mdContent: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      toolbar,
      content: "",
    };
  },
  watch: {
    mdContent: {
      immediate: true,
      handler: function (val) {
        this.content = val;
      },
    },
  },
  created() {},
  model: {
    prop: "mdContent",
    event: "getValue",
  },
  methods: {
    ...mapActions("resources", ["fileUpload"]),
    handleCopyCodeSuccess(code) {
      copyTextToClipboard(code, true, () => {
        showMessage("复制成功");
      });
    },
    handleUploadImage(event, insertImage, files) {
      // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
      console.log("files===", files);
      let file = files[0];
      // 这里可以对图片进行处理
      const isLt5M = file.raw.size / 1024 / 1024 < 5;
      if (!isLt5M) return showError("图片大小不能超过 5MB");
      // 添加请求头
      showLoading("上传中。。。");
      this.fileUpload({ file }).then((response) => {
        console.log("response===", response);
        insertImage({
          url: response.data.url,
          desc: file.name,
          // width: 'auto',
          // height: 'auto',
        });
      });
    },
    _save(e) {
      showMessage("点击了保存！保存内容已输出到控制台！！");
      console.log(`%c 点击了保存 内容为:`, "color:red", `\n${e}`);
    },
    handleClickImage(images, currentIndex) {
      window.open(images[currentIndex]);
    },
    handleChange(val) {
      this.$emit("getValue", val);
    },
  },
};
</script>
