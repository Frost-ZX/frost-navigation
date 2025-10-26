<template>
  <div class="tool-detail-page">
    <n-card size="small" title="编辑器">
      <div ref="editorContainer" class="editor-container"></div>
    </n-card>
  </div>
</template>

<script setup>
import {
  NCard,
} from 'naive-ui';

import {
  ref, shallowRef,
  onBeforeUnmount, onMounted,
} from 'vue';

import * as monaco from 'monaco-editor';

import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';

// 配置编辑器环境（Service Worker 等）
if (!self.MonacoEnvironment) {
  self.MonacoEnvironment = {
    getWorker(workerId, label) {
      if (label === 'json') {
        return new jsonWorker();
      } else {
        return new editorWorker();
      }
    },
  };
}

/** 模块名称 */
const PREFIX = '[JsonEditor]';

/**
 * @desc 编辑器实例（注：内部不能为响应式，防止出现部分操作会导致界面卡死等异常）
 * @type {VueRef<monaco.editor.IStandaloneCodeEditor>}
 */
const editorInstance = shallowRef(null);

/** @type {VueRef<HTMLElement>} */
const editorContainer = ref(null);

/** 防抖定时器 */
const resizeTimer = ref(null);

/** 处理窗口大小变化 */
function handleWindowResize() {
  clearTimeout(resizeTimer.value);
  resizeTimer.value = setTimeout(() => {
    if (editorInstance.value) {
      editorInstance.value.layout();
    }
  }, 200);
}

/** 初始化编辑器 */
function initEditor() {

  console.log(PREFIX, 'initEditor');

  let container = editorContainer.value;
  let editor = null;
  let valueStr = '';

  if (!container) {
    console.error(PREFIX, '初始化失败：元素不存在');
    return;
  }

  editor = monaco.editor.create(container, {
    autoDetectHighContrast: false,
    automaticLayout: false,
    contextmenu: true,
    find: {
      cursorMoveOnType: false,
    },
    fontFamily: 'monospace',
    fontSize: 14,
    language: 'json',
    minimap: {
      enabled: true,
      renderCharacters: false,
    },
    mouseWheelScrollSensitivity: 2,
    stickyScroll: {
      enabled: false,
    },
    tabSize: 2,
    theme: 'vs',
    value: valueStr,
  });

  // 注：
  // 若使用自定义字体，且字体的加载时间比编辑器加载时间长，
  // 需要在字体加载完成后调用 monaco.editor.remeasureFonts()，
  // 防止光标位置异常。

  editorInstance.value = editor;

}

/** 销毁编辑器 */
function resetEditor() {

  console.log(PREFIX, 'resetEditor');

  try {
    if (editorInstance.value) {
      editorInstance.value.getModel().dispose()
      editorInstance.value.dispose();
      editorInstance.value = null;
    }
    return true;
  } catch (error) {
    console.error(PREFIX, '销毁失败：');
    console.error(error);
    return false;
  }

}

onMounted(() => {
  initEditor();
  window.addEventListener('resize', handleWindowResize);
});

onBeforeUnmount(() => {
  resetEditor();
  window.removeEventListener('resize', handleWindowResize);
});
</script>

<style lang="less" scoped>
.n-card, .editor-container {
  width: 100%;
  height: 100%;
}

.editor-container {
  outline: 1px solid var(--n-border-color);
}
</style>
