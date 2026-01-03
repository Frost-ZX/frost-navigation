<template>
  <div class="tool-detail-page">

    <!-- 配置参数 -->
    <n-card size="small" title="配置参数">
      <n-form
        class="form-no-feedback"
        label-align="right"
        label-placement="left"
        label-width="auto"
      >

        <n-form-item label="生成数量：">
          <n-input-number
            v-model:value="info.count"
            :min="1"
            :max="1000"
            :step="1"
          ></n-input-number>
        </n-form-item>

        <n-form-item label="选项：">
          <n-flex>
            <n-checkbox
              v-model:checked="info.options.withSplit"
            >是否包含分隔符“-”</n-checkbox>
          </n-flex>
        </n-form-item>

      </n-form>
    </n-card>

    <!-- 操作 -->
    <n-card size="small" title="操作">
      <n-flex>
        <n-button
          type="primary"
          @click="handleGenerate"
        >生成 UUID V4</n-button>
        <n-button
          type="primary"
          :disabled="!info.result"
          @click="handleCopy"
        >复制结果</n-button>
      </n-flex>
    </n-card>

    <!-- 结果 -->
    <n-card size="small" title="结果">
      <n-form
        class="form-no-feedback"
        label-align="right"
        label-placement="left"
        label-width="auto"
      >

        <n-form-item>
          <n-input
            v-model:value="info.result"
            placeholder="生成的 UUID 将显示在这里"
            type="textarea"
            :readonly="true"
            :rows="8"
          ></n-input>
        </n-form-item>

      </n-form>
    </n-card>

  </div>
</template>

<script setup>
import {
  NButton, NCard, NCheckbox,
  NFlex, NForm, NFormItem,
  NInput, NInputNumber,
} from 'naive-ui';

import {
  reactive,
} from 'vue';

import {
  $message,
} from '@/assets/js/naive-ui';

import {
  useClipboard,
} from '@vueuse/core';

import {
  getUuidV4,
} from '@/assets/js/utils';

const clipboard = useClipboard({
  legacy: true,
  read: false,
});

const info = reactive({
  count: 1,
  options: {
    withSplit: true,
  },
  result: '',
});

/** 处理复制操作 */
function handleCopy() {
  if (clipboard.isSupported) {
    return clipboard.copy(info.result).then(() => {
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

/** 处理生成操作 */
function handleGenerate() {

  let count = info.count;
  let opt = info.options;
  let results = [];

  for (let i = 0; i < count; i++) {
    let uuid = getUuidV4(!opt.withSplit);
    results.push(uuid);
  }

  info.result = results.join('\n');

}
</script>

<style lang="less" scoped>
.tool-detail-page {
  :deep(.n-input-number) {
    width: 8em;
  }

  :deep(.n-input--textarea) {
    max-width: 48em;
    font-family: monospace;
  }
}
</style>
