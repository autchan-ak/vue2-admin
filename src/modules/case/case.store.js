import Request from '@/request'

export default {
    actions: {
        setUserInfo({ commit }, reqData) {
            return Request.post("/user/setUserInfo", reqData)
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
        setEmail({commit},reqData){
            return Request.post("/user/setEmail", reqData)
            .then(res => {
                return Promise.resolve(res.data);
            })
            .catch(err => {
                return Promise.reject(err);
            });
        },
        // 校验并修改
        checkCodeAdd({},reqData){
            return Request.post("/user/checkCode", reqData)
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err);
            });
        }
    }
}