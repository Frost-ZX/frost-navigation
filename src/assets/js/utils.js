import config from './config.js';

class Utils {

    constructor() { }

    /**
     * 改变网页标题
     * 
     * @param {string} [value] 新的标题
     */
    changeTitle(value) {
        if (value) {
            document.title = config.siteName + ' - ' + value;
        } else {
            document.title = config.siteName;
        }
    }

}

const utils = new Utils;

export default utils;
