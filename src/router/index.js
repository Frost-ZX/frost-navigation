import {
  createRouter,
  createWebHashHistory,
} from 'vue-router';

import {
  updateAppTitle,
} from '@/assets/js/utils';

import {
  ENABLE_MC_CTRL_MODULE,
  ENABLE_NAV_MODULE,
  ENABLE_SEARCH_MODULE,
  ENABLE_TOOLBOX_MODULE,
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
        showInAside: ENABLE_SEARCH_MODULE,
        title: '搜索',
      },
    },
    {
      path: '/nav-view',
      name: 'NavView',
      component: () => import('@/views/NavView/NavView.vue'),
      meta: {
        iconClass: 'mdi mdi-compass-outline',
        showInAside: ENABLE_NAV_MODULE,
        title: '导航',
      },
    },
    {
      path: '/toolbox-view',
      name: 'ToolboxView',
      component: () => import('@/views/ToolboxView/ToolboxView.vue'),
      meta: {
        iconClass: 'mdi mdi-tools',
        showInAside: ENABLE_TOOLBOX_MODULE,
        title: '工具箱',
      },
    },
    {
      path: '/minecraft-ctrl-view',
      name: 'MinecraftCtrlView',
      component: () => import('@/views/MinecraftCtrlView/MinecraftCtrlView.vue'),
      meta: {
        iconClass: 'mdi mdi-gamepad',
        showInAside: ENABLE_MC_CTRL_MODULE,
        title: 'MINECRAFT 联动控制',
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

router.afterEach((to) => {
  updateAppTitle(to.meta.title);
});
