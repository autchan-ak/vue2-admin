// 权限管理模块
import { asyncRoutes } from '@/router'
import Layout from '@/layout' //布局页
import { assembleTree, deepCopy} from "@/utils/BaseUtil";

/**
 * 将路由按指定格式重组
 * @menu 用户权限路由
 */

function formatRouter(menu) {
    let res = [];
    menu.forEach(m => {
        res.push({
            path: m.path[0] !== '/' ? `/${m.path}` : m.path,
            hidden: !m.isShow,
            component: loadView(m),
            redirect: redirectView(m),
            meta: {
                button: m.button,
                state: m.state,
                title: m.title,
                sort: m.orderNum,
                icon: m.icon,
            }
        })
        if (m.children) {
            res[res.length - 1].children = formatRouter(m.children)
        }

    })
    return res
}
const loadView = (m) => {
    if (m.menuType == "M") return Layout;
    if (m.path === '#') return Layout;
    if (m.path[0] !== '/') {
        m.path = '/' + m.path
    }
    // return (resolve) => require([`@/modules${view}`], resolve)
    return () => import(`@/modules${m.path}`)
}
const redirectView = (m) => {
    if (m.children) {
        if (m.children[0].path[0] === '/') return m.children[0].path
        return `/${m.children[0].path}`
    }
    return null

}
/**
 * 判断当前路径是否可用
 * @route 用户可访问路由
 * @path 跳转路径
 */
function isAuthenEna(route, path) {
    let v = false;
    route.forEach(item => {
        if (item.path === path && item.meta.state) {
            v = '当前路径已被禁用,请联系管理员';
        }
        if (item.children && !v) {
            v = isAuthenEna(item.children, path)
        }
    });
    return v
}

/**
 * 判断当前路由是否有权限
 * @route 用户可访问路由
 * @path 跳转路径
 */
function isJurisdictionPath(route, path) {
    if (path === '/404') return false;
    let v = true;
    route.forEach(item => {
        if (item.path === path) {
            v = false;
        }
        if (item.children && v) {
            v = isJurisdictionPath(item.children, path)
        }
    });
    return v
}
const state = {
    routes: [],
    // addRoutes: []  //用户可访问路由表
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.routes = [...asyncRoutes, ...routes]
    }
}

const actions = {
    generateRoutes({ commit }, users) {
        return new Promise(resolve => {
            // 格式化菜单 并
            let Tree = assembleTree(deepCopy(users.roles.menus))
            let accessedRoutes = formatRouter(Tree)
            accessedRoutes.push({ path: "*", redirect: "/404", hidden: true });
            commit('SET_ROUTES', accessedRoutes)
            resolve(accessedRoutes)
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}