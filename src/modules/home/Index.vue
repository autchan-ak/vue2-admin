<!-- 个人中心 -->
<template>
  <el-card class="box-card">
    <el-row v-if="userData.id">
      <el-col :sm="24" :md="10">
        <el-image
          class="image"
          :src="$host + userData.avatar"
        />
        <p class="uname">
          <b>{{ userData.nickName || userData.userAccount }}</b>
        </p>
        <el-button
          v-permission="'upload'"
          type=""
          size="mini"
          @click="avatarShow = true"
          >修改头像</el-button
        >
        <ImageCropper
          title="裁剪头像"
          :dialogVisible.sync="avatarShow"
          @close="closeAvatarShow"
        />
        <el-divider> 信息绑定 </el-divider>
        <div class="user_info">
          <div>
            <span>手机：</span>
            <span>{{ userData.phone }}</span>
            <el-button
              v-permission="'phone'"
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
              v-permission="'email'"
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
          label-width="120px"
          style="width: 80%"
        >
          <el-form-item>
            <el-divider> 个人信息 </el-divider>
          </el-form-item>
          <el-form-item label="账号：">
            <div style="text-align: left">{{ userData.userAccount }}</div>
          </el-form-item>
          <el-form-item label="最后登录时间：">
            <div style="text-align: left">
              {{ userData.loginAt | dateFormat }}
            </div>
          </el-form-item>
          <el-form-item label="真实姓名：" prop="nickName">
            <el-input v-model.trim="userData.nickName"></el-input>
          </el-form-item>
          <el-form-item label="个人描述：">
            <el-input
              type="textarea"
              rows="5"
              placeholder="简单描述一下自己~"
              v-model.trim="userData.introduction"
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
            v-model.trim="contact.content"
            placeholder="请输入您的手机号"
          ></el-input>
        </el-form-item>
        <el-form-item v-else label="邮箱：" prop="content">
          <el-input
            v-model.trim="contact.content"
            placeholder="请输入您的邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码：">
          <el-input v-model.trim="contact.code" placeholder="请输入验证码"
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
      avatarShow: false,
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
      userData: {},
      fileList: [],
    };
  },
  mounted() {
    this._getUserInfo();
  },

  methods: {
    ...mapActions("user", ["resetToken"]),
    ...mapActions("home", [
      "getUserInfo",
      "setUserInfo",
      "reclassify",
      "setEmail",
      "checkCodeAdd",
    ]),
    ...mapActions("resources", ["imageAvatarUpload"]),
    async _getUserInfo() {
      this.userData = await this.getUserInfo();
    },
    // 修改头像
    async closeAvatarShow(data) {
      if (data) {
        showLoading("上传中。。。");
        await this.imageAvatarUpload({ file: data, type: "avatar" });
        this._getUserInfo();
      }
      this.avatarShow = false;
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
        await this.checkCodeAdd({ ...this.contact });
        this.closeDialog();
        this._getUserInfo();
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
        this.$notify({
          title: "保存成功",
          message: "将在下次登录后生效！",
          offset: 100,
        });
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
  ::v-deep .image {
    border-radius: 50%;
    width: 200px;
    height: 200px;
    border: 4px solid #ccc;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    img {
      object-fit: contain !important;
    }
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
  .userRoles {
    > span:not(:last-child)::after {
      content: "，";
      display: inline-block;
    }
  }
}
</style>
