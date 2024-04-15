<template>
  <el-pagination style="margin-top: 5px;"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    :layout="layout"
    :total="total"
  />
</template>

<script>
export default {
  name: "akPagination",
  props: {
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
      default() {
        return [15, 30, 50];
      },
    },
    layout: {
      type: String,
      default: "sizes, prev, pager, next,total",
    },
  },
  methods: {
    handleSizeChange(v) {
      this.$emit("size-change", v);
    },
    handleCurrentChange(v) {
      this.$emit("current-change", v);
    },
  },
};
</script>
