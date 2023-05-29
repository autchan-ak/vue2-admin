import Request from '@/request/request.js'

export default {
    actions: {
        // 获取列表
        getList({ commit }, reqData) {
            return Request.post("/private/sort/list", reqData)
                .then(res => {
                    return Promise.resolve(res.data);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        // 删除
        removeIds({ }, reqData) {
            return Request.post("/private/sort/delete", reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        // 保存
        severForm({ commit }, reqData) {
            let value = reqData.id ? 'update' : 'create'
            return Request.post(`/private/sort/${value}`, reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
    }
}