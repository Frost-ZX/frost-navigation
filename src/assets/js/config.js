let config = {
    searchEngine: {
        default: '百度',
        list: [
            {
                name: '百度',
                desc: 'www.baidu.com',
                url: 'https://www.baidu.com/s?wd=%keyword%',
                show: true
            },
            {
                name: '必应',
                desc: 'cn.bing.com',
                url: 'https://cn.bing.com/search?q=%keyword%',
                show: true
            },
            {
                name: '秘迹',
                desc: 'mijisou.com',
                url: 'https://mijisou.com/?q=%keyword%',
                show: true
            },
            {
                name: '搜狗',
                desc: 'www.sogou.com',
                url: 'https://www.sogou.com/web?query=%keyword%',
                show: true
            },
            {
                name: '网易云音乐',
                desc: 'music.163.com',
                url: 'https://music.163.com/#/search/m/?s=%keyword%',
                show: true
            },
            {
                name: '站酷',
                desc: 'www.zcool.com.cn',
                url: 'https://www.zcool.com.cn/search/content?word=%keyword%',
                show: true
            },
            {
                name: '知乎',
                desc: 'www.zhihu.com',
                url: 'https://www.zhihu.com/search?type=content&q=%keyword%',
                show: true
            },
            {
                name: '360',
                desc: 'www.so.com',
                url: 'https://www.so.com/s?q=%keyword%',
                show: true
            },
            {
                name: 'AcFun',
                desc: 'www.acfun.cn',
                url: 'https://www.acfun.cn/search/?keyword=%keyword%',
                show: true
            },
            {
                name: 'bilibili',
                desc: 'search.bilibili.com',
                url: 'https://search.bilibili.com/all?keyword=%keyword%',
                show: true
            },
            {
                name: 'CSDN',
                desc: 'so.csdn.net',
                url: 'https://so.csdn.net/so/search/all?q=%keyword%',
                show: true
            },
            {
                name: 'GitHub',
                desc: 'github.com',
                url: 'https://github.com/search?q=%keyword%',
                show: true
            },
            {
                name: 'Google',
                desc: 'www.google.com',
                url: 'https://www.google.com/search?q=%keyword%',
                show: true
            },
            {
                name: 'Iconfont',
                desc: 'www.iconfont.cn',
                url: 'https://www.iconfont.cn/search/index?searchType=icon&q=%keyword%',
                show: true
            },
            {
                name: 'MDN',
                desc: 'developer.mozilla.org',
                url: 'https://developer.mozilla.org/zh-CN/search?q=%keyword%',
                show: true
            },
            {
                name: 'Yandex',
                desc: 'yandex.com',
                url: 'https://yandex.com/search/?text=%keyword%',
                show: true
            }
        ]
    }
};

export default config;
