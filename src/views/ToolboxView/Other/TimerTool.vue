<template>
  <div class="tool-detail-page">

    <!-- 计时器 -->
    <n-card size="small" title="计时器">
      <div class="timer-display">
        <span class="time-main">{{ formatTimeMain(data.timeDisplay) }}</span>
        <span class="time-milliseconds">{{ formatTimeMilliseconds(data.timeDisplay) }}</span>
      </div>
    </n-card>

    <!-- 操作 -->
    <n-card size="small" title="操作">
      <n-flex justify="center">
        <n-button
          type="success"
          :disabled="data.isRunning"
          @click="startTimer"
        >开始</n-button>
        <n-button
          type="warning"
          :disabled="!data.isRunning"
          @click="pauseTimer"
        >暂停</n-button>
        <n-button
          type="error"
          @click="resetTimer"
        >重置</n-button>
        <n-button
          type="primary"
          @click="recordTime"
        >记录</n-button>
      </n-flex>
    </n-card>

    <!-- 配置参数 -->
    <n-card size="small" title="配置参数">
      <n-form
        class="form-no-feedback"
        label-align="left"
        label-placement="top"
        label-width="auto"
      >
        <!-- 计时模式 -->
        <n-form-item label="计时模式">
          <n-radio-group v-model:value="data.timerMode">
            <n-radio-button label="正计时" :value="'countUp'" />
            <n-radio-button label="倒计时" :value="'countDown'" />
          </n-radio-group>
        </n-form-item>

        <!-- 倒计时时间设置 -->
        <n-form-item label="倒计时设置" v-if="data.timerMode === 'countDown'">
          <n-input-group>
            <n-input-number
              v-model:value="data.countDownTime.hours"
              :min="0"
              :max="99"
              :precision="0"
              :step="1"
            ></n-input-number>
            <span class="time-separator">时</span>
            <n-input-number
              v-model:value="data.countDownTime.minutes"
              :min="0"
              :max="59"
              :precision="0"
              :step="1"
            ></n-input-number>
            <span class="time-separator">分</span>
            <n-input-number
              v-model:value="data.countDownTime.seconds"
              :min="0"
              :max="59"
              :precision="0"
              :step="1"
            ></n-input-number>
            <span class="time-separator">秒</span>
          </n-input-group>
        </n-form-item>
      </n-form>
    </n-card>

    <!-- 时间记录 -->
    <n-card size="small" title="时间记录">
      <div class="records-content">
        <div
          v-if="data.records.length === 0"
          class="no-records"
        >暂无记录</div>
        <div
          v-for="(record, index) in data.records"
          :key="record.id"
          class="record-item"
        >
          <span class="record-index">{{ index + 1 }}</span>
          <span class="record-time">{{ formatTime(record.time) }}</span>
          <span class="record-timestamp">{{ formatDateTime(record.timestamp) }}</span>
        </div>
      </div>
      <n-button
        type="error"
        size="small"
        class="clear-records-btn"
        @click="clearRecords"
      >清空记录</n-button>
    </n-card>

  </div>
</template>

<script setup>
import {
  NButton, NCard, NFlex, NForm, NFormItem, NInputGroup, NInputNumber, NRadioButton, NRadioGroup,
} from 'naive-ui';

import {
  reactive, onBeforeUnmount, watch,
} from 'vue';

import {
  getCommonDateTime,
} from '@frost-utils/javascript/common/index';

import {
  $dialog, $notification,
} from '@/assets/js/naive-ui';

/** 数据 */
const data = reactive({
  /** 计时器模式：countUp（正计时）, countDown（倒计时） */
  timerMode: 'countUp',
  /** 是否正在运行 */
  isRunning: false,
  /** 当前显示时间（毫秒） */
  timeDisplay: 0,
  /** 倒计时时间设置 */
  countDownTime: {
    hours: 0,
    minutes: 5,
    seconds: 0
  },
  /** 计时器ID */
  timerID: null,
  /** 开始时间戳 */
  startTime: 0,
  /** 已运行时间 */
  elapsedTime: 0,
  /** 时间记录 */
  records: [],
  /** 记录ID */
  recordID: 0,
});

/** 格式化时间显示（主时间部分：HH:MM:SS） */
function formatTimeMain(milliseconds) {

  let totalSeconds = Math.floor(milliseconds / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

}

/** 格式化时间显示（毫秒部分：.SSS） */
function formatTimeMilliseconds(milliseconds) {
  let ms = milliseconds % 1000;
  return `.${ms.toString().padStart(3, '0')}`;
}

/** 格式化完整时间显示（用于记录和提示） */
function formatTime(milliseconds) {
  return `${formatTimeMain(milliseconds)}${formatTimeMilliseconds(milliseconds)}`;
}

/** 格式化日期时间 */
function formatDateTime(timestamp) {
  return getCommonDateTime(timestamp);
}

/** 开始计时器 */
function startTimer() {

  if (data.timerMode === 'countUp') {

    // 正计时模式
    data.startTime = Date.now() - data.elapsedTime;
    data.timerID = setInterval(() => {
      data.elapsedTime = Date.now() - data.startTime;
      data.timeDisplay = data.elapsedTime;
    }, 10); // 每10毫秒更新一次，提高毫秒显示精度

  } else {

    // 倒计时模式
    if (data.timeDisplay === 0) {
      // 如果是首次开始或重置后开始，设置倒计时时间
      const { hours, minutes, seconds } = data.countDownTime;
      data.timeDisplay = (hours * 3600 + minutes * 60 + seconds) * 1000;
    }

    data.startTime = Date.now() + data.timeDisplay;
    data.timerID = setInterval(() => {

      data.timeDisplay = Math.max(0, data.startTime - Date.now());
      data.elapsedTime = (data.startTime - data.timeDisplay) - data.startTime + data.timeDisplay;

      // 倒计时结束
      if (data.timeDisplay === 0) {
        pauseTimer();
        notify({
          message: '倒计时结束！',
          type: 'success',
          title: '提示'
        });
      }

    }, 10); // 每10毫秒更新一次，提高毫秒显示精度

  }

  data.isRunning = true;

}

/** 暂停计时器 */
function pauseTimer() {
  if (data.timerID) {
    clearInterval(data.timerID);
    data.timerID = null;
    data.isRunning = false;
  }
}

/** 重置计时器 */
function resetTimer() {
  pauseTimer();
  data.elapsedTime = 0;
  data.timeDisplay = 0;
}

/** 记录时间 */
function recordTime() {

  data.recordID += 1;
  data.records.push({
    id: data.recordID,
    time: data.timeDisplay,
    timestamp: Date.now()
  });

  notify({
    message: `已记录时间: ${formatTime(data.timeDisplay)}`,
    type: 'info',
    title: '记录成功'
  });

}

/** 清空记录 */
function clearRecords() {
  $dialog.create({
    content: '确定要清空所有时间记录吗？',
    negativeText: '取消',
    positiveText: '确定',
    title: '确认',
    type: 'default',
    onPositiveClick: () => {
      data.records = [];
      data.recordID = 0;
    },
  });
}

/**
 * @description 提示信息
 * @param {object} options
 * @param {number} options.duration
 * @param {string} options.message
 * @param {string} options.title
 * @param {string} options.type
 */
function notify(options) {

  let {
    duration = 3000,
    message = '',
    title = '提示',
    type = 'info',
  } = options;

  return $notification.create({
    content: message,
    duration: duration,
    title: title,
    type: type,
  });

}

/** 监听计时模式切换 */
watch(
  () => data.timerMode,
  () => {
    // 切换模式时重置计时器
    resetTimer();
  }
);

/** 监听倒计时时间设置变化 */
watch(
  () => [data.countDownTime.hours, data.countDownTime.minutes, data.countDownTime.seconds],
  () => {
    // 只有在倒计时模式且计时器未运行时，才更新显示时间
    if (data.timerMode === 'countDown' && !data.isRunning && data.timeDisplay === 0) {
      const { hours, minutes, seconds } = data.countDownTime;
      data.timeDisplay = (hours * 3600 + minutes * 60 + seconds) * 1000;
    }
  },
  { deep: true }
);

onBeforeUnmount(() => {
  if (data.timerID) {
    clearInterval(data.timerID);
  }
});
</script>

<style lang="less" scoped>
.timer-display {
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  padding: 20px 0;
  color: #2196F3;
  font-family: 'Courier New', monospace;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;

  .time-main {
    font-size: 48px;
  }

  .time-milliseconds {
    font-size: 32px;
    color: #666;
    margin-left: 2px;
  }
}

.time-separator {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  font-size: 16px;
  color: #666;
}

.records-content {
  padding: 8px 16px;
  border: 1px solid #F0F0F0;
  border-radius: 4px;
  background-color: #FFF;
  line-height: 1.6;
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 12px;

  .record-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 0;
    border-bottom: 1px dashed #F0F0F0;

    &:last-child {
      border-bottom: none;
    }
  }

  .record-index {
    width: 30px;
    color: #999;
  }

  .record-time {
    flex: 1;
    text-align: center;
    font-weight: bold;
    color: #2196F3;
    font-family: 'Courier New', monospace;
  }

  .record-timestamp {
    color: #999;
    font-size: 12px;
  }

  .no-records {
    text-align: center;
    color: #999;
    padding: 20px 0;
  }
}

.clear-records-btn {
  display: block;
  margin-left: auto;
}
</style>
