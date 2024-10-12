<template>
  <div class="tool-detail-page">

    <clock-element ref="clockRef" />

    <!-- <genshin-button
      icon-color="#F44336"
      icon-name="mdi-close"
    >取消</genshin-button> -->

    <genshin-button
      icon-color="#FFC107"
      icon-name="mdi-circle-outline"
      @click="handleConfirm"
    >确认</genshin-button>

  </div>
</template>

<script setup>
import {
  ref,
} from 'vue';

import ClockElement from './ClockElement.vue';
import GenshinButton from './GenshinButton.vue';

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
  background-color: #000;
}
</style>
