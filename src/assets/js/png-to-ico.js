/** PNG 转 ICO 图标，支持生成多尺寸 ICO */
class PNGtoICOConverter {

  /**
   * @description 将 PNG 图像转换为 ICO 格式
   * @param   {File|Blob|string} source PNG 文件、Blob 或 DataURL
   * @param   {number[]}         sizes  需要生成的尺寸数组，默认 `[32, 128, 256]`
   * @returns {Promise<Blob>} ICO 文件的 Blob 对象
   */
  static async convert(source, sizes = [32, 128, 256]) {
    try {

      // 1. 加载 PNG 图像
      let pngBlob = await this._preparePNG(source);
      let imageBitmap = await createImageBitmap(pngBlob);

      // 2. 创建各尺寸的图像
      let imageDatas = await this._createMultiSizeImages(imageBitmap, sizes);

      // 3. 生成 ICO 文件
      let icoBlob = await this._generateICO(imageDatas);

      return icoBlob;

    } catch (error) {
      throw new Error(`PNG 转 ICO 失败: ${error.message}`);
    }
  }

  /**
   * @description 准备 PNG 源数据
   * @private
   */
  static async _preparePNG(source) {

    if (source instanceof File || source instanceof Blob) {
      return source;
    }

    if (typeof source === 'string') {
      if (source.startsWith('data:image/png')) {
        const response = await fetch(source);
        return await response.blob();
      } else {
        throw new Error('不支持的数据格式，仅支持 PNG 文件、Blob 或 DataURL');
      }
    }

    throw new Error('无效的输入类型');

  }

  /**
   * @description 创建多尺寸图像数据
   * @private
   */
  static async _createMultiSizeImages(imageBitmap, sizes) {

    let results = [];

    for (let size of sizes) {

      // 按尺寸创建 Canvas
      let canvas = document.createElement('canvas');

      canvas.width = size;
      canvas.height = size;

      let ctx = canvas.getContext('2d');

      // 设置高质量缩放
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // 绘制缩放后的图像
      ctx.drawImage(imageBitmap, 0, 0, size, size);

      // 获取 PNG 数据
      let pngBlob = await new Promise(resolve => {
        canvas.toBlob(resolve, 'image/png');
      });

      let arrayBuffer = await pngBlob.arrayBuffer();

      results.push({
        size,
        width: size,
        height: size,
        data: new Uint8Array(arrayBuffer),
        pngSize: arrayBuffer.byteLength
      });

    }

    return results;

  }

  /**
   * @description 生成 ICO 文件
   * @private
   */
  static async _generateICO(imageDatas) {

    // ICO 文件结构：
    // 1. ICONDIR 头 (6 字节)
    // 2. ICONDIRENTRY 数组 (每个 16 字节)
    // 3. PNG 数据

    let numImages = imageDatas.length;

    // 计算总大小
    let totalSize = 6; // ICONDIR 头
    totalSize += numImages * 16; // ICONDIRENTRY 数组
    totalSize += imageDatas.reduce((sum, img) => sum + img.pngSize, 0);

    // 创建 ArrayBuffer
    let buffer = new ArrayBuffer(totalSize);
    let view = new DataView(buffer);
    let offset = 0;

    // 1. 写入 ICONDIR 头
    view.setUint16(offset, 0, true); // Reserved (0)
    offset += 2;
    view.setUint16(offset, 1, true); // Type (1 for ICO)
    offset += 2;
    view.setUint16(offset, numImages, true); // Number of images
    offset += 2;

    // 2. 写入 ICONDIRENTRY 数组
    let dataOffset = 6 + (numImages * 16);

    for (let img of imageDatas) {

      // 宽度和高度 (0 表示 256 像素)
      view.setUint8(offset, img.width === 256 ? 0 : img.width);
      offset += 1;
      view.setUint8(offset, img.height === 256 ? 0 : img.height);
      offset += 1;

      view.setUint8(offset, 0); // Color palette (0 for no palette)
      offset += 1;
      view.setUint8(offset, 0); // Reserved
      offset += 1;

      view.setUint16(offset, 1, true); // Color planes
      offset += 2;
      view.setUint16(offset, 32, true); // Bits per pixel
      offset += 2;

      view.setUint32(offset, img.pngSize, true); // PNG data size
      offset += 4;
      view.setUint32(offset, dataOffset, true); // PNG data offset
      offset += 4;

      dataOffset += img.pngSize;

    }

    // 3. 写入 PNG 数据
    for (let img of imageDatas) {
      let uint8View = new Uint8Array(buffer, offset, img.pngSize);
      uint8View.set(img.data);
      offset += img.pngSize;
    }

    return new Blob([buffer], { type: 'image/x-icon' });

  }

  /**
   * @description 下载 ICO 文件
   * @param {Blob}   icoBlob  ICO 文件的 Blob 对象
   * @param {string} filename 下载的文件名
   */
  static download(icoBlob, filename = 'icon.ico') {

    let url = URL.createObjectURL(icoBlob);
    let a = document.createElement('a');

    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

  }

}

/**
 * @description 将 PNG 转换为 ICO 并下载
 * @param {File|Blob|string} source   PNG 文件、Blob 或 DataURL
 * @param {number[]}         sizes    需要生成的尺寸数组
 * @param {string}           filename 下载的文件名
 */
export async function convertPNGtoICO(source, sizes, filename) {
  try {
    let blob = await PNGtoICOConverter.convert(source, sizes);
    PNGtoICOConverter.download(blob, filename);
    return { blob: blob, error: '', success: true };
  } catch (error) {
    console.error('转换失败：', error);
    return { blob: null, error: error.message, success: false };
  }
}
