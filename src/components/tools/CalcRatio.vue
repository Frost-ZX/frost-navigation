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

    <div class="digits">
      <div class="title">小数位数</div>
      <div class="content">
        <el-input-number
          v-model="digits"
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
          :step="1"
          @change="update()"
        ></el-input-number>
        <span class="split">:</span>
        <el-input-number
          v-model="base.b"
          controls-position="right"
          size="small"
          :step="1"
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
import { divide, multiply, round } from 'mathjs';

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
      digits: 5,
      // 模式
      mode: '1-to-2',
    }
  },
  methods: {

    /**
     * 计算
     */
    update() {
      const base = this.base;
      const calc = this.calc;
      const digits = this.digits;
      const mode = this.mode;
      const ratio = base.a / base.b;

      if (mode === '1-to-2') {
        calc.b = round(divide(calc.a, ratio), digits);
      } else if (mode === '2-to-1') {
        calc.a = round(multiply(calc.b, ratio), digits);
      }
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
