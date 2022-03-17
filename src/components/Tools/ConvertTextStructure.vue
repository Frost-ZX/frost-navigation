<template>
  <div class="tool-page">

    <div class="inputs">
      <div class="title">文本</div>
      <div class="content">
        <el-input
          v-model="inputs"
          type="textarea"
          :rows="8"
        ></el-input>
      </div>
    </div>

    <div class="actions">
      <div class="title">操作</div>
      <div class="content">
        <el-select v-model="mode" size="medium">
          <el-option
            v-for="item in modes"
            :key="item.name"
            :label="item.label"
            :value="item.name"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          size="medium"
          plain
          @click="convert()"
        >转换</el-button>
        <el-button
          type="danger"
          size="medium"
          plain
          @click="clear()"
        >清空</el-button>
      </div>
    </div>

    <div class="outputs">
      <div class="title">转换结果</div>
      <div class="content">
        <el-input
          v-model="outputs"
          type="textarea"
          :rows="8"
        ></el-input>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ConvertTextStructure',
  data() {
    return {
      mode: 'reverse-h',
      modes: [
        { name: 'reverse-h', label: '倒序（左右）' },
        { name: 'reverse-v', label: '倒序（上下）' },
        { name: 'horizon-vertical-normal', label: '横竖互换（半角，1 空格）' },
        { name: 'horizon-vertical-full', label: '横竖互换（全角，2 空格）' },
      ],
      inputs: '',
      outputs: '',
    }
  },
  methods: {

    /** 清除 */
    clear() {
      this.inputs = '';
      this.outputs = '';
    },

    /** 转换 */
    convert() {

      switch (this.mode) {
        case 'reverse-h':
          this.cReverseH();
          break;
        case 'reverse-v':
          this.cReverseV();
          break;
        case 'horizon-vertical-normal':
          this.cHorizonVertical(false);
          break;
        case 'horizon-vertical-full':
          this.cHorizonVertical(true);
          break;
        default:
          break;
      }

    },

    /** 倒序（横向） */
    cReverseH() {
      /** @type {string[]} */
      const inputs = this.inputs.split('\n');

      /** @type {string[]} */
      const outputs = [];

      inputs.forEach((line) => {
        outputs.push(line.split('').reverse().join(''));
      });

      this.outputs = outputs.join('\n');
    },

    /** 倒序（竖向） */
    cReverseV() {
      /** @type {string[]} */
      const inputs = this.inputs.split('\n');

      this.outputs = inputs.reverse().join('\n');
    },

    /**
     * 横竖互换
     * 
     * @param {boolean} isFullAngle 是否为全角
     */
    cHorizonVertical(isFullAngle) {

      // 空格符号：2 / 1
      const spaceChar = (isFullAngle ? '  ' : ' ');
      // 空格 Unicode：&emsp; / &nbsp;
      const spaceUnicode = (isFullAngle ? '\u2003' : '\u2002');

      // 空格正则
      const spaceRegC = new RegExp(spaceChar, 'g');
      const spaceRegU = new RegExp(spaceUnicode, 'g');

      /** @type {string[]} */
      const inputs = this.inputs.split('\n');

      /** @type {number[]} */
      const inputLens = [];

      /** @type {string[][]} */
      const outputs = [];

      // 转换空格 & 记录输入内容行长度
      inputs.forEach((row, index) => {
        row = row.replace(spaceRegC, spaceUnicode);
        inputLens.push(row.length);
        inputs[index] = row;
      });

      const inputLenMax = Math.max(...inputLens);

      // 创建空行
      for (let i = 0; i < inputLenMax; i++) {
        outputs.push([]);
      }

      // 行列互换
      inputs.forEach((row, rIndex) => {
        for (let i = 0; i < inputLenMax; i++) {
          const strChar = (row.charAt(i) || spaceUnicode);
          outputs[i][rIndex] = strChar;
        }
      });

      // 合并行内容 & 转换空格
      outputs.forEach((row, index) => {
        outputs[index] = row.join('').replace(spaceRegU, spaceChar);
      });

      this.outputs = outputs.join('\n');

    },

  },
}
</script>

<style lang="less" scoped>
.inputs, .outputs {
  /deep/ .el-textarea__inner {
    font-family: monospace;
  }
}

.actions {
  .el-select {
    margin-right: 0.8em;
  }
}
</style>
