<template>
  <n-config-provider
    :date-locale="configProviderProps.dateLocale"
    :inline-theme-disabled="configProviderProps.inlineThemeDisabled"
    :locale="configProviderProps.locale"
    :style="{
      '--color-error': themeCommon.errorColor,
      '--color-info': themeCommon.infoColor,
      '--color-primary': themeCommon.primaryColor,
      '--color-success': themeCommon.successColor,
      '--color-warning': themeCommon.warningColor,
    }"
    :theme-overrides="themeOverrides"
  >

    <!-- Naive UI 全局样式 -->
    <n-global-style></n-global-style>

    <!-- 全局侧边栏 -->
    <div class="app-aside-wrapper">
      <app-aside />
    </div>

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

import AppAside from './components/AppAside.vue';

/** 主题变量配置 */
const themeOverrides = configProviderProps.themeOverrides;

/** 主题变量配置 - common */
const themeCommon = themeOverrides.common;
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
  line-height: 1;
}

.n-config-provider {
  display: flex;
  flex-direction: row
}

.app-aside, .app-view {
  height: 100%;
}

.app-aside-wrapper {
  width: 64px;
  border-right: 1px solid var(--color-gray);
}

.app-view {
  flex-grow: 1;
  width: 0;
}
</style>
