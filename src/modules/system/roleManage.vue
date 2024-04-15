<!-- 角色管理 -->
<template>
  <div class="table-page">
    <!-- 搜索 -->
    <div class="queryInfo">
      <el-row :gutter="20">
        <el-col :sm="8" :md="6">
          <el-input
            v-model.trim="queryInfo.params.roleName"
            size="small"
            placeholder="请输入角色名称"
          ></el-input>
        </el-col>
        <el-col :sm="8" :md="6">
          <el-date-picker
            v-model="queryInfo.params.time"
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
          @click="showDialogAdd(0)"
          >新增</el-button
        >
      </div>
      <el-table border size="small" row-key="id" :data="tableData">
        <el-table-column prop="roleName" width="150" label="角色名称" />
        <el-table-column prop="roleDesc" label="角色描述" />
        <el-table-column label="角色状态" width="80" align="center">
          <template v-slot="{ row }">
            <el-tag
              effect="dark"
              :type="row.state ? 'danger' : 'success'"
              size="medium"
              >{{ row.state ? "禁用" : "启用" }}</el-tag
            >
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
            <el-button
              v-permission="'update:role'"
              type="text"
              size="mini"
              class="textym"
              @click="handleCommand(row)"
              >修改权限</el-button
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
      :close-on-click-modal="false"
      width="500px"
      :before-close="handleClose"
    >
      <el-form
        :model="addFormData"
        :rules="formRules"
        ref="addFormData"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model.trim="addFormData.roleName" />
        </el-form-item>
        <el-form-item label="角色编码" prop="roleCode">
          <el-input v-model.trim="addFormData.roleCode" />
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input
            type="textarea"
            rows="3"
            v-model.trim="addFormData.roleDesc"
          />
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
    <!-- 权限 -->
    <role-permissions
      v-if="rolePermissions"
      :show="rolePermissions"
      :row="roleRow"
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
      addFormData: {
        state: false,
      },
      formRules: {
        roleName: [
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
      "rolesSever",
      "rolesList",
      "rolesPreservation",
      "rolesRome",
    ]),
    async seach_query() {
      showLoading("加载中");
      if (this.queryInfo.params.time) {
        this.queryInfo.params.endTime = this.$dateFormat(
          this.queryInfo.params.time[1]
        ).replace(/00:00:00/, "23:59:59");
        this.queryInfo.params.startTime = this.$dateFormat(
          this.queryInfo.params.time[0]
        );
      }
      let res = await this.rolesList({
        ...this.queryInfo,
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
    // 保存
    sever_Role() {
      this.$refs["addFormData"].validate(async (valid) => {
        if (!valid) {
          return false;
        }
        showLoading(true);
        await this.rolesSever({
          id: this.addFormData.id,
          roleName: this.addFormData.roleName,
          roleDesc: this.addFormData.roleDesc,
          roleCode: this.addFormData.roleCode,
          state: this.addFormData.state,
          menus: this.addFormData.menus.map((i) => i.id),
        });
        this.handleClose();
      });
    },
    // 更多
    handleCommand(obj) {
      this.roleRow = obj;
      this.title = `（${obj.roleName}）角色权限`;
      this.rolePermissions = true;
    },
    // 删除
    remove(id) {
      confirm("确认删除", "提示", {
        ok: async () => {
          showLoading("正在删除");
          await this.rolesRome({ id: [id] });
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
      this.queryInfo.limit = v || this.queryInfo.limit;
      this.queryInfo.offset = 1;
      this.seach_query();
    },
    handleCurrentChange(v) {
      this.queryInfo.offset = v || 1;
      this.seach_query();
    },
  },
};
</script>
