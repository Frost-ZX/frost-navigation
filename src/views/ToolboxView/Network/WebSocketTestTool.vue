<template>
  <div class="tool-detail-page">

    <!-- 注意 -->
    <n-card size="small" title="注意">
      <n-p>由于浏览器限制，通过 HTTPS 访问网站时只能连接带 SSL 的 WebSocket（WSS）。</n-p>
      <n-p>若需要连接不带 SSL 的 WebSocket（WS），建议下载到本地后使用。</n-p>
    </n-card>

    <!-- 输入 -->
    <n-card size="small" title="输入">
      <n-form
        class="form-no-feedback"
        label-align="left"
        label-placement="top"
        label-width="auto"
      >

        <n-form-item label="连接地址">
          <n-input-group class="address-input">
            <n-select
              v-model:value="data.address.prefix"
              :options="[
                { label: 'ws://', value: 'ws://' },
                { label: 'wss://', value: 'wss://' },
              ]"
            />
            <n-input
              v-model:value="data.address.suffix"
              type="text"
            ></n-input>
          </n-input-group>
        </n-form-item>

        <n-form-item label="发送内容（自动移除换行符）">
          <n-input
            v-model:value="data.inputs"
            placeholder="在此处输入要发送的内容"
            type="textarea"
            :rows="2"
          ></n-input>
        </n-form-item>

      </n-form>
    </n-card>

    <!-- 操作 -->
    <n-card size="small" title="操作">
      <n-flex>
        <n-button
          type="success"
          :disabled="data.ws !== null"
          @click="wsConnect"
        >连接</n-button>
        <n-button
          type="warning"
          :disabled="data.ws === null"
          @click="wsClose"
        >断开</n-button>
        <n-button
          type="primary"
          :disabled="data.ws === null"
          @click="wsSend"
        >发送</n-button>
        <n-button
          type="error"
          @click="clearInputs"
        >清空输入</n-button>
        <n-button
          type="error"
          @click="clearMessages"
        >清空消息</n-button>
      </n-flex>
    </n-card>

    <!-- 日志 -->
    <n-card size="small" title="日志">
      <div
        ref="logsContentRef"
        class="logs-content"
        :style="{ height: (data.logsHeight + 'px') }"
        @contextmenu.stop
      >
        <div class="message-list">
          <div
            v-for="item in data.messages"
            :key="item.id"
            class="message-item"
          >
            <!-- 时间 -->
            <n-tag
              :type="item.type === 'send' ? 'primary' : 'success'"
              size="small"
            >{{ getCommonDateTime(item.time) }}</n-tag>
            <!-- 消息内容 -->
            <div
              v-if="data.parseType === 'html'"
              v-html="item.message"
              class="message-content"
            ></div>
            <div
              v-else
              class="message-content"
            >{{ item.message }}</div>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 设置 -->
    <n-card size="small" title="设置">
      <n-form
        class="form-no-feedback"
        label-align="left"
        label-placement="top"
        label-width="auto"
      >

        <!-- 日志高度 -->
        <n-form-item label="日志高度">
          <n-input-number
            v-model:value="data.logsHeight"
            :min="80"
            :max="800"
            :precision="0"
            :step="1"
          ></n-input-number>
        </n-form-item>

        <!-- 日志最大行数 -->
        <n-form-item label="日志最大行数">
          <n-input-number
            v-model:value="data.logsMax"
            :min="1"
            :max="8192"
            :precision="0"
            :step="1"
          ></n-input-number>
        </n-form-item>

        <!-- 解析类型 -->
        <n-form-item label="解析类型">
          <n-radio-group v-model:value="data.parseType">
            <n-radio-button
              v-for="item in data.parseTypes"
              :key="item.name"
              :label="item.label"
              :value="item.name"
            />
          </n-radio-group>
        </n-form-item>

        <!-- 自动滚动 -->
        <n-form-item label="自动滚动">
          <n-radio-group v-model:value="data.autoScroll">
            <n-radio-button label="开启" :value="true" />
            <n-radio-button label="关闭" :value="false" />
          </n-radio-group>
        </n-form-item>

      </n-form>
    </n-card>

  </div>
</template>

<script setup>
import {
  NButton, NCard,
  NFlex, NForm, NFormItem,
  NInput, NInputGroup, NInputNumber,
  NP, NRadioButton, NRadioGroup, NSelect, NTag,
} from 'naive-ui';

import {
  reactive, ref, nextTick, onMounted, onBeforeUnmount,
} from 'vue';

import {
  getCommonDateTime,
} from '@frost-utils/javascript/common/index';

import {
  $dialog, $notification,
} from '@/assets/js/naive-ui';

/** 数据 */
const data = reactive({

  /** 连接地址 */
  address: {
    prefix: 'ws://',
    suffix: '',
  },

  /** 自动滚动结果 */
  autoScroll: true,

  /** 发送内容 */
  inputs: '',

  /** 日志高度 */
  logsHeight: 320,

  /** 日志最大行数 */
  logsMax: 100,

  /** 接收内容 */
  messages: [],

  /** 消息 ID */
  messageID: 0,

  /** 消息解析类型 */
  parseType: 'string',

  /** 消息解析类型列表 */
  parseTypes: [
    { name: 'html', label: 'HTML' },
    { name: 'json', label: 'JSON' },
    { name: 'string', label: '字符串' },
  ],

  /**
   * @desc WebSocket 对象
   * @type {WebSocket}
   */
  ws: null,

});

/**
 * @desc 日志内容 ref
 * @type {VueRef<HTMLElement>}
 */
const logsContentRef = ref(null);

/** 清空输入 */
function clearInputs() {
  $dialog.create({
    content: '确定要清空输入的内容吗？',
    negativeText: '取消',
    positiveText: '确定',
    title: '确认',
    type: 'default',
    onPositiveClick: () => {
      data.inputs = '';
    },
  });
}

/** 清空消息 */
function clearMessages() {
  $dialog.create({
    content: '确定要清空消息内容吗？',
    negativeText: '取消',
    positiveText: '确定',
    title: '确认',
    type: 'default',
    onPositiveClick: () => {
      data.messages = [];
      data.messageID = 0;
    },
  });
}

/**
 * @description 处理 WebSocket 关闭
 * @param {CloseEvent} event
 */
function handleClose(event) {

  let ws = event.target;

  notify({
    message: 'WebSocket 已关闭',
    type: 'warning',
  });

  if (ws) {
    ws.removeEventListener('close', handleClose);
    ws.removeEventListener('error', handleError);
    ws.removeEventListener('message', handleMessage);
    ws.removeEventListener('open', handleOpen);
  }

}

/** 处理 WebSocket 错误 */
function handleError() {
  notify({
    message: 'WebSocket 发生错误',
    type: 'error',
  });
}

/**
 * @description 处理 WebSocket 消息
 * @param {MessageEvent} ev
 */
function handleMessage(ev) {

  let msg = ev.data;
  let el = logsContentRef.value;

  if (!msg) {
    return;
  }

  let parsed = wsParse(false, msg);
  let result = (parsed || msg)

  console.log('%c%s', 'color: #2196F3;', '[接收]', (parsed || result));

  // 记录消息
  pushMessage('receive', msg);

  // 自动滚动
  nextTick(() => {
    if (el && data.autoScroll) {
      el.scrollTo(0, el.scrollHeight)
    }
  });

}

/** 处理 WebSocket 打开 */
function handleOpen() {
  notify({
    message: 'WebSocket 已连接',
    type: 'info',
  });
}

/** 初始化 */
function init() {

  // 检测兼容性
  if (typeof WebSocket === 'undefined') {
    notify({
      duration: 0,
      message: '您的浏览器不支持 WebSocket。',
      title: '错误',
      type: 'error',
    });
  }

}

/**
 * @description 提示信息
 * @param {object} options
 * @param {number} options.duration
 * @param {string} options.message
 * @param {string} options.title
 * @param {string} options.type
 */
function notify(options) {

  let {
    duration = 3000,
    message = '',
    title = '提示',
    type = 'info',
  } = options;

  return $notification.create({
    content: message,
    duration: duration,
    title: title,
    type: type,
  });

}

/**
 * @description 添加消息
 * @param {string} type 类型（receive、send）
 * @param {string} msg  消息内容
 */
function pushMessage(type, msg = '') {

  let types = ['receive', 'send'];

  if (types.indexOf(type) === -1) {
    return;
  }

  let current = data.messages.length;
  let max = data.logsMax;

  // 最大行数
  if (current >= max) {
    data.messages.splice(0, (current - max + 1));
  }

  data.messageID += 1;
  data.messages.push({
    id: data.messageID,
    message: msg,
    time: Date.now(),
    type: type,
  });

}

/** 关闭连接 */
function wsClose() {
  if (data.ws) {
    data.ws.close();
    data.ws = null;
  }
}

/** 打开连接 */
function wsConnect() {

  let info = data.address;
  let address = (info.prefix + info.suffix);

  if (!info.suffix) {
    notify({
      message: '请填写连接地址',
      title: '连接失败',
      type: 'warning',
    });
    return;
  }

  try {

    let ws = new WebSocket(address);

    // 监听事件
    ws.addEventListener('close', handleClose);
    ws.addEventListener('error', handleError);
    ws.addEventListener('message', handleMessage);
    ws.addEventListener('open', handleOpen);

    // 保存对象
    data.ws = ws;

  } catch (error) {
    notify({
      message: String(error),
      title: '连接失败',
      type: 'error',
    });
  }

}

/**
 * @description 解析消息
 * @param   {boolean} isSend  是否为发送，否则为接收
 * @param   {string}  content 消息文本内容
 * @returns {null|object|string} 成功则返回解析后的消息，否则返回 null
 */
function wsParse(isSend = false, content = '') {

  let parseType = data.parseType;

  if (parseType === 'json') {

    // JSON
    try {
      return JSON.parse(content);
    } catch (error) {
      let s1 = isSend ? '解析发送的 JSON 消息失败' : '解析接收的 JSON 消息失败';
      let s2 = String(error);
      console.warn(s1);
      console.warn(s2);
      notify({
        message: s2,
        title: s1,
        type: 'warning',
      });
      return null;
    }

  } else {

    // 默认不处理
    return content;

  }

}

/** 发送消息 */
function wsSend() {

  let instance = data.ws;
  let message = data.inputs.replace(/(\n|\r)/g, '');
  let parsed = wsParse(true, message);

  if (instance && parsed) {
    console.log('%c%s', 'color: #4CAF50;', '[发送]', parsed);
    instance.send(message);
    pushMessage('send', message);
  }

}

onMounted(() => {
  init();
});

onBeforeUnmount(() => {
  wsClose();
});
</script>

<style lang="less" scoped>
.address-input {
  .n-select {
    width: 100px;
  }

  .n-input {
    flex-grow: 1;
    width: 0;
  }
}

.logs-content {
  padding: 8px 16px;
  border: 1px solid #F0F0F0;
  border-radius: 4px;
  background-color: #FFF;
  line-height: 1.6;
  overflow-y: auto;
  user-select: text;

  .message-item {
    display: flex;
    margin: 8px 0;
    word-break: break-all;

    > * {
      margin: auto 0;
    }
  }

  .n-tag {
    margin-right: 0.5em;
  }

  .message-content {
    position: relative;
  }
}
</style>
