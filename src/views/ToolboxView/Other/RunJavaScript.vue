<template>
  <div class="tool-detail-page">

    <!-- 操作 -->
    <n-card class="actions" size="small" title="操作">
      <n-flex>
        <n-button
          type="primary"
          @click="handleRunCode"
        >执行代码</n-button>
        <n-button
          type="error"
          @click="handleClearContent"
        >清空内容</n-button>
        <n-button
          type="default"
          @click="handleClearOutput"
        >清空输出</n-button>
      </n-flex>
    </n-card>

    <!-- 代码和结果 -->
    <div class="code-and-result">

      <!-- 代码编辑器 -->
      <n-card size="small" title="代码编辑器">
        <div ref="editorContainer" class="editor-container"></div>
      </n-card>

      <!-- 执行结果 -->
      <n-card size="small" title="执行结果">
        <n-scrollbar class="output-container">
          <pre class="output-content">{{ outputContent }}</pre>
        </n-scrollbar>
      </n-card>

    </div>

  </div>
</template>

<script setup>
import {
  NButton, NCard, NFlex, NScrollbar,
} from 'naive-ui';

import {
  ref, shallowRef,
  onBeforeUnmount, onMounted,
} from 'vue';

import {
  initMonacoEnvironment,
} from '@/assets/js/monaco-editor';

import {
  $dialog, $message,
} from '@/assets/js/naive-ui';

import * as monaco from 'monaco-editor';

/** 模块名称 */
const PREFIX = '[RunJavaScript]';

/**
 * @desc 编辑器实例（注：内部不能为响应式，防止出现部分操作会导致界面卡死等异常）
 * @type {VueRef<monaco.editor.IStandaloneCodeEditor>}
 */
const editorInstance = shallowRef(null);

/** @type {VueRef<HTMLElement>} */
const editorContainer = ref(null);

/** 防抖定时器 */
const resizeTimer = ref(null);

/** 输出内容 */
const outputContent = ref('');

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

/** 处理清空输出操作 */
function handleClearOutput() {
  outputContent.value = '';
}

/** 处理执行代码操作 */
function handleRunCode() {

  let code = editorInstance.value?.getValue() || '';

  if (!code.trim()) {
    $message.warning('请先输入要执行的 JavaScript 代码');
    return;
  }

  outputContent.value += '> 开始执行...\n';

  // 创建控制台重定向
  let originalConsole = {
    log: console.log,
    error: console.error,
    warn: console.warn,
    info: console.info,
  };

  // 重定向控制台输出到结果区域
  console.log = (...args) => {
    originalConsole.log(...args);
    outputContent.value += '[LOG] ' + formatConsoleArgs(args) + '\n';
  };

  console.error = (...args) => {
    originalConsole.error(...args);
    outputContent.value += '[ERROR] ' + formatConsoleArgs(args) + '\n';
  };

  console.warn = (...args) => {
    originalConsole.warn(...args);
    outputContent.value += '[WARN] ' + formatConsoleArgs(args) + '\n';
  };

  console.info = (...args) => {
    originalConsole.info(...args);
    outputContent.value += '[INFO] ' + formatConsoleArgs(args) + '\n';
  };

  try {

    // 执行代码
    let result = eval(code);

    // 如果有返回值且不是 undefined，输出结果
    if (result !== undefined) {
      outputContent.value += '返回值: ' + JSON.stringify(result, null, 2) + '\n';
    }

    outputContent.value += '> 执行完成' + '\n';

  } catch (error) {
    outputContent.value += '错误: ' + error.message + '\n';
  } finally {
    // 恢复原控制台
    Object.assign(console, originalConsole);
  }

}

/** 格式化控制台参数 */
function formatConsoleArgs(args) {
  return args.map(arg => {
    if (typeof arg === 'object') {
      return JSON.stringify(arg, null, 2);
    } else {
      return String(arg);
    }
  }).join(' ');
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
  let valueStr = `// 在这里输入 JavaScript 代码\nconsole.log('Hello, World!');`;

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
    language: 'javascript',
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
.tool-detail-page {
  display: flex;
  flex-direction: column;
  container-type: inline-size;
}

.actions {
  height: auto;
}

.code-and-result {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: 12px;
  margin-top: 12px;
  height: 0;

  .n-card {
    width: 0;
    height: 100%;
  }

  :deep(.n-card__content) {
    height: 0;
  }

  .n-card:first-child {
    flex-grow: 1.5;
  }

  .n-card:last-child {
    flex-grow: 1;
  }
}

@container (max-width: 640px) {
  .code-and-result {
    display: block;

    .n-card {
      width: 100%;
      height: 100%;
    }

    .n-card:last-child {
      margin-top: 12px;
    }
  }
}

.editor-container {
  width: 100%;
  height: 100%;
  outline: 1px solid var(--n-border-color);
}

.output-container {
  width: 100%;
  height: 100%;
}

.output-content {
  margin: 0;
  padding: 8px;
  background-color: #F5F5F5;
  border-radius: 4px;
  line-height: 1.5;
  font-family: monospace;
  font-size: 14px;
  color: #252525;
  white-space: pre-wrap;
}
</style>
