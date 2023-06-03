export default
    {
        path: '/charts',
        perms: "charts",
        redirect: '/charts/vcharts',
        meta: {
            sort: 2,
            title: "图表",
            icon: 'el-icon-s-help',
            hidden: false,
        },
        children: [
            {
                perms: "charts:vcharts",
                path: 'vcharts',
                component: () => import('./VCharts.vue'),
                meta: {
                    title: "VCharts",
                    icon: 'el-icon-message',
                }
            },
            {
                perms: "charts:echarts",
                path: 'echarts',
                component: () => import('./ECharts.vue'),
                meta: {
                    title: "ECharts",
                    icon: 'el-icon-message',
                }
            },
        ]
    }