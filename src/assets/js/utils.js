import config from './config.js';

class Utils {

    constructor() { }

    /**
     * 改变网页标题
     * 
     * @param {string} [value] 新的标题
     */
    changeTitle(value) {
        document.title = (value ? (value + ' - ') : '') + config.siteName;
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
        var el = document.createElement('script');

        Object.assign(config, options);
        window[config.cbName] = config.cbFunc;

        el.addEventListener('load', function () {
            this.remove();
        });
        el.setAttribute('src', config.url);

        document.body.appendChild(el);
    }

    /**
     * 以文本方式读取文件（异步）
     * 
     * @param {Event} ev 输入框 change 事件对象
     * @param {boolean} resetValue 是否自动重置输入框 value 属性
     * 
     * @returns {Promise<string[]>} `{ name: 文件名, content: 文件内容 }`
     */
    readFileAsText(ev, resetValue) {
        const blank = [];

        /** @type {HTMLInputElement} */
        const el = ev.currentTarget;

        /** @type {FileList} */
        const files = el.files;

        if (!files || files.length === 0) {
            return Promise.resolve(blank);
        }

        const fnProc = (procResolve, procReject) => {
            const reads = [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                const fnRead = (readResolve, readReject) => {
                    // 成功
                    reader.onload = () => {
                        readResolve(reader.result);
                    };
                    // 失败
                    reader.onerror = () => {
                        readReject('');
                    };
                    // 读取
                    reader.readAsText(file);
                };

                reads.push(new Promise(fnRead));
            }

            Promise.all(reads).then((res) => {
                // [成功]
                procResolve(res);
                resetValue && el.setAttribute('value', '');
            }).catch(() => {
                // [失败]
                procReject(blank);
            });
        };

        return new Promise(fnProc);
    }

}

const utils = new Utils;

export default utils;
