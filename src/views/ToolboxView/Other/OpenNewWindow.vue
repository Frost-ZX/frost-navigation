<template>
  <div class="tool-detail-page">

    <!-- 设置 -->
    <n-card size="small" title="设置">
      <n-form
        class="form-no-feedback config-inputs"
        label-align="left"
        label-placement="top"
        label-width="auto"
      >

        <n-form-item label="目标链接">
          <n-input
            v-model:value="data.url"
            placeholder="请输入 URL，需要包含协议部分（https://）"
            type="text"
          ></n-input>
        </n-form-item>

        <n-form-item label="窗口宽度">
          <n-input-number
            v-model:value="data.width"
            :min="0"
            :max="9999999"
            :precision="0"
            :step="1"
          ></n-input-number>
        </n-form-item>

        <n-form-item label="窗口高度">
          <n-input-number
            v-model:value="data.height"
            :min="0"
            :max="9999999"
            :precision="0"
            :step="1"
          ></n-input-number>
        </n-form-item>

      </n-form>
    </n-card>

    <!-- 操作 -->
    <n-card size="small" title="操作">
      <n-button
        type="primary"
        @click="openWindow"
      >打开窗口</n-button>
    </n-card>

  </div>
</template>

<script setup>
import {
  NButton, NCard, NFlex,
  NForm, NFormItem, NInput, NInputNumber,
} from 'naive-ui';

import {
  reactive,
} from 'vue';

/** 数据 */
const data = reactive({
  url: '',
  width: 400,
  height: 300,
});

/** 打开窗口 */
function openWindow() {

  let link = data.url || 'https://github.com/Frost-ZX';
  let width = data.width ?? 400;
  let height = data.height ?? 300;
  let features = `height=${height}, width=${width}, toolbar=no, menubar=no, scrollbars=yes, resizable=yes, location=yes, status=yes`;

  window.open(link, '_blank', features);

}
</script>

<style lang="less" scoped>
.config-inputs .n-form-item {
  max-width: 480px;
}
</style>
