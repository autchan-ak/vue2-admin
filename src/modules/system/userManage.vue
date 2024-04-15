<!-- 用户管理 -->
<template>
  <div class="table-page">
    <!-- 搜索 -->
    <div class="queryInfo">
      <el-row :gutter="20">
        <el-col :sm="8" :md="6">
          <el-input
            clearable
            v-model.trim="queryInfo.params.userAccount"
            size="small"
            placeholder="请输入用户账号"
          />
        </el-col>
        <el-col :sm="8" :md="6">
          <el-input
            clearable
            v-model.trim="queryInfo.params.nickName"
            size="small"
            placeholder="请输入用户昵称"
          />
        </el-col>
        <el-col :sm="8" :md="6">
          <el-select
            v-model="queryInfo.params.state"
            size="small"
            clearable
            placeholder="请选择账号状态"
          >
            <el-option label="启用" value="1" />
            <el-option label="禁用" value="0" />
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
    <div class="main_list">
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
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column
          width="80"
          align="center"
          prop="sysUser.parentName"
          label="创建人"
          show-overflow-tooltip
        />
        <el-table-column
          prop="userAccount"
          label="账号"
          show-overflow-tooltip
        />
        <el-table-column
          prop="nickName"
          label="昵称"
          show-overflow-tooltip
          width="120"
        />
        <!-- <el-table-column prop="phone" label="电话" show-overflow-tooltip /> -->
        <!-- <el-table-column prop="email" label="邮箱" show-overflow-tooltip /> -->
        <el-table-column
          label="上次登陆时间"
          width="140"
          align="center"
          show-overflow-tooltip
        >
          <template v-slot="{ row }">
            {{ row.loginAt | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column prop="userDesc" label="描述" show-overflow-tooltip />
        <el-table-column label="状态" width="70" align="center">
          <template v-slot="{ row }">
            <el-switch
              v-permission="'state'"
              v-model="row.state"
              @change="changeState(row)"
              :active-value="true"
              :inactive-value="false"
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template v-slot="{ row }">
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
            <el-dropdown
              trigger="click"
              @command="
                (command) => {
                  handleCommand(command, row);
                }
              "
            >
              <span class="el-dropdown-link" style="font-size: 12px">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="resetPwd">重置密码</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <ak-pagination
        :total="total"
        :page-size="queryInfo.limit"
        :current-page="queryInfo.offse"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
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
        <el-form-item label="账号" prop="userAccount">
          <el-input
            v-model.trim="addFormData.userAccount"
            :disabled="!!addFormData.id"
          />
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model.trim="addFormData.nickName" />
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="addFormData.roleId" multiple>
            <el-option
              v-for="item in rolesData"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model.trim="addFormData.phone" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model.trim="addFormData.email" />
        </el-form-item>
        <el-form-item label="描述" prop="userDesc">
          <el-input v-model.trim="addFormData.userDesc" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="addFormData.state"
            :active-value="true"
            :inactive-value="false"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
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
      vipFormData: {},
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
        userAccount: [
          { required: true, message: "请输入账号", trigger: "blur" },
        ],
        nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        roleId: [{ required: true, message: "请选择角色", trigger: "blur" }],
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
      "userList",
      "userDelete",
      "userSeverForm",
      "rolesList",
      "resetPassword",
      "userState",
    ]),
    // 搜索
    async seach_query() {
      showLoading("加载中");
      let res = await this.userList({
        ...this.queryInfo,
      });
      this.tableData = res.data;
      this.total = res.count;
      this.$nextTick(() => {
        this.$forceUpdate();
      });
    },
    async handleCommand(command, row) {
      switch (command) {
        case "resetPwd":
          showLoading(true);
          await this.resetPassword({
            id: row.id,
            userAccount: row.userAccount,
          });
          this.seach_query();
          break;
      }
    },
    // 新增修改
    async groupAdd(row) {
      if (row) {
        this.addFormData = { ...row };
        this.dialog.title = "修改";
      } else {
        this.dialog.title = "新增";
        this.addFormData = {
          roleId: "",
          state: true,
          userAccount: "",
          nickName: "",
        };
      }
      showLoading("加载中");
      let res = await this.rolesList();
      this.rolesData = res.data;
      this.dialog.show = true;
      this.$forceUpdate();
    },
    // 状态
    async changeState(row) {
      this.$prompt("请输入修改原因，启用可不填", "提示", {
        center: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputErrorMessage: "请输入修改原因",
        inputPattern: row.state ? null : /[\u4e00-\u9fa5]/,
        closeOnClickModal: false,
        closeOnPressEscape: false,
      })
        .then(async ({ value }) => {
          showLoading(true);
          await this.userState({
            id: row.id,
            userDesc: value,
            state: row.state,
          });
          this.seach_query();
        })
        .catch((_) => {
          this.seach_query();
        });
    },
    // 修改
    editRole() {
      if (this.check.length != 1) return showError("请选择一条要修改的数据");
      this.groupAdd(this.check[0]);
    },
    // 删除
    remove(id) {
      if (!id && !this.check.length) return showError("请选择要删除的数据");
      confirm("确认删除", "提示", {
        ok: async () => {
          showLoading("正在删除");
          let _id = [];
          this.check.forEach((item) => {
            _id.push(item.id);
          });
          await this.userDelete({ id: id ? [id] : _id });
          this.seach_query();
        },
      });
    },
    // 保存
    severDialog() {
      this.$refs["addFormData"].validate(async (valid) => {
        if (!valid) return false;
        showLoading(true);
        await this.userSeverForm(this.addFormData);
        this.dialogClose();
      });
    },

    selectionChange(val) {
      this.check = [...val];
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
