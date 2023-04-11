<template>
  <div class="myTable">
    <table border="1" cellspacing="0">
      <tr>
        <th v-if="showIndex">序号</th>
        <th v-for="(tit, i) in title" :key="i">
          {{ tit.name || tit.slotName }}
        </th>
      </tr>
      <tr v-for="(item, index) in data" :key="index">
        <td v-if="showIndex">{{ index + 1 }}</td>
        <td v-for="(tit, i) in title" :key="i">
          <template v-if="tit.slotName">
            <slot :name="tit.slotName" :data="item"></slot>
          </template>
          <template v-else-if="tit.formatter">{{
            tit.formatter(item[tit.value])
          }}</template>
          <template v-else>{{ item[tit.value] }}</template>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    title: {
      type: Array,
      required: true,
    },
    showIndex: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.myTable {
  width: 100%;
  overflow: auto;
  table {
    background: #fff;
    min-width: 100%;
    border-color: #ebeef5;
    text-align: center;
    white-space: nowrap;
    font-size: 14px;
    tr {
      &:not(:first-child):hover {
        background: #f5f7fa;
      }
      th {
        color: #909399;
        line-height: 3;
      }
      td {
        padding: 10px;
        color: #606266;
      }
    }
  }
}
</style>
