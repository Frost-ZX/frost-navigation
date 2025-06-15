// 本地储存

import { useLocalStorage } from '@vueuse/core';

/** 本地储存 key 前缀 */
export const KEY_PREFIX = 'frost-navigation/';

/** NavView 模块 */
export const storeNavView = {

  /** 导航链接侧边栏折叠状态 */
  isAsideCollapsed: useLocalStorage(KEY_PREFIX + 'nav-view/isAsideCollapsed', false),

  /** 导航链接当前选中分类 */
  currentCategory: useLocalStorage(KEY_PREFIX + 'nav-view/currentCategory', ''),

  /** 导航链接搜索类型 */
  searchType: useLocalStorage(KEY_PREFIX + 'nav-view/searchType', 'all'),

};

/** SearchView 模块 */
export const storeSearchView = {

  /** 当前使用的搜索引擎名称 */
  searchEngineName: useLocalStorage(KEY_PREFIX + 'search-view/searchEngineName', '必应'),

};
