<template>
  <div class="tool-detail-page">

    <!-- 说明 -->
    <n-card size="small" title="说明">
      <n-p>已测试游戏版本：1.12.2 ~ 1.21.4</n-p>
      <n-p>若内容出现乱码，请尝试更改“文件编码”后重新打开文件。</n-p>
    </n-card>

    <!-- 设置 -->
    <n-card size="small" title="设置">
      <n-flex>
        <!-- 文件编码 -->
        <div class="config-item">
          <div class="config-item__label">文件编码：</div>
          <div class="config-item__content">
            <n-select
              v-model:value="currState.textEncoding"
              :options="[
                { label: 'GBK', value: 'gbk' },
                { label: 'UTF-8', value: 'utf-8' },
              ]"
            />
          </div>
        </div>
        <!-- 读取间隔 -->
        <div class="config-item">
          <div class="config-item__label">读取间隔：</div>
          <div class="config-item__content">
            <n-input-number
              v-model:value="currState.readInterval"
              :disabled="currState.isReadingFile"
              :min="1"
              :max="60"
              :precision="0"
              :step="1"
            ></n-input-number>
            <span
              style="margin-left: 0.5em;"
            >秒</span>
          </div>
        </div>
      </n-flex>
    </n-card>

    <!-- 操作 -->
    <n-card size="small" title="操作">
      <n-flex class="action-row">
        <n-button
          type="success"
          @click="selectLogFile"
        >选择文件</n-button>
        <n-button
          type="primary"
          :disabled="!currState.isOpenedFile"
          @click="parseLogFileData(true)"
        >刷新内容</n-button>
        <n-button
          type="primary"
          :disabled="!currState.isOpenedFile || currState.isReadingFile"
          @click="setAutoReading(true)"
        >开始读取</n-button>
        <n-button
          type="error"
          :disabled="!currState.isOpenedFile || !currState.isReadingFile"
          @click="setAutoReading(false)"
        >停止读取</n-button>
        <n-button
          type="error"
          @click="clearHistory"
        >清空内容</n-button>
      </n-flex>
    </n-card>

    <!-- 信息 -->
    <n-card size="small" title="信息">
      <n-flex>
        <n-tag type="info">文件名称：{{ fsFileName || '-' }}</n-tag>
        <n-tag type="info">文件大小：{{ fileSizeDisplay }}</n-tag>
        <n-tag type="info">修改时间：{{ fileLastModifiedDisplay }}</n-tag>
      </n-flex>
    </n-card>

    <!-- 内容 -->
    <n-card
      size="small"
      title="内容"
      :class="{
        'chat-history': true,
        'chat-history--is-full': currState.isFullView,
      }"
    >
      <template #header-extra>
        <div
          class="chat-history__toggle-full"
          @click="currState.isFullView = !currState.isFullView"
        >
          <span
            v-if="currState.isFullView"
            class="mdi mdi-arrow-collapse"
          ></span>
          <span
            v-else
            class="mdi mdi-arrow-expand"
          ></span>
        </div>
      </template>
      <div class="chat-history__wrapper" @contextmenu.stop>
        <div ref="chatHistoryListRef" class="chat-history__list">
          <div
            v-for="item in currState.textRows"
            :key="item.id"
            class="chat-history__item"
          >
            <n-tag
              class="chat-history__time"
              size="small"
              type="info"
            >{{ item.time }}</n-tag>
            <div
              class="chat-history__text"
            >{{ item.text }}</div>
          </div>
        </div>
      </div>
    </n-card>

  </div>
</template>

<script setup>
import {
  NButton, NCard, NFlex,
  NInputNumber, NP, NSelect, NTag,
} from 'naive-ui';

import {
  computed, reactive, ref,
  nextTick, onBeforeMount, onBeforeUnmount,
} from 'vue';

import {
  getCommonDateTime,
} from '@frost-utils/javascript/common/index';

import {
  useFileSystemAccess,
} from '@vueuse/core';

import {
  $message,
} from '@/assets/js/naive-ui';

import {
  getUuidV4,
} from '@/assets/js/utils';

/**
 * @typedef  TextRowItem
 * @property {string}      id   UUID
 * @property {TextRowType} type 文本类型
 * @property {string}      time 时间信息
 * @property {string}      text 文本内容
 */

/** @typedef {''|'chat'} TextRowType */

/** 正则表达式列表 */
const REG_EXP = {
  LOG_CHAT_MSG_1: /\[CHAT\]\s+(.*)$/,
  LOG_TIME: /\[(\d{2}:\d{2}:\d{2})\]/,
};

const {
  data: fsData,
  fileLastModified: fsFileLastModified,
  fileName: fsFileName,
  fileSize: fsFileSize,
  isSupported: fsIsSupported,
  open: fsOpen,
  updateData: fsUpdateData,
} = useFileSystemAccess({
  dataType: 'ArrayBuffer',
  excludeAcceptAllOption: true,
  types: [{
    accept: { 'text/plain': ['.log'] },
    description: 'Minecraft 日志文件',
  }],
});

/**
 * @desc 聊天内容列表 ref
 * @type {VueRef<HTMLElement>}
 */
const chatHistoryListRef = ref(null);

/** 状态信息 */
const currState = reactive({

  /** 内容列表是否满屏显示 */
  isFullView: false,

  /** 是否正在持续读取文件 */
  isReadingFile: false,

  /** 是否已选择文件 */
  isOpenedFile: false,

  /** 最后一次读取时的文件大小 */
  lastFileSize: 0,

  /** 最后一次读取时的文件更新时间 */
  LastModifiedTime: 0,

  /** 最后一次读取时的行数 */
  lastReadLineNumber: 0,

  /** 读取间隔秒数 */
  readInterval: 2,

  /** 自动读取定时器 */
  readTimer: null,

  /** 文本内容编码类型 */
  textEncoding: 'utf-8',

  /**
   * @desc 显示的文本行列表
   * @type {TextRowItem[]}
   */
  textRows: [],

});

/** 显示的文件大小 */
const fileSizeDisplay = computed(() => {
  let value = fsFileSize.value;
  return (value ? `${(value / 1024).toFixed(2)} KB` : '-');
});

/** 显示的文件修改时间 */
const fileLastModifiedDisplay = computed(() => {
  let value = fsFileLastModified.value;
  return (value ? getCommonDateTime(value, 'all') : '-');
});

/** 自动滚动聊天内容列表到底部 */
function autoScrollChatHistory() {

  let element = chatHistoryListRef.value;

  if (!element) {
    console.error('自动滚动失败：元素不存在');
    return;
  }

  let elRect = element.getBoundingClientRect();
  let elHeight = Math.round(elRect.height);

  let scrollHeight0 = element.scrollHeight;
  let scrollHeight1 = 0;
  let scrollTop = element.scrollTop;

  // 检测当前是否位于底部
  if (scrollHeight0 - scrollTop === elHeight) {
    // 渲染新的内容后滚动到底部
    nextTick(() => {

      scrollHeight1 = element.scrollHeight;

      if (scrollHeight1 > elHeight) {
        element.scrollTo({
          behavior: 'instant',
          top: scrollHeight1 - elHeight,
        });
      }

    });
  }

}

/** 清空记录内容 */
function clearHistory() {
  currState.textRows = [];
}

/**
 * @description 解码字符串
 * @param {ArrayBuffer} data
 */
function decodeFileData(data = null) {
  try {

    let decoder = new TextDecoder(currState.textEncoding);
    let text = decoder.decode(data);

    return text;

  } catch (error) {
    console.error('解码失败：');
    console.error(error);
    return '';
  }
}

/** 初始化数据 */
function initData(isFirst = false) {
  currState.lastFileSize = 0;
  currState.LastModifiedTime = 0;
  currState.lastReadLineNumber = 0;
  currState.textRows = isFirst ? [{
    id: getUuidV4(),
    type: 'chat',
    time: getCommonDateTime(null, 'time'),
    text: '请点击按钮选择日志文件以开始。',
  }] : [];
}

/** 解析日志文件内容 */
async function parseLogFileData(manualUpdate = false) {

  if (manualUpdate) {
    await fsUpdateData();
  }

  let currFileSize = fsFileSize.value;
  let currFileTime = fsFileLastModified.value;
  let currFileData = fsData.value;
  let currFileText = '';
  let readLineNumber = currState.lastReadLineNumber;
  let readLineStrs = [];
  let parsedData = [];

  // 若文件内容没有变化，不处理
  if (currFileTime === currState.LastModifiedTime) {
    return false;
  } else {
    currState.LastModifiedTime = currFileTime;
  }

  // 解码字符串
  if (currFileData instanceof ArrayBuffer) {
    currFileText = decodeFileData(currFileData);
  }

  if (currFileText) {
    // 以 \n 拆分，移除末尾 \r
    readLineStrs = currFileText.split('\n').map((text) => {
      return text.replace(/\r$/, '');
    }).filter((text) => {
      return Boolean(text);
    });
  } else {
    console.warn('文件内容为空或解码失败');
    return false;
  }

  // 若已重新创建日志文件，则从头开始读取
  if (currFileSize < currState.lastFileSize) {
    readLineNumber = 0;
  }

  // 跳过读取过的行
  readLineStrs.splice(0, readLineNumber);
  readLineNumber += readLineStrs.length;

  readLineStrs.forEach((text) => {

    let parsed = parseLogLine(text);

    if (parsed.type === 'chat') {
      parsedData.push(parsed);
    }

  });

  currState.lastFileSize = currFileSize;
  currState.lastReadLineNumber = readLineNumber;
  currState.textRows.push.apply(currState.textRows, parsedData);

  autoScrollChatHistory();

  return true;

}

/**
 * @description 解析日志文件行内容
 * @returns {TextRowItem}
 */
function parseLogLine(text = '') {
  try {

    let msgTextMatched = text.match(REG_EXP.LOG_CHAT_MSG_1);
    let msgTextStr = msgTextMatched ? msgTextMatched[1] : '';

    let timeTextMatched = text.match(REG_EXP.LOG_TIME);
    let timeTextStr = timeTextMatched ? timeTextMatched[1] : '';

    if (msgTextStr) {
      // 处理换行和 §
      msgTextStr = msgTextStr.replace(/\\n/g, '\n').replace(/§\w/g, '');
      return {
        id: getUuidV4(),
        type: 'chat',
        time: timeTextStr,
        text: msgTextStr,
      };
    }

  } catch (error) {
    console.error('解析内容失败：');
    console.error(error);
  }

  return {
    id: null,
    type: '',
    time: '',
    text: '',
  };

}

/** 选择日志文件 */
async function selectLogFile() {

  if (!fsIsSupported.value) {
    $message.error('当前浏览器不支持该功能');
    return false;
  }

  try {
    await fsOpen();
    $message.success('打开文件成功');
    currState.isOpenedFile = true;
    initData(false);
    parseLogFileData(false);
    setAutoReading(true);
    return true;
  } catch (error) {
    console.error('打开文件失败：');
    console.error(error);
    $message.error('打开文件失败');
    return false;
  }

}

/** 开始或停止自动读取 */
function setAutoReading(isStart = false) {

  if (currState.readTimer) {
    clearInterval(currState.readTimer);
  }

  if (!isStart) {
    currState.isReadingFile = false;
    currState.readTimer = null;
    return;
  }

  currState.isReadingFile = true;
  currState.readTimer = setInterval(() => {
    parseLogFileData(true);
  }, currState.readInterval * 1000);

}

onBeforeMount(() => {
  initData(true);
});

onBeforeUnmount(() => {
  setAutoReading(false);
});
</script>

<style lang="less" scoped>
.config-item {
  display: flex;
  align-items: center;

  .config-item__content {
    display: flex;
    align-items: center;
  }

  .n-input-number, .n-select {
    width: 128px;
  }
}

.chat-history {
  position: relative;
  background-color: #FFF;

  &.chat-history--is-full {
    position: fixed;
    left: 0;
    top: 0;
    margin-top: 0 !important;
    width: 100%;
    height: 100%;

    .chat-history__wrapper,
    .chat-history__list {
      height: 100%;
    }
  }

  .chat-history__toggle-full {
    cursor: pointer;
  }

  .chat-history__wrapper {
    --line-margin: 8px;
    padding: 16px;
    border: 1px solid #F0F0F0;
    border-radius: 4px;
    font-family: monospace;
    line-height: calc(1em + var(--line-margin));
    word-break: break-all;
  }

  .chat-history__list {
    height: 320px;
    overflow-y: auto;
  }

  .chat-history__item {
    display: flex;
    margin: var(--line-margin) 0;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  .chat-history__time {
    margin: auto 0;
    margin-right: 0.5em;
  }

  .chat-history__text {
    margin: auto 0;
    user-select: text;
    white-space: pre-wrap;
  }
}
</style>
