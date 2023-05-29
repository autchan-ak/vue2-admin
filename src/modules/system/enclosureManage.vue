<!-- 系统资源 -->
<template>
  <el-tabs v-model="activeName" type="border-card">
    <el-tab-pane label="图片" name="image" />
    <el-tab-pane label="音视频" name="video" />
    <el-tab-pane label="附件" name="file" />
    <el-tab-pane label="聊天" name="chat" />
    <el-row :gutter="20">
      <el-col :sm="8" :md="6" :lg="6">
        <el-input
          v-model="name"
          size="small"
          placeholder="请输入搜索名称"
        ></el-input>
      </el-col>
      <el-col :sm="8">
        <el-button type="primary" size="small" @click="list()">搜索</el-button>
        <el-button size="small" @click="reset_list()">重置</el-button>
        <el-upload
          action
          :disabled="activeName=='chat'"
          :multiple="false"
          :http-request="_uploadImg"
          :show-file-list="false"
          style="float: right"
        >
          <el-button :disabled="activeName=='chat'" size="small" type="warning" plain>单个上传</el-button>
        </el-upload>
      </el-col>
    </el-row>
    <el-table ref="tabData" :data="data" row-key="id" tooltip-effect="dark">
      <el-table-column prop="fileName" show-overflow-tooltip label="资源名称">
        <template v-slot="{ row }">
          <span v-if="['20','200'].includes(row.module)" class="is-active" @click="showDialog(row)">{{
            row.fileName
          }}</span>
          <span v-else>{{ row.fileName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="新名称" />
      <el-table-column v-if="activeName == 'image'" label="预览" prop="size">
        <template v-slot="{ row }">
          <el-image
            style="width: 40px; height: 40px"
            fit="fill"
            :src=" row.url"
            :preview-src-list="[row.url]"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="大小" prop="size">
        <template v-slot="{ row }">
          {{ isLt(row.size) }}
        </template>
      </el-table-column>
      <el-table-column label="上传用户" prop="user" />
      <el-table-column label="上传时间" prop="createTime">
        <template v-slot="{ row }">
          {{ row.createTime | dateFormat }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button
            type="text"
            size="mini"
            class="textRed"
            @click="remove(row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      hide-on-single-page
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30]"
      :page-size="limit"
      layout="sizes, prev, pager, next,total"
      :total="total"
    />
    <el-dialog
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
     <video-js v-if="dialogVisible" :options="dialogData" class="video-css"/>
    </el-dialog>
  </el-tabs>
</template>

<script>
import { mapActions } from "vuex";
import { showLoading, confirm, showError } from "@/utils";
export default {
  components: {},
  data() {
    return {
      data: [],
      activeName: "image",
      module: "10",
      page: 1,
      limit: 10,
      total: 0,
      name: "",
      dialogData:{},
      dialogVisible:false,
    };
  },
  computed: {},
  watch: {
    activeName(v) {
      this.data = [];
      this.page = 1;
      switch (v) {
        case "image":
          this.module = "10";
          break;
        case "video":
          this.module = "20";
          break;
        case "file":
          this.module = "30";
          break;
        default:
          this.module = "";
          break;
      }
      this.list();
    },
  },
  created() {},
  mounted() {
    this.list();
  },

  methods: {
    ...mapActions("resources", ["uploadFlie"]),
    ...mapActions("system", ["getFileList", "flieRome"]),

    async list() {
      showLoading(true);
      let res = await this.getFileList({
        module: this.module,
        page: this.page,
        limit: this.limit,
        name: this.name,
      });
      this.data = res.data;
      this.total = res.count;
    },
    showDialog(row) {
      this.dialogData = {...row}
      this.dialogVisible = true
    },
    // 上传头像
    async _uploadImg({ file, onError, onSuccess }) {
      // 可以判断图片大小限定
      await this.uploadFlie({ file, type: this.module, renam: true });
      this.list();
    },
    // 删除
    remove(id) {
      confirm("确认删除？", "提示", {
        ok: async () => {
          showLoading("正在删除");
          await this.flieRome({ id });
          this.list();
        },
      });
    },
    isLt(v) {
      if (v / 1024 < 1024) {
        return (v / 1024).toFixed(2) + "KB";
      } else if (v / 1024 / 1024 < 1024) {
        return (v / 1024 / 1024).toFixed(2) + "MB";
      } else if (v / 1024 / 1024 / 1024 < 1024) {
        return (v / 1024 / 1024 / 1024).toFixed(2) + "GB";
      }
    },
    handleClose(){
      this.dialogVisible = false
    },
    handleSizeChange(v) {
      this.limit = v;
      this.list();
    },
    handleCurrentChange(v) {
      this.page = v;
      this.list();
    },
    reset_list() {
      this.name = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.is-active{
  color: #508afe;
  cursor: pointer;
}
 .video-css{
::v-deep  .video-js{
    height: 60vh !important;
    width: 100% !important;
    padding: 0 !important;
    video{
      height: 60vh !important;
    }
  }
}
</style>
