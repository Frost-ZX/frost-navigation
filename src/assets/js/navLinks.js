import { Loading, Notification } from 'element-ui';

let datas = {
    // 链接数据（初始化后）
    list: [],
    // 版本信息
    version: ''
};

// 链接数据（初始化前）
let navLinks = [];

let utils = {

    /**
     * 初始化导航链接数据
     * 设置唯一 ID & 改变结构
     */
    init: function () {
        // 初始化提示
        var loading = Loading.service({
            customClass: 'loading-link',
            lock: true,
            spinner: 'el-icon-loading',
            text: ''
        });

        var currentIndex = 0;
        var currentIndexCpy = 0;

        var fn = (obj) => {
            currentIndex += 1;
            obj.id = currentIndex;

            // 有链接
            if (obj.links != undefined) {
                // 无子分类
                if (obj.sub === undefined) {
                    obj.sub = [];
                }

                obj.links.forEach((item, index, arr) => {
                    // 添加到子分类（适配 Element UI - Tree）
                    try {
                        obj.sub.push(item);
                    } catch (err) {
                        console.warn('[添加链接到 sub]', err);
                        console.warn('[出错的 obj]', obj);
                    }

                    // 到达最后一项，删除 links 自身
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
                    }, 2 * currentIndex);
                });
            }

            // 提示文本
            loading.text = `初始化导航链接，请稍候 [${currentIndex}]`;
        };

        // 检测 currentIndex 是否已停止变化
        var timer = setInterval(() => {
            if (currentIndexCpy === currentIndex) {
                // 停止检测
                clearInterval(timer);

                // 日志
                console.log('[导航链接] 初始化完毕');

                // 关闭提示
                loading.close();

                // 更新
                datas.list = JSON.parse(JSON.stringify(navLinks));

                // 写入缓存
                setTimeout(() => {
                    this.cache('W', navLinks);
                }, 1000);
            }

            // 同步
            currentIndexCpy = currentIndex;
        }, 5000);

        return fn;
    },

    /**
    * 导航链接数据缓存
    * 
    * @param {string} mode 模式（读 - R，写 - W）
    * @param {array} list 写入的导航链接数据（模式为“W”时）
    * 
    * @returns {object} 缓存为最新时 status 为 1，否则为 0；list 为缓存中的导航链接数据。
    */
    cache: function (mode, list) {
        var datasCacheStr;
        var datasCache = {};
        var datasCurrent = {};

        if (mode === 'R') {

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

            // 链接数据为空
            if (datasCache.list === undefined || datasCache.list.length === 0) {
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

        } else if (mode === 'W') {

            datasCurrent.version = datas.version;
            datasCurrent.list = list;

            // 写入缓存
            localStorage.setItem('navLinksCache', JSON.stringify(datasCurrent));

        }
    }

};

// 读取链接数据
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
        if (cache.status === 1) {
            datas.list = cache.list;
            return;
        }

        let init = utils.init();

        // 初始化
        navLinks.forEach(item => {
            init(item);
        });
    };

    scriptElem.setAttribute('type', 'text/javascript');
    scriptElem.setAttribute('src', 'static/js/frostNavLinks.js');

    document.body.appendChild(scriptElem);

})();

export default datas;
