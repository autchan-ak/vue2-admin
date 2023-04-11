import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { showLoading } from '@/utils'
import { getToken } from '@/utils/ProjectTools'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_REQUEST_BASE_API, // url = base url + request url
  timeout: 8000, // request timeout
  shouldRetry: error => isRequestTimeout(error), // 超时重试,
})

/**
 *  白名单 
 **/
const Exclude = [/.+\/login/]


// 前缀拦截处理
service.interceptors.request.use(
  config => {
    // 添加 token
    config.headers['X-Token'] = getToken()
    return config
  },
  error => {
    // do something with request error
    alert("看一下怎么会到这里")
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    showLoading()
    // if the custom code is not 2000, it is judged as an error.
    if (res.code === 2000) return res
    Message({
      message: res.message || 'Error',
      type: res.type || 'error',
      duration: 3 * 1000
    })
    if (res.code === 2001) return res
    // 401   重新登陆
    if (res.code === 401) {
      // to re-login
      setTimeout(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      },2000)
    }
    // 除 2000+ 一律看做失败
    throw new Error(res.message || 'Error',)
  },
  error => {
    if (error.message.includes('timeout')) {
      error.message = '请求超时！'
    } else if (error.message.includes('404')) {
      error.message = '请求失败！未找到请求路由'
    } else if (error.message.includes('500')) {
      error.message = '请求失败！服务器错误'
    }
    console.log("请求打印", error.message);
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    showLoading()
    return Promise.reject(error)
  }
)

export default service
