import Request from '@/request/request.js'
import { showError } from "@/utils";
import { isArray } from "@/utils/BaseUtil"

const mutations = {
};

const upload = async (url, { file, type = "" }) => {
    const formData = new FormData();
    if (isArray(file)) {
        file.forEach(el => {
            formData.append('file', el);
        });
    } else {
        formData.append('file', file);
    }
    formData.append('module', type);
    return Request.post(url, formData)
};


const actions = {
    /**
     * 上传用户头像图片
     */
    imageAvatarUpload({ }, params) {
        return upload('/private/users/upload', params)
    },
    goodsUpload({ }, params) {
        return upload('/private/goods/upload', params)
    },
    /**
     * 上传文件
     */
    fileUpload({ }, params = {}) {
        return upload(`/private/files/create`, params)
    },
    /**
     * 公用的上传
     */
    noticeUpload({ }, params) {
        return upload(`/private/upload`, params)
    },
    /**
     * module 来区分上传类型
     */
    uploadFlie({ rootGetters }, params = {}) {
        let type = params.file.type;
        let accept = [], url = `/upload/file${params.renam ? '/renam' : ''}`
        switch (params.type) {
            case "10":
                accept = ["image/jpeg", "image/gif", "image/png"]
                break;
            case "20":
                accept = ["video/mp4", "audio/x-m4a", "audio/mpeg"];
                // url = '/upload/upload_movie'
                break;
            case "30":
                accept = ["video/mp4"]
                break;
        }
        if (accept.includes(type)) {
            return upload(url, params, rootGetters)

        } else {
            console.error('上传类型错误!,仅支持：' + accept.join('，'));
            return showError('上传类型错误!,仅支持：' + accept.join('，'))
        }
    },
}

export default {
    namespaced: true,
    mutations,
    actions
}