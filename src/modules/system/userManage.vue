<!-- 用户管理 -->
<template>
  <div class="table-page">
    <!-- 搜索 -->
    <div class="queryInfo">
      <el-row :gutter="20">
        <el-col :sm="8" :md="6" :lg="4">
          <el-input
            v-model="queryInfo.params.nickName"
            size="small"
            placeholder="请输入用户名"
          />
        </el-col>
        <el-col :sm="8" :md="6" :lg="4">
          <el-input
            v-model="queryInfo.params.nickName"
            size="small"
            placeholder="请输入用户昵称"
          />
        </el-col>
        <el-col :sm="8" :md="6" :lg="4">
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
        <el-col :span="2" :xs="4">
          <el-button
            v-permission="'query'"
            type="primary"
            size="small"
            @click="seach_query()"
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
        <el-table-column type="selection" width="55" />
        <el-table-column prop="account" label="用户名" show-overflow-tooltip />
        <el-table-column prop="nickName" label="昵称" show-overflow-tooltip />
        <el-table-column prop="phone" label="电话" show-overflow-tooltip />
        <el-table-column prop="email" label="邮箱" show-overflow-tooltip />
        <el-table-column prop="user_desc" label="描述" show-overflow-tooltip />
        <el-table-column prop="role_name" label="角色名称" />
        <el-table-column label="上次登陆时间" show-overflow-tooltip>
          <template v-slot="{ row }">
            {{ row.loginAt | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
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
            <el-popconfirm
              style="margin-right: 10px"
              v-permission="'resetpwd'"
              @confirm="resetpwd(row)"
              title="确定重置该用户的密码吗？"
            >
              <el-button slot="reference" type="text" size="mini" class="textym"
                >重置密码</el-button
              >
              <el-button>删除</el-button>
            </el-popconfirm>

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
      :title="dialog.title"
      :visible.sync="dialog.show"
      width="30%"
      :before-close="dialogClose"
    >
      <el-form
        :model="addFormData"
        :rules="formRules"
        ref="addFormData"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="account">
          <el-input
            v-model="addFormData.account"
            :disabled="!!addFormData.id"
          />
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="addFormData.nickName" />
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="addFormData.roleId">
            <el-option
              v-for="item in rolesData"
              :key="item.id"
              :label="item.role_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="到期时间" prop="phone">
          <el-date-picker
            v-model="addFormData.endAt"
            type="datetime"
            :picker-options="pickerOptions"
            placeholder="选择到期时间"
            style="width:100%;"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="addFormData.phone" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addFormData.email" />
        </el-form-item>
        <el-form-item label="描述" prop="user_desc">
          <el-input v-model="addFormData.user_desc" />
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
        account: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        roleId: [{ required: true, message: "请选择角色", trigger: "blur" }],
      },
      rolesData: [],
    };
  },
  computed: {
    // ...mapState("", [""]),
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
          account: "",
          nickName: "",
        };
      }
      showLoading("加载中");
      let res = await this.rolesList();
      this.rolesData = res.data;
      this.dialog.show = true;
      this.$forceUpdate();
    },
    // 重置密码
    async resetpwd(row) {
      showLoading(true);
      await this.resetPassword({ id: row.id });
      this.seach_query();
    },
    // 状态
    async changeState(row) {
      showLoading(true);
      await this.userState({ id: row.id });
      this.seach_query();
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
      this.queryInfo.limit = v;
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
