<!-- 菜单管理 -->
<template>
  <div class="table-page">
    <!-- 搜索 -->
    <div class="queryInfo">
      <el-row :gutter="20" class="">
        <el-col :sm="8" :md="6">
          <el-input
            v-model.trim="queryInfo.params.title"
            clearable
            size="small"
            placeholder="请输入菜单名称"
          ></el-input>
        </el-col>
        <el-col :sm="8" :md="6">
          <el-input
            v-model.trim="queryInfo.params.parentId"
            clearable
            size="small"
            placeholder="请输入父级ID"
          />
        </el-col>
        <el-col :sm="8" :md="6">
          <el-select
            v-model="queryInfo.params.menuType"
            size="small"
            clearable
            placeholder="请选择菜单状态"
          >
            <el-option label="目录" value="M" />
            <el-option label="页面" value="C" />
            <el-option label="按钮" value="B" />
          </el-select>
        </el-col>
        <el-col :sm="8" :md="6">
          <el-button
            v-permission="'query'"
            type="primary"
            size="small"
            @click="seach_query()"
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
        <el-button type="primary" size="small" @click="isFold = !isFold">
          <i class="el-icon-sort" style="transform: rotate(90deg)"></i>
          展开/折叠</el-button
        >
      </div>
      <el-table
        v-if="menuTable"
        border
        ref="menuTable"
        content="content"
        size="small"
        row-key="id"
        :data="tableData"
        :default-expand-all="isFold"
      >
        <el-table-column prop="id" label="ID" show-overflow-tooltip />
        <el-table-column
          prop="parentId"
          label="父级ID"
          show-overflow-tooltip
          width="60"
          align="center"
        />
        <el-table-column label="菜单名称">
          <template v-slot="{ row }">
            <span class="icon">
              <svg-icon v-if="row.icon" :icon="row.icon" />
            </span>
            {{ row.title }}
          </template>
        </el-table-column>
        <el-table-column prop="path" label="菜单路径" show-overflow-tooltip />
        <el-table-column
          prop="authority"
          label="权限标识"
          show-overflow-tooltip
        />
        <el-table-column
          prop="orderNum"
          label="排序"
          width="50"
          align="center"
        />
        <el-table-column label="类型" width="60" align="center">
          <template v-slot="{ row }">
            <el-tag v-if="row.menuType == 'M'" effect="dark" type="success"
              >目录</el-tag
            >
            <el-tag v-if="row.menuType == 'C'" effect="dark">页面</el-tag>
            <el-tag v-if="row.menuType == 'B'" type="warning" effect="dark"
              >按钮</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="可见" width="60" align="center">
          <template v-slot="{ row }">
            <el-tag v-if="!row.isShow" type="warning" effect="dark"
              >影藏</el-tag
            >
            <el-tag v-else type="success" effect="dark">显示</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="可用" width="62" align="center">
          <template v-slot="{ row }">
            <el-switch
              v-permission="'state'"
              v-model="row.state"
              @change="changeEna(row)"
              :active-value="false"
              :inactive-value="true"
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template v-slot="{ row }">
            <el-button
              v-permission="'update'"
              type="text"
              size="mini"
              class="textyell"
              @click="modify(row)"
              >修改</el-button
            >
            <el-button
              v-permission="'add'"
              v-show="row.menuType != 'B'"
              type="text"
              size="mini"
              @click="showDialogAdd(row)"
              >新增</el-button
            >
            <el-button
              v-permission="'delete'"
              type="text"
              size="mini"
              class="textRed"
              @click="romeMenu(row)"
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
            v-model="menuForm.parentId"
            :disabled="dialogData.parent"
            clearable
            ref="el-tree-select"
            placeholder="请选择"
          >
            <el-option label="主目录" :value="1" />
            <el-option
              :value="menuForm.parentId"
              :label="menuForm.parent_name"
              class="el-tree-select-option"
            >
              <el-tree
                class="el-tree-select-dropdown"
                ref="el-select-tree"
                :data="menuTree"
                show-checkbox
                node-key="id"
                check-strictly
                :check-on-click-node="false"
                :default-expanded-keys="[menuForm.parentId]"
                :props="defaultProps"
                @check="_check"
              ></el-tree>
              <!-- @check="_check" -->
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" prop="menuType">
          <el-radio-group v-model="menuForm.menuType">
            <el-radio label="M">目录</el-radio>
            <el-radio label="C">页面</el-radio>
            <el-radio label="B">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称" prop="title">
          <el-input v-model.trim="menuForm.title" />
        </el-form-item>
        <el-form-item label="菜单路径" prop="path">
          <el-input v-model="menuForm.path" />
        </el-form-item>
        <el-form-item label="权限标识" prop="authority">
          <el-input v-model.trim="menuForm.authority" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input
            v-model.trim="menuForm.orderNum"
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
                <svg-icon
                  class="el-icon"
                  :icon="icon.indexOf('svg-icon') != -1 ? icon.slice(9) : icon"
                />
              </span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio v-model="menuForm.isShow" :label="true">显示</el-radio>
          <el-radio v-model="menuForm.isShow" :label="false">影藏</el-radio>
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
import { showLoading, confirm, showMessage } from "@/utils";
import icons from "./icon";
import { assembleTree, deepCopy } from "../../utils/BaseUtil";
export default {
  name: "menuManage",
  data() {
    return {
      isFold: false,
      menuTable: true,
      menuData: [],
      tableData: [],
      menuTree: null,
      queryInfo: {
        params: {},
      },
      dialogVisible: false,
      dialogData: {
        title: "新增",
        parent: false,
      },
      menuForm: {},
      menuRole: {
        menuType: [
          { required: true, message: "请选择菜单类型", trigger: "change" },
        ],
        title: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        path: [{ required: true, message: "请输入菜单路径", trigger: "blur" }],
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  computed: {
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
    "menuForm.parentId"(v) {
      this._reset(v);
    },
  },
  mounted() {
    this.seach_query();
  },

  methods: {
    ...mapActions("system", [
      "getList",
      "preservation",
      "menusRome",
      "menusState",
    ]),
    async seach_query() {
      showLoading(true);
      let { data } = await this.getList({ ...this.queryInfo });
      this.menuData = deepCopy(data);
      this.menuTree = assembleTree(deepCopy(data));
      this.tableData = assembleTree(data, false);
    },
    async modify(row) {
      this.menuForm = { ...row };
      this.dialogData.parent = false;
      this.dialogVisible = true;
      this.dialogData.title = "修改";
      if (row.parentId == 1) {
        this.$set(this.menuForm, "parent_name", "主目录");
      } else {
        let parent = this.menuData.filter((item) => item.id === row.parentId);
        this.$set(this.menuForm, "parent_name", parent[0].title);
      }
    },
    // 启用菜单
    async changeEna(row) {
      await this.menusState({ id: row.id });
      this.seach_query();
    },
    async showDialogAdd(row) {
      this.$set(this.menuForm, "parentId", 1);
      this.$set(this.menuForm, "parent_name", "主目录");
      this.$set(this.menuForm, "menuType", "M");
      this.dialogData.parent = false;
      if (row) {
        this.$set(this.menuForm, "parentId", row.id);
        this.$set(this.menuForm, "parent_name", row.title);
        this.$set(this.menuForm, "menuType", row.menuType == "M" ? "C" : "B");
        this.dialogData.parent = true;
      }
      this.$set(this.menuForm, "isShow", true);
      this.dialogVisible = true;
    },
    // 保存菜单
    menuForm_serve() {
      this.$refs["menuForm"].validate(async (valid) => {
        if (!valid) {
          return false;
        }
        showLoading("正在保存");
        this.menuForm.children = [];
        await this.preservation({ ...this.menuForm });
        this.handleClose();
      });
    },
    getAllIds(row) {
      let ids = [];
      if (row.id) {
        // 如果当前行有id，则将其添加到ids数组中
        ids.push(row.id);
      }
      if (row.children && row.children.length > 0) {
        // 如果当前行有子元素，则递归检查每个子元素
        row.children.forEach((child) => {
          ids = [...ids, ...this.getAllIds(child)]; // 将子元素的所有id合并到ids数组中
        });
      }
      return ids;
    },
    romeMenu(row) {
      confirm("确定删除此目录及其子目录吗?", "警告", {
        ok: async () => {
          showLoading("正在删除");
          await this.menusRome({ id: this.getAllIds(row) });
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

    _check(row, data) {
      this.$set(this.menuForm, "parentId", row.id);
      this.$set(this.menuForm, "parent_name", row.title);
      this.$set(this.menuForm, "menuType", row.menuType);
      // 收起下拉列表
      this.$refs["el-tree-select"].blur();
    },

    handleClose() {
      this.menuForm = {};
      this.$refs["menuForm"].resetFields();
      this.$nextTick(() => {
        this.dialogVisible = false;
        this.seach_query();
      });
    },
    reset_query() {
      this.queryInfo = {
        params: {},
      };
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
  user-select: none;
  text-align: center;
  border-radius: 3px;
  background: #30b08f;
}
.icon {
  width: 1em;
  height: 1em;
  display: inline-block;
}
</style>
