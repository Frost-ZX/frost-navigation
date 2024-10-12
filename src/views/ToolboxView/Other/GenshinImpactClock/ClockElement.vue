<template>
  <div
    ref="clockElement"
    :class="{
      'clock-element': true,
      'clock-rotation': clockState.isRotation,
    }"
    :style="elStyle"
  >

    <!-- 外部 -->
    <div class="clock-outer bg-contain"></div>

    <!-- 内部 -->
    <div class="clock-inner">

      <!-- 背景 -->
      <div class="inner-bg bg-cover"></div>
      <div class="inner-star bg-cover"></div>

      <!-- 齿轮 -->
      <div class="clock-gear">
        <div class="gear-6"></div>
        <div class="gear-5"></div>
        <div class="gear-4"></div>
        <div class="gear-3"></div>
        <div class="gear-2"></div>
        <div class="gear-1"></div>
      </div>

      <!-- 色环 -->
      <clock-color
        :curr-angle="upperRealAngle"
        :start-angle="lowerPointer.viewAngle"
      />

      <!-- 下层指针 -->
      <div class="pointer-wrapper pointer-lower bg-contain">
        <div class="pointer-content"></div>
      </div>

      <!-- 上层指针 -->
      <div class="pointer-wrapper pointer-upper bg-contain">
        <div
          class="pointer-content"
          @mousedown="handleDragPointer('upper')"
        ></div>
      </div>

    </div>

    <!-- 表盘 -->
    <div class="clock-dial bg-contain">
      <div class="time-icons">
        <div
          class="time-morning bg-contain"
          style="--self-angle-1: 270; --self-angle-2: 270;"
        ></div>
        <div
          class="time-noon bg-contain"
          style="--self-angle-1: 0; --self-angle-2: 360;"
        ></div>
        <div
          class="time-dusk bg-contain"
          style="--self-angle-1: 90; --self-angle-2: 90;"
        ></div>
        <div
          class="time-night bg-contain"
          style="--self-angle-1: 180; --self-angle-2: 180;"
        ></div>
      </div>
    </div>

  </div>
</template>

<script setup>
import {
  computed,
  onBeforeUnmount, onMounted,
  reactive, ref,
} from 'vue';

import {
  IMAGE_CLOCK_BG_INNER,
  IMAGE_CLOCK_BG_OUTER,
  IMAGE_CLOCK_DIAL,
  IMAGE_CLOCK_GEAR_1,
  IMAGE_CLOCK_GEAR_4,
  IMAGE_CLOCK_GEAR_5,
  IMAGE_CLOCK_GEAR_6,
  IMAGE_CLOCK_PARTICLES,
  IMAGE_POINTER_LOWER,
  IMAGE_POINTER_UPPER,
  IMAGE_TIME_ICON_DUSK,
  IMAGE_TIME_ICON_MORNING,
  IMAGE_TIME_ICON_NIGHT,
  IMAGE_TIME_ICON_NOON,
} from './common-data';

import ClockColor from './ClockColor.vue';

const clockElement = ref(null);

/** 时钟状态 */
const clockState = reactive({

  /** 指针是否正在旋转 */
  isRotation: false,

  /** 最新一次获取到的指针角度 */
  lastAngle: 0,

  /** 定时器 ID */
  rotationWatcher: null,

});

/** 下层指针状态 */
const lowerPointer = reactive({

  /** 视图角度，用于显示 */
  viewAngle: 0,

});

/** 上层指针状态 */
const upperPointer = reactive({

  /** 是否为第二圈 */
  isSecond: false,

  /** 上层指针与下层指针相差的角度 */
  dataAngle: 0,

  /** 视图角度，用于显示和交互 */
  viewAngle: 0,

});

/** 元素 CSS */
const elStyle = computed(() => {
  return {
    '--image-clock-bg-inner': IMAGE_CLOCK_BG_INNER,
    '--image-clock-bg-outer': IMAGE_CLOCK_BG_OUTER,
    '--image-clock-dial': IMAGE_CLOCK_DIAL,
    '--image-clock-gear-1': IMAGE_CLOCK_GEAR_1,
    '--image-clock-gear-4': IMAGE_CLOCK_GEAR_4,
    '--image-clock-gear-5': IMAGE_CLOCK_GEAR_5,
    '--image-clock-gear-6': IMAGE_CLOCK_GEAR_6,
    '--image-clock-particles': IMAGE_CLOCK_PARTICLES,
    '--image-pointer-lower': IMAGE_POINTER_LOWER,
    '--image-pointer-upper': IMAGE_POINTER_UPPER,
    '--image-time-icon-dusk': IMAGE_TIME_ICON_DUSK,
    '--image-time-icon-morning': IMAGE_TIME_ICON_MORNING,
    '--image-time-icon-night': IMAGE_TIME_ICON_NIGHT,
    '--image-time-icon-noon': IMAGE_TIME_ICON_NOON,
    '--pointer-lower-angle': `${lowerPointer.viewAngle}deg`,
    '--pointer-lower-angle-value': lowerPointer.viewAngle,
    '--pointer-upper-angle': `${upperPointer.viewAngle}deg`,
    '--pointer-upper-angle-value': upperPointer.viewAngle,
  };
});

/** 上层指针实际已旋转角度 */
const upperRealAngle = computed(() => {
  const { dataAngle, isSecond } = upperPointer;
  return (isSecond ? dataAngle + 360 : dataAngle);
});

/** 初始化定时器 */
function timerInit() {

  // 指针旋转检测
  clockState.rotationWatcher = setInterval(function () {
    const currAngle = upperRealAngle.value;
    const lastAngle = clockState.lastAngle;
    clockState.isRotation = (Math.abs(currAngle - lastAngle) >= 5);
    clockState.lastAngle = currAngle;
  }, 250);

}

/** 重置定时器 */
function timerReset() {
  clearInterval(clockState.rotationWatcher);
}

/**
 * @description 获取元素中心坐标
 * @param {HTMLElement} el
 */
function getCenterPoint(el) {
  if (el) {
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  } else {
    return null;
  }
}

/** 处理拖拽上层指针 */
function handleDragPointer() {

  const center = getCenterPoint(clockElement.value);

  if (!center) {
    return;
  }

  const centerX = center.x;
  const centerY = center.y;

  // 节流
  let last = 0;

  document.onmousemove = function (ev) {

    let curr = Date.now();

    if (curr - last >= 20) {
      last = curr;
    } else {
      return;
    }

    let { pageX, pageY } = ev;

    let numX = pageX - centerX;
    let numY = pageY - centerY;

    // 计算两点弧度 & 转换为角度（-180 ~ 180）
    let calcAngle = Math.round(Math.atan2(numY, numX) * (180 / Math.PI));

    // 转换为视图角度（0 ~ 359）
    let viewAngle = calcAngle + (calcAngle >= -90 ? 90 : 450);

    // 用于数据处理的角度
    let dataAngle = 0;

    // 起始角度偏移值
    let offsetAngle = lowerPointer.viewAngle;

    // 处理偏移，获取数据角度
    if (viewAngle >= offsetAngle) {
      dataAngle = viewAngle - offsetAngle;
    } else if (viewAngle < offsetAngle) {
      dataAngle = viewAngle + (360 - offsetAngle);
    }

    // 新角度与原角度的差值
    let diff = dataAngle - upperPointer.dataAngle;

    // 顺时针越过起始点
    if (diff <= -180) {
      if (upperPointer.isSecond) {
        // 当前为第二圈，阻止移动
        dataAngle = 360;
        viewAngle = 360 + offsetAngle;
      } else {
        // 当前为第一圈，进入第二圈
        upperPointer.isSecond = true;
      }
    }

    // 逆时针越过起始点
    if (diff >= 180) {
      if (upperPointer.isSecond) {
        // 当前为第二圈，返回第一圈
        upperPointer.isSecond = false;
      } else {
        // 当前为第一圈，阻止移动
        dataAngle = 0;
        viewAngle = offsetAngle;
      }
    }

    upperPointer.dataAngle = dataAngle;
    upperPointer.viewAngle = viewAngle;

  };

  document.onmouseup = function () {
    document.onmousemove = null;
    document.onmouseup = null;
  };

}

/** 确定当前选择的时间，下层指针旋转至上层指针的位置 */
function handleSubmitTime() {

  let lowerAngleStart = lowerPointer.viewAngle;
  let upperAngleStart = upperRealAngle.value;
  let upperAngleCurr = upperAngleStart;
  let timer = setInterval(() => {

    // 每次 -2，最小值为 0
    upperAngleCurr = Math.max(0, upperAngleCurr - 2);

    // 结束
    if (upperAngleCurr === 0) {
      clearInterval(timer);
    }

    let upperAngleDiff = upperAngleStart - upperAngleCurr;
    let lowerAngleCurr = lowerAngleStart + upperAngleDiff;

    lowerPointer.viewAngle = lowerAngleCurr % 360;
    upperPointer.dataAngle = upperAngleCurr % 360;
    upperPointer.isSecond = (upperAngleCurr >= 360);

  }, 50);

}

defineExpose({
  handleSubmitTime,
});

onMounted(() => {
  timerInit();
});

onBeforeUnmount(() => {
  timerReset();
});
</script>

<style lang="less" scoped>
.bg-contain {
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

.bg-cover {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.clock-element {
  --pointer-lower-angle: 0deg;
  --pointer-upper-angle: 0deg;
  position: relative;
  width: 32em;
  height: 32em;
  border-radius: 50%;
  font-size: 1rem;
  overflow: hidden;
  filter: brightness(1.1) saturate(0.9);
}

.clock-outer {
  position: absolute;
  top: -1%;
  left: -1%;
  width: 102%;
  height: 102%;
  background-image: var(--image-clock-bg-outer);
}

.clock-inner {
  --size: 46%;
  position: absolute;
  top: calc(50% - var(--size) / 2);
  left: calc(50% - var(--size) / 2);
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background-color: #000;
  overflow: hidden;

  .inner-bg, .inner-star {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .inner-bg {
    background-image: var(--image-clock-bg-inner);
    animation: rotation-backward 60s linear infinite;
  }

  .inner-star {
    background-image: var(--image-clock-particles);
  }
}

.clock-gear {
  --size: 120%;
  --ratio: 1.55;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;

  > div {
    --ani-duration: 2s;
    position: absolute;
    animation-duration: var(--ani-duration);
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    transform: rotate(0);
    will-change: transform;

    &::after {
      display: block;
      content: "";
      width: 100%;
      height: 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      animation-duration: calc(var(--ani-duration) / 12);
      animation-iteration-count: infinite;
      animation-name: inherit;
      animation-play-state: paused;
      animation-timing-function: linear;
    }
  }

  .gear-1 {
    --ani-duration: calc(1s * var(--gear-teeth) * var(--ratio));
    --gear-teeth: 32;
    top: calc(50% - var(--size) / 2);
    left: calc(50% - var(--size) / 2);
    width: var(--size);
    height: var(--size);
    animation-name: rotation-backward;

    &::after {
      background-image: var(--image-clock-gear-1);
    }
  }

  .gear-2 {
    --ani-duration: calc(1s * var(--gear-teeth) * var(--ratio));
    --gear-teeth: 32;
    top: calc(0% - var(--size) / 2);
    left: calc(72% - var(--size) / 2);
    width: var(--size);
    height: var(--size);
    animation-name: rotation-backward;

    &::after {
      background-image: var(--image-clock-gear-1);
    }
  }

  .gear-3 {
    --ani-duration: calc(1s * var(--gear-teeth) * var(--ratio));
    --gear-teeth: 32;
    top: calc(77% - var(--size) / 2);
    left: calc(100% - var(--size) / 2);
    width: var(--size);
    height: var(--size);
    animation-name: rotation-backward;
    opacity: 0.5;

    &::after {
      background-image: var(--image-clock-gear-1);
    }
  }

  .gear-4 {
    --angle-offset: 4deg;
    --ani-duration: calc(1s * var(--gear-teeth) * var(--ratio));
    --gear-teeth: 32;
    top: calc(77% - var(--size) / 2);
    left: calc(100% - var(--size) / 2);
    width: var(--size);
    height: var(--size);
    animation-name: rotation-forward;

    &::after {
      background-image: var(--image-clock-gear-4);
    }
  }

  // 正常：约 74s / 圈
  // 加速：约 7s / 圈
  .gear-5 {
    --ani-duration: calc(1s * (var(--gear-teeth) - 1) * var(--ratio));
    --gear-teeth: 49;
    top: calc(60% - var(--size) / 2);
    left: calc(33% - var(--size) / 2);
    width: var(--size);
    height: var(--size);
    animation-name: rotation-backward;

    &::after {
      background-image: var(--image-clock-gear-5);
    }
  }

  .gear-6 {
    --ani-duration: calc(1s * var(--gear-teeth) * var(--ratio));
    --gear-teeth: 49;
    top: calc(42% - var(--size) / 2);
    left: calc(62% - var(--size) / 2);
    width: var(--size);
    height: var(--size);
    animation-name: rotation-backward;

    &::after {
      background-image: var(--image-clock-gear-6);
    }
  }
}

// 齿轮加速转动
.clock-rotation .clock-gear > div::after {
  animation-play-state: running;
}

.pointer-wrapper {
  --size: 180%;
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--size);
  height: var(--size);

  &.pointer-lower {
    background-image: var(--image-pointer-lower);
    transform: translate(-50%, -50%) rotate(var(--pointer-lower-angle));
  }

  &.pointer-upper {
    background-image: var(--image-pointer-upper);
    transform: translate(-50%, -50%) rotate(var(--pointer-upper-angle));
  }

  .pointer-content {
    --width: 5%;
    position: absolute;
    left: calc(50% - var(--width) / 2);
    width: var(--width);
    height: 50%;
    cursor: grab;
  }
}

.clock-dial {
  --size: 88%;
  position: absolute;
  top: calc(50% - var(--size) / 2);
  left: calc(50% - var(--size) / 2);
  width: var(--size);
  height: var(--size);
  background-image: var(--image-clock-dial);
  pointer-events: none;

  .time-icons {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    > div {
      // [角度 1 相关计算]
      // 计算指针角度与图标所在角度的差值（可能为负数）
      --angle-1-diff: calc(var(--self-angle-1) - var(--pointer-lower-angle-value));
      // 计算角度差值的绝对值
      --angle-1-abs: ~"max(var(--angle-1-diff), var(--angle-1-diff) * -1)";
      // 限制角度最大差值为 90
      --angle-1-use: ~"min(90, var(--angle-1-abs))";
      // [角度 2 相关计算，主要用于 360°]
      // 计算指针角度与图标所在角度的差值（可能为负数）
      --angle-2-diff: calc(var(--self-angle-2) - var(--pointer-lower-angle-value));
      // 计算角度差值的绝对值
      --angle-2-abs: ~"max(var(--angle-2-diff), var(--angle-2-diff) * -1)";
      // 限制角度最大差值为 90
      --angle-2-use: ~"min(90, var(--angle-2-abs))";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      // 根据角度计算透明度
      // 注：计算两个角度的透明度，取最大值
      opacity: ~"calc((90 - min(var(--angle-1-use), var(--angle-2-use))) / 90)";
    }

    .time-morning {
      background-image: var(--image-time-icon-morning);
    }

    .time-noon {
      background-image: var(--image-time-icon-noon);
    }

    .time-dusk {
      background-image: var(--image-time-icon-dusk);
    }

    .time-night {
      background-image: var(--image-time-icon-night);
    }
  }
}

// 顺时针旋转
@keyframes rotation-forward {
  0% {
    transform: rotate(calc(0deg + var(--angle-offset, 0deg)));
  }
  100% {
    transform: rotate(calc(360deg + var(--angle-offset, 0deg)));
  }
}

// 逆时针旋转
@keyframes rotation-backward {
  0% {
    transform: rotate(calc(360deg + var(--angle-offset, 0deg)));
  }
  100% {
    transform: rotate(calc(0deg + var(--angle-offset, 0deg)));
  }
}
</style>
