<!-- 字典管理 -->
<template>
  <div>
    <div class="main_list">
      <!-- 按钮组 -->
      <div class="button_group">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="showDialogAdd(0)"
          >新增</el-button
        >
      </div>
      <el-table border size="small" row-key="id" :data="tableData">
        <el-table-column prop="zd_title" label="名称" />
        <el-table-column prop="module" label="数值" />
        <el-table-column prop="zd_desc" label="描述" />
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button type="text" size="mini" @click="showDialogAdd(row)"
              >修改</el-button
            >
            <el-button
              type="text"
              size="mini"
              class="textRed"
              @click="rome(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="40%"
      :before-close="handleClose"
    >
      <el-form
        :model="form"
        status-icon
        :rules="role"
        ref="form"
        label-width="100px"
      >
        <el-form-item label="名称" prop="zd_title">
          <el-input v-model="form.zd_title" />
        </el-form-item>
        <el-form-item label="数值" prop="module">
          <el-input
            v-model="form.module"
            type="number"
            :disabled="!!form.id"
            @keydown.native="inputNamber"
          />
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" rows="3" v-model="form.zd_desc" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="form_serve">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { showLoading, confirm } from "@/utils";
export default {
  name: "menuManage",
  data() {
    let moduleRule = (rule, value, callback) => {
      this.tableData.forEach((item) => {
        if (item.module === value && this.form.id !==item.id) {
          callback(new Error("此数值已存在"));
        }
      });
      callback();
    };
    return {
      menuTable: true,
      tableData: [],
      dialogVisible: false,
      title: "新增",
      form: {},
      role: {
        zd_title: [{ required: true, message: "请输入名称", trigger: "blur" }],
        module: [
          { required: true, message: "请输入字典数值", trigger: "blur" },
          { validator: moduleRule, trigger: "blur" },
        ],
      },
      defaultProps: {
        children: "children",
        label: "menu_title",
      },
    };
  },
  mounted() {
    this.seach_query();
  },

  methods: {
    ...mapActions("system", ["getZdList", "zdRome", "zdModify"]),
    async seach_query() {
      showLoading(true);
      this.tableData = await this.getZdList();
    },

    // 修改新增
    async showDialogAdd(row) {
      this.form = {};
      this.title = "新增";
      if (row) {
        this.title = "修改";
        this.form = { ...row };
      }
      this.dialogVisible = true;
    },
    // 保存菜单
    form_serve() {
      this.$refs["form"].validate(async (valid) => {
        if (!valid) {
          return false;
        }
        showLoading("正在保存");
        console.log(this.form);
        let res = await this.zdModify({ ...this.form });
        if (res.type === "success") {
          this.handleClose();
          this.seach_query();
        }
      });
    },
    rome(id) {
      confirm("确定删除?", "警告", {
        ok: async () => {
          showLoading("正在删除");
          await this.zdRome({ id });
          this.seach_query();
        },
      });
    },
    handleClose() {
      this.form = {};
      this.$refs["form"].resetFields();
      this.$nextTick(() => {
        this.dialogVisible = false;
      });
    },
    // 只能输入数字
    inputNamber(e) {
      if (!/\d/.test(e.key) && e.key != "Backspace") {
        e.returnValue = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.green {
  color: #fff;
  display: inline-block;
  width: 100%;
  text-align: center;
  border-radius: 3px;
  background: #30b08f;
}
.blue {
  @extend .green;
  background: #3a71a8;
}
.ym {
  @extend .green;
  background: #8d8dd1;
}
.dark {
  @extend .green;
  background: #545c64;
}
</style>
