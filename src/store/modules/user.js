import Request from '@/request'
import { BASE64Helper } from '@/utils/CryptUtil.js'
import { getToken, setToken, removeToken, saveUserInfo, loadUserinfo } from '@/utils/ProjectTools.js'


// 默认加载本地用户信息
const state = {
    userInfo: loadUserinfo(),
    token: getToken(),
    valid: false, // 当前路由是否有效
    roles: {}, //角色
}



const mutations = {
    SAVE_AUTHEN_INFO: (state, data) => {
        setToken(data.token)
        saveUserInfo(data.userInfo)
        state.token = data.token;
        state.userInfo = data.userInfo
    },
    LOGOUT(state) {
        removeToken();
        state.userInfo = {};
        state.token = '';
        state.roles = [];
        state.valid = false;
    },
    SET_VALID: (state) => {
        state.valid = true;
    },
    USER_ROLES: (state, data) => {
        state.roles = data;
    },
    SET_VALID: (state) => {
        state.valid = true;
    }
};

const actions = {
    // 用户登录
    login({ commit, dispatch }, userInfo) {
        const { account, password } = userInfo
        return new Promise((resolve, reject) => {
            Request({
                url: '/user/login',
                method: 'post',
                data: { username: account.trim(), password: BASE64Helper.encode(password) }
            }).then(async res => {
                // 保存状态
                commit('SAVE_AUTHEN_INFO', res.data);
                let menus = await dispatch('getUserRoles', res.data.userInfo.roleId)
                resolve({ userInfo: res.data.userInfo, menus })
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 获取用户角色
    getUserRoles({ commit }, id) {
        return new Promise((resolve, reject) => {
            Request({
                url: '/user/roles',
                method: 'post',
                data: id,
            }).then(res => {
                commit("USER_ROLES", res.data);
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 重置令牌
    resetToken({ commit, dispatch }) {
        console.log("退出")
        return new Promise((resolve, reject) => {
            Request({
                url: '/user/logout',
                method: 'post',
            }).then(res => {
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