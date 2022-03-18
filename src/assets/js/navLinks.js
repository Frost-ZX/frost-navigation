import { Notification } from 'element-ui';

/** 初始化导航链接数据，设置唯一 ID */
const fnInit = function () {
    let index = 0;
    function fn(obj) {
        // 更新
        index += 1;
        // 设置 ID
        obj.id = index;
        // 递归
        if (obj.items) {
            obj.items.forEach((item) => {
                fn(item);
            });
        }
    }
    return fn;
};

const datas = {
    list: [],
    version: '',
};

(function () {

    const el = document.createElement('script');

    // 加载失败
    el.onerror = function () {
        Notification.error({
            title: '错误',
            message: '导航链接载入失败',
            duration: 0
        });
    };

    // 加载成功
    el.onload = function () {

        const { frostNavLinks } = window;

        // 属性不存在
        if (typeof frostNavLinks === 'undefined') {
            Notification.error({
                title: '错误',
                message: '导航链接载入失败',
                duration: 0
            });
            return;
        }

        const {
            list: navList,
            version: navVersion,
        } = frostNavLinks;

        const init = fnInit();

        // 初始化
        navList.forEach((item) => {
            init(item);
        });

        datas.list = navList;
        datas.version = navVersion;

    };

    el.setAttribute('type', 'text/javascript');
    el.setAttribute('src', 'static/js/frostNavLinks.js');

    document.body.appendChild(el);

})();

export default datas;
