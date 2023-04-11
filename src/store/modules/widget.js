import { Message, MessageBox } from 'element-ui'
import { isString, isObject, isBoolean } from '../../utils/BaseUtil'
const state = {
    loading: {
        isLoading: false,
        text: ''
    },
    showMessage(config) {
        return Message(config)
    },
    confirm(message, title, config) {
        return MessageBox.confirm(message, title, {
            ...config,
            callback: function (action) {
                if (action === 'confirm') {
                    const ok = config.callback || config.ok
                    ok && ok(action)
                } else if (action === 'cancel') {
                    config.cancel && config.cancel()
                } else {
                    config.close && config.close()
                }
            }
        })
    }
}

const mutations = {
    showMessage(state, config) {
        let tempConfig = { message: '提示信息', type: 'success', duration: 1500, customClass: 'el-message-tips' }
        if (isString(config)) {
            tempConfig.message = config
        } else if (isObject(config)) {
            tempConfig = Object.assign({}, tempConfig, config)
        } else {
            throw new Error('need string or plain object')
        }
        if (tempConfig.type === 'error' && !tempConfig.duration) {
            tempConfig.duration = 2500
        }
        state.showMessage(tempConfig)
    },
    showLoading(state, config) {
        let tempConfig = {}
        if (isString(config)) {
            tempConfig = { isLoading: true, text: config }
        } else if (isObject(config)) {
            tempConfig = config
        } else if (isBoolean(config)) {
            tempConfig = { isLoading: config, text: '' }
        } else {
            throw new Error('need string、boolean or plain object')
        }
        state.loading = tempConfig
        if (!!window.ActiveXObject || "ActiveXObject" in window){
            setTimeout(function () {
                state.loading = {isLoading:false,text:''}
            }, 1000);
        }
    },
    confirm(state, config) {
        let tempConfig = { type: 'warning' }
        let title = 'warning'
        let message = ''
        if (isString(config)) {
            message = config
        }
        if (isObject(config)) {
            if (!config.message) {
                throw new Error('message is not found')
            }
            title = config.title || 'warning'
            message = config.message
            tempConfig = { ...tempConfig, ...config }
        }
        return state.confirm(message, title, tempConfig).catch(() => new Promise(() => { }))
    }
}
export default {
    namespaced: true,
    state,
    mutations
}
