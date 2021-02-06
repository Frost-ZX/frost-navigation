import { Loading } from 'element-ui';

class Utils {

    constructor() { }

    /**
     * 初始化链接列表，设置唯一ID
     */
    initNavLinkID() {
        // 加载中提示
        var loading = Loading.service({
            customClass: 'loading-link',
            lock: true,
            spinner: 'el-icon-loading',
            text: '载入中，请稍候'
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
                obj.links.forEach(item => {
                    // 添加到子路径（适配 Element UI - Tree）
                    obj.sub.push(item);
                });
            }

            // 递归
            if (obj.sub != undefined) {
                obj.sub.forEach(item => {
                    setTimeout(() => {
                        fn(item);
                    }, 0);
                });
            }
        };

        // 检测 currentIndex 是否已停止变化
        var timer = setInterval(() => {
            if (currentIndex == currentIndexCpy) {
                clearInterval(timer);
                // 加载中提示
                loading.close();
            }

            // 同步
            currentIndexCpy = currentIndex;
        }, 1000);

        return fn;
    }

}

const utils = new Utils;

export default utils;
