import {
  prepareZXingModule,
  readBarcodes,
  writeBarcode,
} from 'zxing-wasm/full';

/** 默认背景颜色 */
const DEFAULT_BGC = 'transparent';

/** 默认前景颜色 */
const DEFAULT_FGC = '#000000';

/** 模块名称 */
const PREFIX = '[qr-code]';

/**
 * @desc 二维码读取配置选项
 * @type { import('zxing-wasm').ReaderOptions }
 */
const readerOptions = {
  formats: ['QRCode'],
  maxNumberOfSymbols: 8,
  textMode: 'Plain',
  tryDownscale: true,
  tryHarder: true,
  tryInvert: true,
  tryRotate: true,
};

/**
 * @desc 二维码生成配置选项
 * @type { import('zxing-wasm').WriterOptions }
 */
const writerOptions = {
  ecLevel: '',
  format: 'QRCode',
  scale: 0,
};

// 配置 wasm 文件路径
prepareZXingModule({
  overrides: {
    locateFile: (path, prefix) => {
      if (path.endsWith('.wasm')) {
        return `./wasm/${path}`;
      } else {
        return (prefix + path);
      }
    },
  },
});

/**
 * @description 转换 Blob 为 DataURL
 * @param {Blob}     blob
 * @param {Callback} callback
 */
function blobToDataURL(blob, callback) {

  /** @typedef {(data: { error: boolean, result: string }) => void} Callback */

  let reader = new FileReader();

  reader.onerror = function () {
    callback({
      error: true,
      result: reader.result,
    });
  };

  reader.onload = function () {
    callback({
      error: false,
      result: reader.result,
    });
  };

  reader.readAsDataURL(blob);

}

/**
 * @description 修改 SVG 内容，获取信息
 * @param {object} options
 * @param {string} options.background
 * @param {string} options.foreground
 * @param {string} options.svgString
 */
function modifySvgContent(options) {

  let {
    background = DEFAULT_BGC,
    foreground = DEFAULT_FGC,
    svgString,
  } = options;

  let divElement = document.createElement('div');
  let gElement = null;
  let pathElement = null;
  let rectElement = null;
  let svgElement = null;

  // 添加 DOM 元素，用于获取位置大小信息
  document.body.appendChild(divElement);

  divElement.innerHTML = svgString;
  gElement = divElement.getElementsByTagName('g')[0] || null;
  pathElement = divElement.getElementsByTagName('path')[0] || null;
  rectElement = divElement.getElementsByTagName('rect')[0] || null;
  svgElement = divElement.getElementsByTagName('svg')[0] || null;

  if (!(gElement && pathElement && rectElement && svgElement)) {
    return null;
  }

  // 修改填充颜色
  gElement.setAttribute('fill', foreground);
  rectElement.setAttribute('fill', background);

  // 获取位置大小信息
  let rectOfG = gElement.getBoundingClientRect();
  let rectOfPath = pathElement.getBoundingClientRect();

  let offsetX = Math.round(rectOfPath.left - rectOfG.left);
  let offsetY = Math.round(rectOfPath.top - rectOfG.top);
  let sizeW = Math.round(rectOfPath.width);
  let sizeH = Math.round(rectOfPath.height);
  let result = {
    offsetX: offsetX,
    offsetY: offsetY,
    sizeW: sizeW,
    sizeH: sizeH,
    svgString: divElement.innerHTML,
  };

  // 输出处理结果
  console.debug(PREFIX, '处理 SVG', result);

  // 处理完成，移除 DOM 元素
  document.body.removeChild(divElement);

  return result;

}

/**
 * @description 将 SVG 字符串渲染到 Canvas
 * @param   {object}            options
 * @param   {HTMLCanvasElement} options.canvas
 * @param   {string}            options.svgString
 * @param   {string}            options.background
 * @param   {string}            options.foreground
 * @param   {number}            options.drawLeft
 * @param   {number}            options.drawTop
 * @param   {number}            options.drawWidth
 * @param   {number}            options.drawHeight
 * @returns {Promise<boolean>}
 */
function renderSvgToCanvas(options) {

  let {
    canvas, svgString,
    background = DEFAULT_BGC, foreground = DEFAULT_FGC,
    drawLeft = 0, drawTop = 0,
    drawWidth = 0, drawHeight = 0,
  } = options;

  let svgInfo = modifySvgContent({
    background: background,
    foreground: foreground,
    svgString: svgString,
  });

  if (!svgInfo) {
    return Promise.resolve(false);
  }

  return new Promise((resolve) => {

    let svgBlob = new Blob([svgInfo.svgString], {
      type: 'image/svg+xml;charset=utf-8',
    });
    let svgUrl = URL.createObjectURL(svgBlob);
    let image = new Image();

    image.onerror = () => {
      console.error(PREFIX, '加载 SVG 失败');
      URL.revokeObjectURL(svgUrl);
      resolve(false);
    };

    image.onload = () => {
      let ctx = canvas.getContext('2d');
      ctx.drawImage(
        image,
        svgInfo.offsetX, svgInfo.offsetY, svgInfo.sizeW, svgInfo.sizeH,
        drawLeft, drawTop, drawWidth, drawHeight,
      );
      URL.revokeObjectURL(svgUrl);
      resolve(true);
    };

    image.src = svgUrl;

  });
}

/**
 * @description 解析二维码图片
 * @param {Blob} image 图片二进制
 */
export function readQrCodeImage(image) {

  /**
   * @desc 返回结果
   * @type {{ error: string; image: string; textList: string[]; }}
   */
  let returns = {
    error: '',
    image: '',
    textList: [],
  };

  /** 读取图片，转换为 DataURL */
  let fileReader = new FileReader();

  return new Promise((resolve) => {

    // 处理读取异常
    fileReader.onerror = function () {
      console.error(PREFIX, '解析二维码失败：读取图片失败');
      returns.error = '读取图片失败';
      resolve('');
    };

    // 处理读取完成
    fileReader.onload = function () {
      resolve(fileReader.result);
    };

    // 开始读取
    fileReader.readAsDataURL(image);

  }).then((dataURL) => {
    if (dataURL) {
      returns.image = dataURL;
      return readBarcodes(image, readerOptions);
    } else {
      return null;
    }
  }).then((resultList) => {

    let textList = returns.textList;

    if (resultList.length === 0) {
      console.warn(PREFIX, '解析二维码失败：未识别到内容');
      return returns;
    } else {
      console.debug(PREFIX, '解析二维码成功：', resultList);
    }

    for (let i = 0; i < resultList.length; i++) {

      let item = resultList[i];

      textList.push(item.text);

    }

    return returns;

  }).catch((error) => {
    console.error(PREFIX, '解析二维码失败：');
    console.error(error);
    returns.error = String(error);
    return returns;
  });;

}

/**
 * @description 生成二维码图片
 * @param {object} options
 * @param {string} options.content
 * @param {string} options.background
 * @param {string} options.foreground
 * @param {number} options.width
 * @param {number} options.height
 * @returns 二维码图片 DataURL
 */
export function writeQrCodeImage(options = {}) {

  let {
    content = '',
    background = DEFAULT_BGC, foreground = DEFAULT_FGC,
    width = 256, height = 256,
  } = options;

  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');

  // 更新画布大小
  canvas.width = width;
  canvas.height = height;

  // 设置背景颜色
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);

  return writeBarcode(content, writerOptions).then((result) => {

    console.debug(PREFIX, '生成二维码', result);

    if (result.error) {
      console.error(PREFIX, `生成二维码失败：${result.error}`);
      return '';
    } else {
      return result.svg;
    }

  }).then((svgString) => {
    if (svgString) {
      return renderSvgToCanvas({
        canvas: canvas,
        svgString: svgString,
        background: background,
        foreground: foreground,
        drawLeft: 0,
        drawTop: 0,
        drawWidth: width,
        drawHeight: height,
      });
    } else {
      return false;
    }
  }).then((success) => {

    if (success) {
      return canvas.toDataURL('image/png');
    } else {
      return '';
    }

  }).catch((error) => {
    console.error(PREFIX, '生成二维码失败：');
    console.error(error);
    return '';
  });

}
