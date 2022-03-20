<template>
  <div class="tool-page">

    <div class="actions">
      <div class="title">操作</div>
      <div class="content">
        <el-button
          type="primary"
          size="small"
          plain
          @click="generateRandomUUID()"
        >随机生成</el-button>
      </div>
    </div>

    <div class="form">
      <div class="title">表单</div>
      <div class="content" @input="handleInputEv($event)">

        <!-- 十六进制 -->
        <div class="content-row content-hex">
          <div class="inputs">
            <div class="input-label">Hexadecimal: </div>
            <div class="input-content">
              <span>"</span>
              <input
                ref="inputHex"
                v-model="form.hex"
                type="text"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                data-input-type="hex"
                placeholder="00000000-0000-0000-0000-000000000000"
                spellcheck="false"
                :pattern="pattern.hex"
                required
              />
              <span>"</span>
            </div>
          </div>
          <div class="btns">
            <el-button
              type="success"
              size="mini"
              plain
              @click="copyToClipboard('hex')"
            >复制</el-button>
          </div>
        </div>

        <!-- 高低位 -->
        <div class="content-row content-halves">
          <div class="inputs">
            <div class="input-label">UUID Most: </div>
            <div class="input-content">
              <input
                ref="inputMost"
                v-model="form.most"
                type="number"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                data-input-type="halves"
                inputmode="numeric"
                spellcheck="false"
                :pattern="pattern.number"
                required
              />
              <span> L</span>
            </div>
            <div class="input-label">UUID Least: </div>
            <div class="input-content">
              <input
                ref="inputLeast"
                v-model="form.least"
                type="number"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                data-input-type="halves"
                inputmode="numeric"
                spellcheck="false"
                :pattern="pattern.number"
                required
              />
              <span> L</span>
            </div>
          </div>
          <div class="btns">
            <el-button
              type="success"
              size="mini"
              plain
              @click="copyToClipboard('halves')"
            >复制</el-button>
          </div>
        </div>

        <!-- 整型数组 -->
        <div class="content-row content-array">
          <div class="inputs" @paste="handlePasteArray($event)">
            <div class="input-label">UUID: </div>
            <div class="input-content">
              <span>[I; </span>
              <input
                ref="inputArray1"
                v-model="form.array['1']"
                type="number"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                data-input-type="array"
                inputmode="numeric"
                spellcheck="false"
                :pattern="pattern.number"
                required
              />
              <span>, </span>
              <input
                ref="inputArray2"
                v-model="form.array['2']"
                type="number"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                data-input-type="array"
                inputmode="numeric"
                spellcheck="false"
                :pattern="pattern.number"
                required
              />
              <span>, </span>
              <input
                ref="inputArray3"
                v-model="form.array['3']"
                type="number"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                data-input-type="array"
                inputmode="numeric"
                spellcheck="false"
                :pattern="pattern.number"
                required
              />
              <span>, </span>
              <input
                ref="inputArray4"
                v-model="form.array['4']"
                type="number"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                data-input-type="array"
                inputmode="numeric"
                spellcheck="false"
                :pattern="pattern.number"
                required
              />
              <span>]</span>
            </div>
          </div>
          <div class="btns">
            <el-button
              type="success"
              size="mini"
              plain
              @click="copyToClipboard('array')"
            >复制</el-button>
          </div>
        </div>

      </div>
    </div>

    <div class="info">
      <div class="title">说明</div>
      <div class="content">
        <p>可以在“UUID”的输入框中直接粘贴多组数值</p>
        <p>例如：<code>1629527812, 47203901, -2056695293, 349258036</code></p>
        <p>
          <span>资料参考：</span>
          <el-link
            type="primary"
            href="https://minecraft.fandom.com/zh/wiki/通用唯一识别码"
            target="_blank"
          >通用唯一识别码</el-link>
        </p>
        <p>
          <span>算法参考：</span>
          <el-link
            type="primary"
            href="https://github.com/AjaxGb/mc-uuid-converter"
            target="_blank"
          >AjaxGb / mc-uuid-converter</el-link>
        </p>
      </div>
    </div>

    <!-- 用于复制文本 -->
    <textarea
      ref="copyArea"
      v-model="copyText"
      class="text-copy"
      tabindex="-1"
      readonly
    ></textarea>

  </div>
</template>

<script>
export default {
  name: 'UUIDConverter',
  data() {
    return {
      // 兼容性
      isSupported: false,
      // 输入框内容
      form: {
        hex: '00000000-0000-0000-0000-000000000000',
        most: 0,
        least: 0,
        array: { '1': 0, '2': 0, '3': 0, '4': 0 },
      },
      // 输入框正则
      pattern: {
        hex: '',
        number: '',
      },

      // 被复制的文本
      copyText: '',

      /** @type {Uint8Array} */
      uuidBytes: null,
      /** @type {DataView} */
      uuid: null,
    }
  },
  created() {
    this.detectFn();
    this.initDatas();
  },
  methods: {

    /** 检测功能兼容性 */
    detectFn() {

      const fnTypes = [
        typeof window.BigInt,
        typeof window.crypto,
        typeof DataView,
        typeof Uint8Array,
      ];

      if (fnTypes.indexOf('undefined') > -1) {
        this.$message({
          duration: 5000,
          message: 'The browser does not support the required function.',
          type: 'error',
        });
        return;
      }

      if (!('setBigUint64' in DataView.prototype)) {
        this.$message({
          duration: 5000,
          message: 'The browser does not support writing and reading 64-bit integers.',
          type: 'error',
        });
        return;
      }

      this.isSupported = true;

    },

    /** 初始化数据 */
    initDatas() {
      if (!this.isSupported) {
        return;
      }

      const uuidBytes = new Uint8Array(16);
      const uuid = new DataView(uuidBytes.buffer);

      this.uuidBytes = uuidBytes;
      this.uuid = uuid;

      this.pattern.hex = '([0-9a-fA-F]{1,8}-[0-9a-fA-F]{1,4}-[0-9a-fA-F]{1,4}-[0-9a-fA-F]{1,4}-[0-9a-fA-F]{1,12}|[0-9a-fA-F]{1,32})';
      this.pattern.number = '[-+]?\\d+';
    },

    /**
     * 复制结果到剪贴板
     * 
     * @param {string} type 类型
     */
    copyToClipboard(type) {
      /** @type {HTMLInputElement} */
      const el = this.$refs['copyArea'];
      const form = this.form;

      if (!el) {
        return;
      }

      switch (type) {
        case 'array':
          this.copyText = `[I; ${Object.values(form.array).join(', ')}]`;
          break;
        case 'halves':
          this.copyText = `UUID Most: ${form.most}L, UUID Least: ${form.least}L`;
          break;
        case 'hex':
          this.copyText = form.hex;
          break;
        default:
          return;
      }

      this.$nextTick(() => {
        el.focus();
        el.select();
        document.execCommand('copy');
      });
    },

    /** 随机生成 UUID */
    generateRandomUUID() {
      window.crypto.getRandomValues(this.uuidBytes);
      // Set version to 4 (random)
      this.uuidBytes[6] = (this.uuidBytes[6] & 0x0f) | (4 << 4);
      // Set variant to 1 (Leach–Salz)
      this.uuidBytes[8] = (this.uuidBytes[8] & 0x3f) | 0x80;
      // 更新
      this.updateFormDatas();
    },

    /**
     * 处理输入事件
     * 
     * @param {InputEvent} ev 输入事件对象
     */
    handleInputEv(ev) {
      /** @type {HTMLInputElement} */
      const el = ev.target;
      const type = el.dataset.inputType;

      type && this.updateFormDatas(type);
    },

    /**
     * 处理粘贴数组事件
     * 
     * @param {ClipboardEvent} ev 剪贴板事件对象
     */
    handlePasteArray(ev) {

      /** @type {HTMLInputElement} */
      const el = ev.target;
      const type = el.dataset.inputType;

      if (type !== 'array') {
        return;
      }

      const data = ev.clipboardData;
      const values = this.form.array;

      if (!data) {
        return;
      }

      for (const item of data.items) {
        // 纯文本
        if (item.kind === 'string' && item.type.startsWith('text/plain')) {
          // 读取
          item.getAsString((text) => {
            const length = 4;
            const numbers = text.match(/[+-]?\d+/g);

            if (numbers && numbers.length === length) {
              for (let i = 0; i < length; i++) {
                values[String(i + 1)] = parseInt(numbers[i]);
              }
              this.$nextTick(() => {
                this.updateFormDatas(type);
              });
            }
          });
          break;
        }
      }

    },

    /**
     * 处理整型数组 UUID
     * 
     * @param {string} mode 模式（parse、unparse）
     */
    handleArray(mode) {

      /** @type {HTMLInputElement[]} */
      const inputs = [];

      // 获取元素
      for (let i = 1; i <= 4; i++) {
        const el = this.$refs[`inputArray${i}`];
        inputs.push(el);
      }

      // 元素不存在
      if (inputs.indexOf(undefined) > -1) {
        return;
      }

      const { form, uuid } = this;

      if (mode === 'parse') {
        for (let i = 0; i < inputs.length; i++) {
          const num = Number(form.array[String(i + 1)]);
          const offset = i * 4;

          if (inputs[i].validity.valid) {
            uuid.setInt32(offset, num, false);
          }
        }
      } else if (mode === 'unparse') {
        for (let i = 0; i < inputs.length; i++) {
          const prop = String(i + 1);
          const result = uuid.getInt32(i * 4, false);

          form.array[prop] = result;
        }
      }

    },

    /**
     * 处理高低位 UUID
     * 
     * @param {string} mode 模式（parse、unparse）
     */
    handleHalves(mode) {

      /** @type {HTMLInputElement} */
      const elMost = this.$refs['inputMost'];

      /** @type {HTMLInputElement} */
      const elLeast = this.$refs['inputLeast'];

      // 元素不存在
      if (!(elMost && elLeast)) {
        return;
      }

      const { form, uuid } = this;

      if (mode === 'parse') {
        if (elMost.validity.valid) {
          uuid.setBigInt64(0, window.BigInt(form.most), false);
        }
        if (elLeast.validity.valid) {
          uuid.setBigInt64(8, window.BigInt(form.least), false);
        }
      } else if (mode === 'unparse') {
        form.most = uuid.getBigInt64(0, false);
        form.least = uuid.getBigInt64(8, false);
      }

    },

    /**
     * 处理十六进制 UUID
     * 
     * @param {string} mode 模式（parse、unparse）
     */
    handleHex(mode) {

      /** @type {HTMLInputElement} */
      const el = this.$refs['inputHex'];

      // 元素不存在
      if (!el) {
        return;
      }

      const { form, uuid } = this;
      const groupSizes = [8, 4, 4, 4, 12];

      if (mode === 'parse') {
        if (!el.validity.valid) {
          return;
        }

        const hex = form.hex;
        const hexText = (
          hex.includes('-') ?
          hex.trim()
            .split('-')
            .map((g, i) => g.padStart(groupSizes[i], '0'))
            .join('') :
          hex.trim().padStart(32, '0')
        );

        uuid.setBigUint64(0, window.BigInt('0x' + hexText.substring(0, 16)), false);
        uuid.setBigUint64(8, window.BigInt('0x' + hexText.substring(16)), false);
      } else if (mode === 'unparse') {
        const hexText = (
          uuid.getBigUint64(0, false).toString(16).padStart(16, '0') +
          uuid.getBigUint64(8, false).toString(16).padStart(16, '0')
        );
        const groups = [];

        let groupStart = 0;

        for (const groupSize of groupSizes) {
          groups.push(hexText.substring(groupStart, groupStart + groupSize));
          groupStart += groupSize;
        }

        form.hex = groups.join('-');
      }

    },

    /**
     * 更新表单数据
     * 
     * @param {string} type 类型
     */
    updateFormDatas(type) {

      const handlers = {
        array: this.handleArray,
        halves: this.handleHalves,
        hex: this.handleHex,
      };
      const handler = handlers[type];

      // 调用对应的处理函数
      handler && handler('parse');

      for (let key in handlers) {
        if (key !== type) {
          handlers[key]('unparse');
        }
      }

    },

  },
}
</script>

<style lang="less" scoped>
input[type="number"],
input[type="text"] {
  padding: 0.25rem 0.5rem;
  border: 0.0625rem solid #CCC;
  border-radius: 0.25rem;
  outline: none;
  font-family: monospace;
  font-size: 0.8rem;
  line-height: 1.5em;
  text-align: right;

  &:invalid {
    background-color: #9E9E9E;
    color: #FFF;
  }
}

input[type="number"] {
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
}

.form {
  font-family: monospace;

  .content {
    overflow-x: auto;
  }

  .content-row {
    min-width: 37.5rem;
  }
}

.content-row {
  display: flex;
  align-items: center;
  padding: 1em 0;
  font-size: 0.8rem;

  &:not(:last-child) {
    border-bottom: 0.0625rem solid #EEE;
  }

  .inputs {
    display: flex;
    align-items: center;
    flex-grow: 1;
    padding: 0.25em 0;
  }

  .input-label {
    flex-shrink: 0;
    padding-right: 0.5em;
    width: 7em;
    font-weight: bold;
    text-align: right;
  }

  .input-content {
    flex-shrink: 0;
  }

  .btns {
    flex-shrink: 0;
  }
}

.content-hex {
  input[type="text"] {
    width: 32.5em;
  }
}

.content-halves {
  input[type="number"] {
    width: 12.5em;
  }
}

.content-array {
  input[type="number"] {
    width: 7em;
  }
}

.text-copy {
  width: 2rem;
  height: 1rem;
  overflow: hidden;
  opacity: 0;
  cursor: default;
  resize: none;
}
</style>
