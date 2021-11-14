<template>
  <div class="tool-page">

    <div class="ctrl">
      <div class="title">控制</div>
      <div class="content">
        <!-- 转换模式 -->
        <div class="item">
          <span class="label">转换模式</span>
          <el-select v-model="mode" size="medium">
            <el-option
              v-for="item in modes"
              :key="item.name"
              :label="item.label"
              :value="item.name"
            ></el-option>
          </el-select>
        </div>
        <!-- 时间戳类型 -->
        <div class="item">
          <span class="label">时间戳类型</span>
          <el-select v-model="tsType" size="medium">
            <el-option
              v-for="item in tsTypes"
              :key="item.name"
              :label="item.label"
              :value="item.name"
            ></el-option>
          </el-select>
        </div>
        <!-- 操作 -->
        <div class="item">
          <span class="label">操作</span>
          <el-button
            :type="update ? 'success' : 'warning'"
            size="small"
            plain
            @click="toggleUpdate()"
          >状态：{{ update ? '自动更新' : '暂停更新' }}</el-button>
          <el-button
            type="primary"
            size="small"
            plain
            @click="convert()"
          >转换</el-button>
          <el-button
            type="danger"
            size="small"
            plain
            @click="clear()"
          >清空</el-button>
        </div>
      </div>
    </div>

    <div class="current">
      <div class="title">当前</div>
      <div class="content">
        <div class="item">
          <span class="label">时间</span>
          <el-input
            v-model="current.t"
            size="medium"
            readonly
          ></el-input>
        </div>
        <div class="item">
          <span class="label">时间戳</span>
          <el-input
            v-model="current.ts"
            size="medium"
            readonly
          ></el-input>
        </div>
      </div>
    </div>

    <div class="inputs">
      <div class="title">输入</div>
      <div class="content">
        <div class="notice">
          <p>注意：</p>
          <p>在“本地时间 -> 时间戳”的模式中，若省略“时间”，将会加上本地时区与零时区的时差后计算；</p>
          <p>例如北京时间（UTC+8）按 08:00 计算，东京时间（UTC+9）按 09:00 计算。</p>
        </div>
        <el-input
          v-model="textInputs"
          :placeholder="placeholder"
          size="medium"
        ></el-input>
      </div>
    </div>

    <div class="outputs">
      <div class="title">结果</div>
      <div class="content">
        <el-input
          v-model="textOutputs"
          size="medium"
        ></el-input>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ConvertTimestamp',
  data() {
    return {
      // 转换模式
      mode: 't-to-ts',
      modes: [
        { name: 't-to-ts', label: '本地时间 -> 时间戳' },
        { name: 'ts-to-t', label: '时间戳 -> 本地时间' },
      ],
      // 定时器
      timer: null,
      // 是否更新当前时间
      update: true,
      // 时间戳类型
      tsType: 'ms',
      tsTypes: [
        { name: 'ms', label: '毫秒' },
        { name: 's', label: '秒' },
      ],
      // 当前时间
      current: {
        t: '',
        ts: '',
      },
      // 输入
      textInputs: '',
      // 输出
      textOutputs: '',
    }
  },
  computed: {

    // 输入占位文本
    placeholder() {
      const mode = this.mode;
      const type = this.tsType;

      if (mode === 't-to-ts') {
        return '参考格式：年-月-日 时:分:秒';
      } else if (mode === 'ts-to-t') {
        if (type === 's') {
          return '参考范例：1577808000';
        } else if (type === 'ms') {
          return '参考范例：1577808000000';
        }
      }

      return '';
    },

  },
  created () {
    this.init();
  },
  beforeDestroy () {
    clearInterval(this.timer);
  },
  methods: {

    /**
     * 初始化
     */
    init() {
      this.timer = setInterval(() => {
        if (this.update) {
          this.current.t = this.tsToTime();
          this.current.ts = this.timeToTs();
        }
      }, 1000);
    },

    /**
     * 清空
     */
    clear() {
      this.textInputs = '';
      this.textOutputs = '';
    },

    /**
     * 转换
     */
    convert() {
      const mode = this.mode;

      if (mode === 't-to-ts') {
        this.textOutputs = this.timeToTs(this.textInputs);
      } else if (mode === 'ts-to-t') {
        this.textOutputs = this.tsToTime(this.textInputs);
      }
    },

    /**
     * 时间 -> 时间戳
     * 
     * @param {string} [timeStr] 时间字符串（年-月-日 时:分:秒）
     * @returns {string} 转换结果
     */
    timeToTs(timeStr) {
      const date = (timeStr ? new Date(timeStr) : new Date());

      if (date.toString() === 'Invalid Date') {
        return '格式错误';
      }

      const result = date.getTime();

      if (this.tsType === 'ms') {
        // 毫秒
        return result;
      } else {
        // 秒
        return (result / 1000).toFixed(0);
      }
    },

    /**
     * 时间戳 -> 时间
     * 
     * @param {(number|string)} [ts] 时间戳
     * @returns {string} 转换结果（年-月-日 时:分:秒）
     */
    tsToTime(ts = null) {
      if (ts === '') {
        ts = null;
      }

      // 是否有参数
      const tsParam = (ts !== null);

      // 时间戳是秒
      if (tsParam && this.tsType === 's') {
        ts += '000';
      }

      // 转为数值
      const timestamp = parseInt(ts);

      if (tsParam && isNaN(timestamp)) {
        return '格式错误';
      }

      const date = (tsParam ? new Date(timestamp) : new Date());
      const t = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
      };

      // 补零
      for (let key in t) {
        (t[key] < 10) && (t[key] = ('0' + t[key]));
      }

      return `${t.y}-${t.m}-${t.d} ${t.h}:${t.i}:${t.s}`;
    },

    /**
     * 切换自动更新
     */
    toggleUpdate() {
      this.update = !this.update;
    },

  },
}
</script>

<style lang="less" scoped>
.ctrl, .current {
  .content {
    display: flex;
    flex-wrap: wrap;
  }

  .item {
    margin: 0.5rem 0.5rem;
  }

  .label {
    display: inline-block;
    margin-right: 0.5em;
  }
}

.ctrl {
  .el-select {
    width: 12em;
  }
}

.current {
  .el-input {
    width: 20em;
  }

  .label {
    width: 3.5em;
    text-align: right;
  }
}

.inputs, .outputs {
  .el-input {
    max-width: 25em;
  }
}

.notice {
  margin-bottom: 1em;
}
</style>
