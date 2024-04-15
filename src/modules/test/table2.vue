<!-- 表格页模板 -->
<template>
  <div class="table-page">
    <!-- 搜索 -->
    <div class="queryInfo">
      <el-row :gutter="20">
        <el-col :sm="8" :md="6" :lg="4">
          <el-input
            v-model="queryInfo.params.name"
            size="small"
            placeholder="请输入名称"
          />
        </el-col>
        <el-col :sm="8" :md="6" :lg="4">
          <el-select
            v-model="queryInfo.params.select"
            size="small"
            clearable
            placeholder="请选择"
          >
            <el-option label="选项1" value="1" />
            <el-option label="选项2" value="2" />
            <el-option label="选项3" value="3" />
          </el-select>
        </el-col>
        <el-col :sm="8" :md="6">
          <el-date-picker
            v-model="queryInfo.params.time"
            type="daterange"
            size="small"
            :clearable="false"
            placement="bottom-start"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="创建日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="2" :xs="4">
          <el-button
            v-permission="'query'"
            type="primary"
            size="small"
            @click="handleSizeChange()"
            >搜索</el-button
          >
        </el-col>
        <el-col :span="2" :xs="4">
          <el-button size="small" @click="reset_query()">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <ScreenTable
      :list="tableList"
      :table="tableData"
      :current-page="queryInfo.offset"
      :pageSize="queryInfo.limit"
      :max-height="600"
      :border="true"
      :total="total"
      :selection="true"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
      @selectionChange="selectionChange"
      @tableSort="tableSort"
    >
      <div slot="btns">
        <el-button
          type="primary"
          icon="el-icon-export"
          size="small"
          @click="groupAdd(0)"
          >新增
        </el-button>
        <el-button
          v-permission="'update'"
          type="warning"
          icon="el-icon-edit"
          size="small"
          @click="editRole"
          >修改</el-button
        >
        <el-button
          v-permission="'delete'"
          type="danger"
          icon="el-icon-delete"
          size="small"
          @click="remove(0)"
          >删除</el-button
        >
      </div>
      <div slot="state">
        <el-table-column label="角色状态" width="100" align="center">
          <template v-slot="{ row }">
            <el-switch
              v-model="row.state"
              @change="changeEna(row)"
              :active-value="false"
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
          </template>
        </el-table-column>
      </div>
      <div slot="operate">
        <el-table-column label="操作" width="100" align="center">
          <template v-slot="{ row }">
            <el-button
              v-permission="'update'"
              type="text"
              size="mini"
              class="textyell"
              @click="groupAdd(row)"
              >修改</el-button
            >
            <el-button
              v-permission="'delete'"
              type="text"
              size="mini"
              class="textRed"
              @click="remove(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </div>
    </ScreenTable>
    <!-- 新增修改 -->
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      width="30%"
      :before-close="dialogClose"
    >
      <el-form
        :model="addFormData"
        :rules="formRules"
        ref="addFormData"
        label-width="80px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="addFormData.title" />
        </el-form-item>
        <el-form-item label="名字" prop="name">
          <el-input v-model="addFormData.name" />
        </el-form-item>
        <el-form-item label="选项">
          <el-select v-model="addFormData.select">
            <el-option label="选项1" :value="0" />
            <el-option label="选项2" :value="1" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="severDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { showLoading, confirm, showError } from "@/utils";
export default {
  components: {},
  data() {
    return {
      total: 0,
      pickerOptions: {
        disabledDate(time) {
          //   return time.getTime() > Date.now() - 8.64e7;  // 今天不可选
          return time.getTime() > Date.now();
        },
      },
      dialog: {
        title: "新增",
        show: false,
      },
      queryInfo: {
        params: {},
        limit: 15,
        offset: 1,
        sort: { prop: "createdAt", order: "desc" },
      },
      tableList:[
        {label:"角色名称",prop:"roleName",width:"100"},
        {label:"角色描述",prop:"roleDesc",showOverflowTooltip:true},
        {label:"角色状态",slot:"state"},
        {label:"角色状态",type: "tag",width:"90", prop:"state",tag:{
          'true':{label:"禁用",type:'danger',size:'small'},
          'false':{label:"启用",type:'text'}
        }},
        {label:"创建时间",prop:"createdAt",type:"time",timeFormat:"YYYY-MM-DD"},
        {label:"修改时间",prop:"updatedAt",type:"time",sort:"desc",sortable:"startUpdatedAt"},
        {label:"操作",slot:"operate"}
      ],
      tableData: [],
      check: [],
      addFormData: {},
      formRules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
      },
    };
  },
  computed: {
    // ...mapState("", [""]),
  },
  mounted() {
    this.seach_query();
  },

  methods: {
     ...mapActions("system", [
      "rolesList",
      "setEna",
      "rolesSeve",
      "rolesRome",
    ]),
    // 搜索
    async seach_query() {
      showLoading("加载中");
      if (this.queryInfo.params.time) {
        this.queryInfo.params.endTime = this.$dateFormat(
          this.queryInfo.params.time[1]
        ).replace(/00:00:00/, "23:59:59");
        this.queryInfo.params.startTime = this.$dateFormat(
          this.queryInfo.params.time[0]
        );
      }
      let res = await this.rolesList({
        ...this.queryInfo,
      });
      this.tableData = [...res.data,...res.data,...res.data,...res.data,...res.data];
      this.total = 27;
    },
    // 新增修改
    groupAdd(row) {
      if (row) {
        this.addFormData = { ...row };
        this.dialog.title = "修改";
      } else {
        this.dialog.title = "新增";
        this.addFormData.ena = 0;
      }
      this.dialog.show = true;
    },
    // 修改
    editRole() {
      if (this.check.length != 1) return showError("请选择一条要修改的数据");
      this.groupAdd(this.check[0]);
    },
    // 删除
    remove(id) {
      if (!id && !this.check.length) return showError("请选择要删除的数据");
      confirm("确认删除", "提示", {
        ok: async () => {
          showLoading("正在删除");
          let _id = [];
          this.check.forEach((item) => {
            _id.push(item.id);
          });
          await this.rolesRome({ id: id ? [id] : _id });
          this.seach_query();
        },
      });
    },
    // 保存
    severDialog() {
      this.$refs["addFormData"].validate(async (valid) => {
        if (!valid) return false;
        showLoading(true);
        await this.rolesSeve(this.addFormData);
        this.dialogClose();
      });
    },

    selectionChange(val) {
      this.check = [...val];
    },

    reset_query() {
      this.queryInfo = {
        params: {},
        limit: 15,
        offset: 1,
        sort: { prop: "createdAt", order: "desc" },
      };
    },
    dialogClose() {
      this.dialog.show = false;
      this.addFormData = {};
      this.$refs["addFormData"].resetFields();
      this.seach_query();
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
    tableSort(value,label) {
      this.queryInfo[label.sortable] = value;
      this.seach_query();
      this.tableList.forEach(item=>{
        if(item.prop===label.prop){
          item.sort=value;
        }
      })
      this.$nextTick(() => {
        this.$forceUpdate();
      });
    },
  },
};
</script>
