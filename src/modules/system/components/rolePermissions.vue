<!-- 角色权限 -->
<template>
  <el-dialog
    :title="title"
    center
    :visible.sync="show"
    width="30%"
    top="5%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="handleClose"
  >
    <el-input
      placeholder="输入关键字进行过滤"
      size="small"
      v-model.trim="filterText"
    />
    <el-checkbox
      v-model="menuNodeAll"
      @change="handleCheckedTreeNodeAll($event)"
      >全选/全不选</el-checkbox
    >
    <el-scrollbar style="height: 60vh">
      <el-tree
        ref="tree"
        :data="menuList"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        :default-expanded-keys="expandedKeys"
        check-strictly
        :filter-node-method="filterNode"
      />
    </el-scrollbar>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="_sever">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { assembleTree,deepCopy } from "../../../utils/BaseUtil";
import { showLoading, confirm, showError } from "@/utils";
export default {
  name: "",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    row: {
      type: Object,
      default: () => {},
    },
    title: {
      type: String,
      default: "角色权限",
    },
  },
  data() {
    return {
      menuList: [],
      filterText: "",
      menuNodeAll: false,
      defaultProps: {
        children: "children",
        label: "title",
      },
      expandedKeys: [],
      menuOptions:[],
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  mounted() {
    this.init();
  },
  computed: {
    ...mapState("user", ["roles"]),
  },
  methods: {
    ...mapActions("system", ["getRolesMenus", "rolesSever"]),
    async init() {
      this.menuOptions = await this.getRolesMenus()
      this.menuList = assembleTree(deepCopy(this.menuOptions), false);
      this.expandedKeys = this.row.menus.map((m) => m.id);
      this.$nextTick(()=>{
        if(this.expandedKeys.length==this.menuOptions.length){
          this.menuNodeAll = true;
        }
        this.$refs.tree.setCheckedKeys([...this.expandedKeys]);
      }) 
    },
    handleCheckedTreeNodeAll(value) {
      this.$refs.tree.setCheckedNodes(value ? this.menuOptions : []);
    },
    // 过滤树结构
    filterNode(value, data) {
      if (!value) return true;
      return data.title.indexOf(value) !== -1;
    },
    async _sever() {
      showLoading("正在保存");
      await this.rolesSever({
        id: this.row.id,
        menus: this.$refs.tree.getCheckedKeys(),
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