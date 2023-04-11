<template>
  <div>
    <video ref="videoPlayer" class="video-js"></video>
  </div>
</template>

<script>
import "video.js/dist/video-js.css";
import videojs from "video.js";
export default {
  name: "VideoJs",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      player: null,
    };
  },
  mounted() {
    this.player = videojs(
      this.$refs.videoPlayer,
      {
        controls: true, //开启交互，即是用户可控。
        muted: false, //开启视频时是否静音
        fluid: true, //根据外层css样式大小，自动填充宽高！比较实用，可搭配响应式
        // reload: "auto",//重载
        // poster: require("@/assets/image/react.jpg"), //视频封面
        sources: [
          //视频播放源，建议本地
          {
            src: this.$host + this.options.url,
          },
        ],
      },
      function onPlayerReady() {
        // console.log("onPlayerReady,播放", this);
      }
    );
  },
  //   销毁时
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>

<style scoped>
</style>

