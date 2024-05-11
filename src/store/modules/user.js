import Request from '@/request/request.js'
import { getToken, setToken, removeToken, saveUserInfo, loadUserinfo } from '@/utils/ProjectTools.js'


// 重置用户令牌和角色信息
const state = {
    userInfo: loadUserinfo(),
    token: getToken(),
    valid: false, // 当前路由是否有效
    roles: {}, //角色信息
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
        state.valid = false;
        state.roles = null;
    },
    USER_ROLES: (state, data) => {
        state.roles = data;
    },
    SET_VALID: (state) => {
        state.valid = true;
    }
};

const actions = {
    // 获取验证码
    getLoginCaptcha() {
        return Request.get("/public/admin/captcha")
            .then(res => {
                return Promise.resolve(res.data);
            })
            .catch(err => {
                return Promise.reject(err);
            });

    },
    // 用户登录
    login({ commit, dispatch }, userInfo) {
        const { username, password, code } = userInfo
        return new Promise((resolve, reject) => {
            Request({
                url: '/public/admin/login',
                method: 'post',
                data: { username: username.trim(), code: code.trim(), password: password.trim() }
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
    // 重置令牌
    resetToken({ commit,dispatch }) {
        return new Promise((resolve, reject) => {
            dispatch('tagsView/delAllViews',null,{ root: true })
            Request({
                url: '/public/admin/login/out',
                method: 'get',
            }).then(()=>{
                commit('LOGOUT')
                resolve()
            }).catch(()=>{
                commit('LOGOUT')
                resolve()
            })
        })
    },
    // 当前路由是否有效
    setValid({ commit }) {
        commit('SET_VALID')
    },
    // 获取用户角色
    getUserRoles({ commit }, id) {
        return new Promise((resolve, reject) => {
            Request({
                url: '/private/roles/one',
                method: 'post',
                data: {
                    params: { id }
                },
            }).then(res => {
                commit("USER_ROLES", res.data);
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