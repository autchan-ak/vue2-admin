import moment from 'moment'
import { loadUserinfo } from './ProjectTools'

export const dateFormat = function (date, fmt = 'YYYY-MM-DD HH:mm:ss') {
    date = date || new Date()
    return moment(date).format(fmt)
}
export function fromNow(date = 0) {
    return moment(date).fromNow()
}

export const dateDuration = (time = 0) => {
    if (time <= 0) {
        return 0
    }
    let str = []
    // 计算相差的天数
    const days = Math.floor(time / (24 * 3600 * 1000))

    let diff = time % (24 * 3600 * 1000)
    // 计算相差的小时
    const hours = Math.floor(diff / (3600 * 1000))

    diff = diff % (3600 * 1000)
    // 计算相差的分钟
    const minutes = Math.floor(diff / (60 * 10000))

    diff = diff % (60 * 1000)
    // 计算相差的秒
    const seconds = Math.round(diff / 1000)

    if (days > 0) {
        str.push(days + '天')
    }
    if (hours > 0) {
        str.push(hours + '小时')
    }
    if (minutes > 0) {
        str.push(minutes + '分钟')
    }
    if (seconds > 0) {
        str.push(seconds + '秒')
    }
    return str.join(' ')


}

/**
 * 人性化时间显示 几天前
 * @param {Object} datetime
 */
export function formateTime(datetime) {
    if (datetime == null) return ''
    let time = new Date()
    let outTime = new Date(datetime)
    if (/^[1-9]\d*$/.test(datetime)) {
        outTime = new Date(parseInt(datetime) * 1000)
    }

    if (
        time.getTime() < outTime.getTime() ||
        time.getFullYear() != outTime.getFullYear()
    ) {
        return parseTime(outTime, '{y}-{m}-{d} {h}:{i}')
    }

    if (time.getMonth() != outTime.getMonth()) {
        return parseTime(outTime, '{m}-{d} {h}:{i}')
    }

    if (time.getDate() != outTime.getDate()) {
        let day = outTime.getDate() - time.getDate()
        if (day == -1) {
            return parseTime(outTime, '昨天 {h}:{i}')
        }

        if (day == -2) {
            return parseTime(outTime, '前天 {h}:{i}')
        }

        return parseTime(outTime, '{m}-{d} {h}:{i}')
    }

    let diff = time.getTime() - outTime.getTime()

    if (time.getHours() != outTime.getHours() || diff > 30 * 60 * 1000) {
        return parseTime(outTime, '{h}:{i}')
    }

    let minutes = outTime.getMinutes() - time.getMinutes()
    if (minutes == 0) {
        return '刚刚'
    }

    minutes = Math.abs(minutes)
    return `${minutes}分钟前`
}

/**
 * 时间格式化方法
 * @param {(Object|string|number)} time
 * @param {String} cFormat
 * @returns {String | null}
 */
export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }

    let date
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'

    if (typeof time === 'object') {
        date = time
    } else {
        if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
            time = parseInt(time)
        }
        if (typeof time === 'number' && time.toString().length === 10) {
            time = time * 1000
        }

        date = new Date(time.replace(/-/g, '/'))
    }

    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay(),
    }

    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }

        return value.toString().padStart(2, '0')
    })

    return time_str
}

export function pathNormalize(path) {
    if (!path) return '/'
    if (!isString(path)) {
        throw new Error('path must be string')
    }
    return '/' + path.split(/\.+\//).filter(p => !!p).join('/').split('/').filter(p => !!p).join('/')

}


/**
 * 首字母大写
 * @param {*} str
 */
export function capitalize(str) {
    if (!str) return ''
    str = str.toString()
    return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 首字母小写
 * @param {*} str
 */
export function uppercaseFirst(str) {
    if (!str) return ''
    str = str.toString()
    return str.charAt(0).toLowerCase() + str.slice(1)
}

/**
 * 下划转驼峰
 * @param {*} str 
 */
export function camelCase(str) {
    return str.replace(/-[a-z]/g, str1 => str1.substr(-1).toUpperCase())
}


/**
 * 深度拷贝
 */
export function deepCopy(obj, cache = []) {
    // just return if obj is immutable value
    if (obj === null || typeof obj !== 'object') {
        return obj
    }

    // if obj is hit, it is in circular structure
    /* const hit = find(cache, c => c.original === obj)
    if (hit) {
        return hit.copy
    } */

    const copy = Array.isArray(obj) ? [] : {}
    // put the copy into cache at first
    // because we want to refer it in recursive deepCopy
    /* cache.push({
        // original: obj,
        copy,
    }) */

    Object.keys(obj).forEach((key) => {
        copy[key] = deepCopy(obj[key], cache)
    })

    return copy
}

/**
 * 节流
 */
export const throttle = function (fn, delay = 50, isThrottle = true, _this) {
    let lastime = 0
    let timer
    return function () {
        const now = +new Date()
        const args = arguments
        if (!isThrottle) {
            fn.apply(_this, args)
            return
        }
        if (lastime && lastime < now + delay) {
            !timer && (timer = setTimeout(() => {
                clearTimeout(timer)
                lastime = now
                timer = null
                fn.apply(_this, args)
            }, delay))
        } else {
            clearTimeout(timer)
            lastime = now
            fn.apply(_this, args)
        }
    }
}

/**
 * 防抖
 */
export const debounce = (fn, delay = 50, isDebounce = false, _this) => {
    // [delay]毫秒之后执行异步，若[delay]毫秒内多次触发重新计时
    let timer
    return function () {
        const args = arguments
        if (isDebounce) {
            timer && clearTimeout(timer)

            timer = setTimeout(() => {
                fn.apply(_this, args)
            }, delay)
        } else {
            fn.apply(_this, args)
        }
    }
}

/**
 * 
 */
export function imageCanvas(img, type = 'image/png') {
    let canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    // let dataURL = canvas.toDataURL(type);
    return ctx;
}

/**
 * 是否是数组
 */
export const isArray = array => Array.isArray(array)

/**
 * 是否是字符串
 */
export const isString = (obj) => typeof obj === 'string';

/**
 * 是否是数值
 */
export const isNumber = obj => typeof obj === 'number';

/**
 * 是否为全部数字
 */
export function isNumberStr(str) {
    return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str)
}

/**
 * 是否是对象
 */
export const isObject = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * 是否是布尔
 */
export const isBoolean = obj => typeof obj === 'boolean';


/**
 * 是否为空判断
 */
export const isEmpty = (obj) => {
    if (!obj) {
        return true
    }
    if (isString(obj) && obj.length === 0) {
        return true
    }

    if (isArray(obj) && obj.length === 0) {
        return true
    }
    if (isObject(obj)) {
        for (let k in obj) {
            if (obj.hasOwnProperty(k)) {
                return false
            }
        }
        return true
    }
    return false

}

/**
 * 判断是否是Date 日期类型
 */
export const isDate = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Date]'
}


/**
 * 下载文件
 * @param {*} data  Blob二进制数据
 * @param {*} param1  文件名
 */
export const downloadByBlob = (data, { filename }) => {
    const blob = new Blob([data])
    if (window.navigator.msSaveOrOpenBlob) {
        // IE10+下载
        navigator.msSaveBlob(blob, filename);
    } else {
        // 非IE 下载
        const url = URL.createObjectURL(blob);
        downloadByURL(url, { filename })
    }
}
/**
 * 文件下载
 * @param {*} url 下载连接
 * @param {*} param1  文件命
 */
export const downloadByURL = (url, { filename }) => {
    const link = document.createElement('a')
    const evt = document.createEvent('HTMLEvents')
    evt.initEvent('click', false, false)
    link.href = `${url}`
    link.target = '_blank'
    link.download = filename
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    // 释放URL 对象
    window.URL.revokeObjectURL(link.href)
}

/**
 * 去掉路由中的参数 ? 参数
 * @param {*} route
 */
export const getRouteNoQuery = (route = '') => {
    if (route.indexOf('?') > -1) {
        route = route.substr(0, route.indexOf('?'))
    }
    return route
}

/**
 * 模拟a标签打开网站
 * @param {*} url 同 a 标签href
 * @param {*} target  同 a 标签 target 默认 _blank
 */
export const openLink = (url, target = '_blank') => {
    const link = document.createElement('a')
    const evt = document.createEvent('HTMLEvents')
    evt.initEvent('click', false, false)
    link.href = `${url}`
    link.target = target
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    // 释放URL 对象
    window.URL.revokeObjectURL(link.href)
}

/**
 * 组装出一颗树结构
 * 会先排序
 * @param {*} data 数据
 * @param {*} object {id,fid,order}
 * 返回 children：[]
 */
export const assembleTree = (data, lever = true) => {
    let { id, fid,order } = { id: 'id', fid: "parentId",order:'orderNum' }
    data = data.sort((a, b) => a[order] - b[order]);
    let obj = {};
    // * 先生成parent建立父子关系
    data.forEach((item) => {
        obj[item[id]] = item;
    });
    let parentList = [];
    data.forEach((item) => {
        let parent = obj[item[fid]];
        if (parent) {
            if (item.menuType === 'B' && lever) {
                // 按钮权限
                parent.button = parent.button || []
                parent.button.push(item);
            } else {
                // * 当前项有父节点
                parent.children = parent.children || [];
                parent.children.push(item);
            }

        } else {
            if(item.menuType==='B') return
            // * 当前项没有父节点 -> 顶层
            parentList.push(item);
        }
    });
    return parentList;
}

/**
 * 剪贴板复制功能
 *
 * @param {String} value 复制内容
 * @param {Boolean} v 复制添加备注
 * @param {Function} callback 复制成功回调方法
 */
export const copyTextToClipboard = (value, v, callback) => {
    if (v) {
        var remark = '\n-----------------------------------'
            + `\n作者:'${loadUserinfo().uname}'\n链接:${window.location.href}\n来源:Autchan`
            + "\n著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。"
        value += remark
    }
    let textArea = document.createElement('textarea')
    textArea.style.background = 'transparent'
    textArea.value = value
    document.body.appendChild(textArea)
    textArea.select()
    try {
        document.execCommand('copy')
        if (callback) callback()
    } catch (err) {
        alert('Oops, unable to copy')
    }
    document.body.removeChild(textArea)
}