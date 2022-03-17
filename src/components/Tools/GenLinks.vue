<template>
  <div class="tool-page">

    <div class="link-base">
      <div class="title">链接模板</div>
      <div class="content">
        <el-input
          v-model="linkBase"
          size="medium"
          placeholder="使用 {n} 表示变量"
          clearable
        ></el-input>
      </div>
    </div>

    <div class="config">
      <div class="title">参数配置</div>
      <div class="content">
        <el-radio-group v-model="mode">

          <!-- 等差数列 -->
          <div class="mode-item mode-as">

            <div class="config-row">
              <el-radio label="as">等差数列</el-radio>
            </div>

            <div class="config-row">
              <div class="config-item">
                <span class="label">首项</span>
                <el-input-number
                  v-model="modes.as.first"
                  controls-position="right"
                  size="medium"
                  :step="1"
                  step-strictly
                ></el-input-number>
              </div>
              <div class="config-item">
                <span class="label">公差</span>
                <el-input-number
                  v-model="modes.as.diff"
                  controls-position="right"
                  size="medium"
                  :step="1"
                  step-strictly
                ></el-input-number>
              </div>
              <div class="config-item">
                <span class="label">项数</span>
                <el-input-number
                  v-model="modes.as.count"
                  controls-position="right"
                  size="medium"
                  :step="1"
                  step-strictly
                ></el-input-number>
              </div>
            </div>

            <div class="config-row">
              <div class="config-item">
                <span class="label">格式</span>
                <el-checkbox
                  v-model="modes.as.zero"
                >补零</el-checkbox>
                <el-checkbox
                  v-model="modes.as.reverse"
                >倒序</el-checkbox>
              </div>
            </div>

          </div>
          <!-- 等差数列 -->

          <!-- 等比数列 -->
          <div class="mode-item mode-ps">

            <div class="config-row">
              <el-radio label="ps">等比数列</el-radio>
            </div>

            <div class="config-row">
              <div class="config-item">
                <span class="label">首项</span>
                <el-input-number
                  v-model="modes.ps.first"
                  controls-position="right"
                  size="medium"
                  :step="1"
                  step-strictly
                ></el-input-number>
              </div>
              <div class="config-item">
                <span class="label">公比</span>
                <el-input-number
                  v-model="modes.ps.diff"
                  controls-position="right"
                  size="medium"
                  :step="1"
                  step-strictly
                ></el-input-number>
              </div>
              <div class="config-item">
                <span class="label">项数</span>
                <el-input-number
                  v-model="modes.ps.count"
                  controls-position="right"
                  size="medium"
                  :step="1"
                  step-strictly
                ></el-input-number>
              </div>
            </div>

            <div class="config-row">
              <div class="config-item">
                <span class="label">格式</span>
                <el-checkbox
                  v-model="modes.ps.zero"
                >补零</el-checkbox>
                <el-checkbox
                  v-model="modes.ps.reverse"
                >倒序</el-checkbox>
              </div>
            </div>

          </div>
          <!-- 等比数列 -->

          <!-- 字母变化 -->
          <div class="mode-item mode-lc">

            <div class="config-row">
              <el-radio label="lc">字母变化</el-radio>
            </div>

            <div class="config-row">
              <span class="label">从</span>
              <el-input
                v-model="modes.lc.start"
                size="medium"
                :maxlength="1"
              ></el-input>
              <span class="label">到</span>
              <el-input
                v-model="modes.lc.end"
                size="medium"
                :maxlength="1"
              ></el-input>
              <el-checkbox
                v-model="modes.lc.reverse"
              >倒序</el-checkbox>
            </div>
            
          </div>
          <!-- 字母变化 -->

        </el-radio-group>
      </div>
    </div>

    <div class="action">
      <div class="title">操作</div>
      <div class="content">
        <el-button
          type="primary"
          size="small"
          plain
          @click="generate()"
        >生成链接</el-button>
        <el-button
          type="danger"
          size="small"
          plain
          @click="clear()"
        >清空结果</el-button>
      </div>
    </div>

    <div class="link-result">
      <div class="title">生成结果</div>
      <div class="content">
        <el-input
          v-model="linkResult"
          type="textarea"
          :rows="10"
        ></el-input>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'GenLinks',
  data() {
    return {
      // 链接模板
      linkBase: '',
      // 生成结果
      linkResult: '',
      // 正则，匹配链接变量
      linkReg: /\{n\}/g,
      // 当前模式
      mode: 'as',
      modes: {
        // 等差数列（Arithmetic Sequence）
        as: {
          first: 0,
          diff: 1,
          count: 10,
          zero: false,
          reverse: false,
        },
        // 等比数列（Proportional Sequence）
        ps: {
          first: 1,
          diff: 2,
          count: 10,
          zero: false,
          reverse: false,
        },
        // 字母变化（Letter Change）
        lc: {
          start: 'a',
          end: 'z',
          reverse: false,
        },
      },
    }
  },
  methods: {

    /**
     * 清空
     */
    clear() {
      this.linkResult = '';
    },

    /**
     * 生成
     */
    generate() {
      const mode = this.mode;

      switch (mode) {
        case 'as':
          this.linkResult = this.generateSeq('as');
          break;
        case 'ps':
          this.linkResult = this.generateSeq('ps');
          break;
        case 'lc':
          this.linkResult = this.generateLetter();
          break;
        default:
          break;
      }
    },

    /**
     * 生成数列
     * 
     * @param {string} typs 类型（as - 等差数列，ps - 等比数列）
     * @returns {string} 生成结果
     */
    generateSeq(type) {
      const linkBase = this.linkBase;
      const linkReg = this.linkReg;

      if (!linkBase) {
        return '';
      }

      const data = this.modes[type];

      if (!data) {
        return '';
      }

      const nFirst = data.first
      const nCount = data.count;
      const nDiff = data.diff;

      const nResult = {
        digits: 0,   // 最大位数
        numbers: [], // 生成的数值
      };

      const links = [];

      // 等差数列公式
      const expAS = (i) => {
        return (nFirst + (i - 1) * nDiff);
      };
      // 等比数列公式
      const expPS = (i) => {
        return (nFirst * Math.pow(nDiff, (i - 1)));
      };
      // 实际使用的公式
      const exp = (type === 'as' ? expAS : expPS);

      // 生成数值
      for (let i = 1; i <= nCount; i++) {
        // 等差数列 / 等比数列
        const n = exp(i);
        const digits = Math.abs(n).toString().length;

        (digits > nResult.digits) && (nResult.digits = digits);
        nResult.numbers.push(n);
      }

      // 补零
      if (data.zero) {
        const digits = nResult.digits;
        const base = Math.pow(10, digits);
        const numbers = nResult.numbers;

        for (let i = 0; i < numbers.length; i++) {
          const n = numbers[i];

          if (n >= 0) {
            numbers[i] = (n / base).toFixed(digits).substr(2);
          } else {
            numbers[i] = '-' + (n / base).toFixed(digits).substr(3);
          }
        }
      }

      // 倒序
      if (data.reverse) {
        nResult.numbers.reverse();
      }

      // 生成链接
      nResult.numbers.forEach((n) => {
        links.push(linkBase.replace(linkReg, n));
      });

      return links.join('\n');
    },

    /**
     * 生成字母
     */
    generateLetter() {
      const linkBase = this.linkBase;
      const linkReg = this.linkReg;

      if (!linkBase) {
        return '';
      }

      const data = this.modes.lc;

      // 编码数值
      const cStart = data.start.charCodeAt(0);
      const cEnd = data.end.charCodeAt(0);

      const chars = [];
      const links = [];

      // 生成字母
      if (cStart >= 65 && cStart <= 122 && cEnd >= 65 && cEnd <= 122) {
        if (cStart < cEnd) {
          for (let i = cStart; i <= cEnd; i++) {
            // 跳过符号 [ \ ] ^ _ `
            if (i >= 91 && i <= 96) {
              continue;
            }
            chars.push(String.fromCharCode(i));
          }
        } else if (cStart > cEnd) {
          return '字母先后顺序有误。注意：大写字母需要在前。';
        } else if (cStart === cEnd) {
          return '仅有 1 条链接，无需生成。';
        } else {
          return '未知错误。';
        }
      } else {
        return '输入有误，请检查。';
      }

      // 倒序
      if (data.reverse) {
        chars.reverse();
      }

      // 生成链接
      chars.forEach((c) => {
        links.push(linkBase.replace(linkReg, c));
      });

      return links.join('\n');
    },

  },
}
</script>

<style lang="less" scoped>
.config {
  .el-input-number {
    width: 8rem;
  }

  .mode-item {
    padding: 0.5rem 0;

    &:not(:last-child) {
      border-bottom: 0.0625rem solid #EEE;
    }
  }

  .config-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 0.25rem 0;
  }

  .config-item {
    margin: 0.25rem 0;
  }

  .label {
    display: inline-block;
    margin: 0 1em;
    font-size: 0.8rem;
  }
}

.mode-lc {
  /deep/ .el-checkbox {
    margin: 0 1em;
  }

  /deep/ .el-input {
    width: 3.5em;
  }

  /deep/ .el-input__inner {
    text-align: center;
  }
}
</style>
