<template>
  <svg
    class="clock-color"
    :viewBox="`0 0 ${elSize} ${elSize}`"
  >

    <!-- 定义 -->
    <defs>
      <!-- 背景图案 -->
      <pattern
        id="color-pattern"
        x="0"
        y="0"
        patternUnits="userSpaceOnUse"
        patternContentUnits="userSpaceOnUse"
        :width="elSize"
        :height="elSize"
      >
        <image
          :width="elSize"
          :height="elSize"
          :href="IMAGE_TIME_ZONE_COLOR"
        />
      </pattern>
    </defs>

    <!-- 外层圆环 -->
    <path
      class="color-circle"
      :class="{ faded: currAngle > 360 }"
      :d="state.dOuter"
      fill="url(#color-pattern)"
      fill-rule="evenodd"
    ></path>

    <!-- 内层圆环 -->
    <path
      ref="innerCircle"
      class="color-circle"
      :d="state.dInner"
      fill="url(#color-pattern)"
      fill-rule="evenodd"
    ></path>

  </svg>
</template>

<script setup>
import {
  computed,
  onMounted,
  reactive, watch,
} from 'vue';

import {
  IMAGE_TIME_ZONE_COLOR,
} from './common-data';

import arc from '@/assets/js/svg-arc';

const props = defineProps({

  elSize: {
    type: Number,
    default: 300,
  },

  currAngle: {
    type: Number,
    default: 0,
  },

  startAngle: {
    type: Number,
    default: 0,
  },

  radius: {
    type: Number,
    default: 150,
  },

  thickness: {
    type: Number,
    default: 8,
  },

});

const state = reactive({
  dInner: '',
  dOuter: '',
});

const halfSize = computed(() => {
  return (props.elSize / 2);
});

// 角度变化时更新状态
watch(() => (props.currAngle), () => {
  updateCircle();
});
watch(() => (props.startAngle), () => {
  updateCircle();
});

/** 更新圆环状态 */
function updateCircle() {

  const { currAngle, startAngle, thickness } = props;

  const radius = halfSize.value;
  const size = thickness;
  const offset = size / 4;

  const endAngleInner = Math.max(0, currAngle - 360) + startAngle;
  const endAngleOuter = Math.min(360, currAngle) + startAngle;

  // 内层圆环
  state.dInner = arc({
    x: radius,
    y: radius,
    R: radius - size * 2 - offset,
    r: radius - size - offset,
    start: startAngle,
    end: endAngleInner,
  });

  // 外层圆环
  state.dOuter = arc({
    x: radius,
    y: radius,
    R: radius - size,
    r: radius,
    start: startAngle,
    end: endAngleOuter,
  });

}

onMounted(() => {
  updateCircle();
});
</script>

<style lang="less">
.clock-color {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .color-circle {
    filter: brightness(1);
    transition: filter 0.25s;
  }

  .faded {
    filter: brightness(0.6);
  }
}
</style>
