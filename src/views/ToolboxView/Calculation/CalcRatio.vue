<template>
  <div class="tool-detail-page">

    <!-- 计算模式 -->
    <n-card size="small" title="计算模式">
      <n-form-item :show-label="false">
        <n-select
          v-model:value="mode"
          :options="[
            { label: '1 -> 2', value: '1-to-2' },
            { label: '2 -> 1', value: '2-to-1' },
          ]"
          :on-blur="update"
        />
      </n-form-item>
    </n-card>

    <!-- 小数位数 -->
    <n-card size="small" title="小数位数">
      <n-form-item :show-label="false">
        <n-input-number
          v-model:value="decimals"
          :min="0"
          :max="10"
          :precision="0"
          :step="1"
          :on-blur="update"
        ></n-input-number>
      </n-form-item>
    </n-card>

    <!-- 基础比例 -->
    <n-card size="small" title="基础比例">
      <n-form-item :show-label="false">
        <n-input-number
          v-model:value="base.a"
          :min="limit.min"
          :max="limit.max"
          :precision="0"
          :step="1"
          :on-blur="update"
        ></n-input-number>
        <span class="split">:</span>
        <n-input-number
          v-model:value="base.b"
          :min="limit.min"
          :max="limit.max"
          :precision="0"
          :step="1"
          :on-blur="update"
        ></n-input-number>
      </n-form-item>
    </n-card>

    <!-- 计算比例 -->
    <n-card size="small" title="计算比例">
      <n-form-item :show-label="false">
        <n-input-number
          v-model:value="calc.a"
          :disabled="mode === '2-to-1'"
          :step="1"
          :on-blur="update"
        ></n-input-number>
        <span class="split">:</span>
        <n-input-number
          v-model:value="calc.b"
          :disabled="mode === '1-to-2'"
          :step="1"
          :on-blur="update"
        ></n-input-number>
      </n-form-item>
    </n-card>

  </div>
</template>

<script setup>
import {
  bignumber, divide, floor, multiply, number, round,
} from 'mathjs';

import {
  NCard,  NFormItem, NInputNumber, NSelect,
} from 'naive-ui';

import {
  reactive, ref,
} from 'vue';

/** 基础比例 */
const base = reactive({
  a: 1,
  b: 1,
});

/** 计算比例 */
const calc = reactive({
  a: 1,
  b: 1,
});

/** 小数位数 */
const decimals = ref(5);

/** 数值范围限制 */
const limit = {
  min: -99999999,
  max: 99999999,
};

/** 模式 */
const mode = ref('1-to-2');

/** 计算 */
function calculate() {

  let { min, max } = limit;

  let useMode = mode.value;
  let ratio = divide(bignumber(base.a), bignumber(base.b));

  if (useMode === '1-to-2') {

    // 注：只允许整数
    let a = number(floor(calc.a));

    (a < min) && (a = min);
    (a > max) && (a = max);

    calc.a = a;
    calc.b = number(round(divide(bignumber(a), ratio), decimals.value));

  } else if (useMode === '2-to-1') {

    // 注：只允许整数
    let b = number(floor(calc.b));

    (b < min) && (b = min);
    (b > max) && (b = max);

    calc.a = number(round(multiply(bignumber(b), ratio), decimals.value));
    calc.b = b;

  }

}

/** 更新 */
function update() {
  calculate();
}
</script>

<style lang="less" scoped>
.tool-detail-page {
  :deep(.n-input-number) {
    width: 12em;
  }

  :deep(.n-select) {
    width: 12em;
  }
}

.split {
  display: inline-block;
  width: 2em;
  font-weight: bold;
  text-align: center;
}
</style>
