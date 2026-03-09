<template>
  <div class="tool-detail-page">

    <!-- 操作 -->
    <n-card class="actions" size="small" title="操作">
      <n-flex>
        <n-button
          type="success"
          @click="handleConnectDevice"
        >连接设备</n-button>
        <n-button
          type="error"
          @click="handleDisconnectDevice"
        >断开连接</n-button>
        <n-button
          type="success"
          @click="handleStartRender"
        >开始渲染</n-button>
        <n-button
          type="error"
          @click="handleStopRender"
        >停止渲染</n-button>
      </n-flex>
      <n-flex>
        <n-button
          type="primary"
          @click="lcdSetDirection(0)"
        >设置显示方向：正</n-button>
        <n-button
          type="primary"
          @click="lcdSetDirection(1)"
        >设置显示方向：反</n-button>
        <n-button
          type="primary"
          :disabled="isUseNewDisplayDataConvertFunction"
          @click="isUseNewDisplayDataConvertFunction = true"
        >显示数据转换算法：新</n-button>
        <n-button
          type="primary"
          :disabled="!isUseNewDisplayDataConvertFunction"
          @click="isUseNewDisplayDataConvertFunction = false"
        >显示数据转换算法：旧</n-button>
      </n-flex>
    </n-card>

    <!-- 配置参数 -->
    <n-card size="small" title="配置参数">
      <n-form
        class="form-no-feedback config-form"
        label-align="right"
        label-placement="left"
        label-width="6.5em"
      >

        <n-form-item label="分辨率：">
          <n-select
            v-model:value="deviceResolution"
            :options="Object.values(RESOLUTION_LIST).map((item) => {
              return {
                label: item.label,
                value: item.value,
              };
            })"
            @update:value="handleChangeResolution"
          />
        </n-form-item>

        <n-form-item label="显示模式：">
          <n-select
            v-model:value="displayMode"
            :options="Object.values(DISPLAY_MODES).map((item) => {
              return {
                label: item.label,
                value: item.value,
              };
            })"
            @update:value="handleChangeDisplayMode"
          />
        </n-form-item>

        <n-form-item label="渲染间隔：">
          <n-input-number
            v-model:value="renderInterval"
            title="单位：毫秒"
            :min="10"
            :max="60000"
            :step="1"
          />
        </n-form-item>

        <n-form-item label="发送间隔：">
          <n-input-number
            v-model:value="sendInterval"
            title="单位：毫秒"
            :min="50"
            :max="2000"
            :step="1"
          />
        </n-form-item>

      </n-form>
    </n-card>

    <!-- 画布 -->
    <n-card size="small" title="画布">
      <div class="canvas-container">
        <canvas ref="canvasElement"></canvas>
      </div>
    </n-card>

  </div>
</template>

<script setup>
import {
  NButton, NCard, NFlex,
  NForm, NFormItem, NInputNumber, NSelect,
} from 'naive-ui';

import {
  ref, onMounted, onBeforeUnmount,
} from 'vue';

/** 显示模式列表 */
const DISPLAY_MODES = {
  audioSpectrum: {
    label: '音频频谱',
    value: 'audioSpectrum',
  },
  audioVisualizer1: {
    label: '音频可视化 - 1',
    value: 'audioVisualizer1',
  },
  audioVisualizer2: {
    label: '音频可视化 - 2',
    value: 'audioVisualizer2',
  },
  dataText: {
    label: '数据显示',
    value: 'dataText',
  },
  digitalClock: {
    label: '数字时钟',
    value: 'digitalClock',
  },
};

/** 分辨率配置选项 */
const RESOLUTION_LIST = {
  '160x80': {
    label: '160x80',
    lcdX: 160, lcdY: 80,
    showWidth: 480, showHeight: 240,
    value: '160x80',
  },
  '320x172': {
    label: '320x172',
    lcdX: 320, lcdY: 172,
    showWidth: 320, showHeight: 172,
    value: '320x172',
  },
  '320x240': {
    label: '320x240',
    lcdX: 320, lcdY: 240,
    showWidth: 320, showHeight: 240,
    value: '320x240',
  },
};

/** @type {VueRef<HTMLCanvasElement>} */
const canvasElement = ref(null);

/** @type {VueRef<CanvasRenderingContext2D >} */
const canvasCtx = ref(null);

/** 分辨率 */
const deviceResolution = ref('320x172');

/** 显示模式 */
const displayMode = ref('dataText');

/** 是否使用新的显示数据转换算法 */
const isUseNewDisplayDataConvertFunction = ref(true);

/** 渲染间隔，毫秒 */
const renderInterval = ref(100);

/** 发送间隔，毫秒 */
const sendInterval = ref(100);

/**
 * @desc 串口对象
 * @type {SerialPort}
 */
let serialPort = null;

/**
 * @desc 串口读取器
 * @type {ReturnType<typeof serialPort.readable.getReader>}
 */
let serialReader = null;

/**
 * @desc 串口写入器
 * @type {ReturnType<typeof serialPort.writable.getWriter>}
 */
let serialWriter = null;

/** 连接状态，0: 未连接, 1: 已连接 */
let deviceState = 0;

/** 最后一次渲染的时间戳 */
let lastRenderTime = 0;

/** 最后一次发送的时间戳 */
let lastSendTime = 0;

/** 渲染循环 requestAnimationFrame ID */
let renderAnimationId = null;

/** 发送循环 requestAnimationFrame ID */
let sendAnimationId = null;

// 音频相关变量

/** @type {AudioContext} */
let audioContext = null;

/** @type {ReturnType<typeof audioContext.createAnalyser>} */
let audioAnalyser = null;

/** @type {number} */
let audioBufferLength = null;

/** @type {Uint8Array} */
let audioDataArray = null;

/** @type {ReturnType<typeof audioContext.createMediaStreamSource>} */
let microphone = null;

/** 音频是否已初始化 */
let isAudioReady = false;

// 显示参数
let CANVAS_WIDTH = 0;  // 画布显示宽度
let CANVAS_HEIGHT = 0; // 画布显示高度
let LCD_WIDTH = 0;     // 设备实际宽度
let LCD_HEIGHT = 0;    // 设备实际高度

/** 处理更改显示模式 */
function handleChangeDisplayMode() {

  let info = DISPLAY_MODES[displayMode.value];

  if (info) {
    console.info(`显示模式切换成功: ${info.label}`);
  } else {
    console.error('显示模式切换失败：模式无效');
  }

}

/** 处理更改分辨率 */
function handleChangeResolution() {

  let canvas = canvasElement.value;
  let value = deviceResolution.value;
  let config = RESOLUTION_LIST[value];

  // 更新显示参数
  CANVAS_WIDTH = config.showWidth;
  CANVAS_HEIGHT = config.showHeight;
  LCD_WIDTH = config.lcdX;
  LCD_HEIGHT = config.lcdY;

  // 更新画布属性
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  // 显示信息
  console.info(`分辨率切换成功：${value}`);

}

/** 连接设备 */
async function handleConnectDevice() {
  try {

    // 请求用户授权访问串口设备
    serialPort = await navigator.serial.requestPort();

    // 打开串口
    await serialPort.open({
      baudRate: 115200,
      dataBits: 8,
      stopBits: 1,
      parity: 'none',
      flowControl: 'hardware',
    });

    const encoder = new TextEncoder();
    const decoder = new TextDecoder('gbk');

    serialReader = serialPort.readable.getReader();
    serialWriter = serialPort.writable.getWriter();

    // 开始监听串口数据
    listenSerialData(serialReader, decoder);

    console.info('MSN 设备连接中...');

    // 发送连接确认消息
    await sendText('MSNCN');

    // 连接成功后自动开始发送
    setTimeout(() => {
      if (!sendAnimationId) {
        console.info('自动开始发送');
        sendAnimationId = requestAnimationFrame(sendCanvas);
      }
    }, 100);

  } catch (error) {
    console.error('连接设备失败:', error);
  }
}

/** 断开连接 */
async function handleDisconnectDevice() {

  // 断开连接前自动停止发送
  if (sendAnimationId) {
    console.info('自动停止发送');
    cancelAnimationFrame(sendAnimationId);
    sendAnimationId = null;
  }

  if (serialReader) {
    await serialReader.cancel();
    serialReader.releaseLock();
    serialReader = null;
    console.info('serialReader 已释放');
  }

  if (serialWriter) {
    await serialWriter.close();
    serialWriter.releaseLock();
    serialWriter = null;
    console.info('serialWriter 已释放');
  }

  if (serialPort) {
    await serialPort.close();
    serialPort = null;
    console.info('serialPort 已关闭');
  }

  deviceState = 0;
  console.info('断开连接成功');

}

/** 开始渲染 */
function handleStartRender() {
  if (!renderAnimationId) {
    console.info('开始渲染');
    renderAnimationId = requestAnimationFrame(renderCanvas);
  }
}

/** 停止渲染 */
function handleStopRender() {

  // 停止循环渲染
  if (renderAnimationId) {
    console.info('停止渲染');
    cancelAnimationFrame(renderAnimationId);
    renderAnimationId = null;
  }

  // 停止音频分析
  audioAnalyserStop();

}

/** 初始化 */
function initData() {

  handleChangeDisplayMode();
  handleChangeResolution();

  if (canvasElement.value) {
    canvasCtx.value = canvasElement.value.getContext('2d');
  }

}

/** 数据文本渲染类 */
class DataTextRender {

  constructor() {
    this.monitorData = {};
    this.font = '32px Arial';
  }

  updateDataText() {

    let date = new Date();

    this.monitorData = {
      row_1: {
        value: `${String(date.getFullYear()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
        label: '日期',
        unit: '',
        detail: '',
        color: '#FFFF00',
        icon: 'I',
      },
      row_2: {
        value: `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`,
        label: '时间',
        unit: '',
        detail: '',
        color: '#00FFFF',
        icon: 'I',
      },
      row_3: {
        value: `${String(date.getFullYear()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
        label: '日期',
        unit: '',
        detail: '',
        color: '#FFFF00',
        icon: 'I',
      },
      row_4: {
        value: `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`,
        label: '时间',
        unit: '',
        detail: '',
        color: '#00FFFF',
        icon: 'I',
      },
    };

    return this.monitorData;

  }

  formatDisplayText(key, showIcon = false) {

    let item = this.monitorData[key];

    if (!item) {
      return '';
    }

    let icon = showIcon ? `[${item.icon}] ` : '';
    let detail = item.detail || '';

    if (detail) {
      return `${icon}${item.label}: ${item.value}${item.unit} ${detail}`;
    } else {
      return `${icon}${item.label}: ${item.value}${item.unit}`;
    }

  }

  createDisplayImage() {

    // 更新数据
    this.updateDataText();

    // 清空画布
    canvasCtx.value.fillStyle = 'black';
    canvasCtx.value.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 绘制网格布局
    this.drawGridLayout();

  }

  drawGridLayout() {

    let layouts = [
      { key: 'row_1', position: [10, 10] },
      { key: 'row_2', position: [10, 50] },
      { key: 'row_3', position: [10, 90] },
      { key: 'row_4', position: [10, 130] },
    ];

    canvasCtx.value.font = this.font;
    canvasCtx.value.textBaseline = 'top';
    canvasCtx.value.textAlign = 'left';

    layouts.forEach(layout => {
      if (this.monitorData[layout.key]) {
        let item = this.monitorData[layout.key];
        let text = this.formatDisplayText(layout.key, false);
        canvasCtx.value.fillStyle = item['color'];
        canvasCtx.value.fillText(text, layout.position[0], layout.position[1]);
      }
    });

  }

}

/** 数据文本渲染实例 */
const dataTextRender = new DataTextRender();

/** 开始音频分析，初始化音频上下文和麦克风 */
async function audioAnalyserStart() {
  try {

    // 创建音频上下文
    audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // 请求麦克风访问
    let stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });

    // 创建麦克风源
    microphone = audioContext.createMediaStreamSource(stream);

    // 创建分析器
    audioAnalyser = audioContext.createAnalyser();
    audioAnalyser.fftSize = 256;
    audioAnalyser.smoothingTimeConstant = 0.25;

    // 连接麦克风到分析器
    microphone.connect(audioAnalyser);

    // 获取分析器数据
    audioBufferLength = audioAnalyser.frequencyBinCount;
    audioDataArray = new Uint8Array(audioBufferLength);

    // 更新状态
    isAudioReady = true;

    console.info('音频初始化成功，音频分析已开始');

  } catch (error) {
    console.error('音频初始化失败:', error);
    isAudioReady = false;
  }
}

/** 停止音频分析 */
function audioAnalyserStop() {

  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }

  if (microphone) {
    microphone.disconnect();
    microphone = null;
  }

  if (audioAnalyser) {
    audioAnalyser.disconnect();
    audioAnalyser = null;
  }

  isAudioReady = false;

  console.info('音频分析已停止');

}

/** 将 32 位整数拆分为 4 个字节 */
function convertDigitToInts(di) {
  return [(di >> 24) & 0xFF, (di >> 16) & 0xFF, (di >> 8) & 0xFF, di & 0xFF];
}

/**
 * @description 将 RGB565 颜色转换为 RGB 颜色
 * @param   {number} color565 RGB565 颜色值
 * @returns {number[]} RGB 颜色值数组，格式：`[r, g, b]`
 */
function convertRgb565ToRgb(color565) {
  const r = ((color565 >> 11) & 0x1F) << 3;
  const g = ((color565 >> 5) & 0x3F) << 2;
  const b = (color565 & 0x1F) << 3;
  return [r, g, b];
}

/**
 * @description 将 RGB888 转换为 RGB565 格式
 * @param   {ImageData} imageData 包含 RGB888 数据的 ImageData 对象
 * @returns {number[]} 包含 RGB565 数据的数组
 */
function convertRgb888ToRgb565(imageData) {

  let rgb565Array = [];

  for (let i = 0; i < imageData.data.length; i += 4) {
    let r = imageData.data[i];
    let g = imageData.data[i + 1];
    let b = imageData.data[i + 2];
    let rgb565 = ((r >> 3) << 11) | ((g >> 2) << 5) | (b >> 3);
    rgb565Array.push(rgb565);
  }

  return rgb565Array;

}

/**
 * 对图像数据进行压缩处理，减少传输数据量
 * - 基于 `compaction.c` 中的 `MSN_compaction` 算法移植
 */
function convertDisplayData(imageData = []) {

  let totalDataSize = imageData.length;
  let dataPerPage = 128;
  let hexUse = [];
  let dataIndex = 0;

  // -- 按页处理数据，每页 128 个像素 --

  let totalPages = Math.floor(totalDataSize / dataPerPage);

  for (let page = 0; page < totalPages; page++) {
    let i = 0;
    while (i < 128) {

      let a = 0;
      let a_data = imageData[dataIndex];

      // 统计第 1 种颜色的连续出现次数（最多 15 次）
      for (let s = 0; s < 15; s++) {
        if (i < 128 && a_data === imageData[dataIndex]) {
          a++;
          i++;
          dataIndex++;
        } else {
          break;
        }
      }

      let b = 0;
      let b_data = 0;

      // 统计第 2 种颜色的连续出现次数（最多 15 次）
      if (i < 128) {
        b_data = imageData[dataIndex];
        for (let s = 0; s < 15; s++) {
          if (i < 128 && b_data === imageData[dataIndex]) {
            b++;
            i++;
            dataIndex++;
          } else {
            break;
          }
        }
      }

      // 输出压缩数据：
      // [9, a*16+b, a_data 高字节, a_data 低字节, b_data 高字节, b_data 低字节]
      hexUse.push(9);
      hexUse.push(a * 16 + b);
      hexUse.push((a_data >> 8) & 0xFF);
      hexUse.push(a_data & 0xFF);
      hexUse.push((b_data >> 8) & 0xFF);
      hexUse.push(b_data & 0xFF);

    }
  }

  // -- 处理剩余数据 --

  let remainingDataSize = totalDataSize % dataPerPage;

  if (remainingDataSize !== 0) {

    let remainingData = imageData.slice(totalDataSize - remainingDataSize);

    // 补全数据到 128 字节
    while (remainingData.length < dataPerPage) {
      remainingData.push(0xFFFF);
    }

    let i = 0;
    let dataIndex = 0;

    while (i < 128) {

      let a = 0;
      let a_data = remainingData[dataIndex];

      for (let s = 0; s < 15; s++) {
        if (i < 128 && a_data === remainingData[dataIndex]) {
          a++;
          i++;
          dataIndex++;
        } else {
          break;
        }
      }

      let b = 0;
      let b_data = 0;

      if (i < 128) {
        b_data = remainingData[dataIndex];
        for (let s = 0; s < 15; s++) {
          if (i < 128 && b_data === remainingData[dataIndex]) {
            b++;
            i++;
            dataIndex++;
          } else {
            break;
          }
        }
      }

      hexUse.push(9);
      hexUse.push(a * 16 + b);
      hexUse.push((a_data >> 8) & 0xFF);
      hexUse.push(a_data & 0xFF);
      hexUse.push((b_data >> 8) & 0xFF);
      hexUse.push(b_data & 0xFF);

    }
  }

  return hexUse;

}

/**
 * 对图像数据进行压缩处理，减少传输数据量
 * - 旧算法，适配 `160x80` 设备
 */
function convertDisplayDataLegacy(imageData = []) {

  let totalDataSize = imageData.length;
  let dataPerPage = 128;
  let dataPage1 = 0;
  let dataPage2 = 0;
  let hexUse = [];

  // -- 按页处理数据，每页 128 个像素 --

  for (let i = 0; i < Math.floor(totalDataSize / dataPerPage); i++) {

    dataPage1 = dataPage2;
    dataPage2 += dataPerPage;

    let dataW = imageData.slice(dataPage1, dataPage2);
    let cmpUse = [];

    for (let j = 0; j < dataW.length; j += 2) {
      cmpUse.push((dataW[j] << 16) | dataW[j + 1]);
    }

    // 找出最频繁的颜色作为背景色
    let colorCount = {};

    cmpUse.forEach(color => {
      colorCount[color] = (colorCount[color] || 0) + 1;
    });

    let maxCount = 0;
    let backgroundColor = 0;

    for (let [color, count] of Object.entries(colorCount)) {
      if (count > maxCount) {
        maxCount = count;
        backgroundColor = parseInt(color);
      }
    }

    hexUse.push(2, 4);
    hexUse.push(...convertDigitToInts(backgroundColor));

    // 只记录与背景色不同的像素
    cmpUse.forEach((cmpValue, index) => {
      if (cmpValue !== backgroundColor) {
        hexUse.push(4, index);
        hexUse.push(...convertDigitToInts(cmpValue));
      }
    });

    hexUse.push(2, 3, 8, 1, 0, 0);

  }

  // -- 处理剩余数据 --

  let remainingDataSize = totalDataSize % dataPerPage;

  if (remainingDataSize !== 0) {

    let dataW = imageData.slice(-remainingDataSize);

    // 补全数据
    while (dataW.length < dataPerPage) {
      dataW.push(0xFFFF);
    }

    let cmpUse = [];

    for (let j = 0; j < dataW.length; j += 2) {
      cmpUse.push((dataW[j] << 16) | dataW[j + 1]);
    }

    cmpUse.forEach((cmpValue, index) => {
      hexUse.push(4, index);
      hexUse.push(...convertDigitToInts(cmpValue));
    });

    hexUse.push(2, 3, 8, 0, remainingDataSize * 2, 0);

  }

  return hexUse;

}

/**
 * @description 设置显示方向
 * @param {0|1} direction 显示方向
 * - 0：正常，1：上下翻转
 */
async function lcdSetDirection(direction = 0) {

  let hexUse = [];

  hexUse.push(2);  // LCD 多次写入指令
  hexUse.push(3);  // 设置指令
  hexUse.push(10); // 显示方向指令
  hexUse.push(direction);
  hexUse.push(0, 0);

  await sendData(hexUse);

}

/** 设置 LCD 显示起始坐标 */
function lcdSetDisplayXY(lcdD0 = 0, lcdD1 = 0) {
  let hexUse = [];
  hexUse.push(2);                       // LCD 多次写入指令
  hexUse.push(0);                       // 设置起始位置指令
  hexUse.push(Math.floor(lcdD0 / 256)); // X 坐标高字节
  hexUse.push(lcdD0 % 256);             // X 坐标低字节
  hexUse.push(Math.floor(lcdD1 / 256)); // Y 坐标高字节
  hexUse.push(lcdD1 % 256);             // Y 坐标低字节
  return hexUse;
}

/** 设置 LCD 显示区域大小 */
function lcdSetDisplaySize(lcdD0 = 0, lcdD1 = 0) {
  let hexUse = [];
  hexUse.push(2);                       // LCD 多次写入指令
  hexUse.push(1);                       // 设置大小指令
  hexUse.push(Math.floor(lcdD0 / 256)); // 宽度高字节
  hexUse.push(lcdD0 % 256);             // 宽度低字节
  hexUse.push(Math.floor(lcdD1 / 256)); // 高度高字节
  hexUse.push(lcdD1 % 256);             // 高度低字节
  return hexUse;
}

/**
 * @description 设置 LCD 显示区域并准备写入数据
 * @param {number} lcdX - 显示区域起始 X 坐标
 * @param {number} lcdY - 显示区域起始 Y 坐标
 * @param {number} lcdW - 显示区域宽度
 * @param {number} lcdH - 显示区域高度
 */
async function lcdSetDisplaySend(lcdX = 0, lcdY = 0, lcdW = 0, lcdH = 0) {

  let hexUse = [];

  hexUse.push(...lcdSetDisplayXY(lcdX, lcdY));
  hexUse.push(...lcdSetDisplaySize(lcdW, lcdH));
  hexUse.push(2); // LCD 多次写入指令
  hexUse.push(3); // 设置指令
  hexUse.push(7); // 载入地址
  hexUse.push(0, 0, 0);

  await sendData(hexUse);

}

/**
 * @description 监听串口数据
 * @param {typeof serialReader} reader
 * @param {TextDecoder}         decoder
 */
async function listenSerialData(reader, decoder) {
  try {
    while (true) {

      let { value, done } = await reader.read();

      // 端口已关闭
      if (done) {
        console.info('串口已关闭');
        deviceState = 0;
        break;
      }

      // 处理接收到的数据
      let data = decoder.decode(value);

      console.debug('接收数据:', { decoded: data });

      // 检测是否为 MSN 设备
      if (data.length > 5) {
        for (let n = 0; n < data.length - 5; n++) {
          if (data.charCodeAt(n) === 0) {
            if (data.substring(n + 1, n + 4) === 'MSN') {
              // 确认是 MSN 设备
              console.info('检测到 MSN 设备');
              deviceState = 1;
              // 检查是否收到连接确认
              if (data.substring(n + 1, n + 6) === 'MSNCN') {
                console.info('MSN 设备连接完成');
              }
              break;
            }
          }
        }
      }

    }
  } catch (error) {
    console.error('读取串口数据失败:', error);
    deviceState = 0;
  }
}

/** 循环发送画布内容到设备 */
async function sendCanvas(timestamp = 0) {

  // 限制发送频率
  if (timestamp - lastSendTime >= sendInterval.value) {

    // 更新时间戳
    lastSendTime = timestamp;

    // 未连接，结束后续处理
    if (!deviceState) {
      sendAnimationId = requestAnimationFrame(sendCanvas);
      return;
    }

    // 创建一个临时画布用于图像缩放
    let tempCanvas = document.createElement('canvas');
    let tempCtx = tempCanvas.getContext('2d');

    tempCanvas.width = LCD_WIDTH;
    tempCanvas.height = LCD_HEIGHT;

    // 将原始画布内容缩放到设备实际分辨率
    tempCtx.drawImage(canvasElement.value, 0, 0, LCD_WIDTH, LCD_HEIGHT);

    // 获取缩放后的图像数据
    let imageData = tempCtx.getImageData(0, 0, LCD_WIDTH, LCD_HEIGHT);

    // 转换为 RGB565 格式
    let rgb565 = convertRgb888ToRgb565(imageData);

    // 压缩数据
    let hexUse = (
      isUseNewDisplayDataConvertFunction.value ?
      convertDisplayData(rgb565) :
      convertDisplayDataLegacy(rgb565)
    );

    // 设置显示区域
    await lcdSetDisplaySend(0, 0, LCD_WIDTH, LCD_HEIGHT);

    // 发送数据到设备
    await sendData(hexUse);

  }

  // 循环发送
  sendAnimationId = requestAnimationFrame(sendCanvas);

}

/** 发送数据到设备 */
async function sendData(dataArray = []) {

  if (!serialWriter) {
    return;
  }

  try {
    let data = new Uint8Array(dataArray);
    await serialWriter.write(data);
    console.debug('发送数据成功:', dataArray.length, '字节');
  } catch (error) {
    console.error('发送数据失败:', error);
  }

}

/** 发送文本到设备 */
async function sendText(text = '') {

  if (!serialWriter) {
    return;
  }

  try {

    // 构建消息
    let data = new Uint8Array(text.length + 1);

    // 添加消息头
    data[0] = 0x00;

    // 处理消息内容
    for (let i = 0; i < text.length; i++) {
      data[i + 1] = text.charCodeAt(i);
    }

    await serialWriter.write(data);

    console.debug('发送文本成功:', text);

  } catch (error) {
    console.error('发送文本失败:', error);
  }

}

/** 循环渲染画布内容 */
async function renderCanvas(timestamp = 0) {

  // 限制渲染频率
  if (timestamp - lastRenderTime >= renderInterval.value) {

    // 更新时间戳
    lastRenderTime = timestamp;

    // 更新画布内容
    switch (displayMode.value) {
      case 'audioSpectrum':
        await renderAudioSpectrum();
        break;
      case 'audioVisualizer1':
        await renderAudioVisualizer1();
        break;
      case 'audioVisualizer2':
        await renderAudioVisualizer2();
        break;
      case 'dataText':
        await renderDataText();
        break;
      case 'digitalClock':
        await renderDigitalClock();
        break;
      default:
        break;
    }

  }

  // 循环渲染
  renderAnimationId = requestAnimationFrame(renderCanvas);

}

/** 渲染音频频谱内容 */
async function renderAudioSpectrum() {

  // 初始化音频
  if (!isAudioReady) {
    await audioAnalyserStart();
  }

  // 清空画布
  canvasCtx.value.fillStyle = '#000000';
  canvasCtx.value.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  if (!audioAnalyser) {
    await renderCustomText('音频未初始化');
    return;
  }

  // 获取频谱数据
  audioAnalyser.getByteFrequencyData(audioDataArray);

  // 计算柱状图宽度和间距
  let barWidth = (CANVAS_WIDTH / audioBufferLength) * 2.5;
  let x = 0;

  // 绘制频谱柱状图
  for (let i = 0; i < audioBufferLength; i++) {

    // 计算柱状图高度
    let barHeight = (audioDataArray[i] / 255) * CANVAS_HEIGHT;

    // 生成渐变颜色
    let r = Math.floor((i / audioBufferLength) * 255);
    let g = Math.floor((audioDataArray[i] / 255) * 255);
    let b = 150;

    canvasCtx.value.fillStyle = `rgb(${r}, ${g}, ${b})`;

    // 绘制柱状图
    canvasCtx.value.fillRect(x, CANVAS_HEIGHT - barHeight, barWidth, barHeight);

    // 移动到下一个柱状图位置
    x += barWidth + 1;

  }

}

/** 渲染音频可视化内容 */
async function renderAudioVisualizer1() {

  // 初始化音频
  if (!isAudioReady) {
    await audioAnalyserStart();
  }

  // 清空画布
  canvasCtx.value.fillStyle = '#000000';
  canvasCtx.value.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  if (!audioAnalyser) {
    await renderCustomText('音频未初始化');
    return;
  }

  // 获取频谱数据
  audioAnalyser.getByteFrequencyData(audioDataArray);

  // 计算圆心
  let centerX = CANVAS_WIDTH / 2;
  let centerY = CANVAS_HEIGHT / 2;

  // 基础半径
  let baseRadius = Math.min(CANVAS_WIDTH, CANVAS_HEIGHT) * 0.25;
  let maxRadiusOffset = Math.min(CANVAS_WIDTH, CANVAS_HEIGHT) * 0.2;

  // 获取绘制点数量
  let pointSum = Math.min(audioBufferLength, 64);

  canvasCtx.value.beginPath();

  // 绘制一个声波圆环
  for (let i = 0; i <= pointSum; i++) {

    let index = i % pointSum;
    let angle = (index / pointSum) * Math.PI * 2 - Math.PI / 2;

    let value = audioDataArray[index];
    let radiusOffset = (value / 255) * maxRadiusOffset;

    let radius = baseRadius + radiusOffset;
    let x = centerX + Math.cos(angle) * radius;
    let y = centerY + Math.sin(angle) * radius;

    if (i === 0) {
      canvasCtx.value.moveTo(x, y);
    } else {
      canvasCtx.value.lineTo(x, y);
    }

  }

  canvasCtx.value.closePath();
  canvasCtx.value.strokeStyle = '#00FF88';
  canvasCtx.value.lineWidth = 2;
  canvasCtx.value.stroke();

  let dataSum = 0;

  for (let i = 0; i < audioBufferLength; i++) {
    dataSum += audioDataArray[i];
  }

  // 计算平均音量
  let avgVolume0 = dataSum / audioBufferLength;
  let avgVolume1 = avgVolume0 / 255;

  // 计算中心圆形半径（音量越高，圆形越大）
  let centerCircleRadius = Math.min(CANVAS_WIDTH, CANVAS_HEIGHT) * 0.05 + avgVolume1 * Math.min(CANVAS_WIDTH, CANVAS_HEIGHT) * 0.15;

  // 绘制中心圆形
  canvasCtx.value.beginPath();
  canvasCtx.value.arc(centerX, centerY, centerCircleRadius, 0, Math.PI * 2);
  canvasCtx.value.fillStyle = `rgba(0, 255, 136, ${0.2 + avgVolume1 * 0.8})`;
  canvasCtx.value.fill();
  canvasCtx.value.strokeStyle = '#00FF88';
  canvasCtx.value.lineWidth = 2;
  canvasCtx.value.stroke();

  // 绘制外层圆形
  canvasCtx.value.beginPath();
  canvasCtx.value.arc(centerX, centerY, baseRadius - 2, 0, Math.PI * 2);
  canvasCtx.value.strokeStyle = '#004422';
  canvasCtx.value.lineWidth = 1;
  canvasCtx.value.stroke();

  // 绘制线段
  canvasCtx.value.beginPath();
  canvasCtx.value.strokeStyle = '#00CCFF';
  canvasCtx.value.lineWidth = 2;
  // 上
  canvasCtx.value.moveTo(0, 1);
  canvasCtx.value.lineTo(avgVolume1 * CANVAS_WIDTH, 1);
  canvasCtx.value.stroke();
  // 右
  canvasCtx.value.moveTo(CANVAS_WIDTH - 4, 0);
  canvasCtx.value.lineTo(CANVAS_WIDTH - 4, avgVolume1 * CANVAS_HEIGHT);
  canvasCtx.value.stroke();
  // 下
  canvasCtx.value.moveTo(CANVAS_WIDTH, CANVAS_HEIGHT - 1);
  canvasCtx.value.lineTo(CANVAS_WIDTH - avgVolume1 * CANVAS_WIDTH, CANVAS_HEIGHT - 1);
  canvasCtx.value.stroke();
  // 左
  canvasCtx.value.moveTo(4, CANVAS_HEIGHT);
  canvasCtx.value.lineTo(4, CANVAS_HEIGHT - avgVolume1 * CANVAS_HEIGHT);
  canvasCtx.value.stroke();

}

/** 渲染音频可视化内容 */
async function renderAudioVisualizer2() {

  // 初始化音频
  if (!isAudioReady) {
    await audioAnalyserStart();
  }

  // 清空画布
  canvasCtx.value.fillStyle = '#000000';
  canvasCtx.value.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  if (!audioAnalyser) {
    await renderCustomText('音频未初始化');
    return;
  }

  // 获取频谱数据
  audioAnalyser.getByteFrequencyData(audioDataArray);

  // 频谱粒子矩阵
  let cols = 20;
  let rows = 10;
  let padding = 10;
  let cellWidth = (CANVAS_WIDTH - padding * 2) / cols;
  let cellHeight = (CANVAS_HEIGHT - padding * 2) / rows;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {

      let x = padding + col * cellWidth + cellWidth / 2;
      let y = padding + row * cellHeight + cellHeight / 2;

      let dataIndex = Math.floor((col / cols) * audioBufferLength);
      let value = audioDataArray[dataIndex];

      let threshold = (rows - 1 - row) / rows;
      let normalizedValue = value / 255;

      if (normalizedValue > threshold) {

        let size = cellHeight * 0.35;
        let brightness = normalizedValue;

        canvasCtx.value.beginPath();
        canvasCtx.value.arc(x, y, size, 0, Math.PI * 2);
        canvasCtx.value.fillStyle = `rgba(0, 255, 255, ${0.2 + brightness * 0.8})`;
        canvasCtx.value.fill();

      }

    }
  }

}

/** 渲染自定义文本 */
async function renderCustomText(text = '') {
  canvasCtx.value.fillStyle = '#000000';
  canvasCtx.value.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  canvasCtx.value.fillStyle = '#FFFFFF';
  canvasCtx.value.font = '16px Arial';
  canvasCtx.value.textAlign = 'center';
  canvasCtx.value.fillText(text, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
}

/** 渲染数据文本内容 */
async function renderDataText() {

  // 更新画布内容
  dataTextRender.createDisplayImage();

}

/** 渲染数字时钟内容 */
async function renderDigitalClock() {

  // 清空画布
  canvasCtx.value.fillStyle = '#000000';
  canvasCtx.value.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // 获取当前时间
  let date = new Date();
  let hours = String(date.getHours()).padStart(2, '0');
  let minutes = String(date.getMinutes()).padStart(2, '0');
  let seconds = String(date.getSeconds()).padStart(2, '0');

  // 计算字体大小，确保不超出画布
  let padding = 10;
  let fontSize = Math.floor((CANVAS_HEIGHT - padding * 2) / 3);
  let timeFont = `${fontSize}px monospace`;
  let timeText = `${hours}:${minutes}:${seconds}`;

  // 绘制时间
  canvasCtx.value.font = timeFont;
  canvasCtx.value.textAlign = 'center';
  canvasCtx.value.textBaseline = 'middle';
  canvasCtx.value.fillStyle = '#FFFFFF';
  canvasCtx.value.fillText(timeText, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

}

onMounted(() => {
  initData();
});

onBeforeUnmount(() => {
  handleDisconnectDevice();
  handleStopRender();
});
</script>

<style lang="less" scoped>
.actions {
  .n-flex:not(:first-child) {
    margin-top: 10px;
  }
}

.config-form {
  .n-form-item {
    max-width: 400px;
  }

  .n-input-number {
    width: 100%;
  }
}

.canvas-container {
  canvas {
    max-width: 100%;
  }
}
</style>
