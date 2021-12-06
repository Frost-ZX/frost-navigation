<template>
  <div class="tool-page">

    <div class="inputs">
      <div class="title">参数</div>
      <div class="content">

        <div class="content-item">
          <div class="item-label">文件大小：</div>
          <el-input-number
            v-model="inputs.sizeValue"
            controls-position="right"
            size="medium"
            :precision="2"
            :min="0"
            :max="10000"
            :step="1"
          ></el-input-number>
          <el-select v-model="inputs.sizeUnit" size="medium">
            <el-option
              v-for="item in units"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </div>

        <div class="content-item">
          <div class="item-label">已下载大小：</div>
          <el-input-number
            v-model="inputs.downloadedValue"
            controls-position="right"
            size="medium"
            :precision="2"
            :min="0"
            :max="10000"
            :step="1"
          ></el-input-number>
          <el-select v-model="inputs.downloadedUnit" size="medium">
            <el-option
              v-for="item in units"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </div>

        <div class="content-item">
          <div class="item-label">下载速度：</div>
          <el-input-number
            v-model="inputs.speedValue"
            controls-position="right"
            size="medium"
            :precision="2"
            :min="0"
            :max="10000"
            :step="1"
          ></el-input-number>
          <el-select v-model="inputs.speedUnit" size="medium">
            <el-option
              v-for="item in units"
              :key="item.name"
              :label="`${item.name}/s`"
              :value="item.name"
            ></el-option>
          </el-select>
        </div>

      </div>
    </div>

    <div class="outputs">
      <div class="title">计算结果</div>
      <div class="content">
        <p>
          <span class="content-label">大约需要时长：</span>
          <span class="content-text">{{ outputs.duration || '未计算' }}</span>
        </p>
        <p>
          <span class="content-label">大约结束时间：</span>
          <span class="content-text">{{ outputs.time || '未计算' }}</span>
        </p>
      </div>
    </div>

  </div>
</template>

<script>
import * as dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export default {
  name: 'CalcDownloadTime',
  data() {
    return {
      // 单位和比率（基于 KB）
      units: [
        { name: 'KiB', rate: 1 },
        { name: 'MiB', rate: 1024 },
        { name: 'GiB', rate: 1048576 },
      ],
      // 参数
      inputs: {
        downloadedUnit: 'KiB',
        downloadedValue: 0,
        sizeUnit: 'KiB',
        sizeValue: 0,
        speedUnit: 'KiB',
        speedValue: 0,
      },
      // 计算结果
      outputs: {
        duration: '',
        time: '',
      },
      // 防卡顿
      timer: null,
    }
  },
  watch: {

    // 自动计算
    'inputs': {
      deep: true,
      handler() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.calc();
        }, 1000);
      }
    },

  },
  methods: {

    /** 计算 */
    calc() {

      const { units } = this;
      const {
        downloadedUnit, downloadedValue,
        sizeUnit, sizeValue,
        speedUnit, speedValue,
      } = this.inputs;

      if (sizeValue === 0 || speedValue === 0) {
        this.outputs.duration = '';
        this.outputs.time = '';
        return;
      }

      // 获取转换比例
      const downloadedRate = units[units.findIndex((obj) => {
        return (obj.name === downloadedUnit);
      })].rate;
      const sizeRate = units[units.findIndex((obj) => {
        return (obj.name === sizeUnit);
      })].rate;
      const speedRate = units[units.findIndex((obj) => {
        return (obj.name === speedUnit);
      })].rate;

      // 转为 KB 单位
      const realDownloaded = downloadedValue * downloadedRate;
      const realSize = sizeValue * sizeRate - realDownloaded;
      const realSpeed = speedValue * speedRate;

      if (realSize < 0) {
        this.$message({
          duration: 3000,
          message: '参数有误，请检查。',
          type: 'warning',
        });
        return;
      }

      // 时长（秒）
      const dSeconds = (realSize / realSpeed).toFixed(0);
      // 起始时间
      const timeStart = dayjs();
      // 结束时间
      const timeEnd = timeStart.add(dSeconds, 'second');
      // 时长（天，整数）
      const dDays = timeEnd.diff(timeStart, 'day');
      // 最后一天的起始时间
      const timeLastDay = timeStart.add(dDays, 'day');
      // 时长（格式化，最后一天剩余）
      const dLastDay = dayjs.duration(timeEnd.diff(timeLastDay)).format('HH 时 mm 分 ss 秒');

      this.outputs.duration = `${dDays} 天 ${dLastDay}`;
      this.outputs.time = timeEnd.format('YYYY-MM-DD HH:mm:ss');

    },

  },
}
</script>

<style lang="less" scoped>
.inputs {
  .content-item {
    display: flex;
    align-items: center;
    padding: 0.25em 0;
  }

  .item-label {
    flex-shrink: 0;
    width: 6.5em;
    text-align: right;
  }

  .el-input-number {
    width: 10em;
  }

  .el-select {
    margin-left: 0.5em;
    width: 6em;
  }

  /deep/ .el-input__inner {
    text-align: right;
  }
}
</style>
