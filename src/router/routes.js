/** @type { import('vue-router').RouteConfig[] } */
const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {
            loadingBar: true
        },
        component: () => import(
            /* webpackChunkName: 'home-view' */
            '@/views/HomeView.vue'
        )
    },
    {
        path: '/tools',
        name: 'Tools',
        meta: {
            loadingBar: true
        },
        component: () => import(
            /* webpackChunkName: 'tools-view' */
            '@/views/ToolsView.vue'
        ),
        children: [
            {
                path: '/tools/:category/:name',
                name: 'ToolsDetail',
                component: () => import(
                    /* webpackChunkName: 'tools-detail' */
                    '@/views/ToolsDetail.vue'
                )
            }
        ]
    },
    {
        path: '/settings',
        name: 'Settings',
        meta: {
            loadingBar: true
        },
        component: () => import(
            /* webpackChunkName: 'settings-view' */
            '@/views/SettingsView.vue'
        )
    },
    {
        path: '/about',
        name: 'About',
        meta: {
            loadingBar: true
        },
        component: () => import(
            /* webpackChunkName: 'about-view' */
            '@/views/AboutView.vue'
        )
    }
];

export default routes;
