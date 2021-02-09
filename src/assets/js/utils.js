import config from './config.js';

class Utils {

    constructor() { }

    /**
     * 改变网页标题
     * 
     * @param {string} value 新的标题
     */
    changeTitle(value) {
        if (value) {
            document.title = config.siteName + ' - '  + value;
        } else {
            document.title = config.siteName;
        }
    }

    /**
     * 输出日志
     * 
     * @param {string} type 日志类型（info、warn、error）
     * @param {string} title 日志标题
     * @param {any} datas 日志内容
     */
    log(type, title, ...datas) {
        if (type == 'info') {
            console.info(`[${title}]`, datas);
        } else if (type == 'warn') {
            console.warn(`[${title}]`, datas);
        } else if (type == 'error') {
            console.error(`[${title}]`, datas);
        }
    }

}

const utils = new Utils;

export default utils;
