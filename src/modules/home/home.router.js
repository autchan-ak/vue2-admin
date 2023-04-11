export default {
    path: '/home',
    redirect: '/home/index',
    meta: {
        title: "个人中心",
        icon: 'el-icon-user-solid',
    },
    children: [
        {
            path: 'index',
            component: () => import('./Index.vue'),
            meta: {
                title: "个人设置1",
                icon: 'el-icon-user-solid',
            }
        },
        {
            path: 'Informationall',
            component: () => import('./Informationall.vue'),
            meta: {
                title: "个人消息",
                icon: 'el-icon-message-solid',
            }
        },
    ]
}