<!-- 404 -->
<template>
  <div class="notFound">
    <div class="notFound-img">
      <img src="@/assets/image/404.png" alt="404" />
      <img class="notFound-img-child left" src="@/assets/image/404_cloud.png" alt="404" />
      <img class="notFound-img-child mid" src="@/assets/image/404_cloud.png" alt="404" />
      <img class="notFound-img-child right" src="@/assets/image/404_cloud.png" alt="404" />
    </div>
    <div class="text">
      <h2>页面没有找到</h2>
      <p>很抱歉，您访问的页面不存在！</p>
      <el-button type="text" @click="$router.back(-1)"> 返回上一页 </el-button>
      <el-button v-if="isLogin" type="text" @click="$router.push('/')"> 返回首页 </el-button>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/ProjectTools' // 获取令牌

export default {
  computed:{
    isLogin(){
      return getToken()
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/css/error.scss";
</style>
