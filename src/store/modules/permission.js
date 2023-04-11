// 权限管理模块
import { asyncRoutes,modulsRoutes } from '@/router'
import Layout from '@/layout' //布局页
/**
 * 将路由按指定格式重组
 * @menu 用户权限路由
 */
function formatRouter(menu) {
    let res = [];
    menu.forEach(m => {
        res.push({
            path: m.url,
            hidden: !!m.is_hidden,
            component:loadView(m.component),
            redirect:redirectView(m),
            meta: {
                title: m.menu_title,
                sort: m.orderNum,
                icon: m.icon,
                ena: !!m.ena
            }
        })
        if (m.children) {
            res[res.length - 1].children = formatRouter(m.children)
        }

    })
    return res
}
const loadView = (view)=>{
    if(view==='#') return Layout;
    if(view[0]!=='/'){
        view = '/'+ view
    }
    // return (resolve) => require([`@/modules${view}`], resolve)
    return ()=> import(`@/modules${view}`)
}
const redirectView = (m)=>{
    if(m.component==='#' && m.children){
        return m.children[0].url || null
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
        if (item.path === path && item.meta.ena) {
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
    routes: asyncRoutes, //完整路由表
    addRoutes: []  //用户可访问路由表
}

const getters = {
    getUserRoutes(state) {
        return state.addRoutes || []
    },
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        // addRoutes 用户可以访问的权限
        state.addRoutes = routes
    }
}

const actions = {
    generateRoutes({ commit }, users) {
        return new Promise(resolve => {
            // 如果是超管用户返回全量路由
            if(users.userInfo.account==='autchan'){
                commit('SET_ROUTES', modulsRoutes)
                resolve(modulsRoutes)
                return
            }
            // 格式化菜单 并
            let accessedRoutes = formatRouter(users.menus)
            // 添加固定路由
            accessedRoutes.unshift(asyncRoutes[0]);
            accessedRoutes.push(asyncRoutes[asyncRoutes.length - 1])
            commit('SET_ROUTES', accessedRoutes)
            resolve(accessedRoutes)
        })
    },
    isAuthenExcludeRoute({ commit, getters }, path) {
        return new Promise(resolve => {
            res = resolve(isAuthenEna(getters.getUserRoutes, path))
        })
    },
    isJurisdiction({ commit, getters }, path) {
        return new Promise(resolve => {
            res = resolve(isJurisdictionPath(getters.getUserRoutes, path))
        })
    }

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}