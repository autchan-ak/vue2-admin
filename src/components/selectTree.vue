<template>
    <el-select
      :title="multiple? optionData.name : ''"
      ref="select"
      :value="value"
      :placeholder="placeholder"
      size="small"
      clearable
      :disabled="disabled"
      :filterable="filterable"
      :filter-method="filterMethod"
      style="width: 100%;"
      @clear="clear"
      @visible-change="visibleChange"
    >
      <el-option
        ref="option"
        class="tree-select__option"
        :value="optionData.id"
        :label="optionData.name"
      >
        <el-tree
          ref="tree"
          class="tree-select__tree"
          :class="`tree-select__tree--${multiple ? 'checked' : 'radio'}`"
          :node-key="nodeKey"
          :data="data"
          :props="defaultProps"
          :default-expanded-keys="[value]"
          :show-checkbox="multiple"
          :highlight-current="!multiple"
          :expand-on-click-node="multiple"
          :filter-node-method="filterNode"
          @node-click="handleNodeClick"
          @check-change="handleCheckChange"
        ></el-tree>
      </el-option>
    </el-select>
  </template>
  
  <script>
import { isEmpty } from '@/utils/BaseUtil'

  export default {
    name: 'selectTree',
    props: {
      // v-model绑定
      value: {
        type: [String, Number],
        default: ''
      },
      multiple: {
        type: Boolean,
        default: false
      },
      placeholder:{
        type: [String],
        default: '请选择'
      },
      // 树形的数据
      data: {
        type: Array,
        default: () => []
      },
      // 每个树节点用来作为唯一标识的属性
      nodeKey: {
        type: [String, Number],
        default: 'id'
      },
      filterable: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      // tree的props配置
      defaultProps: {
        type: Object,
        default: function () {
          return {
            label: 'label',
            children: 'children'
          }
        }
      }
    },
    data() {
      return {
        optionData: {
          id: '',
          name: ''
        },
        filterFlag: false
      }
    },
    watch: {
      value: {
        handler(val) {
          if (!isEmpty(this.data)) {
            this.init(val)
          }
        },
        immediate: true
      },
      data: function (val) {
        if (!isEmpty(val)) {
          this.init(this.value)
        }
      }
    },
    methods: {
      handleNodeClick(data) {
        if (this.multiple) return
        this.$emit('change', data[this.nodeKey])
        this.$refs.select.visible = false
      },
      handleCheckChange() {
        const nodes = this.$refs.tree.getCheckedNodes()
        const value = nodes.map((item) => item[this.nodeKey]).join(',')
        this.$emit('change', value)
       
      },
      init(val) {
        // 多选
        if (this.multiple) {
          const arr = val.toString().split(',')
          this.$nextTick(() => {
            this.$refs.tree.setCheckedKeys(arr)
            const nodes = this.$refs.tree.getCheckedNodes()
            this.optionData.id = val
            this.optionData.name = nodes
              .map((item) => item[this.defaultProps.label])
              .join(',')
          })
        }
        // 单选
        else {
          val = val === '' ? null : val
            this.$nextTick(() => {
              this.$refs.tree.setCurrentKey(val)
              if (val === null) {
                return
              }
              const label = this.defaultProps.label || 'name'
              const node = this.$refs.tree.getNode(val)
              this.optionData.id = val
              this.optionData[label] = node.label
            })
        }
      },
      visibleChange(e) {
        if (e) {
          const tree = this.$refs.tree
          this.filterFlag && tree.filter('')
          this.filterFlag = false
          let selectDom = null
          if(this.multiple) {
            selectDom = tree.$el.querySelector('.el-tree-node.is-checked')
          } else {
            selectDom = tree.$el.querySelector('.is-current')
          }
          setTimeout(() => {
            this.$refs.select.scrollToOption({ $el: selectDom })
          }, 0)
        }
      },
      clear() {
        this.$emit('myinput', '')
      },
      filterMethod(val) {
        this.filterFlag = true
        this.$refs.tree.filter(val)
      },
      filterNode(value, data) {
        if (!value) return true
        const label = this.defaultProps.label || 'name'
        return data[label].indexOf(value) !== -1
      }
    }
  }
  </script>
  
  <style lang="scss">
  .tree-select__option {
    &.el-select-dropdown__item {
      height: auto;
      line-height: 1;
      padding: 0;
      background-color: #fff;
    }
  }
  
  .tree-select__tree {
    padding: 4px 20px;
    font-weight: 400;
    &.tree-select__tree--radio {
      .el-tree-node.is-current > .el-tree-node__content {
        // color: $mainColor;
        font-weight: 700;
      }
    }
  }
  </style>