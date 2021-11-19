<template>
  <div class="tool-page">

    <div class="calc-mode">
      <div class="title">计算模式</div>
      <div class="content">
        <el-select v-model="mode" size="small">
          <el-option label="1 -> 2" value="1-to-2"></el-option>
          <el-option label="2 -> 1" value="2-to-1"></el-option>
        </el-select>
      </div>
    </div>

    <div class="decimals">
      <div class="title">小数位数</div>
      <div class="content">
        <el-input-number
          v-model="decimals"
          controls-position="right"
          size="small"
          :min="0"
          :max="10"
          :step="1"
          step-strictly
          @change="update()"
        ></el-input-number>
      </div>
    </div>

    <div class="ratio-base">
      <div class="title">基础比例</div>
      <div class="content">
        <el-input-number
          v-model="base.a"
          controls-position="right"
          size="small"
          :min="limit.min"
          :max="limit.max"
          :step="1"
          step-strictly
          @change="update()"
        ></el-input-number>
        <span class="split">:</span>
        <el-input-number
          v-model="base.b"
          controls-position="right"
          size="small"
          :min="limit.min"
          :max="limit.max"
          :step="1"
          step-strictly
          @change="update()"
        ></el-input-number>
      </div>
    </div>

    <div class="ratio-calc">
      <div class="title">计算比例</div>
      <div class="content">
        <el-input-number
          v-model="calc.a"
          controls-position="right"
          size="small"
          :step="1"
          :disabled="mode === '2-to-1'"
          @change="update()"
        ></el-input-number>
        <span class="split">:</span>
        <el-input-number
          v-model="calc.b"
          controls-position="right"
          size="small"
          :step="1"
          :disabled="mode === '1-to-2'"
          @change="update()"
        ></el-input-number>
      </div>
    </div>

  </div>
</template>

<script>
import { bignumber, divide, floor, multiply, round } from 'mathjs';

export default {
  name: 'CalcRatio',
  data() {
    return {
      // 基础比例
      base: {
        a: 1,
        b: 1,
      },
      // 计算比例
      calc: {
        a: 1,
        b: 1,
      },
      // 小数位数
      decimals: 5,
      // 数值范围限制
      limit: {
        min: -99999999,
        max: 99999999,
      },
      // 模式
      mode: '1-to-2',
    }
  },
  methods: {

    /**
     * 计算
     */
    calculate() {
      const { base, calc, decimals, mode } = this;
      const { min, max } = this.limit;
      const ratio = divide(bignumber(base.a), bignumber(base.b));

      if (mode === '1-to-2') {
        // 限制
        (calc.a = floor(calc.a));
        (calc.a < min) && (calc.a = min);
        (calc.a > max) && (calc.a = max);
        // 计算
        calc.b = round(divide(bignumber(calc.a), ratio), decimals);
      } else if (mode === '2-to-1') {
        // 限制
        (calc.b = floor(calc.b));
        (calc.b < min) && (calc.b = min);
        (calc.b > max) && (calc.b = max);
        // 计算
        calc.a = round(multiply(bignumber(calc.b), ratio), decimals);
      }
    },

    /**
     * 更新
     */
    update() {
      this.$nextTick(() => {
        this.calculate();
      });
    },

  },
}
</script>

<style lang="less" scoped>
.el-input-number,
.el-select {
  width: 10rem;
}

.split {
  display: inline-block;
  width: 2em;
  text-align: center;
  font-weight: bold;
}
</style>
