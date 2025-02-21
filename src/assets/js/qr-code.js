import {
  prepareZXingModule,
  readBarcodes,
  writeBarcode,
} from 'zxing-wasm/full';

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
  scale: 1,
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
export function blobToDataURL(blob, callback) {

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
 * @description 将 SVG 字符串渲染到 Canvas
 * @param   {object}            options
 * @param   {HTMLCanvasElement} options.canvas
 * @param   {string}            options.svgString
 * @param   {number}            options.drawLeft
 * @param   {number}            options.drawTop
 * @param   {number}            options.drawWidth
 * @param   {number}            options.drawHeight
 * @returns {Promise<boolean>}
 */
function renderSvgToCanvas(options) {

  let {
    canvas, svgString,
    drawLeft = 0, drawTop = 0,
    drawWidth = 0, drawHeight = 0,
  } = options;

  return new Promise((resolve) => {

    let svgBlob = new Blob([svgString], {
      type: 'image/svg+xml;charset=utf-8',
    });
    let svgUrl = URL.createObjectURL(svgBlob);
    let image = new Image();

    image.onerror = () => {
      console.error('加载 SVG 失败');
      URL.revokeObjectURL(svgUrl);
      resolve(false);
    };

    image.onload = () => {
      let ctx = canvas.getContext('2d');
      ctx.drawImage(image, drawLeft, drawTop, drawWidth, drawHeight);
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
      console.error('解析二维码失败：读取图片失败');
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
      console.warn('解析二维码失败：未识别到内容');
      return returns;
    } else {
      console.debug('解析二维码成功：', resultList);
    }

    for (let i = 0; i < resultList.length; i++) {

      let item = resultList[i];

      textList.push(item.text);

    }

    return returns;

  }).catch((error) => {
    console.error('解析二维码失败：');
    console.error(error);
    returns.error = String(error);
    return returns;
  });;

}

/**
 * @description 生成二维码图片
 * @param {object} options
 * @param {string} options.content
 * @param {number} options.width
 * @param {number} options.height
 * @returns 二维码图片 DataURL
 */
export function writeQrCodeImage(options = {}) {

  let { content = '', width = 256, height = 256 } = options;

  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');

  // 更新画布大小
  canvas.width = width;
  canvas.height = height;

  // 设置背景颜色
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  return writeBarcode(content, writerOptions).then((result) => {

    console.debug('生成二维码', result);

    if (result.error) {
      console.error(`生成二维码失败：${result.error}`);
      return '';
    } else {
      return result.svg;
    }

  }).then((svgString) => {
    if (svgString) {
      return renderSvgToCanvas({
        canvas: canvas,
        svgString: svgString,
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
    console.error('生成二维码失败：');
    console.error(error);
    return '';
  });

}
