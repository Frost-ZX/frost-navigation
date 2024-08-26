<template>
  <n-config-provider
    :date-locale="configProviderProps.dateLocale"
    :inline-theme-disabled="configProviderProps.inlineThemeDisabled"
    :locale="configProviderProps.locale"
  >

    <!-- Naive UI 全局样式 -->
    <n-global-style></n-global-style>

    <!-- 全局侧边栏 -->
    <div class="app-aside"></div>

    <!-- 路由页面 -->
    <router-view class="app-view"></router-view>

  </n-config-provider>
</template>

<script setup>
import {
  NConfigProvider, NGlobalStyle,
} from 'naive-ui';

import {
  configProviderProps,
} from './assets/js/naive-ui';
</script>

<style lang="less">
// 全局 CSS 变量
:root {
  // 基础颜色
  --color-black: #252525;
  --color-gray: #E0E0E0;
  // 分类颜色
  --color-bg-dark: #252525;
  --color-bg-light: #F8F8F8;
  // 滚动条大小
  --scrollbar-size: 8px;
}

// 滚动条
::-webkit-scrollbar {
  width: var(--scrollbar-size);
  height: var(--scrollbar-size);
}
::-webkit-scrollbar-corner {
  display: none;
}
::-webkit-scrollbar-track {
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  border-radius: 16px;
  background-color: #CFCFCF;

  &:hover {
    background-color: #C0C0C0;
  }
}

html, body, #app, .n-config-provider {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
html, body {
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
html {
  background-color: #FFF;
  color: var(--color-black);
  font-size: 16px;
}

.n-config-provider {
  display: flex;
  flex-direction: row
}

.app-aside, .app-view {
  height: 100%;
}

.app-aside {
  width: 80px;
}

.app-view {
  flex-grow: 1;
  width: 0;
}
</style>
