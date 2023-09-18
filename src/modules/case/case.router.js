export default {
    path: '/case',
    redirect: '/case/code',
    meta: {
        title: "组件模板",
    },
    children: [
        {
            path: 'code',
            component: () => import('./code.vue'),
            meta: {
                title: "代码块",
            }
        },
        {
            path: 'sign',
            component: () => import('./sign.vue'),
            meta: {
                title: "电子签名",
            }
        },
        {
            path: 'md',
            component: () => import('./md.vue'),
            meta: {
                title: "md编辑器",
            }
        },
    ]
}