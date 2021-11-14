<template>
  <div class="tool-page">

    <div class="ctrl">
      <div class="title">控制</div>
      <div class="content">
        <!-- 文本框高度 -->
        <div class="item">
          <span class="label">文本框高度</span>
          <el-input-number
            v-model="textHeight"
            size="small"
            controls-position="right"
            :min="1"
            :max="10"
            :step="1"
            step-strictly
          ></el-input-number>
        </div>
        <!-- 转换类型 -->
        <div class="item">
          <span class="label">转换类型</span>
          <el-select v-model="type" size="small">
            <el-option
              v-for="item in types"
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
            type="primary"
            size="small"
            plain
            @click="encode()"
          >编码</el-button>
          <el-button
            type="success"
            size="small"
            plain
            @click="decode()"
          >解码</el-button>
          <el-button
            type="danger"
            size="small"
            plain
            @click="clear()"
          >清空</el-button>
        </div>
      </div>
    </div>

    <div class="inputs">
      <div class="title">输入</div>
      <div class="content">
        <el-input
          v-model="textInputs"
          type="textarea"
          resize="none"
          :rows="textHeight"
        ></el-input>
      </div>
    </div>

    <div class="outputs">
      <div class="title">结果</div>
      <div class="content">
        <el-input
          v-model="textOutputs"
          type="textarea"
          resize="none"
          :rows="textHeight"
        ></el-input>
      </div>
    </div>

  </div>
</template>

<script>
import {
  decode as decoderHTML,
  encode as encoderHTML,
} from 'html-entities';

export default {
  name: 'ConvertEncodeDecode',
  data() {
    return {
      // 文本框高度
      textHeight: 5,
      // 文本框内容
      textInputs: '',
      textOutputs: '',
      // 转换类型
      type: 'uri-normal',
      types: [
        {
          name: 'html-html5-normal',
          label: 'HTML（HTML5 普通）'
        },
        {
          name: 'html-html5-deep',
          label: 'HTML（HTML5 深度）'
        },
        {
          name: 'html-xml-normal',
          label: 'HTML（XML 普通）'
        },
        {
          name: 'html-xml-deep',
          label: 'HTML（XML 深度）'
        },
        {
          name: 'uri-normal',
          label: 'URI / URL（普通）'
        },
        {
          name: 'uri-deep',
          label: 'URI / URL（深度）'
        },
      ],
    }
  },
  methods: {

    /**
     * 清空
     */
    clear() {
      this.textInputs = '';
      this.textOutputs = '';
    },

    /**
     * 解码
     */
    decode() {
      var result = null;
      const type = this.type;

      switch (type) {
        // HTML
        case 'html-html5-normal':
          result = this.htmlDecode('html5');
          break;
        case 'html-html5-deep':
          result = this.htmlDecode('html5');
          break;
        case 'html-xml-normal':
          result = this.htmlDecode('xml');
          break;
        case 'html-xml-deep':
          result = this.htmlDecode('xml');
          break;
        // URI
        case 'uri-normal':
          result = this.uriDecode(false);
          break;
        case 'uri-deep':
          result = this.uriDecode(true);
          break;
        default:
          break;
      }

      this.textOutputs = (result || '');
    },

    /**
     * 编码
     */
    encode() {
      var result = null;
      const type = this.type;

      switch (type) {
        // HTML
        case 'html-html5-normal':
          result = this.htmlEncode('html5', false);
          break;
        case 'html-html5-deep':
          result = this.htmlEncode('html5', true);
          break;
        case 'html-xml-normal':
          result = this.htmlEncode('xml', false);
          break;
        case 'html-xml-deep':
          result = this.htmlEncode('xml', true);
          break;
        // URI
        case 'uri-normal':
          result = this.uriEncode(false);
          break;
        case 'uri-deep':
          result = this.uriEncode(true);
          break;
        default:
          break;
      }

      this.textOutputs = (result || '');
    },

    /**
     * HTML 解码
     * 
     * @param {string} type 类型（html5、xml）
     * @returns {string} 解码后的文本
     */
    htmlDecode(type) {
      const inputs = this.textInputs;
      const options = {
        level: type,
      };

      return decoderHTML(inputs, options);
    },

    /**
     * HTML 编码
     * 
     * @param {string} type 类型（html5、xml）
     * @param {boolean} isDeep 是否为深度编码
     * @returns {string} 编码后的文本
     */
    htmlEncode(type, isDeep) {
      const inputs = this.textInputs;
      const options = {
        level: type,
        mode: (isDeep ? 'extensive' : 'specialChars'),
      };

      return encoderHTML(inputs, options);
    },

    /**
     * URI 解码
     * 
     * @param {boolean} isDeep 是否使用 decodeURIComponent
     * @returns {string} 解码后的文本
     */
    uriDecode(isDeep) {
      const inputs = this.textInputs;
      if (isDeep) {
        return decodeURIComponent(inputs);
      } else {
        return decodeURI(inputs);
      }
    },

    /**
     * URI 编码
     * 
     * @param {boolean} isDeep 是否使用 encodeURIComponent
     * @returns {string} 编码后的文本
     */
    uriEncode(isDeep) {
      const inputs = this.textInputs;
      if (isDeep) {
        return encodeURIComponent(inputs);
      } else {
        return encodeURI(inputs);
      }
    },

  },
}
</script>

<style lang="less" scoped>
.ctrl {
  .content {
    display: flex;
    flex-wrap: wrap;
  }

  .el-select {
      width: 12.5rem;
  }

  .item {
    margin: 8px 8px;
  }

  .label {
    margin-right: 0.5em;
  }
}
</style>
