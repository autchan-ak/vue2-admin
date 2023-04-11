export default {
    path: '/system',
    perms: "system",
    redirect: '/system/userManage',
    meta: {
        title: "系统管理",
        icon: 'el-icon-user-solid',
        hidden: false,
        // sort:99,
    },
    children: [
        {
            path: 'userManage',
            component: () => import('./userManage.vue'),
            meta: {
                title: "用户管理",
                roles: ['admin']
            }
        },
        {
            path: 'roleManage',
            component: () => import('./roleManage.vue'),
            meta: {
                title: "角色管理",
                roles: ['admin']
            }
        },
        {
            path: 'menuManage',
            component: () => import('./menuManage.vue'),
            meta: {
                title: "菜单管理",
                roles: ['admin']
            }
        },
        {
            path: 'zd',
            component: () => import('./dictionaries.vue'),
            meta: {
                title: "字典管理",
            }
        },
        {
            path:'interface',
            component: () => import('./Interface'),
            meta: {
                title: "接口",
            }
        },
        // {
        //     path: 'logManage',
        //     component: () => import('./logManage.vue'),
        //     meta: {
        //         title: "日志管理",
        //         roles: ['admin']
        //     }
        // },
        // {
        //     path: 'notice',
        //     component: () => import('./notice.vue'),
        //     meta: {
        //         title: "通知公告",
        //         roles: ['admin']
        //     }
        // },
        {
            path: 'enclosure',
            component: () => import('./enclosureManage.vue'),
            meta: {
                title: "资源管理",
                hidden: false,
            }
        },
    ]
}