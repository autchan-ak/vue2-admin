<!-- 文件管理 -->
<template>
  <div class="table-page">
    <!-- 搜索 -->
    <div class="queryInfo">
      <el-row :gutter="20">
        <el-col :sm="8" :md="6">
          <el-input
            v-model="queryInfo.params.name"
            size="small"
            placeholder="请输入名称"
          />
        </el-col>
        <el-col :sm="8" :md="6">
          <el-select
            v-model="queryInfo.params.select"
            size="small"
            clearable
            placeholder="文件类型"
          >
            <el-option label="音视频" value="mp4" />
            <el-option label="图片" value="img" />
            <el-option label="文件" value="file" />
          </el-select>
        </el-col>
        <el-col :span="2" :xs="4">
          <el-button
            v-permission="'query'"
            type="primary"
            size="small"
            @click="handleSizeChange()"
            >搜索</el-button
          >
        </el-col>
        <el-col :span="2" :xs="4">
          <el-button size="small" @click="reset_query()">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="main_list">
      <!-- 按钮组 -->
      <div class="button_group flex">
        <el-upload
          v-permission="'add'"
          action
          :multiple="false"
          :http-request="_uploadImg"
          :show-file-list="false"
        >
          <el-button
            v-permission="'add'"
            type="primary"
            icon="el-icon-plus"
            size="small"
            >上传文件</el-button
          >
        </el-upload>
      </div>
      <el-table border size="small" row-key="id" :data="tableData">
        <el-table-column prop="name" label="文件名称" show-overflow-tooltip />
        <el-table-column
          prop="ext"
          label="文件后缀"
          width="100"
          align="center"
        />
        <el-table-column
          prop="size"
          label="文件大小"
          width="100"
          align="center"
        />
        <el-table-column label="预览" align="center" width="320">
          <template v-slot="{ row }">
            <el-image
              v-if="['png', 'jpg', 'gif', 'jpeg', 'jfif'].includes(row.ext)"
              style="width: 50px; height: 50px"
              fit="fill"
              :src="$host+row.url"
              :preview-src-list="[$host+row.url]"
            />

            <audio
              style="width: 300px"
              controls
              v-if="['mp3'].includes(row.ext)"
            >
              <source :src="row.url" />
            </audio>
            <div v-if="['mp4', 'm4a'].includes(row.ext)">
              <el-button size="mini" type="info" plain @click="videoPlay(row)"
                >播放</el-button
              >
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="content" label="备注" show-overflow-tooltip />
        <el-table-column
          prop="username"
          label="上传用户"
          show-overflow-tooltip
        />
        <el-table-column label="上传时间" align="center" show-overflow-tooltip>
          <template v-slot="{ row }">
            {{ row.createdAt | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="100">
          <template v-slot="{ row }">
            <el-button
              v-permission="'download'"
              type="text"
              size="mini"
              @click="download(row)"
              >下载</el-button
            >
            <el-button
              v-permission="'delete'"
              type="text"
              size="mini"
              class="textRed"
              @click="remove(row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <ak-pagination
        :total="total"
        :page-size="queryInfo.limit"
        :current-page="queryInfo.offset"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog
      top="5vh"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <div class="video-css">
        <video-js v-if="dialogVisible" :options="dialogData" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { showLoading, confirm } from "@/utils";
import { downloadByBlob } from "@/utils/BaseUtil";
export default {
  data() {
    return {
      total: 0,
      queryInfo: {
        params: {},
        limit: 10,
        offset: 1,
        sort: { prop: "createdAt", order: "desc" },
      },
      tableData: [],
      dialogData: {},
      dialogVisible: false,
    };
  },
  mounted() {
    this.seach_query();
  },

  methods: {
    ...mapActions("resources", ["fileUpload"]),
    ...mapActions("system", ["fileList", "flieRome", "fileDownload"]),
    // 搜索
    async seach_query() {
      showLoading("加载中");
      let res = await this.fileList({
        ...this.queryInfo,
      });
      this.tableData = res.data;
      this.total = res.count;
    },
    // 上传文件
    async _uploadImg({ file, onError, onSuccess }) {
      // 可以判断图片大小限定
      await this.fileUpload({ file });
      this.seach_query();
    },
    // 删除
    remove(row) {
      confirm("确认删除", "提示", {
        ok: async () => {
          showLoading("正在删除");
          await this.flieRome({ id: row.id, name: row.name });
          this.seach_query();
        },
      });
    },
    // 下载
    async download(row) {
      let data = await this.fileDownload(row.id);
      // 下载文件
      downloadByBlob(data, { filename: row.name });
    },
    // 音视频播放
    videoPlay(row) {
      this.dialogData = { ...row };
      this.dialogVisible = true;
    },
    show_file(url) {
      this.fileUrl = url;
      this.showFile = true;
    },

    handleClose() {
      this.dialogVisible = false;
    },

    selectionChange(val) {
      this.check = [...val];
    },

    reset_query() {
      this.queryInfo = {
        params: {},
        limit: 10,
        offset: 1,
        sort: { prop: "createdAt", order: "desc" },
      };
    },
    dialogClose() {
      this.dialog.show = false;
      this.addFormData = {};
      this.$refs["addFormData"].resetFields();
      this.seach_query();
    },
    handleSizeChange(v) {
      this.queryInfo.limit = v || this.queryInfo.limit;
      this.queryInfo.offset = 1;
      this.seach_query();
    },
    handleCurrentChange(v) {
      this.queryInfo.offset = v;
      this.seach_query();
    },
  },
};
</script>
