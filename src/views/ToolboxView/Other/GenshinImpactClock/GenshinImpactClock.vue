<template>
  <div class="tool-detail-page has-radius">

    <!-- 背景图片 -->
    <div
      class="page-bg-wrapper"
      :style="{ '--curr-time': Number(timeCurrValue) }"
    >
      <div
        :style="{
          '--bg-url': IMAGE_BG_DUSK,
          '--self-hour-1': 18,
          '--self-hour-2': 18,
        }"
      ></div>
      <div
        :style="{
          '--bg-url': IMAGE_BG_MORNING,
          '--self-hour-1': 6,
          '--self-hour-2': 6,
        }"
      ></div>
      <div
        :style="{
          '--bg-url': IMAGE_BG_NIGHT,
          '--self-hour-1': 0,
          '--self-hour-2': 24,
        }"
      ></div>
      <div
        :style="{
          '--bg-url': IMAGE_BG_NOON,
          '--self-hour-1': 12,
          '--self-hour-2': 12,
        }"
      ></div>
      <div class="page-bg-mask"></div>
    </div>

    <!-- 左 -->
    <div class="page-column">
      <time-info />
    </div>

    <!-- 右 -->
    <div class="page-column">

      <!-- 时钟 -->
      <clock-element ref="clockRef" />

      <!-- 上限提示 -->
      <div
        :class="{
          'is-hide': isAutoRotating,
          'time-notice': true,
        }"
      >
        <span
          v-show="isTimeExceeded"
          class="time-notice-text"
        >时间到达上限</span>
      </div>

      <!-- 确认时间 -->
      <div
        :class="{
          'is-hide': isAutoRotating,
          'time-submit': true,
        }"
      >
        <span
          v-if="isTimeTooEarly"
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

import {
  IMAGE_BG_DUSK,
  IMAGE_BG_MORNING,
  IMAGE_BG_NIGHT,
  IMAGE_BG_NOON,
  isAutoRotating,
  isTimeTooEarly,
  isTimeExceeded,
  timeCurrValue,
} from './common-data';

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
  position: relative;
  background-color: #000;
  font-size: 16px;
  text-align: center;
  white-space: nowrap;
}

.page-bg-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
  width: 100%;
  height: 100%;

  > div {
    // [小时 1 相关计算]
    // 计算当前小时与背景对应小时的差值（可能为负数）
    --hour-1-diff: calc(var(--self-hour-1) - var(--curr-time));
    // 计算小时差值的绝对值
    --hour-1-abs: ~"max(var(--hour-1-diff), var(--hour-1-diff) * -1)";
    // 限制小时最大差值为 6
    --hour-1-use: ~"min(6, var(--hour-1-abs))";
    // [小时 2 相关计算，主要用于 0 点]
    // 计算当前小时与背景所在小时的差值（可能为负数）
    --hour-2-diff: calc(var(--self-hour-2) - var(--curr-time));
    // 计算小时差值的绝对值
    --hour-2-abs: ~"max(var(--hour-2-diff), var(--hour-2-diff) * -1)";
    // 限制小时最大差值为 6
    --hour-2-use: ~"min(6, var(--hour-2-abs))";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: var(--bg-url);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    // 根据小时计算透明度
    // 注：计算两个小时的透明度，取最大值
    opacity: ~"calc((6 - min(var(--hour-1-use), var(--hour-2-use))) / 6)";
  }

  .page-bg-mask {
    background-color: #000;
    opacity: 0.75;
  }
}

.page-column {
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;;
  position: relative;
  z-index: 10;
  vertical-align: middle;
  height: 100%;
  white-space: initial;

  &:not(:first-child) {
    margin-left: 64px;
  }
}

.time-notice, .time-submit {
  display: flex;
  height: 40px;
  opacity: 1;
  visibility: visible;
  transition: opacity 0.25s, visibility 0s 0s;

  // 注：
  // visibility 动画时长用于等待 opacity 动画过渡完毕
  &.is-hide {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.25s, visibility 0.25s 0s;
  }
}

.time-notice {
  margin-top: 16px;
}

.time-notice-text {
  margin: auto 0;
  font-weight: bold;
  color: #FFF;
  opacity: 0.5;
  font-size: 14px;
}
</style>
