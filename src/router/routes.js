import tools from './tools';

/** @type { import('vue-router').RouteConfig[] } */
const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {
            loadingBar: true,
            title: '主页',
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
            loadingBar: true,
            title: '小工具',
        },
        component: () => import(
            /* webpackChunkName: 'tools-view' */
            '@/views/ToolsView.vue'
        )
    },
    {
        path: '/tool',
        name: 'Tool',
        meta: {
            loadingBar: true,
            title: '小工具',
        },
        component: () => import(
            /* webpackChunkName: 'tools-detail' */
            '@/views/ToolsDetail.vue'
        ),
        children: tools
    },
    {
        path: '/settings',
        name: 'Settings',
        meta: {
            loadingBar: true,
            title: '设置',
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
            loadingBar: true,
            title: '关于',
        },
        component: () => import(
            /* webpackChunkName: 'about-view' */
            '@/views/AboutView.vue'
        )
    }
];

export default routes;
