import store from '../store'
import { isString, isObject } from './BaseUtil'
export const showLoading = (isLoading = false, text = '') => {
    if (typeof isLoading === 'string') {
        text = isLoading
        isLoading = true
    }
    return store.commit('widget/showLoading', { isLoading, text })
}
export const hideLoading = () => store.commit('widget/showLoading', false)
export const showMessage = (config) => store.commit('widget/showMessage', config)
export const showError = (config) => {
    const temp = {}
    if (isString(config)) {
        temp.message = config
        temp.type = 'error'
    } else if (isObject(config)) {
        Object.assign(temp, config, { type: 'error' })
    }
    store.commit('widget/showMessage', temp)
}
export const confirm = (message, title, config) => {
    const temp = { message, title, ...config }
    store.commit('widget/confirm', temp)
}
