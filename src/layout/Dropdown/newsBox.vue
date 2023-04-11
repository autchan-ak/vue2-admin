<template>
  <div v-if="msg">
    <div class="drop" @click="newsPath(msg.uuid)">
      <img class="img" :src="$host + msg.avatar" v-if="msg.chatType=='1'" />
      <svg-icon icon="group" class="img" v-else />
      <div class="drop-right">
        <span class="name">{{ msg.sendName }}</span>
        <p>{{ msg.content | chatMessages(msg.newsTpye,true) }}</p>
        <p>{{ msg.createTime | dateFormat }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    msg: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    ...mapActions("notification",["setDataListRome"]),
    newsPath(uuid) {
        this.$router.push(`/communication/chat_im?to=${uuid}`)
        this.setDataListRome({name:"news",id:uuid})
    },
  },
};
</script>

<style lang="scss" scoped>
.drop {
  height: 65px;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 12px 24px;
  box-sizing: border-box;
  font-size: 14px;
  &:hover {
    background: #e2effd;
  }
  .img {
    border-radius: 50%;
    width: 40px;
    color: #fff;
    background: #515a6e;
    fill: currentColor;
    height: 40px;
  }
  &-right {
    color: #515a6e;
    flex: 1;
    margin-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    .name {
      font-weight: bold;
      color: #000;
    }
    p {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>