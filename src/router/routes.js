const routes = [
    {
        name: 'Home',
        path: '/',
        meta: {
            loadingBar: true
        },
        component: (resolve) => require(['@/views/Home.vue'], resolve)
    },
    {
        name: 'Tools',
        path: '/tools',
        meta: {
            loadingBar: true
        },
        component: (resolve) => require(['@/views/Tools.vue'], resolve),
        children: [
            {
                path: '/tools/:category/:name',
                name: 'ToolsDetail',
                component: (resolve) => require(['@/views/ToolsDetail.vue'], resolve)
            }
        ]
    },
    {
        name: 'Settings',
        path: '/settings',
        meta: {
            loadingBar: true
        },
        component: (resolve) => require(['@/views/Settings.vue'], resolve)
    },
    {
        name: 'About',
        path: '/about',
        meta: {
            loadingBar: true
        },
        component: (resolve) => require(['@/views/About.vue'], resolve)
    }
];

export default routes;
