import Axios from 'axios';
import { BASE64Helper } from '../utils/CryptUtil';
import { isObject } from '../utils/BaseUtil'


const axiosUtils = require('axios/lib/utils');
const normalizeHeaderName = require('axios/lib/helpers/normalizeHeaderName');

const isRequestTimeout = (error) => {
    return error && (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1)
}
const isNotFound = (error) => {
    return error && (error.code === 404 || (error.response && error.response.status === 404))
}

const axiosInstance = Axios.create({
    transformRequest(data, headers) {
        normalizeHeaderName(headers, 'Content-Type');
        if (axiosUtils.isFormData(data)
            || axiosUtils.isArrayBuffer(data)
            || axiosUtils.isBuffer(data)
            || axiosUtils.isStream(data)
            || axiosUtils.isFile(data)
            || axiosUtils.isBlob(data)
        ) {
            return data;
        }
        if (axiosUtils.isArrayBufferView(data)) {
            return data.buffer;
        }
        if (axiosUtils.isURLSearchParams(data)) {
            return data.toString();
        }
        if (isObject(data)) {
            headers['Content-Type'] = 'application/json;charset=utf-8';
            // setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
            return JSON.stringify(data);
        }
        return JSON.stringify(data);
    },
});
axiosInstance.all = Axios.all
const { CancelToken } = Axios;


// 重复请求处理
const axiosRepeatRequest = {
    requests: {},
    generateRequestId(config) {
        const method = (config.method || 'get').toLowerCase();
        const encodeData = config.data ? BASE64Helper.encode(config.data) : ''
        return `${config.baseURL}${config.url}_${method}_${encodeData}`;
    },
    clear(config) {
        const requestId = config.requestId
        delete this.requests[requestId]
        delete config.cancelToken
        delete config.requestId
    },
    handler(config, cancel, isRemoveRightNow) {
        const requestId = config.requestId ? config.requestId : axiosRepeatRequest.generateRequestId(config)
        config.requestId = requestId
        if (this.requests[requestId]) {
            // 请求存在
            const axiosRequest = this.requests[requestId]
            if (isRemoveRightNow) {
                this.clear(config)
                delete config.retryCount
            } else if (axiosRequest.start + config.timeout + 200 - (+new Date()) < 0) {
                this.clear(config)
                delete config.retryCount
            } else {
                // 取消上次请求
                axiosRequest.cancel(`request is Duplicate and Canceled`)
                // 取消后直接移除
                this.clear(config)
            }
        } else {
            !!cancel && (this.requests[requestId] = { start: +new Date(), cancel })
        }
    },
};

//  request拦截器的执行顺序是: 先加入后执行
//  response拦截器执行顺序是: 先加入的先执行

axiosInstance.interceptors.request.use((config) => {
    // 防重复请求处理
    config.cancelToken = new CancelToken((cancel) => {
        axiosRepeatRequest.handler(config, cancel)
    })
    return config
}, (error) => {
    console.error(error)
    return Promise.reject(error)
});


axiosInstance.interceptors.response.use((response) => {
    const { config } = response
    // 请求完成 移除
    axiosRepeatRequest.handler(config, null, true)
    return response;
}, (error) => {
    const { config = {} } = error
    if (Axios.isCancel(error)) {
        console.warn(error.message)
        // 请求完成 移除
        axiosRepeatRequest.handler(config, null, true);
        return Promise.reject(error)
    }

    // 默认超时重试
    if (isRequestTimeout(error)) {
        config.retryCount = config.retryCount || 0
        if (config.retryCount >= 1) {
            // 请求完成 移除
            axiosRepeatRequest.handler(config, null, true);
            return Promise.reject(error)
        }
        config.retryCount += 1
        const retryRequest = new Promise((resolve) => {
            setTimeout(() => resolve(), config.retryDelay);
        });

        return retryRequest.then(() => {
            const retryConfig = { ...config }
            return axiosInstance.request(retryConfig)
        });
    }
    // 请求完成 移除
    axiosRepeatRequest.handler(config, null, true);

    return Promise.reject(error);
});


export default axiosInstance;
export { isRequestTimeout, isNotFound }
