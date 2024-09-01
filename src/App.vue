<template>
  <n-config-provider
    :date-locale="configProviderProps.dateLocale"
    :inline-theme-disabled="configProviderProps.inlineThemeDisabled"
    :locale="configProviderProps.locale"
    :style="{
      '--border-radius': themeCommon.borderRadius,
      '--border-radius-small': themeCommon.borderRadiusSmall,
      '--box-shadow-1': themeVars.boxShadow1,
      '--box-shadow-2': themeVars.boxShadow2,
      '--box-shadow-3': themeVars.boxShadow3,
      '--color-action': themeVars.actionColor,
      '--color-border': themeVars.borderColor,
      '--color-error': themeCommon.errorColor,
      '--color-info': themeCommon.infoColor,
      '--color-primary': themeCommon.primaryColor,
      '--color-success': themeCommon.successColor,
      '--color-text-1': themeVars.textColor1,
      '--color-text-2': themeVars.textColor2,
      '--color-text-3': themeVars.textColor3,
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
  useThemeVars,
} from 'naive-ui';

import {
  onMounted, onBeforeUnmount,
} from 'vue';

import {
  configProviderProps,
} from './assets/js/naive-ui';

import AppAside from './components/AppAside.vue';

/** 主题变量配置 */
const themeOverrides = configProviderProps.themeOverrides;

/** 主题变量配置 - common */
const themeCommon = themeOverrides.common;

/** 默认主题变量 */
const themeVars = useThemeVars();

/**
 * @description 阻止默认右键菜单
 * @param {PointerEvent} event
 */
function handleContextMenu(event) {

  let element = event.target;

  // 排除按住 Ctrl 键时
  if (event.ctrlKey) {
    return;
  }

  // 排除输入框元素
  if (
    element instanceof HTMLInputElement &&
    ['password', 'text', 'textarea'].includes(element.type)
  ) {
    return;
  }

  event.preventDefault();

}

onMounted(() => {
  window.addEventListener('contextmenu', handleContextMenu);
});

onBeforeUnmount(() => {
  window.removeEventListener('contextmenu', handleContextMenu);
});
</script>

<style lang="less">
// 全局 CSS 变量
:root {
  // 基础颜色
  --color-black: rgb(51, 54, 57);
  --color-gray: #E0E0E0;
  // 分类颜色
  --color-bg-dark: rgb(51, 54, 57);
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

// 预设样式
.shadow-1 {
  box-shadow: var(--box-shadow-1);
}
.shadow-2 {
  box-shadow: var(--box-shadow-2);
}
.shadow-3 {
  box-shadow: var(--box-shadow-3);
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
  box-sizing: border-box;
  background-color: #FFF;
  color: var(--color-black);
  font-size: 16px;
  line-height: 1;

  * {
    box-sizing: inherit;
  }
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
  border-right: 1px solid var(--color-border);
}

.app-view {
  flex-grow: 1;
  width: 0;
  background-color: var(--color-action);

  &.flex-col {
    display: flex;
    flex-direction: column;
  }

  .app-view-header {
    display: flex;
    align-items: center;
    padding: 0 16px;
    height: 64px;
    background-color: #FFF;
    border-bottom: 1px solid var(--color-border);
    font-size: 18px;
    font-weight: bold;

    .placeholder {
      flex-grow: 1;
      width: 0;
    }
  }

  .app-view-content {
    flex-grow: 1;
    padding: 20px;
    width: 100%;
    height: 0;
    background-color: #FFF;

    &.is-transparent {
      background-color: transparent;
    }

    &.with-margin {
      margin: 20px;
      width: calc(100% - 40px);
      border: 1px solid var(--color-border);
    }
  }
}

// -- Naive UI --

.n-drawer--right-placement {
  .n-drawer-body {
    height: 0;
  }

  .n-drawer-body-content-wrapper {
    padding: 20px !important;
    line-height: 1;
  }
}
</style>
