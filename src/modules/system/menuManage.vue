<!-- 菜单管理 -->
<template>
  <div>
    <!-- 搜索 -->
    <div class="queryInfo">
      <el-row :gutter="20" class="">
        <el-col :sm="8" :md="6" :lg="4">
          <el-input
            v-model="queryInfo.name"
            clearable
            size="small"
            placeholder="请输入菜单名称"
          ></el-input>
        </el-col>
        <el-col :sm="8" :md="6" :lg="4">
          <el-select
            v-model="queryInfo.type"
            size="small"
            clearable
            placeholder="请选择菜单状态"
          >
            <el-option label="目录" value="M" />
            <el-option label="页面" value="Y" />
            <el-option label="按钮" value="B" />
          </el-select>
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
        <el-button type="primary" size="small" @click="isFold = !isFold">
          <i class="el-icon-sort" style="transform: rotate(90deg)"></i>
          展开/折叠</el-button
        >
      </div>
      <el-table
        v-if="menuTable"
        border
        size="small"
        row-key="id"
        :data="tableData"
        :default-expand-all="isFold"
      >
        <el-table-column prop="menu_title" label="菜单名称">
          <template v-slot="{ row }">
              <span class="icon">
                <svg-icon v-if="row.icon" :icon="row.icon" />
              </span>
              {{ row.menu_title }}
          </template>
        </el-table-column>
        <el-table-column prop="perms" label="权限标识" />
        <el-table-column prop="url" label="路由" />
        <el-table-column prop="component" label="资源路径" show-overflow-tooltip  width="150"/>
        <el-table-column prop="orderNum" label="排序" width="50" />
        <el-table-column
          prop="menu_type"
          label="类型"
          width="60"
          align="center"
        >
          <template v-slot="{ row }">
            <span v-if="row.menu_type === 'M'" class="green">目录</span>
            <span v-if="row.menu_type === 'Y'" class="ym">页面</span>
            <span v-if="row.menu_type === 'B'" class="blue">按钮</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="is_hidden"
          label="可见"
          width="60"
          align="center"
        >
          <template v-slot="{ row }">
            <span :class="row.is_hidden ? 'dark' : 'green'">{{
              row.is_hidden ? "影藏" : "显示"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="可用" width="62" align="center">
          <template v-slot="{ row }">
            <el-switch
              v-model="row.ena"
              @change="changeEna(row)"
              :active-value="0"
              :inactive-value="1"
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template v-slot="{ row }">
            <el-button
              type="text"
              size="mini"
              class="textyell"
              @click="modify(row)"
              >修改</el-button
            >
            <el-button
              v-show="row.menu_type !== 'B'"
              type="text"
              size="mini"
              @click="showDialogAdd(row)"
              >新增</el-button
            >
            <el-button
              type="text"
              size="mini"
              class="textRed"
              @click="romeMenu(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="dialogData.title"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="40%"
      :before-close="handleClose"
    >
      <el-form
        :model="menuForm"
        status-icon
        :rules="menuRole"
        ref="menuForm"
        label-width="100px"
      >
        <el-form-item label="上级菜单">
          <el-select
            v-model="menuForm.parent_id"
            :disabled="dialogData.parent"
            clearable
            ref="el-tree-select"
            placeholder="请选择"
          >
            <el-option label="主目录" :value="0" />
            <el-option
              :value="menuForm.parent_id"
              :label="menuForm.parent_name"
              class="el-tree-select-option"
            >
              <el-tree
                class="el-tree-select-dropdown"
                ref="el-select-tree"
                :data="menuTree"
                node-key="id"
                show-checkbox
                check-strictly
                :check-on-click-node="false"
                :default-expanded-keys="expandedKeys"
                :props="defaultProps"
                @check="_check"
              ></el-tree>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" prop="menu_type">
          <el-radio-group v-model="menuForm.menu_type">
            <el-radio label="M" :disabled="menuForm.parent_type === 'Y'"
              >目录</el-radio
            >
            <el-radio label="Y">页面</el-radio>
            <el-radio label="B">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称" prop="menu_title">
          <el-input v-model="menuForm.menu_title" />
        </el-form-item>
        <el-form-item label="权限标识" prop="perms">
          <el-input v-model="menuForm.perms" />
        </el-form-item>
        <el-form-item label="资源路径" prop="component">
          <el-input v-model="menuForm.component" />
        </el-form-item>
        <el-form-item label="路由">
          <el-input v-model="menuForm.url" />
        </el-form-item>
        
        <el-form-item label="排序">
          <el-input
            v-model="menuForm.orderNum"
            type="number"
            @keydown.native="inputNamber"
          />
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-select v-model="menuForm.icon" filterable clearable>
            <el-option
              v-for="(icon, index) in icons"
              :key="index"
              :label="icon"
              :value="icon"
            >
              <span style="float: left">{{ icon }}</span>
              <span style="font-size: 20px; float: right">
                <svg-icon class="el-icon"
                  :icon="icon.indexOf('svg-icon') != -1?icon.slice(9):icon"
                />
              </span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio v-model="menuForm.is_hidden" :label="0">显示</el-radio>
          <el-radio v-model="menuForm.is_hidden" :label="1">影藏</el-radio>
        </el-form-item>
        <el-form-item label="菜单描述">
          <el-input type="textarea" rows="3" v-model="menuForm.menu_desc" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="menuForm_serve">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { showLoading, confirm } from "@/utils";
import icons from "./icon";
import { assembleTree } from "../../utils/BaseUtil";
export default {
  name: "menuManage",
  data() {
    return {
      isFold: false,
      menuTable: true,
      tableData: [],
      menuTree: null,
      queryInfo: {},
      dialogVisible: false,
      dialogData: {
        title: "新增",
        parent: false,
      },
      menuForm: {},
      menuRole: {
        menu_type: [
          { required: true, message: "请选择菜单类型", trigger: "change" },
        ],
        menu_title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
        ],
        perms: [{ required: true, message: "请输入权限标识", trigger: "blur" }],
        component: [{ required: true, message: "请输入资源路径", trigger: "blur" }],
      },
      defaultProps: {
        children: "children",
        label: "menu_title",
      },
    };
  },
  computed: {
    expandedKeys() {
      const id = this.menuForm.parent_id;
      if (id) return [id];
      return [];
    },
    icons() {
      return icons;
    },
  },
  watch: {
    isFold() {
      this.menuTable = false;
      this.$nextTick(() => {
        this.menuTable = true;
      });
    },
    async "menuForm.parent_id"(v) {
      if (!v) {
        this.menuForm.parent_id = 0;
        this.menuForm.parent_name = "主目录";
      }
      this._reset(v);
    },
  },
  mounted() {
    this.seach_query();
  },

  methods: {
    ...mapActions("system", ["getList", "preservation", "rome","setMenuEna"]),
    async seach_query() {
      showLoading(true);
      let data = await this.getList({ ...this.queryInfo });
      this.tableData = assembleTree(data);
    },
    async modify(row) {
      showLoading(true);
      this.menuTree = assembleTree(await this.getList());
      this.dialogData.parent = false;
      if (!row.parent_id) {
        row.parent_name = "主目录";
      }
      this.dialogVisible = true;
      this.dialogData.title = "修改";
      this.menuForm = { ...row };
    },
    // 启用菜单
    async changeEna(row) {
      await this.setMenuEna({ id: row.id });
      this.seach_query();
    },
    async showDialogAdd(row) {
      if (!row.id) {
        showLoading(true);
        this.menuTree = assembleTree(await this.getList());
      }
      this.$set(this.menuForm, "parent_id", 0);
      this.dialogData.parent = false;
      if (row) {
        this.$set(this.menuForm, "parent_id", row.id);
        this.$set(this.menuForm, "parent_name", row.menu_title);
        this.$set(this.menuForm, "parent_type", row.menu_type);
        this.dialogData.parent = true;
      }
      this.menuForm.is_hidden = 0;
      this.dialogVisible = true;
    },
    // 保存菜单
    menuForm_serve() {
      this.$refs["menuForm"].validate(async (valid) => {
        if (!valid) {
          return false;
        }
        showLoading("正在保存");
        let res = await this.preservation({ ...this.menuForm });
        if (res.type === "success") {
          this.handleClose();
          this.seach_query();
        }
      });
    },
    romeMenu(id) {
      confirm("确定删除此目录及其子目录吗?", "警告", {
        ok: async () => {
          showLoading("正在删除");
          await this.rome({ id });
          this.seach_query();
        },
      });
    },
    // 选择跟目录
    _reset(value) {
      this.$nextTick(() => {
        if (value) {
          this.$refs["el-select-tree"].setCheckedKeys([value]);
        } else {
          // 清空选中
          this.$refs["el-select-tree"].setCheckedKeys([]);
        }
      });
    },

    _check(row) {
      this.$set(this.menuForm, "parent_id", row.id);
      this.$set(this.menuForm, "parent_name", row.menu_title);
      this.$set(this.menuForm, "parent_type", row.menu_type);
      // 收起下拉列表
      this.$refs["el-tree-select"].blur();
    },

    handleClose() {
      this.menuForm = {};
      this.$refs["menuForm"].resetFields();
      this.$nextTick(() => {
        this.dialogVisible = false;
      });
    },
    reset_query() {
      this.queryInfo = {};
    },
    // 只能输入数字
    inputNamber(e) {
      if (!/\d/.test(e.key) && e.key != "Backspace") {
        e.returnValue = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.green {
  color: #fff;
  display: inline-block;
  width: 100%;
  text-align: center;
  border-radius: 3px;
  background: #30b08f;
}
.icon{
  width: 1em;
  height: 1em;
  display: inline-block
}
.blue {
  @extend .green;
  background: #3a71a8;
}
.ym {
  @extend .green;
  background: #8d8dd1;
}
.dark {
  @extend .green;
  background: #545c64;
}
</style>
