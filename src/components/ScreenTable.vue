<template>
  <div class="main_list">
    <div class="button_group">
      <slot name="btns"></slot>
      <el-popover
          v-if="screen"
          placement="bottom"
          trigger="click"
          max-width="150"
          v-model="showPopover"
      >
        <el-button
            slot="reference"
            icon="el-icon-s-operation"
            size="small"
            style="float: right"
        ></el-button>
        <el-checkbox-group v-model="checkList" style="max-height: 60vh; overflow: auto">
          <div v-for="(item, idx) in list"
               :key="idx">
            <el-checkbox

                :label="item.label"
            />
          </div>
        </el-checkbox-group>
        <div style="text-align: center; margin-top: 15px">
          <el-button type="primary" size="mini" @click="_ok">确 定</el-button>
        </div>
      </el-popover>
    </div>
    <el-table
        :data="table"
        border
        v-if="showTable"
        :size="tableSize"
        max-height="700"
    >
      <el-table-column width="1" v-show="false"></el-table-column>
      <template v-for="(item, index) in showList">
        <div :key="index" v-if="item.isShow">
          <template v-if="item.sortable">
            <el-table-column
                v-if="item.isShow"
                :width="item.minWidth?'':item.width"
                :min-width="item.minWidth"
                :prop="item.prop"
                :show-overflow-tooltip="item.showOverflowTooltip"
                :align="item.align"
            >
              <template slot="header" slot-scope="scope">
                <div class="sortable">
                  <div>{{ item.label }}</div>
                  <div class="btns" :data-sort="item.sort">
                    <span
                        :class="{ active: item.sort === 'desc' }"
                        @click="_sort('desc', item, scope)"
                    ><i class="el-icon-caret-bottom"></i
                    ></span>
                    <span
                        :class="{ active: item.sort === 'asc' }"
                        @click="_sort('asc', item, scope)"
                    ><i class="el-icon-caret-top"></i
                    ></span>
                  </div>
                </div>
              </template>
              <template v-slot="{ row }" v-if="item.type=='time'">
                <div>
                  {{ row[item.prop] | dateFormat(item.format) }}
                </div>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="!item.slot &&!['time','tag'].includes(item.type)">
            <el-table-column
                :prop="item.prop"
                :label="item.label"
                :width="item.minWidth?'':item.width"
                :min-width="item.minWidth"
                :align="item.align"
                :show-overflow-tooltip="item.showOverflowTooltip"
            />
          </template>
          <template v-else-if="!item.slot && item.type=='tag'">
            <el-table-column
                :prop="item.prop"
                :label="item.label"
                :width="item.minWidth?'':item.width"
                :min-width="item.minWidth"
                :align="item.align"
                :show-overflow-tooltip="item.showOverflowTooltip"
            >
              <template v-slot="{ row }">
                <el-tag v-if="['success','info','warning','danger'].includes(item.tag[row[item.prop]].type)"
                        :type="item.tag[row[item.prop]].type" :effect="item.tag[row[item.prop]].effect" :size="item.tag[row[item.prop]].size">
                  {{ item.tag[row[item.prop]].label }}
                </el-tag>
                <span v-else>
                  {{ item.tag[row[item.prop]].label }}
                </span>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="!item.slot && item.type=='time'">
            <el-table-column
                :prop="item.prop"
                :label="item.label"
                :width="item.minWidth?'':item.width"
                :min-width="item.minWidth"
                :align="item.align"
                :show-overflow-tooltip="item.showOverflowTooltip"
            >
              <template v-slot="{ row }">
                <div>
                  {{ row[item.prop] | dateFormat(item.format) }}
                </div>
              </template>
            </el-table-column>
          </template>
          <template v-if="item.slot">
            <slot :name="item.slot"></slot>
          </template>
        </div>
      </template>
    </el-table>
    <ak-pagination
        :total="total"
        :layout="layout"
        :page-size="pageSize"
        :page-sizes="pageSizes"
        :current-page="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import {showMessage, showError} from "@/utils";
import {getLocalStorage, setLocalStorage} from "../utils/ProjectTools";

export default {
  name: "ScreenTable",
  props: {
    screen: {
      type: Boolean,
      default: true,
    },
    list: {
      type: Array,
      required: true,
      default: () => [],
    },
    table: {
      type: Array,
      required: true,
      default: () => [],
    },
    tableSize: {
      type: String,
      default: "mini",
    },
    // 分页数据
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 15,
    },
    total: {
      type: Number,
      default: 0,
    },
    pageSizes: {
      type: Array,
      default: () => [15, 30, 50],
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
      showTable: false,
      showPopover: false,
    };
  },
  watch: {
    list: {
      deep: true,
      handler(newValue, oldValue) {
        this.reset();
        this.init();
      },
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 获取当前路由
      this.path = this.$route.path;
      let _list = getLocalStorage(this.path);
      if (_list) {
        this.checkList = JSON.parse(_list);
        this.list.forEach((item) => {
          this.showList.push({...item, isShow: _list.includes(item.label)});
        });
      } else {
        this.checkList = this.list.map((i) => i.label);
        this.list.forEach((item) => {
          this.showList.push({...item, isShow: true});
        });
      }
      this.$nextTick(() => {
        this.showTable = true;
        this.$forceUpdate();
      })
    },
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
    handleCurrentChange(v) {
      this.$emit("handleCurrentChange", v);
    },
    handleSizeChange(v) {
      this.$emit("handleSizeChange", v);
    },
    _sort(v, label, row) {
      if (v === label.sort) return;
      this.showTable = false;
      this.$emit("tableSort", v, label, row);
    },
    // 重置
    reset() {
      this.showList = [];
      this.checkList = [];
      this.showTable = false;
      this.showPopover = false;
    }
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

  ::v-deep .checkbox-wrap {
    // 定个高度，溢出滚动
    height: 600px;
    overflow: auto;
  }

  .screen {
    display: flex;
    align-items: center;
    justify-content: center;

    .btns {
      margin-left: 5px;

      .el-icon-caret {
        &-top,
        &-bottom {
          color: #999;
          font-size: 16px;
          cursor: pointer;
        }
      }

      .active i {
        color: #409eff;
      }
    }
  }

  .sortable {
    display: flex;
    align-items: center;
    justify-content: center;

    .btns {
      margin-left: 5px;

      .el-icon-caret {
        &-top,
        &-bottom {
          color: #999;
          font-size: 16px;
          cursor: pointer;
        }
      }

      .active i {
        color: #409eff;
      }
    }
  }
}
</style>
