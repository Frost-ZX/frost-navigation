<template>
  <div class="tool-detail-page">

    <!-- 左 -->
    <div class="page-column">
      <time-info />
    </div>

    <!-- 右 -->
    <div class="page-column">

      <!-- 时钟 -->
      <clock-element ref="clockRef" />

      <!-- 上限提示 -->
      <div class="time-notice">
        <span
          v-show="true"
          class="time-notice-text"
        >时间到达上限</span>
      </div>

      <!-- 确认时间 -->
      <div class="time-submit">
        <span
          v-if="false"
          class="time-notice-text"
        >时间少于30分钟</span>
        <genshin-button
          v-else
          icon-color="#FFC107"
          icon-name="mdi-circle-outline"
          @click="handleConfirm"
        >确认</genshin-button>
      </div>

    </div>

  </div>
</template>

<script setup>
import {
  ref,
} from 'vue';

import ClockElement from './ClockElement.vue';
import GenshinButton from './GenshinButton.vue';
import TimeInfo from './TimeInfo.vue';

/**
 * @desc 时钟元素 ref
 * @type {VueRef<InstanceType<ClockElement>>}
 */
const clockRef = ref(null);

/** 处理点击确认按钮 */
function handleConfirm() {

  let el = clockRef.value;

  if (el) {
    el.handleSubmitTime();
  }

}
</script>

<style lang="less" scoped>
.tool-detail-page {
  border-radius: 8px;
  background-color: #000;
  font-size: 16px;
  text-align: center;
  white-space: nowrap;
}

.page-column {
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;;
  vertical-align: middle;
  height: 100%;
  white-space: initial;

  &:not(:first-child) {
    margin-left: 64px;
  }
}

.time-notice {
  display: flex;
  height: 40px;
  margin-top: 16px;
}

.time-notice-text {
  margin: auto 0;
  font-weight: bold;
  color: #FFF;
  opacity: 0.5;
  font-size: 14px;
}

.time-submit {
  display: flex;
  height: 40px;
}
</style>
