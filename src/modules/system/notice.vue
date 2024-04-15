<!-- 公告 -->
<template>
  <div class="table-page">
    <div class="main_list">
      <!-- 搜索 -->
      <div class="queryInfo">
        <el-row :gutter="20">
          <el-col :sm="8" :md="6">
            <el-select
              v-model="queryInfo.params.type"
              size="small"
              clearable
              placeholder="请选择类型"
            >
              <el-option label="PC" value="1" />
              <el-option label="小程序" value="2" />
            </el-select>
          </el-col>
          <el-col :sm="8" :md="6">
            <el-button
              v-permission="'query'"
              type="primary"
              size="small"
              @click="handleSizeChange()"
              >搜索</el-button
            >
            <el-button size="small" @click="reset_query()">重置</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 按钮组 -->
      <div class="button_group">
        <el-button
          v-permission="'add'"
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="groupAdd(0)"
          >新增</el-button
        >
      </div>
      <el-table border size="small" row-key="id" :data="tableData">
        <el-table-column prop="title" label="标题" show-overflow-tooltip />
        <el-table-column prop="content" label="内容" show-overflow-tooltip />
        <el-table-column label="类型" align="center">
          <template v-slot="{ row }">
            <el-tag v-if="row.type == 1" effect="dark" type="success"
              >PC</el-tag
            >
            <el-tag v-if="row.type == 2" effect="dark">小程序</el-tag>

          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template v-slot="{ row }">
            <el-tag v-if="row.state" effect="dark" type="success">发布</el-tag>
            <el-tag v-else effect="dark">草稿</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="{ row }">
            <el-button :disabled="row.state" type="text" @click="release(row)" size="mini" class="textym"
              >发布</el-button
            >
            <el-button
              v-permission="'update'"
              type="text"
              size="mini"
              class="textyell"
              @click="groupAdd(row)"
              >修改</el-button
            >
            <el-button
              v-permission="'delete'"
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
        :current-page="queryInfo.offset"
        :page-sizes="[15, 20, 30]"
        :page-size="queryInfo.limit"
        layout="sizes, prev, pager, next,total"
        :total="total"
      />
    </div>
    <!-- 新增修改 -->
    <el-dialog
      width="50%"
      :title="dialog.title"
      :visible.sync="dialog.show"
      :before-close="dialogClose"
      :close-on-click-modal="false"
    >
      <el-form
        :model="addFormData"
        :rules="formRules"
        ref="addFormData"
        label-width="80px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model.trim="addFormData.title" maxlength="50" />
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
          <el-input type="textarea" rows="4" v-model.trim="addFormData.content" />
        </el-form-item>
        <el-form-item label="公告类型" prop="type">
          <el-select
            v-model="addFormData.type"
            size="small"
            clearable
            placeholder="请选择类型"
          >
            <el-option label="PC" value="1" />
            <el-option label="小程序" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否发布" prop="type">
          <el-select
            v-model="addFormData.state"
            size="small"
            clearable
            placeholder="请选择类型"
          >
            <el-option label="草稿" :value="false" />
            <el-option label="发布" :value="true" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="severDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { showLoading, confirm, showError } from "@/utils";
export default {
  components: {},
  data() {
    return {
      total: 0,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
      },
      dialog: {
        title: "新增",
        show: false,
      },
      queryInfo: {
        params: {},
        limit: 15,
        offset: 1,
        sort: { prop: "createdAt", order: "desc" },
      },
      tableData: [],
      check: [],
      addFormData: {},
      formRules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [
          { required: true, message: "请输入公告内容", trigger: "blur" },
        ],
        type: [{ required: true, message: "请选择公告类型", trigger: "blur" }],
        state: [{ required: true, message: "请选择公告状态", trigger: "blur" }],
      },
      rolesData: [],
    };
  },
  computed: {
    ...mapState("theme", ["PC"]),
  },
  mounted() {
    this.seach_query();
  },

  methods: {
    ...mapActions("system", [
      "noticeList",
      "noticeDelete",
      "addNotice",
      "rolesList",
      "resetPassword",
      "userState",
    ]),
    // 搜索
    async seach_query() {
      showLoading("加载中");
      let res = await this.noticeList({
        ...this.queryInfo,
      });
      this.tableData = res.data;
      this.total = res.count;
    },
    // 新增修改
    async groupAdd(row) {
      if (row) {
        this.addFormData = { ...row };
        this.dialog.title = "修改";
      } else {
        this.dialog.title = "新增";
        this.addFormData = {
          state: false,
        };
      }
      this.dialog.show = true;
      this.$forceUpdate();
    },
    // 删除
    remove(id) {
      confirm("确认删除", "提示", {
        ok: async () => {
          showLoading("正在删除");
          await this.noticeDelete({ id: [id] });
          this.seach_query();
        },
      });
    },
    // 保存
    severDialog() {
      this.$refs["addFormData"].validate(async (valid) => {
        if (!valid) return false;
        showLoading(true);
        await this.addNotice(this.addFormData);
        this.dialogClose();
      });
    },
    async release(row){
      showLoading(true);
      await this.addNotice({
        id:row.id,
        state:true,
        type:row.type,
      });
      this.seach_query()
    },
    reset_query() {
      this.queryInfo = {
        params: {},
        limit: 15,
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
