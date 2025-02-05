<template>
  <div class="tool-detail-page">

    <!-- 控制 -->
    <n-card size="small" title="控制">
      <n-form
        class="form-no-feedback form-data"
        label-align="right"
        label-placement="left"
        label-width="9em"
      >

        <n-form-item label="转换模式：">
          <n-select
            v-model:value="data.convertMode"
            :options="[
              { label: '本地时间 -> 时间戳', value: 'toTimestamp' },
              { label: '时间戳 -> 本地时间', value: 'toLocalTime' },
            ]"
          />
        </n-form-item>

        <n-form-item label="时间戳单位：">
          <n-select
            v-model:value="data.timestampUnit"
            :options="[
              { label: '毫秒（ms）', value: 'ms' },
              { label: '秒（s）', value: 's' },
            ]"
          />
        </n-form-item>

        <n-form-item label="自动更新：">
          <n-switch v-model:value="data.autoUpdate" />
        </n-form-item>

        <n-form-item label="操作：">
          <n-flex>
            <n-button
              type="primary"
              @click="convertTime"
            >转换</n-button>
            <n-button
              type="error"
              @click="clearInputs"
            >清空</n-button>
          </n-flex>
        </n-form-item>

      </n-form>
    </n-card>

    <!-- 当前 -->
    <n-card size="small" title="当前">
      <n-form
        class="form-no-feedback form-data"
        label-align="right"
        label-placement="left"
        label-width="9em"
        @contextmenu.stop
      >

        <n-form-item label="本地时间：">
          <n-input
            v-model:value="data.currentLocalTime"
            placeholder=""
            type="text"
            :readonly="true"
          ></n-input>
        </n-form-item>

        <n-form-item label="时间戳（ms）：">
          <n-input
            v-model:value="data.currentTimestamp"
            placeholder=""
            type="text"
            :readonly="true"
          ></n-input>
        </n-form-item>

      </n-form>
    </n-card>

    <!-- 转换 -->
    <n-card size="small" title="转换">
      <n-form
        class="form-no-feedback form-data"
        label-align="right"
        label-placement="left"
        label-width="9em"
        @contextmenu.stop
      >

        <n-form-item label="本地时间：">
          <n-input
            v-model:value="data.convertLocalTime"
            :placeholder="`参考格式：年-月-日 时:分:秒`"
            :readonly="data.convertMode === 'toLocalTime'"
            type="text"
          ></n-input>
        </n-form-item>

        <n-form-item label="时间戳：">
          <n-input
            v-model:value="data.convertTimestamp"
            :placeholder="timestampPlaceholder"
            :readonly="data.convertMode === 'toTimestamp'"
            type="text"
          ></n-input>
        </n-form-item>

      </n-form>
      <n-p>注意：</n-p>
      <n-p>在“本地时间 -> 时间戳”的模式中，若输入的“本地时间”不包含“时间”部分（例如 2025-02-01），将会加上本地时区与零时区的时差后计算。</n-p>
      <n-p>即本地时区为北京时间（UTC+8）时按 08:00 计算，本地时区为东京时间（UTC+9）时按 09:00 计算。</n-p>
    </n-card>

  </div>
</template>

<script setup>
import {
  NButton, NCard, NCode, NFlex,
  NForm, NFormItem,
  NInput, NInputNumber, NP, NSelect, NSwitch,
} from 'naive-ui';

import {
  computed, reactive,
  onBeforeMount, onBeforeUnmount,
} from 'vue';

import {
  $message,
} from '@/assets/js/naive-ui';

import {
  getCommonDateTime,
} from '@frost-utils/javascript/common/index';

/** 数据 */
const data = reactive({
  autoUpdate: true,
  convertLocalTime: '',
  convertMode: 'toTimestamp',
  convertTimestamp: '',
  currentLocalTime: '',
  currentTimestamp: '',
  timestampUnit: 'ms',
  timer: null,
});

/** 时间戳输入占位文本 */
const timestampPlaceholder = computed(() => {
  let suffix = (data.timestampUnit === 'ms' ? '000' : '');
  return '示例：1577808000' + suffix;
});

/** 清空输入内容 */
function clearInputs() {
  data.convertLocalTime = '';
  data.convertTimestamp = '';
}

/** 转换输入的时间 */
function convertTime() {

  let mode = data.convertMode;
  let unit = data.timestampUnit;

  if (mode === 'toLocalTime') {

    let ts = parseInt(data.convertTimestamp);

    // 检测输入内容
    if (isNaN(ts)) {
      $message.warning('请输入时间戳');
      return;
    }

    // 转换时间戳为毫秒
    if (unit === 's') {
      ts *= 1000;
    }

    // 更新结果
    data.convertLocalTime = getCommonDateTime(ts, 'all');

  } else if (mode === 'toTimestamp') {

    let localTime = data.convertLocalTime;
    let converted = 0;

    if (localTime) {
      converted = new Date(localTime).getTime();
    } else {
      $message.warning('请输入本地时间');
      return;
    }

    // 检测输入内容
    if (isNaN(converted)) {
      $message.warning('请输入有效的本地时间');
      return;
    }

    // 更新结果
    data.convertLocalTime = getCommonDateTime(converted, 'all');

    // 转换时间戳为秒
    if (unit === 's') {
      converted = Math.round(converted / 1000);
    }

    // 更新输入内容
    data.convertTimestamp = String(converted);

  }

}

/** 处理定时器 */
function setTimer(isStart = false) {

  if (data.timer) {
    clearInterval(data.timer);
  }

  if (!isStart) {
    data.timer = null;
    return;
  }

  data.timer = setInterval(() => {

    if (!data.autoUpdate) {
      return;
    }

    let currTime = Math.round(Date.now() / 1000) * 1000;
    let timeText = getCommonDateTime(currTime, 'all');

    data.currentLocalTime = timeText;
    data.currentTimestamp = String(currTime);

  }, 1000);

}

onBeforeMount(() => {
  setTimer(true);
});

onBeforeUnmount(() => {
  setTimer(false);
});
</script>

<style lang="less" scoped>
.form-data {
  .n-input {
    max-width: 256px;
  }

  .n-select {
    max-width: 200px;
  }
}
</style>
