
import {
    capitalize as _capitalize,
    uppercaseFirst as _uppercaseFirst,
    dateFormat as _dateFormat,
    fromNow as _fromNow,
    dateDuration as _dateDuration,
    isDate,
    isString,
    isNumber,
} from '../utils/BaseUtil'

/**
 * 首字母大写
 * @param {*} value
 */
export const capitalize = function (value) {
    return _capitalize(value)
}

/**
 * 首字母小写
 * @param {*} value
 */
export const uppercaseFirst = function (value) {
    return _uppercaseFirst(value)
}

/**
 * 时间格式化指令
 * @param {*} date 时间
 * @param {*} fmt 格式化字符串
 */
export const dateFormat = function (date, fmt) {

    if ((isString(date) && isNumber(Number(date))) || isNumber(date)) {
        try {
            return _dateFormat(new Date(date), fmt)
        } catch (error) {
            console.error(error)
            return date
        }
    }

    if (isDate(date)) {
        return _dateFormat(date, fmt)
    }

    return date
}

const fileUnits = new Array("Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB");
export const fileFormatUnit = (value) => {
    if (!value) {
        return `0 ${fileUnits[0]}`
    }
    let index = 0
    const srcsize = parseFloat(value)
    index = Math.floor(Math.log(srcsize) / Math.log(1024))
    let size = srcsize / Math.pow(1024, index)
    size = size.toFixed(2)
    return size + ' ' + fileUnits[index]
}

/**
 * 时间差计算
 */
export const fromNow = date => {
    if (!date) {
        return ''
    }
    return _fromNow(date)
}

export const dateDuration = diffTime => {
    return _dateDuration(diffTime)
}
