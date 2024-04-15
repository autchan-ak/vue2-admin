import Request from '@/request'

export default {
    actions: {
        getRolesMenus() {
            return Request.get("/private/menus/RolesMenus")
                .then(res => {
                    return Promise.resolve(res.data);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        // 菜单列表
        getList({ commit }, reqData) {
            return Request.post("/private/menus/list", reqData)
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
            return Request.post(`/private/menus/${value}`, reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },

        // 菜单启用
        menusState({ }, reqData) {
            return Request.post("/private/menus/state", reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },

        // 菜单删除
        menusRome({ }, reqData) {
            return Request.post("/private/menus/delete", reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },

        // 访问列表
        visitorInfo({ }, reqData) {
            return Request.post("/private/visitor/list", reqData)
                .then(res => {
                    return Promise.resolve(res.data);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },

        // 记录访客
        recordVisitor() {
            return Request.post("/public/common/visitor/record", { type: 1 })
                .then(res => {
                    return Promise.resolve(res.data);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },

        // 用户列表
        userList({ }, reqData) {
            return Request.post("/private/users/list", reqData)
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
            return Request.post(`/private/users/${value}`, reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },

        // 重置用户密码
        resetPassword({ }, reqData) {
            return Request.post(`/private/users/reset`, reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },

        // 用户删除
        userDelete({ }, reqData) {
            return Request.post("/private/users/delete", reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },

        // 用户启用禁用
        userState({ }, reqData) {
            return Request.post("/private/users/state", reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },

        // 角色列表
        rolesList({ }, reqData) {
            return Request.post("/private/roles/list", reqData)
                .then(res => {
                    return Promise.resolve(res.data);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        // 保存角色
        rolesSever({ commit }, reqData) {
            let value = reqData.id ? 'update' : 'create'
            return Request.post(`/private/roles/${value}`, reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        // 权限删除
        rolesRome({ }, reqData) {
            return Request.post("/private/roles/delete", reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },

        // 文件列表
        fileList({ }, reqData) {
            return Request.post("/private/files/list", reqData)
                .then(res => {
                    return Promise.resolve(res.data);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },

        // 删除文件
        flieRome({ }, reqData) {
            return Request.post("/private/files/delete", reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },

        // 文件下载
        fileDownload({ }, name) {
            return Request.get(`/private/files/findOne?id=${name}`, { responseType: 'arraybuffer' })
                .then(res => {
                    console.log('res=====',res);
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        // 公告管理
        noticeList({ }, reqData) {
            return Request.post("/private/notice/list", reqData)
                .then(res => {
                    return Promise.resolve(res.data);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        addNotice({ }, reqData) {
            let value = reqData.id ? 'update' : 'create'
            return Request.post("/private/notice/" + value, reqData)
                .then(res => {
                    return Promise.resolve(res.data);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        noticeDelete({ }, reqData) {
            return Request.post("/private/notice/delete", reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
    }
}