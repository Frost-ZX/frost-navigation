<template>
  <div class="tool-detail-page">

    <!-- 配置选项 -->
    <n-card size="small" style="--color: #2196F3;">
      <template #header>
        <div class="card-title">
          <span class="card-title__icon mdi mdi-cog-outline"></span>
          <span class="card-title__label">配置选项</span>
        </div>
      </template>
      <n-form
        class="form-no-feedback config-inputs"
        label-align="right"
        label-placement="left"
        label-width="auto"
      >

        <n-form-item label="日薪">
          <n-input-number
            v-model:value="configData.dailyWage.value"
            :min="0"
            :max="99999999"
            :precision="2"
            :step="1"
          ></n-input-number>
        </n-form-item>

        <n-form-item label="收入币种">
          <n-input
            v-model:value="configData.currencyOfIncome.value"
            placeholder="用于显示，例如：￥"
            type="text"
            :maxlength="8"
          ></n-input>
        </n-form-item>

        <n-form-item label="工作时间">
          <n-input-group>
            <n-time-picker
              v-model:formatted-value="configData.workTimeStart.value"
              format="HH:mm"
            />
            <n-time-picker
              v-model:formatted-value="configData.workTimeStop.value"
              format="HH:mm"
            />
          </n-input-group>
        </n-form-item>

      </n-form>
    </n-card>

    <!-- 实时进度 -->
    <n-card size="small" style="--color: #F44336;">

      <template #header>
        <div class="card-title">
          <span class="card-title__icon mdi mdi-chart-line"></span>
          <span class="card-title__label">实时进度</span>
        </div>
      </template>

      <div class="progress-item">
        <div class="progress-item__row">
          <span>本月已赚</span>
          <span>1000 ￥</span>
        </div>
        <div class="progress-item__row">
          <n-progress
            color="var(--color)"
            type="line"
            :height="16"
            :percentage="35"
            :processing="true"
            :show-indicator="false"
          />
        </div>
        <div class="progress-item__row">
          <span>35%</span>
          <span>剩余 20.5 天</span>
        </div>
      </div>

      <div class="progress-item">
        <div class="progress-item__row">
          <span>今日已赚</span>
          <span>100 ￥</span>
        </div>
        <div class="progress-item__row">
          <n-progress
            color="var(--color)"
            type="line"
            :height="16"
            :percentage="60"
            :processing="true"
            :show-indicator="false"
          />
        </div>
        <div class="progress-item__row">
          <span>60%</span>
          <span>剩余 5.6 小时</span>
        </div>
      </div>

    </n-card>

    <!-- 下班冲刺 -->
    <n-card size="small" style="--color: #4CAF50;">
      <template #header>
        <div class="card-title">
          <span class="card-title__icon mdi mdi-clock-outline"></span>
          <span class="card-title__label">下班冲刺</span>
        </div>
      </template>
      <div class="time-info">
        <div class="time-info__row">
          <span>距离下班还剩</span>
        </div>
        <div class="time-info__row">
          <span>05:30:20</span>
        </div>
        <div class="time-info__row">
          <span>漫长的一天才过一半，加油吧！</span>
        </div>
      </div>
    </n-card>

    <!-- 获得成就 -->
    <!-- <n-card size="small" style="--color: #FF9800;">
      <template #header>
        <div class="card-title">
          <span class="card-title__icon mdi mdi-trophy-outline"></span>
          <span class="card-title__label">获得成就</span>
        </div>
      </template>
    </n-card> -->

  </div>
</template>

<script setup>
import {
  NButton, NCard, NForm, NFormItem,
  NInput, NInputGroup, NInputNumber,
  NProgress, NTimePicker,
} from 'naive-ui';

import {
  onBeforeMount,
} from 'vue';

import {
  configData, initData,
} from './data';

onBeforeMount(() => {
  initData();
});
</script>

<style lang="less" scoped>
.card-title > span {
  vertical-align: middle;
}

.card-title__icon {
  color: var(--color, #252525);
  font-size: 1.2em;
}

.card-title__label {
  margin-left: 0.5em;
}

.config-inputs {
  .n-form-item {
    max-width: 480px;
  }

  :deep(.n-form-item-blank) > * {
    width: 100%;
  }

  :deep(.n-input-group) > * {
    flex-grow: 1;
    width: 0;
  }
}

.progress-item :not(:first-child) {
  margin-top: 12px;
}

.progress-item__row {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:not(:first-child) {
    margin-top: 4px;
  }

  &:first-child, &:last-child {
    color: #505050;
  }

  &:first-child span:last-child {
    color: var(--color);
    font-size: 1.2em;
    font-weight: bold;
  }

  &:last-child {
    font-size: 0.8em;
  }
}

.time-info {
  padding: 16px 0;
  background-color: var(--color-action);
}

.time-info__row {
  text-align: center;

  &:first-child, &:last-child {
    color: #505050;
  }

  &:nth-child(1) {
    font-size: 1em;
  }

  &:nth-child(2) {
    font-size: 2em;
  }

  &:nth-child(3) {
    font-size: 0.8em;
  }
}
</style>
