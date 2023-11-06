<template>
  <div class="main_list">
    <div class="button_group">
      <slot name="btns"></slot>
      <el-popover
        placement="bottom"
        width="100"
        trigger="click"
        v-model="showPopover"
      >
        <el-button
          slot="reference"
          icon="el-icon-s-operation"
          size="small"
          style="float: right"
        ></el-button>
        <el-checkbox-group v-model="checkList" class="checkbox-wrap">
          <el-checkbox
            v-for="(item, idx) in list"
            :key="idx"
            :label="item.label"
          />
        </el-checkbox-group>
        <div style="text-align: center; margin-top: 15px">
          <el-button type="primary" size="mini" @click="_ok">确 定</el-button>
        </div>
      </el-popover>
    </div>
    <el-table :data="table" :height="height" :max-height="maxHeight" :border="border" v-if="showTable" @selection-change="selectionChange">
    <el-table-column type="selection" width="55" v-if="selection" />
    <el-table-column width="1" v-show="false"></el-table-column>
      <template v-for="(item, index) in showList">
        <div :key="index" v-if="item.isShow">
          <template v-if="!item.slot">
            <el-table-column
              v-if="item.isShow"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :align="item.align"
              :show-overflow-tooltip="item.showOverflowTooltip"
            >
             <template v-slot="{row}">
              <span v-if="item.isTime">{{ row[item.prop] | dateFormat(item.timeFormat || "YYYY-MM-DD HH:mm:ss") }}</span>
              <span v-else>{{row[item.prop]}}</span>
             </template>
            </el-table-column>
          </template>
            <template v-if="item.slot">
              <slot :name="item.slot"></slot>
            </template>
        </div>
      </template>
    </el-table>
    <el-pagination
      hide-on-single-page
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="sizes, prev, pager, next,total"
      :total="total"
    />
  </div>
</template>

<script>
import { showMessage, showError } from "@/utils";
import { getLocalStorage, setLocalStorage } from "../utils/ProjectTools";
export default {
  name: "ScreenTable",
  props: {
    list: {
      type: Array,
      required: true,
      default: () => [],
    },
    height:{
      type:[Number,String],
      default:null,
    },
    maxHeight:{
      type:[Number,String],
      default:null,
    },
    border: {
      type: Boolean,
      default: false,
    },
    selection: {
      type: Boolean,
      default: false,
    },
    table: {
      type: Array,
      required: true,
      default: () => [
        {
          label:"表头",
          prop:"label",
          width:"100",
          align:"center",
          showOverflowTooltip:true,
          // slot:'slotName' // 插槽名称
          // isTime:true, // 是为否时间
        }
      ],
    },
    // 分页数据
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 0,
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30],
    },
    layout: {
      type: String,
      default: "sizes, prev, pager, next,total",
    },
  },
  data() {
    return {
      showList: [],
      checkList: [],
      showTable: true,
      showPopover: false,
    };
  },
  mounted() {
    // 获取当前路由
    this.path = this.$route.path;
    let _list = getLocalStorage(this.path);
    if (_list) {
      console.log('_list===', _list)
      this.checkList = JSON.parse(_list);
      this.list.forEach((item) => {
        this.showList.push({ ...item, isShow: _list.includes(item.label) });
      });
    } else {
      this.checkList = this.list.map((i) => i.label);
      this.list.forEach((item) => {
        this.showList.push({ ...item, isShow: true });
      });
    }
  },
  methods: {
    _ok() {
      if (!this.checkList.length) return showError("最少有一列");
      this.showTable = false;
      // 将所有isShow 设置为true
      this.showList.forEach((item) => {
        item.isShow = this.checkList.includes(item.label);
      });
      setLocalStorage(this.path, JSON.stringify(this.checkList));
      this.$nextTick(() => {
        this.showTable = true;
        this.showPopover = false;
      });
      showMessage("保存成功");
    },
    selectionChange(val) {
      this.$emit("selectionChange", val);
    },
    handleCurrentChange(v) {
      this.$emit("handleCurrentChange", v);
    },
    handleSizeChange(v) {
      this.$emit("handleSizeChange", v);
    },
  },
};
</script>

<style lang="scss" scoped>
.main_list {
  .button_group {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
