<template>
  <n-config-provider
    :date-locale="configProviderProps.dateLocale"
    :hljs="hljs"
    :inline-theme-disabled="configProviderProps.inlineThemeDisabled"
    :locale="configProviderProps.locale"
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

import hljs from 'highlight.js/lib/core';
import hljsJavascript from 'highlight.js/lib/languages/javascript';
import hljsJson from 'highlight.js/lib/languages/json';

import AppAside from './components/AppAside.vue';

/** 主题变量配置 */
const themeOverrides = configProviderProps.themeOverrides;

/** 默认主题变量 */
const themeVars = useThemeVars();

/**
 * @description 阻止默认右键菜单
 * @param {PointerEvent} event
 */
function handleContextMenu(event) {

  let elements = event.composedPath();
  let classValue = '';
  let classRegExp = /(n-code|n-input|n-input-number|n-ol|n-select)/;

  // 排除按住 Ctrl 键时
  if (event.ctrlKey) {
    return;
  }

  for (let i = 0; i < elements.length; i++) {

    let element = elements[i];

    // 获取元素 class 信息
    if (element instanceof HTMLElement) {
      classValue = element.classList.value;
    } else {
      continue;
    }

    // 排除输入框元素
    if (element instanceof HTMLInputElement) {
      return;
    }

    // 排除指定元素
    if (classValue && classRegExp.test(classValue)) {
      return;
    }

  }

  event.preventDefault();

}

/** 初始化 CSS 变量列表 */
function initCssVars() {

  let rootStyle = document.documentElement.style;
  let overrides = themeOverrides.common;
  let variables = themeVars.value;

  let cssVars = {
    // 主题变量
    '--border-radius': overrides.borderRadius,
    '--border-radius-small': overrides.borderRadiusSmall,
    '--box-shadow-1': variables.boxShadow1,
    '--box-shadow-2': variables.boxShadow2,
    '--box-shadow-3': variables.boxShadow3,
    '--color-action': variables.actionColor,
    '--color-border': variables.borderColor,
    '--color-error': overrides.errorColor,
    '--color-info': overrides.infoColor,
    '--color-primary': overrides.primaryColor,
    '--color-success': overrides.successColor,
    '--color-text-1': variables.textColor1,
    '--color-text-2': variables.textColor2,
    '--color-text-3': variables.textColor3,
    '--color-warning': overrides.warningColor,
    // 其他颜色
    '--color-bg-dark': 'var(--color-text-2)',
    '--color-bg-light': '#F8F8F8',
    '--color-black': 'var(--color-text-2)',
    '--color-gray': '#E0E0E0',
    '--color-red': 'var(--color-error)',
    '--color-green': 'var(--color-success)',
    '--color-blue': 'var(--color-info)',
    '--color-orange': 'var(--color-warning)',
    // 滚动条大小
    '--scrollbar-size': '8px',
  };

  for (let key in cssVars) {
    rootStyle.setProperty(key, cssVars[key]);
  }

}

/** 初始化 highlight.js */
function initHighlightJs() {
  hljs.registerLanguage('javascript', hljsJavascript);
  hljs.registerLanguage('json', hljsJson);
}

onMounted(() => {
  initCssVars();
  initHighlightJs();
  window.addEventListener('contextmenu', handleContextMenu);
});

onBeforeUnmount(() => {
  window.removeEventListener('contextmenu', handleContextMenu);
});
</script>

<style lang="less">
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
    position: relative;
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
    position: relative;
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
