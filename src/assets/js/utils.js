// 工具函数

import {
  description as appDesc,
} from '@package-json';

/**
 * @description 更新页面标题
 * @param {string} title
 */
export function updateAppTitle(title = '') {
  document.title = (title ? `${title} - ${appDesc}` : appDesc);
}
