<template>
  <div class="tool-detail-page">

    <!-- 参数 -->
    <n-card size="small" title="参数">
      <n-form
        class="form-no-feedback"
        label-align="right"
        label-placement="left"
        label-width="auto"
      >

        <n-form-item label="文件大小：">
          <n-input-group>
            <n-input-number
              v-model:value="inputs.sizeValue"
              :precision="2"
              :min="0"
              :max="10000"
              :step="1"
            />
            <n-select
              v-model:value="inputs.sizeUnit"
              label-field="name"
              value-field="name"
              :options="units"
            />
          </n-input-group>
        </n-form-item>

        <n-form-item label="已下载大小：">
          <n-input-group>
            <n-input-number
              v-model:value="inputs.downloadedValue"
              :precision="2"
              :min="0"
              :max="10000"
              :step="1"
            />
            <n-select
              v-model:value="inputs.downloadedUnit"
              label-field="name"
              value-field="name"
              :options="units"
            />
          </n-input-group>
        </n-form-item>

        <n-form-item label="下载速度：">
          <n-input-group>
            <n-input-number
              v-model:value="inputs.speedValue"
              :precision="2"
              :min="0"
              :max="10000"
              :step="1"
            />
            <n-select
              v-model:value="inputs.speedUnit"
              label-field="speed"
              value-field="name"
              :options="units"
            />
          </n-input-group>
        </n-form-item>

      </n-form>
    </n-card>

    <!-- 计算结果 -->
    <n-card size="small" title="计算结果">
      <n-form
        class="form-no-feedback"
        label-align="right"
        label-placement="left"
        label-width="auto"
      >

        <n-form-item label="大约需要时长：">
          <span>{{ outputs.duration || '未计算' }}</span>
        </n-form-item>

        <n-form-item label="大约结束时间：">
          <span>{{ outputs.time || '未计算' }}</span>
        </n-form-item>

      </n-form>
    </n-card>

  </div>
</template>

<script setup>
import {
  NCard, NForm, NFormItem,
  NInputGroup, NInputNumber, NSelect,
} from 'naive-ui';

import {
  reactive, ref,
  watch,
} from 'vue';

import {
  $message,
} from '@/assets/js/naive-ui';

import dayjs from 'dayjs';

/** 单位和比率（基于 KB） */
const units = [
  { name: 'KiB', speed: 'KiB/s', rate: 1 },
  { name: 'MiB', speed: 'MiB/s', rate: 1024 },
  { name: 'GiB', speed: 'GiB/s', rate: 1048576 },
];

/** 参数 */
const inputs = reactive({
  downloadedUnit: 'KiB',
  downloadedValue: 0,
  sizeUnit: 'KiB',
  sizeValue: 0,
  speedUnit: 'KiB',
  speedValue: 0,
});

/** 计算结果 */
const outputs = reactive({
  duration: '',
  time: '',
});

/** 防抖定时器 */
const timer = ref(null);

/** 计算结果 */
function calc() {

  let {
    downloadedUnit, downloadedValue,
    sizeUnit, sizeValue,
    speedUnit, speedValue,
  } = inputs;

  if (sizeValue === 0 || speedValue === 0) {
    outputs.duration = '';
    outputs.time = '';
    return;
  }

  // 获取转换比例
  let downloadedRate = units[units.findIndex((obj) => {
    return (obj.name === downloadedUnit);
  })].rate;
  let sizeRate = units[units.findIndex((obj) => {
    return (obj.name === sizeUnit);
  })].rate;
  let speedRate = units[units.findIndex((obj) => {
    return (obj.name === speedUnit);
  })].rate;

  // 转为 KB 单位
  let realDownloaded = downloadedValue * downloadedRate;
  let realSize = sizeValue * sizeRate - realDownloaded;
  let realSpeed = speedValue * speedRate;

  if (realSize < 0) {
    $message.warning('参数有误，请检查');
    return;
  }

  // 时长（秒）
  let dSeconds = (realSize / realSpeed).toFixed(0);
  // 起始时间
  let timeStart = dayjs();
  // 结束时间
  let timeEnd = timeStart.add(dSeconds, 'second');
  // 时长（天，整数）
  let dDays = timeEnd.diff(timeStart, 'day');
  // 最后一天的起始时间
  let timeLastDay = timeStart.add(dDays, 'day');
  // 时长（格式化，最后一天剩余）
  let dLastDay = dayjs.duration(timeEnd.diff(timeLastDay)).format('HH 时 mm 分 ss 秒');

  outputs.duration = `${dDays} 天 ${dLastDay}`;
  outputs.time = timeEnd.format('YYYY-MM-DD HH:mm:ss');

}

// 自动计算
watch(inputs, () => {
  clearTimeout(timer.value);
  timer.value = setTimeout(() => {
    calc();
  }, 1000);
}, { deep: true });
</script>

<style lang="less" scoped>
.tool-detail-page {
  :deep(.n-input-number) {
    width: 12em;
  }

  :deep(.n-select) {
    width: 8em;
  }
}
</style>
