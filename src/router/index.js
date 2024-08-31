import {
  createRouter,
  createWebHashHistory,
} from 'vue-router';

import {
  updateAppTitle,
} from '@/assets/js/utils';

import {
  ABOUT_MODULE_ENABLED,
  ABOUT_MODULE_TITLE,
  MC_CTRL_MODULE_ENABLED,
  MC_CTRL_MODULE_TITLE,
  NAV_MODULE_ENABLED,
  NAV_MODULE_TITLE,
  SEARCH_MODULE_ENABLED,
  SEARCH_MODULE_TITLE,
  TOOLBOX_MODULE_ENABLED,
  TOOLBOX_MODULE_TITLE,
} from '@/config/modules';

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
        iconClass: 'mdi mdi-home',
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
        showInAside: SEARCH_MODULE_ENABLED,
        title: SEARCH_MODULE_TITLE,
      },
    },
    {
      path: '/nav-view',
      name: 'NavView',
      component: () => import('@/views/NavView/NavView.vue'),
      meta: {
        iconClass: 'mdi mdi-compass',
        showInAside: NAV_MODULE_ENABLED,
        title: NAV_MODULE_TITLE,
      },
    },
    {
      path: '/toolbox-view',
      name: 'ToolboxView',
      component: () => import('@/views/ToolboxView/ToolboxView.vue'),
      meta: {
        iconClass: 'mdi mdi-tools',
        showInAside: TOOLBOX_MODULE_ENABLED,
        title: TOOLBOX_MODULE_TITLE,
      },
    },
    {
      path: '/minecraft-ctrl-view',
      name: 'MinecraftCtrlView',
      component: () => import('@/views/MinecraftCtrlView/MinecraftCtrlView.vue'),
      meta: {
        iconClass: 'mdi mdi-gamepad',
        showInAside: MC_CTRL_MODULE_ENABLED,
        title: MC_CTRL_MODULE_TITLE,
      },
    },
    {
      path: '/about-view',
      name: 'AboutView',
      component: AboutView,
      meta: {
        iconClass: 'mdi mdi-information',
        showInAside: ABOUT_MODULE_ENABLED,
        title: ABOUT_MODULE_TITLE,
      },
    },
  ],
});

router.afterEach((to) => {
  updateAppTitle(to.meta.title);
});
