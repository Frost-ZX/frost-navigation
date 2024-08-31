// 模块显示配置

import { IS_DEV } from './env';

/** 启用“MINECRAFT 联动控制”模块 */
export const ENABLE_MC_CTRL_MODULE = IS_DEV;

/** 启用“导航”模块 */
export const ENABLE_NAV_MODULE = IS_DEV;

/** 启用“搜索”模块 */
export const ENABLE_SEARCH_MODULE = true;

/** 启用“工具箱”模块 */
export const ENABLE_TOOLBOX_MODULE = IS_DEV;
