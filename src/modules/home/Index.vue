<!-- 个人中心 -->
<template>
  <el-card class="box-card">
    <el-row v-if="userData">
      <el-col :sm="24" :md="10">
        <el-image class="image" :src="userData.avatar" fit="fill"></el-image>
        <p class="uname">
          <b>{{ userInfo.uname }}</b>
        </p>
        <el-upload
          action
          :multiple="false"
          :http-request="_uploadImg"
          :show-file-list="false"
          accept=".png,.jpg,.gif"
        >
          <el-button size="small" plain>修改头像</el-button>
        </el-upload>
        <el-divider> 信息绑定 </el-divider>
        <div class="user_info">
          <div>
            <span>手机：</span>
            <span>{{ userData.phone }}</span>
            <el-button
              @click="checkCode(!userData.phone, true)"
              type="success"
              icon="el-icon-mobile-phone"
              size="mini"
              >{{ !userData.phone ? "绑定" : "修改" }}手机</el-button
            >
          </div>
          <div>
            <span>邮箱：</span>
            <span>{{ userData.email }}</span>
            <el-button
              @click="checkCode(!userData.email, false)"
              type="warning"
              icon="el-icon-message"
              size="mini"
              >{{ !userData.email ? "绑定" : "修改" }}邮箱</el-button
            >
          </div>
        </div>
        <el-button
          style="width: 80%"
          type="danger"
          icon="el-icon-lock"
          @click="dialogFormVisibleClose"
          >修改密码</el-button
        >
      </el-col>
      <el-col :sm="24" :md="14">
        <el-form
          ref="userForm"
          :model="userData"
          label-width="100px"
          :rules="formRules"
          style="width: 80%"
        >
          <el-form-item label="">
            <el-divider> 个人信息 </el-divider>
          </el-form-item>
          <el-form-item label="用户名：">
            <div style="text-align: left">{{ userData.account }}</div>
          </el-form-item>
          <el-form-item label="角色：">
            <div style="text-align: left" class="userRoles">
              <span v-for="(k, i) in userData.roles" :key="i"
                >{{ k.name }}
              </span>
            </div>
          </el-form-item>
          <el-form-item label="真实姓名：" prop="uname">
            <el-input v-model="userData.uname"></el-input>
          </el-form-item>
          <el-form-item label="性别：">
            <el-select
              v-model="userData.sex"
              placeholder="请选择您的性别"
              style="width: 100%"
            >
              <el-option label="男" :value="1"></el-option>
              <el-option label="女" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="个人描述：">
            <el-input
              type="textarea"
              rows="5"
              placeholder="简单描述一下自己~"
              v-model="userData.introduction"
            ></el-input> </el-form-item
          ><el-form-item label="">
            <el-button
              style="width: 100%"
              type="success"
              icon="el-icon-circle-check"
              @click="userData_serve"
              >保存</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-dialog
      :title="contact.title"
      :visible.sync="contact.dialog"
      :close-on-click-modal="false"
      width="500px"
    >
      <el-form
        ref="ruleForm2"
        :model="contact"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item v-if="contact.phone" label="手机：" prop="content">
          <el-input
            v-model="contact.content"
            placeholder="请输入您的手机号"
          ></el-input>
        </el-form-item>
        <el-form-item v-else label="邮箱：" prop="content">
          <el-input
            v-model="contact.content"
            placeholder="请输入您的邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码：">
          <el-input v-model="contact.code" placeholder="请输入验证码"
            ><el-button
              slot="append"
              icon="el-icon-thumb"
              @click="setCode"
              :disabled="!!contact.time"
              >{{ contact.time ? contact.time : "获取验证码" }}</el-button
            >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" :disabled="!contact.code" @click="setContact"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <ModifyPass :show="dialogFormVisible" @_close="dialogFormVisibleClose" />
  </el-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { showLoading } from "@/utils";
import { matchEmail, matchPhone, matchPasswd } from "../../utils/RegExpUtil";

export default {
  name: "userInfo",
  data() {
    var validateCode = (rule, value, callback) => {
      let v = this.contact.phone ? "手机号" : "邮箱";
      if (!value) {
        return callback(new Error(`请输入${v}`));
      }
      if (this.contact.phone && !matchPhone(value)) {
        //  手机号校验
        return callback("请正确输入您的手机号");
      }
      if (!this.contact.phone && !matchEmail(value)) {
        //  邮箱校验
        return callback("请正确输入您的邮箱");
      }
      callback();
    };
    return {
      dialogFormVisible: false,
      contact: {
        dialog: false,
        title: "修改手机",
        phone: true,
        content: "",
        code: "",
        time: 0,
      },
      rules: {
        content: [{ validator: validateCode, trigger: "blur" }],
      },
      userData: null,
      formRules: {
        uname: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
      fileList: [],
    };
  },
  computed: {
    ...mapState("user", ["userInfo"]),
  },
  mounted() {
    this._getUserInfo();
  },

  methods: {
    ...mapActions("user", ["getUserInfo", "resetToken"]),
    ...mapActions("home", [
      "setUserInfo",
      "reclassify",
      "setEmail",
      "checkCodeAdd",
    ]),
    ...mapActions("resources", ["imageAvatarUpload"]),
    async _getUserInfo() {
      this.userData = await this.getUserInfo();
    },
    // 上传头像
    async _uploadImg({ file, onError, onSuccess }) {
      // 可以判断图片大小限定
      await this.imageAvatarUpload({ file, type: 10 });
      this._getUserInfo();
    },
    checkCode(title, phone) {
      this.contact.dialog = true;
      this.contact.phone = phone;
      this.contact.title = title ? "绑定" : "修改";
      if (phone) return (this.contact.title += "手机");
      this.contact.title += "邮箱";
    },
    // 获取验证码
    setCode() {
      this.$refs.ruleForm2.validate((valid, error) => {
        if (!valid) return false;
        this.contact.time = 60;
        this.mySetTimeout();
        if (this.contact.phone) {
          setTimeout(() => {
            this.$notify({
              title: "手机验证码",
              message: "未开通短信业务，验证码可随意填写",
              offset: 100,
            });
          }, 2000);
        } else {
          // 发邮件
          setTimeout(() => {
            this.setEmail({ email: this.contact.content });
          }, 2000);
        }
      });
    },
    // 校验并修改
    setContact() {
      this.$refs["ruleForm2"].validate(async (valid) => {
        if (!valid) {
          return false;
        }
        showLoading(`正在${this.contact.title}`);
        let res = await this.checkCodeAdd({ ...this.contact });
        if (res.type == "success") {
          this.closeDialog();
          this._getUserInfo();
        }
      });
    },
    mySetTimeout() {
      setTimeout(() => {
        this.contact.time--;
        if (this.contact.time) {
          this.mySetTimeout();
        }
      }, 1000);
    },
    closeDialog() {
      this.contact.dialog = false;
      this.contact.content = "";
      this.contact.code = "";
    },
    // 保存个人信息
    userData_serve() {
      this.$refs.userForm.validate(async (valid) => {
        if (!valid) {
          return false;
        }
        showLoading("正在保存");
        await this.setUserInfo({ ...this.userData });
        this._getUserInfo();
      });
    },
    //  重置表单
    dialogFormVisibleClose() {
      this.dialogFormVisible = !this.dialogFormVisible;
    },
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  text-align: center;
  .el-col {
    margin-top: 15px;
  }
  .image {
    border-radius: 50%;
    width: 200px;
    height: 200px;
    border: 4px solid #ccc;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  }
  .uname {
    line-height: 2;
    margin-bottom: 4px;
    font-size: 18px;
  }
  .user_info {
    width: 80%;
    margin: 0 auto;
    padding: 20px;
    // position: relative;
    div {
      display: flex;
      margin-bottom: 15px;
      align-content: center;
      justify-content: center;
      > span {
        flex: 1;
        text-align: left;
        &:first-child {
          display: contents;
        }
      }
    }
  }
  .userRoles{
    >span:not(:last-child)::after{
      content: '，';
      display: inline-block;
    }
  }
}
</style>
