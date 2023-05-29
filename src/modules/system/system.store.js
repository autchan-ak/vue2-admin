import Request from '@/request'

export default {
    actions: {
        // 目录列表
        getList({ commit }, reqData) {
            return Request.post("/system/menu/list", reqData)
                .then(res => {
                    return Promise.resolve(res.data);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        preservation({ commit }, reqData) {
            return Request.post("/system/menu/preservation", reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        rome({ }, reqData) {
            return Request.post("/system/menu/rome", reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        setMenuEna({ }, reqData) {
            return Request.post("/system/menu/enable", reqData)
                .then(res => {
                    return Promise.resolve(res.data);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        // 用户列表
        userList({ }, reqData) {
            return Request.post("/user/list", reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        userListAll() {
            return Request.post("/user/list/all")
                .then(res => {
                    return Promise.resolve(res.data);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        userRome({ }, reqData) {
            return Request.post("/user/rome", reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        // 用户启用禁用
        setUserEna({ }, reqData) {
            return Request.post("/user/enable", reqData)
                .then(res => {
                    return Promise.resolve(res.data);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        userReg({ }, reqData) {
            return Request.post("/user/reg", reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        // 重置用户密码
        resetPassWord({ }, reqData) {
            return Request.post("/user/resetPwd", reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        // 用户权限
        getuserRoles({ }, reqData) {
            return Request.post("/user/roles", reqData)
                .then(res => {
                    return Promise.resolve(res.data);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        setUserRules({ }, reqData) {
            return Request.post("/user/setRoles", reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        // 角色列表
        rolesList({ }, reqData) {
            return Request.post("/roles/list", reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        setEna({ }, reqData) {
            return Request.post("/roles/enable", reqData)
                .then(res => {
                    return Promise.resolve(res.data);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        rolesPreservation({ commit }, reqData) {
            return Request.post("/roles/preservation", reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        // 权限删除
        rolesRome({ }, reqData) {
            return Request.post("/roles/rome", reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        // 权限获取
        jurisdiction({ commit }, reqData) {
            return Request.post(`/roles/jurisdiction/${reqData.url}`, { id: reqData.id })
                .then(res => {
                    return Promise.resolve(res.data);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        // 保存权限
        modifyJurisdiction({ }, reqData) {
            return Request.post(`/roles/modifyJurisdiction/${reqData.url}`, reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        // 资源
        // 目录列表
        getFileList({ commit }, reqData) {
            return Request.post("/upload/list", reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        flieRome({ }, reqData) {
            return Request.post("/upload/delete", reqData)
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        // 字典管理
        getZdList(){
            return Request.post("/system/zd/list")
            .then(res => {
                return Promise.resolve(res.data);
            })
            .catch(err => {
                return Promise.reject(err);
            });
        },
        zdRome({},reqData){
            return Request.post("/system/zd/del",reqData)
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err);
            });
        },
        zdModify({},reqData){
            return Request.post("/system/zd/modify",reqData)
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err);
            });
        }
    }
}