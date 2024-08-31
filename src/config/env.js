// 环境变量

/** 环境变量信息 */
const ENV = import.meta.env;

/** 是否为开发环境 */
export const IS_DEV = ENV.DEV;

/** 是否为生产环境 */
export const IS_PROD = ENV.PROD;
