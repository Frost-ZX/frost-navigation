<template>
  <div
    class="time-info"
    :style="{ '--image-time-info-arrow': IMAGE_TIME_INFO_ARROW }"
  >

    <!-- 装饰元素 -->
    <div class="arrow-element"></div>

    <!-- 标题 -->
    <div class="time-title time-title-current">当前时间</div>

    <!-- 当前时间值 -->
    <div class="time-value time-value-current">
      <span>{{ timeCurrHour }}</span>
      <span>:</span>
      <span>{{ timeCurrMinute }}</span>
    </div>

    <!-- 三角形图标 -->
    <div class="triangle-icon">
      <span class="mdi mdi-triangle-small-down"></span>
    </div>

    <!-- 标题 -->
    <div class="time-title time-title-target">调整到</div>

    <!-- 三角形图标 -->
    <div class="triangle-icon">
      <span class="mdi mdi-triangle-small-down"></span>
    </div>

    <!-- 目标时间值 -->
    <div class="time-value time-value-target">
      <span>{{ timeNewHour }}</span>
      <span>:</span>
      <span>{{ timeNewMinute }}</span>
    </div>

    <!-- 时间差 -->
    <div class="time-diff">
      <span>{{ timeDiffLabelStill || timeDiffLabel }}</span>
    </div>

    <!-- 装饰元素 -->
    <div class="arrow-element"></div>

  </div>
</template>

<script setup>
import {
  IMAGE_TIME_INFO_ARROW,
  timeCurrHour, timeCurrMinute,
  timeDiffLabel, timeDiffLabelStill,
  timeNewHour, timeNewMinute,
} from './common-data';
</script>

<style lang="less" scoped>
.time-info {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 8em;
  font-size: 16px;
  font-weight: bold;
  line-height: 1;
}

.arrow-element {
  margin: 1.75em 0;
  width: 100%;
  height: 1.5em;
  background-image: var(--image-time-info-arrow);
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

.time-diff {
  display: flex;
  width: 3.5em;
  height: 1.75em;
  border-radius: 1.75em;
  background-color: #282C33;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.75em;

  span {
    margin: auto;
  }
}

.time-title {
  color: #AFA189;
}

.time-title-target {
  margin: 0.25em 0;
}

.time-value {
  color: #ECE3D6;
  font-size: 1.25em;
}

.time-value-current {
  margin-top: 1.25em;
  margin-bottom: 0.25em;
}

.time-value-target {
  margin-top: 0.25em;
  margin-bottom: 0.5em;
}

.triangle-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1em;
  height: 1em;
  color: #FFF;
  font-size: 1.5em;
  opacity: 0.2;
}
</style>
