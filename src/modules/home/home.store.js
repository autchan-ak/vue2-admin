import Request from '@/request/request.js'

export default {
    actions: {
        getUserInfo({  }) {
            return Request.get("/private/users/infor")
                .then(res => {
                    return Promise.resolve(res.data);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        setUserInfo({ commit }, reqData) {
            return Request.post("/private/users/save", reqData)
                .then(res => {
                    return Promise.resolve(res.data);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        // 修改密码
        reclassify({ commit }, reqData) {
            return Request.post("/private/users/reclassify", reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        // 发送邮件验证码
        setEmail({commit},reqData){
            return Request.post("/private/users/code", reqData)
            .then(res => {
                return Promise.resolve(res.data);
            })
            .catch(err => {
                return Promise.reject(err);
            });
        },
        // 校验并修改
        checkCodeAdd({},reqData){
            return Request.post("/private/users/email", reqData)
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err);
            });
        },
    }
}