import Request from '@/request/request.js'
import { BASE64Helper } from '@/utils/CryptUtil.js'
import { getToken, setToken, removeToken, saveUserInfo, loadUserinfo } from '@/utils/ProjectTools.js'


// 默认加载本地用户信息
const userInfo = loadUserinfo();
// 重置用户令牌和角色信息
const state = {
    userInfo,
    token: getToken(),
    valid: false, // 当前路由是否有效
    roles: userInfo.roles, //角色
    menus: userInfo.menus
}



const mutations = {
    SAVE_AUTHEN_INFO: (state, data) => {
        saveUserInfo(data)
        state.token = data.token;
        state.roles = data.userInfo.roles;
        state.menus = data.userInfo.menus;
        state.valid = false;
    },
    LOGOUT(state) {
        state.userInfo = {};
        state.token = '';
        state.roles = [];
        state.menus = [];
        state.valid = false;
    },
    SET_VALID: (state) => {
        state.valid = true;
    },
    USER_INFO: (state, data) => {
        data.menus = state.menus;
        data.roles = state.roles;
        saveUserInfo(data)
        state.userInfo = JSON.parse(JSON.stringify(data))
    }
};

const actions = {
    // 用户登录
    login({ commit, dispatch }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            Request({
                url: '/user/login',
                method: 'post',
                data: { username: username.trim(), password: BASE64Helper.encode(password) }
            }).then(res => {
                setToken(res.data.token)
                // 保存状态
                commit('SAVE_AUTHEN_INFO', res.data);
                commit("USER_INFO", res.data.userInfo);
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 保存用户信息

    // 重置令牌
    resetToken({ commit, dispatch }) {
        console.log("退出")
        return new Promise((resolve, reject) => {
            Request({
                url: '/user/logout',
                method: 'post',
            }).then(res => {
                removeToken();
                commit('LOGOUT')
                resolve(res)
            }).catch(error => {
                reject(error)
            })

        })
    },
    // 当前路由是否有效
    setValid({ commit }) {
        commit('SET_VALID')
    },
    // 获取用户详情
    getUserInfo({ commit }) {
        return new Promise((resolve, reject) => {
            Request({
                url: '/user/userInfo',
                method: 'get',
            }).then(res => {
                commit("USER_INFO", res.data);
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}