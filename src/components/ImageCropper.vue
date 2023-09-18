<!-- 裁剪图片 -->
<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="closeDialog"
    append-to-body
    width="600px"
  >
    <div class="avatar-container">
      <!-- 待上传图片 -->
      <div v-show="!options.img">
        <el-upload
          class="upload"
          ref="upload"
          action=""
          :on-change="upload"
          accept="image/png, image/jpeg, image/jpg"
          :show-file-list="false"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary" ref="uploadBtn">
            选择图片
          </el-button>
        </el-upload>
        <div>支持jpg、png格式的图片，大小不超过5M</div>
      </div>
      <!-- 已上传图片 -->
      <div v-show="options.img" class="avatar-crop">
        <vueCropper
          v-if="dialogVisible"
          class="crop-box"
          ref="cropper"
          :outputType="options.type"
          :img="options.img"
          :autoCrop="options.autoCrop"
          :fixedBox="options.fixedBox"
          :canMoveBox="options.canMoveBox"
          :autoCropWidth="options.autoCropWidth"
          :autoCropHeight="options.autoCropHeight"
          :centerBox="options.centerBox"
          :fixed="options.fixed"
          :fixedNumber="options.fixedNumber"
          :canMove="options.canMove"
          :canScale="options.canScale"
        ></vueCropper>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <div class="reupload" @click="reupload">
        <span v-show="options.img">重新上传</span>
      </div>
      <div>
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="getCrop">确 定</el-button>
      </div>
    </span>
  </el-dialog>
</template>

<script>
import { VueCropper } from "vue-cropper";
import { showError } from "@/utils";
export default {
  components: {
    VueCropper,
  },
  name: "ImageCropper",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      debugger: "裁剪图片",
    },
  },
  data() {
    return {
      // vueCropper组件 裁剪配置信息
      options: {
        img: "", // 原图文件
        type: "png",
        autoCrop: true, // 默认生成截图框
        fixedBox: false, // 固定截图框大小
        canMoveBox: true, // 截图框可以拖动
        autoCropWidth: 200, // 截图框宽度
        autoCropHeight: 200, // 截图框高度
        fixed: true, // 截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        centerBox: true, // 截图框被限制在图片里面
        canMove: true, // 上传图片不允许拖动
        canScale: true, // 上传图片不允许滚轮缩放
      },
    };
  },

  methods: {
    // 读取原图
    upload(file) {
      const isIMAGE =
        file.raw.type === "image/jpeg" || file.raw.type === "image/png";
      const isLt5M = file.raw.size / 1024 / 1024 < 5;
      if (!isIMAGE) return showError("请选择 jpg、png 格式的图片");
      if (!isLt5M) return showError("图片大小不能超过 5MB");
      let reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = (e) => {
        this.options.img = e.target.result; // base64
      };
    },
    // 获取截图信息
    getCrop() {
      // 获取截图的 base64 数据
      this.$refs.cropper.getCropData((base64) => {
        // 获取截图的 blob 数据
        this.$refs.cropper.getCropBlob((data) => {
          this.$emit("close", data, base64);
        });
      });
    },
    // 重新上传
    reupload() {
      this.$refs.uploadBtn.$el.click();
    },
    // 关闭弹框
    closeDialog() {
      this.$emit("close", null);
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  .reupload {
    color: #409eff;
    cursor: pointer;
  }
}
.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 560px;
  height: 400px;
  background-color: #f0f2f5;
  margin-right: 10px;
  border-radius: 4px;
  .upload {
    text-align: center;
    margin-bottom: 24px;
  }
  .avatar-crop {
    width: 560px;
    height: 400px;
    position: relative;
    .crop-box {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      overflow: hidden;
    }
  }
}
</style>
