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
    },
    {
      path: '/about-view',
      name: 'AboutView',
      component: AboutView,
    },
    {
      path: '/nav-view',
      name: 'NavView',
      component: () => import('@/views/NavView/NavView.vue'),
    },
    {
      path: '/search-view',
      name: 'SearchView',
      component: () => import('@/views/SearchView/SearchView.vue'),
    },
    {
      path: '/toolbox-view',
      name: 'ToolboxView',
      component: () => import('@/views/ToolboxView/ToolboxView.vue'),
    },
  ],
});
