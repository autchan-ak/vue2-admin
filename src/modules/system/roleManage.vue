<!-- 角色管理 -->
<template>
  <div>
    <!-- 搜索 -->
    <div class="queryInfo">
      <el-row :gutter="20" class="">
        <el-col :sm="8" :md="6" :lg="4">
          <el-input
            v-model="queryInfo.name"
            size="small"
            placeholder="请输入角色名称"
          ></el-input>
        </el-col>
        <el-col :sm="8" :md="6">
          <el-date-picker
            v-model="queryInfo.time"
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
          @click="editRole"
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
        border
        size="small"
        row-key="id"
        :data="tableData"
        @selection-change="selectionChange"
      >
        <el-table-column type="selection" width="55" :selectable="selectable" />
        <el-table-column prop="roles_title" label="角色名称" />
        <el-table-column prop="roles_code" label="角色标识" />
        <el-table-column label="角色状态" width="100" align="center">
          <template v-slot="{ row }">
            <el-switch
              v-model="row.ena"
              :disabled="row.id <= 2"
              @change="changeEna(row)"
              :active-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template v-slot="{ row }">
            {{ row.createTime | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="角色描述" prop="roles_desc" />
        <el-table-column label="操作" width="155">
          <template v-slot="{ row }">
            <el-button
              type="text"
              size="mini"
              class="textyell"
              @click="showDialogAdd(row)"
              >修改</el-button
            >
            <el-button
              type="text"
              size="mini"
              class="textRed"
              :disabled="row.id <= 2"
              @click="remove(row.id)"
              >删除</el-button
            >
            <el-dropdown style="margin-left: 10px" @command="handleCommand">
              <el-button type="text" size="mini"
                >更多操作<i class="el-icon-arrow-down"
              /></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :command="beforeHandleCommand(row, 'editJurisdiction')"
                  >修改权限</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
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
        <el-form-item label="角色名称" prop="roles_title">
          <el-input v-model="addFormData.roles_title" />
        </el-form-item>
        <el-form-item label="角色标识" prop="roles_code">
          <el-input v-model="addFormData.roles_code" />
        </el-form-item>
        <el-form-item label="角色状态">
          <el-select
            v-model="addFormData.ena"
            :disabled="addFormData.id && addFormData.id <= 2"
          >
            <el-option label="启用" :value="0" />
            <el-option label="禁用" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="角色描述" prop="roles_desc">
          <el-input type="textarea" rows="3" v-model="addFormData.roles_desc" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="sever_Role">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 权限 -->
    <role-permissions
      v-if="rolePermissions"
      :show="rolePermissions"
      :id="roleId"
      :title="title"
      @_close="handleClose"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { showLoading, confirm, showError } from "@/utils";
import RolePermissions from "./components/rolePermissions.vue";
export default {
  components: { RolePermissions },
  data() {
    return {
      total: 0,
      limit: 10,
      page: 1,
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
        time: "",
      },
      tableData: [],
      check: [],
      addFormData: {
        ena: 1,
      },
      formRules: {
        roles_code: [
          { required: true, message: "请输入角色标识", trigger: "blur" },
        ],
        roles_title: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
      },
      dialogVisible: false,
      roleId: null,
      rolePermissions: false,
      title: "",
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
      "rolesPreservation",
      "rolesRome",
    ]),
    async seach_query() {
      showLoading("加载中");
      if (this.queryInfo.time) {
        this.queryInfo.endTime = this.$dateFormat(
          this.queryInfo.time[1]
        ).replace(/00:00:00/, "23:59:59");
        this.queryInfo.startTime = this.$dateFormat(this.queryInfo.time[0]);
      }
      let res = await this.rolesList({
        ...this.queryInfo,
        limit: this.limit,
        page: this.page,
      });
      this.tableData = res.data;
      this.total = res.count;
    },
    beforeHandleCommand(row, command) {
      return {
        row,
        command,
      };
    },
    selectionChange(val) {
      this.check = [...val];
    },
    // 禁用某一行选中
    selectable(row) {
      if (row.id > 2) return true;
      return false;
    },
    // 新增
    showDialogAdd(row) {
      if (row) {
        this.addFormData = { ...row };
        this.dialog.title = "修改";
      } else {
        this.dialog.title = "新增";
        this.addFormData.ena = 0;
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
        await this.rolesPreservation(this.addFormData);
        this.handleClose();
      });
    },
    // 更多
    handleCommand(obj) {
      this.roleId = obj.row.id;
      this.title = `（${obj.row.roles_title}）`;
      switch (obj.command) {
        case "editJurisdiction":
          this.title += "菜单权限";
          this.rolePermissions = true;
          break;
      }
    },
    // 禁用启用
    async changeEna(row) {
      await this.setEna({ id: row.id });
      this.seach_query();
    },
    modify() {},
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
      this.queryInfo = {};
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
