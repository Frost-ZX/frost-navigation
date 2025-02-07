<template>
  <div class="tool-detail-page">

    <!-- 设置 -->
    <n-card size="small" title="设置">
      <n-form
        class="form-no-feedback config-inputs"
        label-align="left"
        label-placement="left"
        label-width="auto"
        @contextmenu.stop
      >

        <n-form-item label="目标链接：">
          <n-input
            v-model:value="data.url"
            placeholder="请输入需要打开的 URL，需要包含协议部分（https://）"
            type="text"
          ></n-input>
        </n-form-item>

        <n-form-item label="窗口大小：">
          <n-flex align="center">
            <span>宽度</span>
            <n-input-number
              v-model:value="data.width"
              :min="0"
              :max="9999999"
              :precision="0"
              :step="1"
            ></n-input-number>
            <span>高度</span>
            <n-input-number
              v-model:value="data.height"
              :min="0"
              :max="9999999"
              :precision="0"
              :step="1"
            ></n-input-number>
          </n-flex>
        </n-form-item>

      </n-form>
    </n-card>

    <!-- 操作 -->
    <n-card size="small" title="操作">
      <n-flex>
        <n-button
          type="primary"
          @click="openWindow"
        >打开窗口</n-button>
      </n-flex>
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
.config-inputs {
  .n-input-number {
    flex-grow: 1;
    width: 0;
  }

  .n-flex {
    width: 100%;
  }

  :deep(.n-form-item-blank) {
    max-width: 480px;
  }
}
</style>
