<!-- 角色管理 -->
<template>
  <div class="table-page">
    <!-- 搜索 -->
    <div class="queryInfo">
      <el-row :gutter="20">
        <el-col :sm="8" :md="6" :lg="4">
          <el-input
            v-model="queryInfo.params.role_name"
            size="small"
            placeholder="请输入角色名称"
          ></el-input>
        </el-col>
        <el-col :sm="8" :md="6">
          <el-date-picker
            v-model="queryInfo.params.createdAt"
            type="daterange"
            size="small"
            :clearable="false"
            placement="bottom-start"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="创建日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
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
      <div class="button_group">
        <el-button
          v-permission="'add'"
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="showDialogAdd(0)"
          >新增</el-button
        >
        <el-button
          v-permission="'update'"
          type="warning"
          icon="el-icon-edit"
          size="small"
          @click="editRole"
          >修改</el-button
        >
        <el-button
          v-permission="'delete'"
          type="danger"
          icon="el-icon-delete"
          size="small"
          @click="remove(0)"
          >删除</el-button
        >
      </div>
      <el-table
        border
        size="small"
        row-key="id"
        :data="tableData"
        @selection-change="selectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="roleName" label="角色名称" show-overflow-tooltip />
        <el-table-column prop="roleDesc" label="角色描述" show-overflow-tooltip />
        <el-table-column label="角色状态" width="100" align="center">
          <template v-slot="{ row }">
            <el-switch
              v-model="row.state"
              @change="changeEna(row)"
              :active-value="false"
              :inactive-value="true"
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template v-slot="{ row }">
            {{ row.createdAt | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="修改时间">
          <template v-slot="{ row }">
            {{ row.updatedAt | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="155">
          <template v-slot="{ row }">
            <el-button
              v-permission="'update'"
              type="text"
              size="mini"
              class="textyell"
              @click="showDialogAdd(row)"
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
      <ak-pagination
        :total="total"
        :page-size="queryInfo.limit"
        :current-page="queryInfo.offset"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 新增修改 -->
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="addFormData"
        :rules="formRules"
        ref="addFormData"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="role_name">
          <el-input v-model="addFormData.role_name" />
        </el-form-item>
        <el-form-item label="角色描述" prop="role_desc">
          <el-input type="textarea" rows="3" v-model="addFormData.role_desc" />
        </el-form-item>
        <el-form-item label="角色状态">
          <el-select v-model="addFormData.state">
            <el-option label="启用" :value="false" />
            <el-option label="禁用" :value="true" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="sever_Role">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { showLoading, confirm, showError } from "@/utils";
export default {
  data() {
    return {
      total: 0,
      pickerOptions: {
        disabledDate(time) {
          //   return time.getTime() > Date.now() - 8.64e7;  // 今天不可选
          return time.getTime() > Date.now();
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
      addFormData: {
        state: false,
      },
      formRules: {
        role_desc: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
        ],
        role_name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
      },
      dialogVisible: false,
      roleId: null,
      rolePermissions: false,
      title: "",
      roleRow: null,
    };
  },
  computed: {},
  mounted() {
    this.seach_query();
  },

  methods: {
    ...mapActions("system", [
      "rolesList",
      "setEna",
      "rolesSeve",
      "rolesRome",
    ]),
    async seach_query() {
      showLoading("加载中");
      if (this.queryInfo.params.createdAt) {
        this.queryInfo.params.createdAt[1] = this.$dateFormat(
          this.queryInfo.params.createdAt[1]
        ).replace(/00:00:00/, "23:59:59");
        this.queryInfo.params.createdAt[0] = this.$dateFormat(
          this.queryInfo.params.createdAt[0]
        );
      }
      let res = await this.rolesList({
        ...this.queryInfo,
      });
      this.tableData = res.data;
      this.total = res.count;
    },
    selectionChange(val) {
      this.check = [...val];
    },
    // 新增
    showDialogAdd(row) {
      if (row) {
        this.addFormData = { ...row };
        this.dialog.title = "修改";
      } else {
        this.dialog.title = "新增";
        this.addFormData.state = false;
      }
      this.dialog.show = true;
    },
    editRole() {
      if (this.check.length != 1) return showError("请选择一条要修改的角色");
      this.dialog.title = "修改";
      this.addFormData = { ...this.check[0] };
      this.dialog.show = true;
    },
    // 保存
    sever_Role() {
      this.$refs["addFormData"].validate(async (valid) => {
        if (!valid) {
          return false;
        }
        showLoading(true);
        await this.rolesSeve(this.addFormData);
        this.handleClose();
      });
    },
    // 禁用启用
    async changeEna(row) {
      await this.setEna({ id: row.id });
      this.seach_query();
    },
    // 删除
    remove(id) {
      if (!id && !this.check.length) return showError("请选择要删除的角色");
      confirm("确认删除", "提示", {
        ok: async () => {
          showLoading("正在删除");
          let _id = [];
          this.check.forEach((item) => {
            _id.push(item.id);
          });
          await this.rolesRome({ id: id ? [id] : _id });
          this.seach_query();
        },
      });
    },
    reset_query() {
      this.queryInfo = {
        params: {},
        limit: 15,
        offset: 1,
        sort: { prop: "createdAt", order: "desc" },
      };
    },
    handleClose() {
      this.dialog.show = false;
      this.addFormData = { ena: 1 };
      this.rolePermissions = false;
      this.seach_query();
    },
    handleSizeChange(v) {
      this.limit = v;
      this.seach_query();
    },
    handleCurrentChange(v) {
      this.seach_query();
    },
  },
};
</script>
