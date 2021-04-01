import { Loading, Notification } from 'element-ui';

let datas = {
    // 列表（初始化后）
    list: [],
    // 版本号
    version: 0
};

// 列表（初始化前）
let navLinks = [];

let utils = {
    /**
     * 初始化导航链接列表
     * 设置唯一 ID & 改变结构
     */
    init: function () {
        // 载入中提示
        var loading = Loading.service({
            customClass: 'loading-link',
            lock: true,
            spinner: 'el-icon-loading',
            text: '导航链接列表正在初始化，请稍候'
        });

        var currentIndex = 0;
        var currentIndexCpy = 0;

        var fn = (obj) => {
            currentIndex += 1;
            obj.id = currentIndex;

            // 有链接，无子路径
            if (obj.links != undefined && obj.sub === undefined) {
                obj.sub = [];
            }

            // 递归
            if (obj.links != undefined) {
                obj.links.forEach((item, index, arr) => {
                    // 添加到子路径（适配 Element UI - Tree）
                    obj.sub.push(item);

                    // 删除自身
                    if (index === (arr.length - 1)) {
                        delete obj.links;
                    }
                });
            }

            // 递归
            if (obj.sub != undefined) {
                obj.sub.forEach(item => {
                    setTimeout(() => {
                        fn(item);
                    }, 20 * currentIndex);
                });
            }
        };

        // 检测 currentIndex 是否已停止变化
        var timer = setInterval(() => {
            if (currentIndex == currentIndexCpy) {
                // 停止检测
                clearInterval(timer);

                // 日志
                console.log('[导航链接] 初始化完毕');

                // 关闭载入中提示
                loading.close();

                // 更新
                datas.list = navLinks;

                // 写入缓存
                setTimeout(() => {
                    this.cache('W', navLinks);
                }, 2 * currentIndex);
            }

            // 同步
            currentIndexCpy = currentIndex;
        }, 1000);

        return fn;
    },

    /**
    * 导航链接列表缓存
    * 
    * @param {string} mode 模式（读 - R，写 - W）
    * @param {array} list 写入的导航链接列表（模式为“W”时）
    * 
    * @returns {Object} 缓存为最新时 status 为 1，list 为缓存中的导航链接列表，否则 status 为 0。
    */
    cache: function (mode, list) {
        var datasCacheStr;
        var datasCache = {};
        var datasCurrent = {};

        if (mode == 'R') {

            // 读取缓存
            datasCacheStr = localStorage.getItem('navLinksCache');

            // 是否存在缓存
            if (datasCacheStr === null) {
                return {
                    status: 0
                };
            } else {
                datasCache = JSON.parse(datasCacheStr)
            }

            // 列表为空
            if (datasCache.list === undefined || datasCache.list.length == 0) {
                return {
                    status: 0
                };
            }

            // 版本号
            if (datasCache.version != datas.version) {
                return {
                    status: 0
                };
            } else {
                return {
                    status: 1,
                    list: datasCache.list
                };
            }

        } else if (mode == 'W') {

            datasCurrent.version = datas.version;
            datasCurrent.list = list;

            // 写入缓存
            localStorage.setItem('navLinksCache', JSON.stringify(datasCurrent));

        }
    }
};

// 读取链接列表
(function () {

    let scriptElem = document.createElement('script');

    scriptElem.onload = function () {
        // 属性不存在
        if (window.frostNavLinks === undefined) {
            Notification.error({
                title: '错误',
                message: '导航链接载入失败',
                duration: 0
            });
            return;
        }

        // 同步
        datas.version = window.frostNavLinks.version;
        navLinks = window.frostNavLinks.list;

        // 缓存
        let cache = utils.cache('R');

        // 缓存可以使用
        if (cache.status == 1) {
            datas.list = cache.list;
            return;
        }

        let init = utils.init();

        // 初始化
        navLinks.forEach(item => {
            init(item);
        });
    };

    scriptElem.type = 'text/javascript';
    scriptElem.src = 'static/js/frostNavLinks.js';

    document.body.appendChild(scriptElem);

})();

export default datas;
