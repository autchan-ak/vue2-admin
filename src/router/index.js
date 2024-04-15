import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '../layout' //布局页
import notFoundRoute from '../views/error/404.vue'

Vue.use(VueRouter)

//解决重复点击左侧菜单的报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


export const asyncRoutes = [
  {
    path: '/',
    redirect: '/index',
    component: Layout,
    children: [
      {
        path: '/index',
        component: () => import('@/views/index/index.vue'),
        meta: {
          title: "首页",
          icon: 'el-icon-s-home',
        }
      },
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/Login'),
    meta: {
      title: "欢迎登陆",
    },
    hidden: true //导航菜单忽略选项
  },
  {
    path: '/404',
    meta: {
      title: "页面走丢了",
    },
    component: notFoundRoute,
    hidden: true //导航菜单忽略选项
  },
]


const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: asyncRoutes
})

export default router