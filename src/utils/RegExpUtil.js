const passwdRegExps = [
    new RegExp('[0-9]+'),       // 查找数字
    new RegExp('[a-z]+'),       // 查找小写字母
    new RegExp('[A-Z]+'),       // 查找大写字母
    new RegExp('[^0-9a-zA-Z]+'),// 查找特殊字符
]

const nameRegExp = new RegExp(/^[\w\u4e00-\u9fa5](([\w\u4e00-\u9fa5-]+)?[\w\u4e00-\u9fa5])?$/)
const extraCodeRegExp = new RegExp(/^[a-zA-Z\d]+((_[a-zA-Z\d]+)*$|(:[a-zA-Z\d]+)*$|(-[a-zA-Z\d]+)*$)/)
//外链URL正则
// eslint-disable-next-line
const remoteUrlRegExp = new RegExp(/^https?:\/\/(www.)?(?!www)[\da-z]+(-[\da-z])?(\.[a-z]+)*(\.[a-z]{2,5})((\/\w+(-\w+)?)|(\/:\w+))*\/?(\?([^=?&]+=([^=?&]+)?&?)*)?$/)
// 内联URL正则
const localUrlRegExp = new RegExp(/^(\/:?\w+(-\w+){0,})+\/?(\?[\s\S]+)?$/)
const emailRegExp = new RegExp(/^\w+@[\dA-Za-z]+(-[\dA-Za-z]+)?(\.[a-z]{2,5}){1,2}$/)
const phoneRefExp = new RegExp(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)
//允许域名等结尾的URL
// const templateUrl =new RegExp(/^(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$/)
//只能以https和http开头
const templateUrl = new RegExp(/(http|https):\/\/([\w.]+\/?)\S*/)
var strRegex = "^((https|http|ftp|rtsp|mms)://)?[a-z0-9A-Z]{3}.[a-z0-9A-Z][a-z0-9A-Z]{0,61}?[a-z0-9A-Z].com|net|cn|cc|org|gov|edu (:s[0-9]{1-4})?/$";
//URL正则
const UrlRegExp = new RegExp(strRegex)
// 匹配图片
const imageRegExp = new RegExp(/^image\/.*$/)

/**
 * 匹配中文、数字、字母、下划线、横线、空格；两边不能有空格和横线
 * 一般用作显示名称，比如用户名，菜单名称等
 * @param {*} value
 */
export const matchName = (value) => {
    return nameRegExp.test(value)
}

/**
 * 匹配密码 至少包含数字、小写字母、大写字母、特殊字符中的三种
 * @param {*} value
 */
export const matchPasswd = (value) => {
    let i = 0
    passwdRegExps.forEach(regExp => {
        if (regExp.test(value)) {
            i += 1
        }
    })
    return i >= 3
}

/**
 * 匹配数字、字母、下划线
 * @param {*} value
 */
export const matchCode = (value) => {
    return /^[\w]+$/.test(value)
}
/**
 * 只允许输入数字、字母、特殊字符(:-_),特殊字符不能连续且只能出现一种
 */
export const matchExtraCode = (value) => {
    return extraCodeRegExp.test(value)
}

/**
 * 匹配手机号
 */
export const matchPhone = value =>{
    return phoneRefExp.test(value)
}

/**
 * 匹配邮箱
 * @param {*} value
 */
export const matchEmail = (value) => {
    return emailRegExp.test(value)
}
/**
 * 匹配外链URL
 * @param {*} value
 * 示例：
 * http[s]://[www.]example.com[/ser][/:sds][?][sdas=[qeq]][&sads=asdasd]
 */
export const matchRemoteUrl = (value) => {
    return remoteUrlRegExp.test(value)
}
//允许带 :8000 或 /top 等之类结尾的
export const matchTemplateUrl = (value) => {
    return templateUrl.test(value)
}
//URL验证
export const suitedUrl = (value) => {
    return UrlRegExp.test(value)
}
/**
 * 匹配内链URL
 * @param {*} value
 * 示例：
 * [/]test[/asdad][/:sasad][?][sadas=[sadda]][&sads=asdasd]
 * /:sad[/asda][/:sada][?][sadas=[sadda]][&sads=asdasd]
 */
export const matchUrl = (value) => {
    return localUrlRegExp.test(value)
}

/**
 * 匹配图片
 * @param {*} value
 */
export const matchImage = (fileType) => {
    return imageRegExp.test(fileType)
}

/**
 * 只匹配中文和英文
 * @param {*} value
 */
export const matchChineseEnglish = (value) => {
    return /^[a-zA-Z\u4e00-\u9fa5]+$/.test(value)
}
/**
 * 匹配是否存在emoji表情
 * @param {*} value
 */
export const matchEmoji = value => {
    return /\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu.test(value)
}


