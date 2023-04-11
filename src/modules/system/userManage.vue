<!-- 系统管理 -->
<template>
  <div>
    <!-- 搜索 -->
    <div class="queryInfo">
      <el-row :gutter="20" class="">
        <el-col :sm="8" :md="6" :lg="4">
          <el-input
            v-model="queryInfo.account"
            clearable
            size="small"
            placeholder="请输入登陆账号"
          />
        </el-col>
        <el-col :sm="8" :md="6" :lg="4">
          <el-input
            v-model="queryInfo.uname"
            clearable
            size="small"
            placeholder="请输入用户名称"
          />
        </el-col>
        <el-col :sm="8" :md="6" :lg="4">
          <el-input
            v-model="queryInfo.email"
            clearable
            size="small"
            placeholder="请输入用户邮箱"
          />
        </el-col>
        <el-col :span="2" :xs="4">
          <el-button type="primary" size="small" @click="seach_query()"
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
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="showDialogAdd(0)"
          >新增</el-button
        >
        <el-button
          type="warning"
          icon="el-icon-edit"
          size="small"
          @click="showDialogAdd(1)"
          >修改</el-button
        >
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="small"
          @click="remove(0)"
          >删除</el-button
        >
      </div>
      <el-table
        ref="userData"
        :data="user_List"
        row-key="uid"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          :selectable="selectable"
          reserve-selection
        />
        <el-table-column prop="account" label="登陆账号" />
        <el-table-column prop="uname" label="用户名称" />
        <el-table-column prop="sex" label="性别" align="center" width="50">
          <template v-slot="{ row }">
            {{ row.sex ? "男" : "女" }}
          </template>
        </el-table-column>
        <el-table-column label="账号状态" prop="ena" width="80">
          <template v-slot="{ row }">
            <el-switch
              v-model="row.ena"
              :disabled="row.uid <= 2"
              @change="changeEna(row.uid)"
              :active-value="0"
              :inactive-value="1"
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
          </template>
        </el-table-column>
        <el-table-column label="手机号" prop="phone" />
        <el-table-column label="邮箱" prop="email" />
        <el-table-column label="上次登陆时间" prop="login_time" width="150">
          <template v-slot="{ row }">
            {{ row.login_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template v-slot="{ row }">
            <el-button
              type="text"
              size="mini"
              class="textyell"
              @click="modify(row)"
              >修改</el-button
            >
            <el-button
              type="text"
              size="mini"
              class="textRed"
              :disabled="row.uid <= 2"
              @click="remove(row.uid)"
              >删除</el-button
            >
            <el-button type="text" size="mini" @click="selectRole(row.uid)"
              >角色</el-button
            >
            <el-popconfirm
              style="margin-left: 10px"
              confirm-button-text="确认"
              cancel-button-text="不用了"
              icon="el-icon-info"
              icon-color="red"
              title="确认重置该用户密码？"
              @confirm="resetPwd(row.uid)"
            >
              <el-button
                slot="reference"
                type="text"
                class="textOrg"
                size="mini"
                :disabled="row.uid <= 2"
                >重置密码</el-button
              >
            </el-popconfirm>
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
    </div>
    <el-dialog
      title="用户信息"
      center
      :visible.sync="dialogShow"
      width="35%"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <el-form
        ref="addFormData"
        :model="userRow"
        :rules="userRules"
        label-width="78px"
      >
        <el-form-item label="登陆账号" prop="account">
          <el-input v-model="userRow.account" />
        </el-form-item>
        <el-form-item label="用户名称" prop="uname">
          <el-input v-model="userRow.uname" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="userRow.phone" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userRow.email" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio :label="1" v-model="userRow.sex">男</el-radio>
          <el-radio :label="0" v-model="userRow.sex">女</el-radio>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio
            :label="0"
            :disabled="userRow.uid <= 2"
            v-model="userRow.ena"
            >启用</el-radio
          >
          <el-radio
            :label="1"
            :disabled="userRow.uid <= 2"
            v-model="userRow.ena"
            >禁用</el-radio
          >
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="_sever">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="用户角色"
      :visible.sync="roleShow"
      width="40%"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <el-checkbox-group v-model="checkRulesList">
        <el-checkbox
          style="margin-bottom: 10px"
          v-for="item in checkbox"
          :key="item.id"
          :label="item.id"
          :disabled="!!item.ena"
          >{{ item.roles_title }}</el-checkbox
        >
      </el-checkbox-group>
      <span slot="footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="rules_sever">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { showLoading, confirm, showError } from "@/utils";
import { matchCode, matchEmail, matchPhone } from "@/utils/RegExpUtil";

export default {
  name: "",
  data() {
    let letterRule = (rule, value, callback) => {
      if (!matchCode(value)) {
        callback(new Error("请输入6-18位字母、数字、下划线"));
      } else {
        callback();
      }
    };
    let phoneValidator = (rule, value, callback) => {
      if (!value) return callback();
      if (!matchPhone(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    let emailValidator = (rule, value, callback) => {
      if (!value) return callback();
      if (!matchEmail(value)) {
        callback(new Error("请输入正确的邮箱"));
      } else {
        callback();
      }
    };
    return {
      limit: 10,
      page: 1,
      total: 0,
      queryInfo: {},
      user_List: [],
      userRow: {},
      dialogShow: false,
      roleShow: false,
      check: [],
      checkbox: [],
      checkRulesList: [],
      userRules: {
        account: [
          { required: true, message: "请输入登陆账号", trigger: "blur" },
          {
            min: 4,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
          { validator: letterRule, trigger: "blur" },
        ],
        uname: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        phone: [{ validator: phoneValidator, trigger: "blur" }],
        email: [{ validator: emailValidator, trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.seach_query();
  },
  methods: {
    ...mapActions("system", [
      "userList",
      "userReg",
      "userRome",
      "setUserEna",
      "rolesList",
      "getuserRoles",
      "setUserRules",
      "resetPassWord",
    ]),
    async seach_query() {
      showLoading("加载中");
      let res = await this.userList({
        ...this.queryInfo,
        limit: this.limit,
        page: this.page,
      });
      this.user_List = res.data;
      this.total = res.count;
    },
    showDialogAdd(v) {
      this.userRow = { ena: 0, sex: 1 };
      if (v) {
        if (this.check.length != 1) return showError("请选择一条要修改的数据");
        this.userRow = { ...this.check[0] };
      }
      this.dialogShow = true;
    },
    remove(id) {
      if (!this.check.length && !id) return showError("请选择要删除的数据");
      let _id = [];
      if(id){
        _id = [id]
      }else{
        this.check.forEach(item=>{
          _id.push(item.uid)
        })
      }
      confirm("确认删除", "提示", {
        ok: async () => {
          if (typeof id == "number") {
            id = [id];
          } else {
            this.check.forEach((item) => {
              id.push(item.uid);
            });
          }
          showLoading("正在删除");
          await this.userRome({ id:_id });
          this.seach_query();
        },
      });
    },
    // 重置用户密码
    resetPwd(id) {
      showLoading(true);
      this.resetPassWord({ id });
    },
    handleSizeChange(v) {
      this.limit = v;
      this.seach_query();
    },
    handleCurrentChange(v) {
      this.page = v;
      this.seach_query();
    },
    async changeEna(id) {
      await this.setUserEna({ id });
      this.seach_query();
    },
    handleSelectionChange(val) {
      this.check = [...val];
    },
    // 修改
    modify(row) {
      this.userRow = { ...row };
      this.dialogShow = true;
    },
    _sever() {
      this.$refs["addFormData"].validate(async (valid) => {
        if (!valid) {
          return false;
        }
        showLoading("正在保存");
        await this.userReg(this.userRow);
        this.handleClose();
      });
    },
    async rules_sever() {
      if (!this.checkRulesList.length) return showError("请选择用户的角色");
      await this.setUserRules({
        rules: this.checkRulesList.join(","),
        id: this.roleShowId,
      });
      this.handleClose();
    },
    handleClose() {
      this.checkRulesList = [];
      (this.roleShowId = null), (this.userRow = {});
      this.roleShow = false;
      this.dialogShow = false;
      this.seach_query();
    },
    // 选择角色
    async selectRole(id) {
      // 查询系统角色
      this.roleShowId = id;
      let res = await this.rolesList({ all: true });
      this.checkbox = res.data;
      this.checkRulesList = await this.getuserRoles({ id });
      // 查询用户角色
      this.roleShow = true;
    },
    // // 刪除
    // remove(id) {
    //   if (typeof id == "number") {
    //     id = [id];
    //   }
    //   confirm("确认删除", "提示", {
    //     ok: async () => {
    //       showLoading("正在删除");
    //       await this.userRome({ id });
    //       this.$emit("getUserList");
    //     },
    //   });
    // },
    reset_query() {
      this.queryInfo = {};
    },
    // 禁用某一行选中
    selectable(row) {
      if (row.uid > 2) return true;
      return false;
    },
  },
};
</script>