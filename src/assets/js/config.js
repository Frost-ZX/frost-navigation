let config = {
    searchEngines: {
        search: {
            title: '搜索',
            list: [
                {
                    name: '百度',
                    desc: 'www.baidu.com',
                    url: 'https://www.baidu.com/s?wd=%keyword%',
                    icon: 'website/baidu.svg',
                    show: true
                },
                {
                    name: '必应',
                    desc: 'cn.bing.com',
                    url: 'https://cn.bing.com/search?q=%keyword%',
                    icon: 'website/bing.svg',
                    show: true
                },
                {
                    name: '秘迹',
                    desc: 'mijisou.com',
                    url: 'https://mijisou.com/?q=%keyword%',
                    icon: 'website/mijisou.svg',
                    show: true
                },
                {
                    name: '搜狗',
                    desc: 'www.sogou.com',
                    url: 'https://www.sogou.com/web?query=%keyword%',
                    icon: 'website/sogou.svg',
                    show: true
                },
                {
                    name: '360',
                    desc: 'www.so.com',
                    url: 'https://www.so.com/s?q=%keyword%',
                    icon: 'website/360.svg',
                    show: true
                },
                {
                    name: 'Google',
                    desc: 'www.google.com',
                    url: 'https://www.google.com/search?q=%keyword%',
                    icon: 'website/google.svg',
                    show: true
                },
                {
                    name: 'Yandex',
                    desc: 'yandex.com',
                    url: 'https://yandex.com/search/?text=%keyword%',
                    icon: 'website/yandex.svg',
                    show: true
                }
            ]
        },
        media: {
            title: '多媒体',
            list: [
                {
                    name: '网易云音乐',
                    desc: 'music.163.com',
                    url: 'https://music.163.com/#/search/m/?s=%keyword%',
                    icon: 'website/netease_music.svg',
                    show: true
                },
                {
                    name: 'AcFun',
                    desc: 'www.acfun.cn',
                    url: 'https://www.acfun.cn/search/?keyword=%keyword%',
                    icon: 'website/acfun.svg',
                    show: true
                },
                {
                    name: 'bilibili',
                    desc: 'search.bilibili.com',
                    url: 'https://search.bilibili.com/all?keyword=%keyword%',
                    icon: 'website/bilibili.svg',
                    show: true
                },
            ]
        },
        technology: {
            title: '技术',
            list: [
                {
                    name: 'CSDN',
                    desc: 'so.csdn.net',
                    url: 'https://so.csdn.net/so/search/all?q=%keyword%',
                    icon: 'website/csdn.svg',
                    show: true
                },
                {
                    name: 'GitHub',
                    desc: 'github.com',
                    url: 'https://github.com/search?q=%keyword%',
                    icon: 'website/github.svg',
                    show: true
                },
                {
                    name: 'MDN',
                    desc: 'developer.mozilla.org',
                    url: 'https://developer.mozilla.org/zh-CN/search?q=%keyword%',
                    icon: 'website/mdn.svg',
                    show: true
                }
            ]
        },
        design: {
            title: '设计',
            list: [
                {
                    name: '站酷',
                    desc: 'www.zcool.com.cn',
                    url: 'https://www.zcool.com.cn/search/content?word=%keyword%',
                    icon: 'website/zcool.svg',
                    show: true
                },
                {
                    name: 'Iconfont',
                    desc: 'www.iconfont.cn',
                    url: 'https://www.iconfont.cn/search/index?searchType=icon&q=%keyword%',
                    icon: 'website/iconfont.svg',
                    show: true
                }
            ]
        },
        community: {
            title: '社区',
            list: [
                {
                    name: '天涯',
                    desc: 'search.tianya.cn',
                    url: 'https://search.tianya.cn/bbs?q=%keyword%',
                    icon: 'website/tianya.svg',
                    show: true
                },
                {
                    name: '知乎',
                    desc: 'www.zhihu.com',
                    url: 'https://www.zhihu.com/search?type=content&q=%keyword%',
                    icon: 'website/zhihu.svg',
                    show: true
                }
            ]
        }
    },
    siteName: 'Frost 网址导航',
    storage: {
        fontSize: 16,
        showSiteTitle: true,
        sideMenuCollapse: false,
        searchEngine: '百度'
    }
};

export default config;
