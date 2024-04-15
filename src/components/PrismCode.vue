<!-- 美化代码 -->
<template>
  <div class="prismCode" :class="{ full: full }">
    <p class="more" @click="showDetailed">
      <span class="text" v-if="!full">详 情</span>
      <span class="text" v-else>关 闭</span>
      <el-button
        class="text"
        type="text"
        @click.stop="_copy(code.code)"
        v-if="full"
        >复 制</el-button
      >
    </p>
    <prism-editor
      class="prism-editor"
      :code="code.code"
      :lineNumbers="code.lineNumbers"
      :readonly="code.readonly"
      @change="codeChanged"
      :language="code.language"
    ></prism-editor>
  </div>
</template>

<script>
import { showMessage } from "@/utils";
import PrismEditor from "vue-prism-editor";
import "vue-prism-editor/dist/VuePrismEditor.css";
//引入prismjs相关的包
import "prismjs";
//自己喜欢的主题
import "prismjs/themes/prism-okaidia.css";
import { copyTextToClipboard } from "../utils/BaseUtil";

export default {
  name: "prismCode",
  props: {
    code: {
      type: Object,
      default: () => {
        return {
          language: "js",
          readonly: true,
          lineNumbers: true,
          code: "",
          detailed: false,
        };
      },
    },
  },
  data() {
    return {
      full: false,
    };
  },
  watch: {
    "code.detailed": {
      deep: true,
      handler(newValue, oldValue) {
        this.full = newValue;
      },
    },
  },
  components: {
    PrismEditor,
  },
  mounted() {
    this.full = this.code.detailed;
  },
  methods: {
    codeChanged(code) {
      this.$emit("change", code);
    },

    showDetailed() {
      this.full = !this.full;
      if(!this.full){
        this.$emit("close");
      }
    },
    _copy(value) {
      copyTextToClipboard(value, true, () => {
        showMessage("复制成功");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.prismCode {
  border-radius: 10px;
  overflow: hidden;
  overflow-x: auto;
  min-width: 300px;
  background-color: #272822;
  position: relative;
  max-width: 50%;
  max-height: 200px;
  &.full {
    position: fixed;
    min-width: 100vw !important;
    min-height: 100vh !important;
    top: 0;
    left: 0;
    border-radius: 0px;
    z-index: 600;
    .prism-editor{
      height: calc(100vh - 35px);
    }
  }
  .more {
    cursor: pointer;
    height: 35px;
    font-size: 14px;
    background: #3d3d3e;
    color: #fff;
    display: flex;
    justify-content: flex-end;
    padding: 0 15px;
    align-items: center;
    margin: 0;
    &::before {
      position: absolute;
      left: 12px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #fc625d;
      box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
      content: " ";
    }
    .text {
      display: none;
      margin-left: 20px;
    }
    &:hover {
      .text {
        display: block;
      }
    }
  }
  ::v-deep .prism-editor {
    height: 100%;
    box-sizing: border-box;
    padding: 15px 0;
    background: #272822;
    .prism-editor__line-numbers {
      padding: 0 !important;
    }
    pre {
      padding: 0 15px !important;
      box-sizing: content-box;
      &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
        cursor: pointer !important;
        background-color: #272822;
        &-thumb {
          background-color: #41413f;
          background-color: rgb(114, 112, 112);
        }
      }
    }
    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
      cursor: pointer !important;
      background-color: #272822;
      &-thumb {
        background-color: #41413f;
        background-color: rgb(114, 112, 112);
        cursor: pointer !important;
      }
    }
  }
}
</style>
