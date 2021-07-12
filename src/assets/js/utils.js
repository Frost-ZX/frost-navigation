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

    /**
     * JSONP
     * 
     * @param {object} options 配置选项
     */
    jsonp(options) {
        var config = {
            url: '',
            cbName: 'cb',
            cbFunc: function (data) {
                console.log('[JSONP]', data);
            },
        };
        var scriptElem = document.createElement('script');

        Object.assign(config, options);
        window[config.cbName] = config.cbFunc;

        scriptElem.addEventListener('load', function () {
            this.remove();
        });
        scriptElem.setAttribute('src', config.url);

        document.body.appendChild(scriptElem);
    }

}

const utils = new Utils;

export default utils;
