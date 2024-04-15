<!-- 访客管理 -->
<template>
  <div class="table-page">
    <!-- 搜索 -->
    <div class="queryInfo">
      <el-row :gutter="20">
        <el-col :sm="8" :md="6">
          <el-input clearable v-model.trim="queryInfo.params.userAccount" size="small" placeholder="请输入用户账号" />
        </el-col>
        <el-col :sm="8" :md="6">
          <el-select
            v-model="queryInfo.params.type"
            size="small"
            clearable
            placeholder="请选择项目类型"
          >
            <el-option label="小程序" value="0" />
            <el-option label="客户端" value="1" />
          </el-select>
        </el-col>
        <el-col :sm="8" :md="6">
          <el-input clearable v-model.trim="queryInfo.params.ipaddr" size="small" placeholder="请输入ip" />
        </el-col>
        <el-col :sm="8" :md="6">
          <el-button
            v-permission="'query'"
            type="primary"
            size="small"
            @click="handleSizeChange()"
            >搜索</el-button
          >
          <el-button size="small" @click="reset_query">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="main_list">
      <el-table ref="userData" :data="data_list" row-key="id" border size="mini">
        <el-table-column label="登录时间" width="150" show-overflow-tooltip>
          <template v-slot="{ row }">
            <span>{{ row.createdAt | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userAccount" label="用户账号" />
        <el-table-column prop="browser" label="浏览器" />
        <el-table-column prop="os" label="操作系统" show-overflow-tooltip />
        <el-table-column prop="ipaddr" label="IP" />
        <el-table-column
          prop="loginLocation"
          label="访问地址"
          show-overflow-tooltip
        />
        <el-table-column label="项目类型" width="80" align="center">
          <template v-slot="{ row }">
            <el-tag v-if="row.type == 1" effect="dark" type="success"
              >客户端</el-tag
            >
            <el-tag v-if="row.type == 0" effect="dark">小程序</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="count"
          label="登录次数"
          width="80"
          align="center"
        />
        <el-table-column label="最后登录时间" show-overflow-tooltip>
          <template v-slot="{ row }">
            <span>{{ row.updatedAt | dateFormat }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        hide-on-single-page
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.offset"
        :page-sizes="[15, 20, 30]"
        :page-size="queryInfo.limit"
        layout="sizes, prev, pager, next,total"
        :total="total"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { showLoading, confirm, showError } from "@/utils";
import { matchCode, matchEmail, matchPhone } from "@/utils/RegExpUtil";
import { useRouter } from "vue-router";
export default {
  name: "",
  data() {
    return {
      total: 0,
      queryInfo: {
        params: {},
        limit: 15,
        offset: 1,
      },
      data_list: [],
    };
  },
  mounted() {
    this.seach_query();
  },
  methods: {
    ...mapActions("system", ["visitorInfo"]),
    async seach_query() {
      showLoading("加载中");
      let res = await this.visitorInfo({
        ...this.queryInfo,
        sort: { prop: "createdAt", order: "desc" },
      });
      this.data_list = res.data;
      this.total = res.count;
    },
    handleSizeChange(v) {
      this.queryInfo.limit = v || this.queryInfo.limit;
      this.queryInfo.offset = 1;
      this.seach_query();
    },
    handleCurrentChange(v) {
      this.queryInfo.offset = v;
      this.seach_query();
    },
    handleClose() {
      this.checkRulesList = [];
      (this.roleShowId = null), (this.userRow = {});
      this.roleShow = false;
      this.dialogShow = false;
      this.seach_query();
    },
    reset_query() {
      this.queryInfo = {
        params: {},
        limit: 15,
        offset: 1,
      };
    },
  },
};
</script>
