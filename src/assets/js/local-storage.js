// 本地储存

import { useLocalStorage } from '@vueuse/core';

/** 本地储存 key 前缀 */
const PREFIX = 'frost-navigation/';

/** NavView 模块 */
export const storeNavView = {

  /** 导航链接侧边栏折叠状态 */
  isAsideCollapsed: useLocalStorage(PREFIX + 'nav-view/is-aside-collapsed', false),

  /** 导航链接当前选中分类 */
  currentCategory: useLocalStorage(PREFIX + 'nav-view/current-category', ''),

  /** 导航链接搜索类型 */
  searchType: useLocalStorage(PREFIX + 'nav-view/search-type', 'all'),

};

/** SearchView 模块 */
export const storeSearchView = {

  /** 当前使用的搜索引擎名称 */
  searchEngineName: useLocalStorage(PREFIX + 'search-view/search-engine-name', '必应'),

};
