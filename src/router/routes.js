import Home from '@/views/Home.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/tools',
        name: 'Tools',
        component: () => import('@/views/Tools.vue')
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () => import('@/views/Settings.vue')
    }
];

export default routes;
