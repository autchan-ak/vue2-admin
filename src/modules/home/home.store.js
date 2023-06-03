import Request from '@/request/request.js'

export default {
    actions: {
        // 用户信息
        getUserInfo({ }) {
            return Request.get("/user/userInfo")
                .then(res => {
                    return Promise.resolve(res.data);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        // 修改头像
        userUpload() {
            return Request.post("/user/upload")
                .then(res => {
                    return Promise.resolve(res.data);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        severUserInfo({ commit }, reqData) {
            return Request.post("/user/update", reqData)
                .then(res => {
                    return Promise.resolve(res.data);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        // 修改密码
        reclassify({ commit }, reqData) {
            return Request.post("/user/reclassify", reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        // 发送邮件验证码
        setEmail({ commit }, reqData) {
            return Request.post("/user/code", reqData)
                .then(res => {
                    return Promise.resolve(res.data);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        // 校验并修改
        checkCodeAdd({ }, reqData) {
            let phone = reqData.phone
            return Request.post(`/user/${phone ? 'phone' : 'email'}`, reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        }
    }
}