import Request from '@/request/request.js'

export default {
    actions: {
        getlist({ commit }, reqData) {
            return Request.post("/user/flow/list", reqData)
                .then(res => {
                    return Promise.resolve(res.data);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
    }
}