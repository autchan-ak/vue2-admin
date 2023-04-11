<template>
  <div class="Informationall">
    <el-tabs v-model="activeName" @tab-click="init">
      <el-tab-pane label="通知" name="notice" />
      <el-tab-pane label="消息" name="news" />
      <el-tab-pane label="代办" name="agency" />
    </el-tabs>
    <div class="Informationall-box">
      <el-table :data="table">
        <el-table-column label="标题" prop="title" />
        <el-table-column label="状态" width="75">
          <template v-slot="{ row }">
            <span v-if="row.isRead == '1'" class="green">已查看</span>
            <span v-else class="dark">未查看</span>
          </template>
        </el-table-column>
        <el-table-column label="类型">
          <template v-slot="{ row }">
            <span v-if="row.type == 'system'">系统</span>
            <span v-if="row.type == 'friend'">好友申请</span>
            <span v-if="row.type == 'email'">邮件</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime">
          <template v-slot="{ row }">
            <p>{{ row.createTime | dateFormat }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          prop="remark"
          align="center"
          min-width="150"
        >
          <template v-slot="{ row }">
            <el-tooltip effect="dark" :content="row.remark" placement="top">
              <span class="nowrap">{{ row.remark }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="createTime">
          <template v-slot="{ row }">
            <el-button plain type="primary" size="mini" @click="tableClick(row)"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <ContactDel
      ref="contactDel"
      :uid="friend_add.create_uid"
      :friend="friend_add"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      activeName: this.$route.query.type || "notice",
      limit: 10,
      page: 1,
      id: this.$route.query.id,
      table: [],
      friend_add: {},
    };
  },
  watch: {
    "$route.query.id"(v) {
      console.log(v);
      this.activeName = this.$route.query.type;
      this.id = v;
      this.$nextTick(() => {
        this.init();
      });
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions("notification", [
      "getList",
      "getNotification",
      "notificationRead",
    ]),
    async init() {
      this.table = await this.getList({
        limit: this.limit,
        page: this.page,
        type: this.activeName,
      });
      if (this.id) {
        let row = await this.getList({
          id: this.id,
        });
        this.tableClick(row, true);
      }
    },
    tableClick(row, v = false) {
      if (row.isRead == "1" && v) return false;
      switch (row.type) {
        case "friend":
          this.friend_add = { ...row };
          this.$refs.contactDel.showDialog();
          break;
        default:
          break;
      }
      this.notificationRead({ id: row.id }).then(() => {
        this.getList();
        this.getNotification();
      });
    },
  },
};
</script>

<style>
.Informationall {
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
}
.Informationall-box {
  width: 100%;
  min-height: 100%;
  border-radius: 5px;
  box-sizing: border-box;
  background: #ffffff;
}
.Informationall-box .green,
.Informationall-box .dark {
  color: #fff;
  display: inline-block;
  width: 100%;
  text-align: center;
  border-radius: 3px;
  background: #30b08f;
}
.Informationall-box .dark {
  background: #545c64;
}
.Informationall-box .el-tabs__nav-scroll {
  justify-content: flex-start !important;
  padding-left: 15px;
  box-sizing: border-box;
}
.Informationall-list {
  width: 100%;
  height: auto;
  padding: 15px;
  box-sizing: border-box;
}
</style>
