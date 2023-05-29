import Request from '@/request'



const state = {
    dataList: {
        notice: {
            title: "通知",
            list: [],
            icon: 'horn'
        },
        news: {
            title: "消息",
            icon: 'news',
            list: []
        },
        agency: {
            icon: 'flag',
            title: "代办",
            list: []
        }
    },
    noticeBadge: false,

}

const getters = {

}

const mutations = {
    SET_DATA_LIST(state, { name, data, id }) {
        if (id) {
            state.dataList[name].list.forEach((item, i) => {
                if (name == 'news') {
                    if (item.uuid == id) {
                        state.dataList[name].list.splice(i, 1)
                    }
                } else if (item.id == id) {
                    state.dataList[name].list.splice(i, 1)
                }
            })
        } else {
            state.dataList[name].list = data || []
        }
    },
    SET_DATA_LIST_ADD(state, { name, data }) {
        state.dataList[name].list.forEach((item, i) => {
            if (name == 'news' && item.uuid == data.uuid) {
                // 同一会话新消息添加
                state.dataList[name].list.splice(i, 1)
            }
        })
        state.dataList[name].list.unshift(data)
        state.noticeBadge = true
    },
    SET_NOTICE_BADGE(state) {
        state.noticeBadge = !!(state.dataList.notice.list.length || state.dataList.news.list.length || state.dataList.agency.list.length)
    }
}
const actions = {
    // 获取系统通知
    getNotification({ commit }) {
        return Request.post("/notification/list")
            .then(res => {
                Object.keys(res.data).forEach(item => {
                    commit("SET_DATA_LIST", { name: item, data: res.data[item] })
                });
                commit("SET_NOTICE_BADGE")
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    },
    getList({ commit }, reqData) {
        return Request.post("/notification/home/list", reqData)
            .then(res => {
                return Promise.resolve(res.data);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    },
    // 已读
    notificationRead({ commit }, reqData) {
        return Request.post("/notification/read", reqData)
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    },

    setDataListRome({ commit }, reqData) {
        return Request.post("/notification/empty", reqData)
            .then(res => {
                commit("SET_DATA_LIST", reqData)
                commit("SET_NOTICE_BADGE")
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err);
            });

    },
    setDataListAdd({ commit }, reqData) {
        commit("SET_DATA_LIST_ADD", reqData)
    },
}








export default {
    namespaced: true,
    getters,
    state,
    mutations,
    actions
}
