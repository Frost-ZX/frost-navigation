<template>
  <div class="tool-detail-page">

    <!-- 设置 -->
    <n-card size="small" title="设置">
      <n-flex>
        <!-- 缩进空格 -->
        <div class="config-item">
          <div class="config-item__label">缩进空格：</div>
          <div class="config-item__content">
            <n-input-number
              v-model:value="data.indentSize"
              :min="0"
              :max="8"
              :precision="0"
              :step="1"
            ></n-input-number>
          </div>
        </div>
        <!-- 排序属性 -->
        <div class="config-item">
          <div class="config-item__label">排序属性：</div>
          <div class="config-item__content">
            <n-switch v-model:value="data.enabledSort" />
          </div>
        </div>
      </n-flex>
    </n-card>

    <!-- 操作 -->
    <n-card size="small" title="操作">
      <n-flex>
        <n-button
          type="primary"
          :disabled="!data.jsonInput"
          @click="formatJson"
        >格式化</n-button>
        <n-button
          type="primary"
          :disabled="!data.jsonOutput"
          @click="copyOutputs"
        >复制结果</n-button>
        <n-button
          type="error"
          :disabled="!data.jsonInput"
          @click="clearInputs"
        >清空输入</n-button>
        <n-button
          type="error"
          :disabled="!data.jsonOutput"
          @click="clearOutputs"
        >清空输出</n-button>
      </n-flex>
    </n-card>

    <!-- 输入内容 -->
    <n-card size="small" title="输入内容">
      <n-input
        v-model:value="data.jsonInput"
        class="json-input"
        placeholder="请输入 JSON 字符串"
        type="textarea"
        :rows="8"
        @contextmenu.stop
      ></n-input>
    </n-card>

    <!-- 输出内容 -->
    <n-card size="small" title="输出内容">
      <n-code
        class="json-output"
        language="json"
        :code="data.jsonOutput"
        :show-line-numbers="true"
        @contextmenu.stop
      />
    </n-card>

  </div>
</template>

<script setup>
import {
  NButton, NCard, NCode, NFlex,
  NInput, NInputNumber, NSwitch,
} from 'naive-ui';

import {
  reactive,
} from 'vue';

import {
  compareString, isArray, isObject,
} from '@frost-utils/javascript/common/index';

import {
  useClipboard,
} from '@vueuse/core';

import {
  $message, $notification,
} from '@/assets/js/naive-ui';

/** 剪贴板 */
const clipboard = useClipboard({
  legacy: true,
  read: false,
});

/** 数据 */
const data = reactive({

  /** 启用排序 */
  enabledSort: true,

  /** 缩进空格 */
  indentSize: 2,

  /** 输入内容 */
  jsonInput: '',

  /** 输出内容 */
  jsonOutput: '',

});

/** 清空输入内容 */
function clearInputs() {
  data.jsonInput = '';
}

/** 清空输出内容 */
function clearOutputs() {
  data.jsonOutput = '';
}

/** 复制格式化结果 */
function copyOutputs() {
  if (clipboard.isSupported) {
    return clipboard.copy(data.jsonOutput).then(() => {
      $message.success('复制成功');
    }).catch((error) => {
      console.error('复制失败：');
      console.error(error);
      $message.error('复制失败：异常');
    });
  } else {
    $message.error('复制失败：当前浏览器不支持该操作');
    return Promise.resolve();
  }
}

/** 格式化输入的 JSON */
function formatJson() {
  try {

    let obj = JSON.parse(data.jsonInput);

    // 排序
    if (data.enabledSort) {
      obj = sortObjectKeys(obj);
    }

    data.jsonOutput = JSON.stringify(obj, null, data.indentSize);

  } catch (error) {
    console.warn('格式化 JSON 失败：');
    console.warn(error);
    $notification.create({
      content: String(error),
      duration: 0,
      title: '格式化 JSON 失败',
      type: 'error',
    });
    data.jsonOutput = '';
  }
}

/** 排序对象的 key */
function sortObjectKeys(obj) {

  // 非对象直接返回
  if (!isArray(obj) && !isObject(obj)) {
    return obj;
  }

  // 处理数组，递归处理每个元素
  if (isArray(obj)) {
    return obj.map((item) => sortObjectKeys(item));
  }

  // 获取并排序 key
  let sortedKeys = Object.keys(obj).sort((a, b) => {
    return compareString(a, b);
  });

  // 排序后的对象
  let sortedObj = {};

  // 按顺序获取值 & 递归处理
  for (let key of sortedKeys) {
    sortedObj[key] = sortObjectKeys(obj[key]);
  }

  return sortedObj;

}

</script>

<style lang="less" scoped>
.config-item {
  display: flex;
  align-items: center;

  .n-input-number {
    width: 128px;
  }
}

.json-input {
  font-family: monospace;
}

.json-output {
  user-select: text;

  :deep(pre) {
    overflow-x: auto;
  }
}
</style>
