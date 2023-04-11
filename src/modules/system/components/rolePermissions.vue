<!-- 角色权限 -->
<template>
  <el-dialog
    :title="title"
    center
    :visible.sync="show"
    width="30%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="handleClose"
  >
    <el-input
      placeholder="输入关键字进行过滤"
      size="small"
      v-model="filterText"
    />
    <el-tree
      ref="tree"
      :data="menuList"
      show-checkbox
      node-key="id"
      :props="defaultProps"
      :default-expanded-keys="expandedKeys"
      check-strictly
      :filter-node-method="filterNode"
    >
    </el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="_sever">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapActions } from "vuex";
import { assembleTree } from "../../../utils/BaseUtil";
import { showLoading, confirm, showError } from "@/utils";
export default {
  name: "",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    id: Number,
    title: {
      type: String,
      default: "角色权限",
    },
  },
  data() {
    return {
      menuList: [],
      filterText: "",
      defaultProps: {
        children: "children",
        label: "menu_title",
      },
      expandedKeys: [],
    };
  },
  computed: {},
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  mounted() {
    this.init();
  },

  methods: {
    ...mapActions("system", ["getList", "jurisdiction", "modifyJurisdiction"]),
    async init() {
      showLoading(true);
      // 获取所有目录权限
      this.menuList = assembleTree(await this.getList());
      // 获取当前角色的权限，
      showLoading(true);
      let res = await this.jurisdiction({ url: "menu", id: this.id });
      this.expandedKeys = res;
      this.$refs.tree.setCheckedKeys([...res]);
    },
    // 过滤树结构
    filterNode(value, data) {
      if (!value) return true;
      return data.menu_title.indexOf(value) !== -1;
    },
    async _sever() {
      showLoading("正在保存");
      await this.modifyJurisdiction({
        url: "menu",
        id: this.id,
        key: this.$refs.tree.getCheckedKeys().join(","),
      });
      this.handleClose();
    },
    handleClose() {
      this.$refs.tree.setCheckedKeys([]);
      this.expandedKeys = [];
      this.$emit("_close");
    },
  },
};
</script>

<style lang="scss" scoped></style>
