<template>
  <div
    ref="selfRef"
    class="tool-detail-page"
    :class="{
      'is-dark-color': isDarkColor,
      'is-faded': isFaded,
      'is-on': wakeLock.isActive.value,
    }"
    :style="{
      '--bg-color': bgColor,
    }"
    @click="isFaded = false"
  >
    <div class="controls">

      <div class="title">开关 / Switch</div>

      <n-switch
        :value="wakeLock.isActive.value"
        size="medium"
        :round="false"
        @update:value="handleToggleWakeLock"
      >
        <template #checked>开启</template>
        <template #unchecked>关闭</template>
      </n-switch>

      <div class="title">背景颜色 / Background Color</div>

      <n-color-picker
        v-model:value="bgColor"
        size="medium"
        :modes="['hex']"
        :show-preview="true"
        :swatches="[
          '#000000',
          '#252525',
          '#505050',
          '#808080',
          '#FFFFFF',
        ]"
      />

      <div
        v-show="fullscreen.isSupported"
        class="title"
      >切换全屏 / Toggle Fullscreen</div>

      <n-switch
        v-show="fullscreen.isSupported"
        size="medium"
        :round="false"
        :value="fullscreen.isFullscreen.value"
        @update:value="handleToggleFullscreen"
      >
        <template #checked>开启</template>
        <template #unchecked>关闭</template>
      </n-switch>

      <div class="title">隐藏界面 / Hide UI</div>

      <n-switch
        v-model:value="isFaded"
        size="medium"
        :round="false"
        @click.stop
      >
        <template #checked>隐藏</template>
        <template #unchecked>显示</template>
      </n-switch>

    </div>
  </div>
</template>

<script setup>
import {
  NColorPicker, NSwitch,
} from 'naive-ui';

import {
  computed, ref, onBeforeUnmount,
} from 'vue';

import {
  useFullscreen, useWakeLock,
} from '@vueuse/core';

import {
  $message,
} from '@/assets/js/naive-ui';

import {
  colorHexToGrayLevel,
} from '@/assets/js/utils';

/** 背景颜色 */
const bgColor = ref('#505050');

/** 是否为深色 */
const isDarkColor = computed(() => {

  let color = bgColor.value;
  let level = colorHexToGrayLevel(color);

  return level < 192;

});

/** 是否隐藏内容 */
const isFaded = ref(false);

/**
 * @desc 自身元素 ref
 * @type {VueRef<HTMLElement>}
 */
const selfRef = ref(null);

/** 全屏控制 */
const fullscreen = useFullscreen(selfRef, {
  autoExit: true,
});

/** 唤醒锁 */
const wakeLock = useWakeLock();

/** 处理切换全屏 */
function handleToggleFullscreen() {
  fullscreen.toggle().then(() => {
    if (fullscreen.isFullscreen.value) {
      $message.success('进入全屏');
    } else {
      $message.success('退出全屏');
    }
  }).catch((error) => {
    console.error('切换全屏失败：',);
    console.error(error);
    $message.error('切换全屏失败');
  });
}

/** 处理切换唤醒锁 */
function handleToggleWakeLock(isActive = false) {

  if (!wakeLock.isSupported) {
    $message.warning('当前浏览器不支持该功能');
    return Promise.resolve(false);
  }

  if (isActive) {
    return wakeLock.request('screen').then(() => {
      $message.success('开启');
    }).catch((error) => {
      console.error('请求唤醒锁失败：',);
      console.error(error);
      $message.error('请求唤醒锁失败');
    });
  } else {
    return wakeLock.release().then(() => {
      $message.success('关闭');
    }).catch((error) => {
      console.error('释放唤醒锁失败：',);
      console.error(error);
      $message.error('释放唤醒锁失败');
    });
  }

}

onBeforeUnmount(() => {
  if (wakeLock.isActive.value) {
    handleToggleWakeLock(false);
  }
});
</script>

<style lang="less" scoped>
.tool-detail-page {
  display: flex;
  background-color: inherit;
  transition: all 0.25s;
  user-select: none;

  &.is-faded > * {
    opacity: 0;
  }

  &.is-on {
    background-color: var(--bg-color);

    &.is-dark-color {
      color: #FFF;
    }
  }

  > * {
    transition: opacity 0.25s;
  }
}

.controls {
  margin: auto;
  padding-bottom: 48px;
  text-align: center;
}

.title {
  margin-top: 48px;
  margin-bottom: 16px;
  font-size: 24px;
}

:deep(.n-color-picker) {
  width: 36px;
}

:deep(.n-color-picker-trigger__value) {
  color: transparent !important;
}
</style>
