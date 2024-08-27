import { createRouter, createWebHashHistory } from 'vue-router';

import AboutView from '@/views/AboutView/AboutView.vue';
import IndexView from '@/views/IndexView/IndexView.vue';

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'IndexView',
      component: IndexView,
      meta: {
        iconClass: 'mdi mdi-home-outline',
        showInAside: true,
        title: '主页',
      },
    },
    {
      path: '/search-view',
      name: 'SearchView',
      component: () => import('@/views/SearchView/SearchView.vue'),
      meta: {
        iconClass: 'mdi mdi-magnify',
        showInAside: true,
        title: '搜索',
      },
    },
    {
      path: '/nav-view',
      name: 'NavView',
      component: () => import('@/views/NavView/NavView.vue'),
      meta: {
        iconClass: 'mdi mdi-compass-outline',
        showInAside: true,
        title: '导航',
      },
    },
    {
      path: '/toolbox-view',
      name: 'ToolboxView',
      component: () => import('@/views/ToolboxView/ToolboxView.vue'),
      meta: {
        iconClass: 'mdi mdi-tools',
        showInAside: true,
        title: '工具箱',
      },
    },
    {
      path: '/about-view',
      name: 'AboutView',
      component: AboutView,
      meta: {
        iconClass: 'mdi mdi-information-outline',
        showInAside: true,
        title: '关于',
      },
    },
  ],
});
