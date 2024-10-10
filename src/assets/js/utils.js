// 工具函数

import {
  description as appDesc,
} from '@package-json';

/** 将十六进制颜色值转为灰度值 */
export function colorHexToGrayLevel(hex = '') {

  let rgb = colorHexToRgb(hex);

  return Math.round(rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114);

}

/** 将十六进制颜色值转为 RGB */
export function colorHexToRgb(hex = '') {

  // 去除可能存在的 '#' 字符
  hex = hex.replace('#', '');

  // 检查十六进制颜色值的长度，并根据长度决定如何处理
  if (hex.length === 3) {
    // 如果是简写形式，如 #FFF，需要将其转换为完整形式 #FFFFFF
    hex = hex.split('').map(char => char + char).join('');
  }

  // 分别解析出红色、绿色和蓝色的值
  let r = parseInt(hex.slice(0, 2), 16);
  let g = parseInt(hex.slice(2, 4), 16);
  let b = parseInt(hex.slice(4, 6), 16);

  return { r, g, b };

}

/**
 * @description 更新页面标题
 * @param {string} title
 */
export function updateAppTitle(title = '') {
  document.title = (title ? `${title} - ${appDesc}` : appDesc);
}
