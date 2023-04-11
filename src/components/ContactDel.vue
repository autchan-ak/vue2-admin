<!-- 联系人详情 -->
<template>
  <div v-if="uid" class="contact" v-outside="close">
    <transition name="el-zoom-in-center">
      <div v-show="show" class="box">
        <i class="close el-icon-error" @click="close" />
        <div class="banner"><div class="img_banner"></div></div>
        <div class="avatar">
          <img :src="$host + contact.avatar" />
        </div>
        <div class="introduction">
          <span
            v-if="contact.introduction"
            v-html="contact.introduction"
          ></span>
          <span v-else>这个家伙很懒，什么也没留下~</span>
        </div>
        <div class="contact-sign">
          <el-form ref="form" :model="contact" label-width="85px">
            <el-form-item label="姓名：">
              <span>{{ contact.name }}</span>
            </el-form-item>
            <el-form-item label="手机：">
              <span>{{ contact.phone }}</span>
            </el-form-item>
            <el-form-item label="邮箱：">
              <span>{{ contact.email }}</span>
            </el-form-item>
            <el-form-item label="性别：">
              {{ contact.sex ? "男" : "女" }}
            </el-form-item>
            <el-form-item label="备注：" v-if="contact.friend">
              <div class="remarkEdit">
                <span v-show="!remarkEdit" @click="remarkEditClick"
                  >{{ contact.friend.remark || "点击添加备注" }}
                  <i class="el-icon-edit" />
                </span>
                <el-input
                  v-show="remarkEdit"
                  v-model="friendRemark"
                  maxlength="30"
                  ref="remarkInput"
                  @blur="remarkInputBlur"
                />
              </div>
            </el-form-item>
            <el-form-item label="来源：" v-if="contact.friend">
              <span>{{ contact.friend.source }}</span>
            </el-form-item>
            <el-form-item label="验证消息：" v-if="friend && !contact.friend">
              <span>{{ friend.remark }}</span>
            </el-form-item>
          </el-form>
          <el-button type="primary" size="small" @click="friend_click">
            <i :class="contact.friend ? 'el-icon-position' : 'el-icon-plus'" />
            <span>{{ contact.friend ? "发送消息" : "添加为好友" }}</span>
          </el-button>
          <el-drawer
            title="添加好友"
            :visible.sync="drawer"
            direction="btt"
            :modal-append-to-body="false"
            :before-close="handleClose"
          >
            <el-form :model="contact">
              <el-form-item label="验证消息" v-if="!friend">
                <el-input
                  v-model="contact.msg"
                  maxlength="50"
                  placeholder="填写验证消息"
                />
              </el-form-item>
              <el-form-item label="备注：">
                <el-input
                  v-model="contact.remark"
                  maxlength="30"
                  placeholder="输入备注"
                />
              </el-form-item>
              <el-button type="primary" size="small" @click="friend_send">
                <span>发送</span>
              </el-button>
            </el-form>
          </el-drawer>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "ContactDel",
  props: {
    uid: {
      type: Number,
    },
    source: {
      type: String,
      default: "账号添加",
    },
    friend: {
      type: Object,
      default: () => {},
    },
    type: {
      type: Number,
      default: 1,
    },
  },
  components: {},
  data() {
    return {
      show: false,
      contact: {},
      drawer: false,
      remarkEdit: false,
      friendRemark: null,
      chat_data:null
    };
  },
  computed: {
    ...mapState("user", ["userInfo"]),
  },
  watch: {
    show(v) {
      v && this.getData();
    },
  },
  mounted() {},

  methods: {
    ...mapActions("communication", [
      "contactDel",
      "contactAdd",
      "chatEditRemark",
    ]),
    async getData() {
      this.contact = await this.contactDel({ user_id: this.uid });
    },
    handleClose() {
      this.drawer = false;
    },
    friend_send() {
      this.contactAdd({
        friendId: this.contact.uid,
        msg: this.contact.msg,
        source: this.source,
        remark: this.contact.remark,
        createUid: this.friend && this.friend.create_uid,
      }).then((res) => {
        this.close();
        if (this.type == 1) {
          //
        }
      });
    },
    friend_click() {
      if (this.contact.friend) {
        this.$router.push('/communication/chat_im?to='+this.contact.friend.uuid)
        // 发消息
      } else {
        this.drawer = true;
        this.$set(this.contact,'msg',`我是${this.userInfo.uname}`)
      }
    },
    remarkEditClick() {
      this.remarkEdit = true;
      this.friendRemark = this.contact.friend.remark;
      this.$nextTick(() => {
        this.$refs.remarkInput.focus();
      });
    },
    // 提交备注
    remarkInputBlur() {
      if (this.friendRemark === this.contact.friend.remark)
        return (this.remarkEdit = false);
      this.chatEditRemark({
        uuid: this.contact.friend.uuid,
        chatType:'1',
        remark: this.friendRemark,
      }).then(() => {
        this.remarkEdit = false;
        this.contact.friend.remark = this.friendRemark;
      });
    },
    showDialog() {
      this.show = true;
    },
    close() {
      this.handleClose();
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.contact {
  .box {
    z-index: 999;
    top: 50%;
    left: 50%;
    width: 350px;
    height: 600px;
    overflow: hidden;
    border-radius: 3px;
    border: 1px solid #ccc;
    background: #f5f5f5;
    position: absolute;
    transform: translate(-50%, -50%);
    .close {
      position: absolute;
      right: 10px;
      top: 10px;
      color: white;
      cursor: pointer;
      transition: all 1s;
      z-index: 1;
      font-size: 20px;
    }
    .banner {
      height: 180px;
      overflow: hidden;
      .img_banner {
        transition: all 0.2s linear;
        background-image: url("~@/assets/image/default-user-banner.png");
        background-size: 100%;
        height: 100%;
        &:hover {
          transform: scale(1.1);
          filter: contrast(130%);
        }
      }
    }
    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      position: absolute;
      top: 140px;
      overflow: hidden;
      background: #f5f5f5;
      left: 10px;
      display: flex;
      img {
        display: block;
        width: 100%;
        border-radius: 50%;
        height: 100%;
        transform: scale(0.8);
        transition: all 0.5s linear;
        &:hover {
          transform: scale(0.9);
        }
      }
    }
    .introduction {
      height: 40px;
      margin: 10px 0;
      margin-left: 110px;
      color: #777;
      font-size: 12px;
      line-height: 1.5;
    }
  }
  &-sign {
    .remarkEdit {
      cursor: pointer;
      input {
        ::v-deep &:focus {
          border: none !important;
        }
      }
    }
    padding: 10px;
    ::v-deep.el-form-item {
      margin-bottom: 5px;
    }
    .el-button {
      position: absolute;
      bottom: 20px;
      width: calc(100% - 40px);
      left: 20px;
    }
  }
}
::v-deep .el-drawer {
  height: 300px !important;
  &__header {
    margin: 0;
    text-align: center;
    padding: 15px;
  }
  .el-form {
    padding: 0 10px;
  }
}
</style>
