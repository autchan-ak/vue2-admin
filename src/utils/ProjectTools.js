/**
 * 业务小工具
 */
import { isEmpty } from './BaseUtil';
import { BASE64Helper } from './CryptUtil.js';

const TOKEN = 'token';
const USER_INFOT = 'userinfo';


/**
 * 保存token
 */
export const setToken = token => {
    sessionStorage.setItem(TOKEN, BASE64Helper.encode(JSON.stringify(token)))
}

/**
 * 获取token
 */
export const getToken = () => {
    try {
        return JSON.parse(BASE64Helper.decode(sessionStorage.getItem(TOKEN)))
    } catch (err) {
        console.error('暂无登陆，请重新登陆！');
        return ''
    }
}

/**
 * 清除token
 */
export const removeToken = ()=>{
    // localStorage.clear()
    sessionStorage.clear()
}

/**
 * 保存用户数据
 */
export const saveUserInfo = (userinfo = {}) => {
    if (isEmpty(userinfo)) {
        return
    }
    sessionStorage.setItem(USER_INFOT, BASE64Helper.encode(JSON.stringify(userinfo)))
}

/**
 * 获取用户数据
 */
export const loadUserinfo = () => {
    try {
        return JSON.parse(BASE64Helper.decode(sessionStorage.getItem(USER_INFOT)))
    } catch (err) {
        console.error('用户信息加载失败');
        return {}
    }
}

// 保存 localStorage
export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, value)
}
// 获取 localStorage
export const getLocalStorage = key => {
    return localStorage.getItem(key)
}