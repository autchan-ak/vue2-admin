// 路由的全局守卫

// 权限控制逻辑
import router from './index'
import store from '../store/index'
//引入nprogress 进度条插件
import NProgress from 'nprogress'

import { Message } from 'element-ui'
import { getToken } from '@/utils/ProjectTools' // 获取令牌

// 简单配置  进度条
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })


const whiteList = ['/login'] //排除的路径

router.beforeEach(async (to, from, next) => {
    // 进度条
    NProgress.start()
    // 回到顶部
    if (document.getElementsByClassName('main-container-views')[0]) {
        document.getElementsByClassName('main-container-views')[0].scrollTop = 0
    }

    if (to.meta.state) {
        Message.error("当前路由以被禁用，请联系管理员");
        next(from.fullPath)
        NProgress.done()
        return
    }

    // 获取令牌判断用户是否登陆
    const hasToken = getToken()
    // 有令牌 表示已经登陆
    if (hasToken) {
        if (to.path === '/login') {
            // 已登录重定向到首页
            next({ path: '/' })
        } else {
            const user = store.state['user'];
            let hasRoles = user.roles;
            // 角色不存在 获取当前角色信息
            if (!hasRoles.id) {
                hasRoles = await store.dispatch('user/getUserRoles', user.userInfo.roleId);
            }
            if (hasRoles.menus.length) {
                if (user.valid) {
                    next()
                } else {
                    // 生成路由
                    let accessRoutes = await store.dispatch('permission/generateRoutes', user)
                    store.dispatch('user/setValid')
                    accessRoutes.forEach(route => {
                        router.addRoute(route);
                    })
                    next({ ...to, replace: true })
                }
            } else {
                Message.error("当前用户没有任何权限，请联系管理员");
                await store.dispatch('user/resetToken')
                setTimeout(() => {
                    next(`/login?redirect=${to.path}`)
                }, 2000)
            }

        }
    } else {
        // 用户无令牌
        if (whiteList.indexOf(to.path) !== -1) {
            //白名单路由放过
            next()
        } else {
            // 重定向至登录页
            next(`/login?redirect=${to.path}`)
        }
    }
})
router.afterEach(path => {
    document.title = path.meta.title
    NProgress.done()
    if(!store.state.theme.PC){
        store.commit("theme/SET_SHOW_SIDEBAR",false);
    }
})