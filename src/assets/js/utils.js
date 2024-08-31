// 工具函数

import {
  description as appDesc,
} from '@package-json';

/** 当前模块 URL */
const META_URL = import.meta.url;

/**
 * @description 获取资源文件 URL
 * @param {string} path 文件相对于 assets 目录的路径
 */
export function getAssetsUrl(path = '') {
  return new URL(`../${path}`, META_URL).href;
}

/**
 * @description 更新页面标题
 * @param {string} title
 */
export function updateAppTitle(title = '') {
  document.title = (title ? `${title} - ${appDesc}` : appDesc);
}
