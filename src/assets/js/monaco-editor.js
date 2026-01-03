import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

/** 初始化 MonacoEnvironment */
export function initMonacoEnvironment() {
  if (!self.MonacoEnvironment) {
    // 配置编辑器环境（Service Worker 等）
    self.MonacoEnvironment = {
      getWorker(workerId, label) {
        if (label === 'javascript' || label === 'typescript') {
          return new tsWorker();
        } else if (label === 'json') {
          return new jsonWorker();
        } else {
          return new editorWorker();
        }
      },
    };
  }
}
