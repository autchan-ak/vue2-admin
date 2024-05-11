<!-- 修改密码 -->
<template>
  <el-dialog
    title="修改密码"
    :visible.sync="show"
    :close-on-click-modal="false"
    :before-close="close"
    width="500px"
  >
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="旧密码" prop="usedPass">
        <el-input type="password" v-model="ruleForm.usedPass"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="setUpewd">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions } from "vuex";
import { showLoading } from "@/utils";
import { matchPasswd } from "@/utils/RegExpUtil";
import { BASE64Helper } from "@/utils/CryptUtil";
export default {
  name: "ModifyPass",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入密码"));
      }
      if (!matchPasswd(value)) {
        return callback(
          new Error("密码至少包含数字、大小写字母和特殊字符中的三种")
        );
      }
      if (this.ruleForm.checkPass !== "") {
        this.$refs.ruleForm.validateField("checkPass");
      }
      callback();
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateUsedPass = (rule, value, callback) => {
      if (this.show_err) {
        callback(new Error("密码错误"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {},
      rules: {
        pass: [
          { required: true, validator: validatePass, trigger: "blur" },
          { min: 6, max: 16, message: "长度在6到16个字符", trigger: "blur" },
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        usedPass: [
          { required: true, message: "旧密码不能为空", trigger: "blur" },
          { required: true, validator: validateUsedPass, trigger: "blur" },
        ],
      },
      show_err: null,
    };
  },
  computed: {},
  watch: {
    "ruleForm.usedPass"() {
      this.show_err = null;
    },
  },
  created() {},
  mounted() {},

  methods: {
    ...mapActions("home", ["reclassify"]),
    ...mapActions("user", ["resetToken"]),
    close() {
      this.ruleForm = {};
      this.$refs["ruleForm"].resetFields();
      this.$emit("_close");
    },
    setUpewd() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (!valid) {
          return false;
        }
        showLoading("正在修改");
        let res = await this.reclassify({
          newPwd: this.ruleForm.pass.trim(),
          pwd: this.ruleForm.usedPass.trim(),
        });
        this.resetToken();
        setTimeout(() => {
          this.$router.replace("/login");
          location.reload();
        }, 1000);
      });
    },
  },
};
</script>