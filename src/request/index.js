import Request, { isRequestTimeout } from './request'
import store from '@/store'
import { showMessage, hideLoading } from '../utils'
import { getToken } from '@/utils/ProjectTools'


// base url
Request.defaults.baseURL = process.env.VUE_APP_REQUEST_BASE_API
// timeout
Request.defaults.timeout = process.env.VUE_APP_REQUEST_TIMEOUT

// 前缀拦截处理
Request.interceptors.request.use(config => {
    // 添加 token
    config.headers['authorization'] = getToken()
    return config
})

// 统计消息展示次数，不能超过1
const storeMessage = {
    redirectLogin: 0,
    timeout: 0
}

// 响应处理
Request.interceptors.response.use(response => {
    const res = response.data;
    hideLoading()
    console.log("响应处理",res.data);
    // 返回流数据
    if (response.headers['content-type'] && response.headers['content-type'].search('application/octet-stream') !== -1) return res
    // 成功 不弹窗
    if (res.meta.status === 200) return res
    if (storeMessage.timeout <= 0) {
        storeMessage.timeout += 1
        showMessage({
            type: res.meta.type || 'error',
            message: res.meta.msg || 'Error',
            onClose: () => {
                storeMessage.timeout = 0
            }
        })
    }
    // 成功 弹窗
    if (res.meta.status === 201) return res
    // 退出 登录
    if (res.meta.status === 401) {
        store.dispatch('user/resetToken')
    }
    // 除以上状态一律失败
    throw new Error(res.meta.msg || 'Error',)
}, error => {
    const status = error.message.split(' ').slice(-1)[0]
    let message = ''
    switch (status) {
        case '400': message = '请求错误'; break;
        case '401':
            message = '未授权，请登录'
            store.dispatch('user/resetToken')
            break;
        case '403': message = '您的访问没有权限'; break;
        case '404': message = '请求失败！未找到请求路由'; break;
        case '408': message = '请求超时'; break;
        case '500': message = '服务器内部错误'; break;
        case '501': message = '服务未实现'; break;
        case '502': message = '网关错误'; break;
        case '503': message = '服务不可用'; break;
        case '504': message = '网关超时'; break;
        case '505': message = 'HTTP版本不受支持'; break;
    }
    if (isRequestTimeout(error)) {
        message = '请求超时'
    }
    if (error.message == 'request is Duplicate and Canceled') {
        message = '数据正在处理，请勿重复提交'
    }
    hideLoading()
    if (storeMessage.timeout <= 0) {
        storeMessage.timeout += 1
        showMessage({
            type: 'error',
            message: message,
            onClose: () => {
                storeMessage.timeout = 0
            }
        })
    }
    return Promise.reject(message)
})

export default Request
