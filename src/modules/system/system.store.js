import Request from '@/request'

export default {
    actions: {
        // 菜单列表
        getList({ commit }, reqData) {
            return Request.post("/system/menus/list", reqData)
                .then(res => {
                    return Promise.resolve(res.data);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },

        // 菜单保存
        preservation({ commit }, reqData) {
            let value = reqData.id ? 'update' : 'create'
            return Request.post(`/system/menus/${value}`, reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },

        // 菜单启用
        menusState({ }, reqData) {
            return Request.post("/system/menus/state", reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },

        // 菜单删除
        menusRome({ }, reqData) {
            return Request.post("/system/menus/delete", reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        // 用户列表
        userList({ }, reqData) {
            return Request.post("/system/users/list", reqData)
                .then(res => {
                    return Promise.resolve(res.data);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },

        // 保存用户
        userSeverForm({ commit }, reqData) {
            let value = reqData.id ? 'update' : 'create'
            return Request.post(`/system/users/${value}`, reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },

        // 重置用户密码
        resetPassword({ }, reqData) {
            return Request.post(`/system/users/reset`, reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },

        // 用户删除
        userDelete({ }, reqData) {
            return Request.post("/system/users/delete", reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },

        // 用户启用禁用
        userState({ }, reqData) {
            return Request.post("/system/users/state", reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },

        // 角色列表
        rolesList({ }, reqData) {
            return Request.post("/system/roles/list", reqData)
                .then(res => {
                    return Promise.resolve(res.data);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },

        // 保存角色权限
        modifyJurisdiction({ }, reqData) {
            return Request.post(`/system/roles/update`, reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },

        // 角色新增修改
        rolesSeve({ }, reqData) {
            let value = reqData.id ? 'update' : 'create'
            return Request.post(`system/roles/${value}`, reqData)
                .then(res => {
                    return Promise.resolve(res.data);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },

        // 角色删除
        rolesRome({ }, reqData) {
            return Request.post("/roles/delete", reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        // 文件列表
        fileList({ }, reqData) {
            return Request.post("/system/files/list", reqData)
                .then(res => {
                    return Promise.resolve(res.data);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        // 删除文件
        flieRome({ }, reqData) {
            return Request.post("/system/files/delete", reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        // 文件下载
        fileDownload({ }, name) {
            return Request.get(`/system/files/findOne?id=${name}`, { responseType: 'arraybuffer' })
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
    }
}