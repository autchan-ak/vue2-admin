import Vue from 'vue'
import VueRouter from 'vue-router'
import { isEmpty } from '../utils/BaseUtil'

import Layout from '../layout' //布局页
import notFoundRoute from '../views/error/404.vue'

Vue.use(VueRouter)

//解决重复点击左侧菜单的报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


// 路由排序
const modulesRoutes_Sort = router => {
  let backups = [[], []];
  router.forEach(item => {
    // 有顺序的放在下标0 没顺序的放在1
    backups[item.meta.sort >= 0 ? 0 : 1].push(item)
  })
  backups.forEach((o, i) => {
    o.forEach(item => {
      if (item.children) {
        // 有子目录继续递归
        item.children = modulesRoutes_Sort(item.children)
      }
    })
    if (!i) {
      // 进行升序
      router = o.sort((a, b) => a.meta.sort - b.meta.sort)
    }
  })
  // 将排序后和忽略排序的拼接
  return router.concat(backups[1]);
}

const getModulsRoutes = function () {
  // 匹配src/modules 目录下所有以.router.js结尾的js
  const context = require.context('../modules', true, /\.router\.js$/)
  const modulesRoutes = []
  context.keys().forEach(routerModulePath => {
    const itemModuleRoutes = context(routerModulePath)
    const itemRoutes = itemModuleRoutes.default || itemModuleRoutes;
    if (isEmpty(itemRoutes)) {
      return
    }
    // if (Array.isArray(itemRoutes)) {
    //   [].push.apply(modulesRoutes, itemRoutes)
    // } else {
    itemRoutes.component = Layout
    if (itemRoutes.meta.sort) {
      modulesRoutes.splice(itemRoutes.meta.sort, 0, itemRoutes)
    } else {
      modulesRoutes.push(itemRoutes)
    }

    // }
  })
  // 路由排序

  return modulesRoutes_Sort(modulesRoutes)
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
          title: "工作台",
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
    path: '*',
    component: notFoundRoute
  },
]

export const modulsRoutes = [...asyncRoutes,...getModulsRoutes()]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: asyncRoutes
})

export default router