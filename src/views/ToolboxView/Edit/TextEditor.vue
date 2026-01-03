<template>
  <div class="tool-detail-page">

    <!-- 操作 -->
    <n-card size="small" title="操作">
      <n-flex>
        <n-flex align="center">
          <span>文件格式：</span>
          <n-select
            v-model:value="textEncoding"
            :options="[
              { label: 'GBK', value: 'gbk' },
              { label: 'UTF-8', value: 'utf-8' },
            ]"
            style="width: 160px;"
          />
        </n-flex>
        <n-button
          type="primary"
          @click="handleOpenFile"
        >打开文件</n-button>
        <n-button
          type="error"
          @click="handleClearContent"
        >清空内容</n-button>
      </n-flex>
    </n-card>

    <n-card size="small" title="编辑器">
      <div ref="editorContainer" class="editor-container"></div>
    </n-card>

  </div>
</template>

<script setup>
import {
  NButton, NCard, NFlex, NSelect,
} from 'naive-ui';

import {
  ref, shallowRef,
  onBeforeUnmount, onMounted,
} from 'vue';

import {
  useFileDialog,
} from '@vueuse/core';

import {
  initMonacoEnvironment,
} from '@/assets/js/monaco-editor';

import {
  $dialog, $message,
} from '@/assets/js/naive-ui';

import * as monaco from 'monaco-editor';

/** 模块名称 */
const PREFIX = '[TextEditor]';

const {
  onChange: fileOnChange,
  open: fileOpen,
  reset: fileReset,
} = useFileDialog({
  accept: '*',
  directory: false,
  multiple: false,
});

/**
 * @desc 编辑器实例（注：内部不能为响应式，防止出现部分操作会导致界面卡死等异常）
 * @type {VueRef<monaco.editor.IStandaloneCodeEditor>}
 */
const editorInstance = shallowRef(null);

/** @type {VueRef<HTMLElement>} */
const editorContainer = ref(null);

/** 防抖定时器 */
const resizeTimer = ref(null);

/** 文件编码 */
const textEncoding = ref('utf-8');

/** 处理清空内容操作 */
function handleClearContent() {
  $dialog.create({
    content: '确定要清空编辑器内容吗？',
    negativeText: '取消',
    positiveText: '确定',
    title: '确认',
    type: 'default',
    onPositiveClick: () => {
      updateEditorContent('');
    },
  });
}

/** 处理打开文件操作 */
function handleOpenFile() {
  fileReset();
  fileOpen();
}

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
    language: 'plaintext',
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

/** 更新编辑器内容 */
function updateEditorContent(text = '') {
  if (editorInstance.value) {
    editorInstance.value.setValue(text);
  }
}

fileOnChange((files) => {

  let file = files ? files[0] : null;

  file && file.arrayBuffer().then((buffer) => {
    try {

      let decoder = new TextDecoder(textEncoding.value);
      let text = decoder.decode(buffer);

      updateEditorContent(text);

    } catch (error) {
      console.error('解码失败：');
      console.error(error);
      $message.error('打开文件失败：解码失败');
    }
  }).catch((error) => {
    console.error('打开文件失败：');
    console.error(error);
    $message.error('打开文件失败：读取失败');
  });

});

onMounted(() => {
  initMonacoEnvironment();
  initEditor();
  window.addEventListener('resize', handleWindowResize);
});

onBeforeUnmount(() => {
  resetEditor();
  window.removeEventListener('resize', handleWindowResize);
});
</script>

<style lang="less" scoped>
.n-card:nth-child(1) {
  height: auto;
}

.n-card:nth-child(2) {
  height: 100%;
}

.n-card, .editor-container {
  width: 100%;
}

.editor-container {
  height: 100%;
  outline: 1px solid var(--n-border-color);
}
</style>
