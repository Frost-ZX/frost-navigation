/**
 * @desc 解析 360 推荐关键词（2021-12-29）
 * @param {{ result: { word: string }[] }} datas
 */
function parseSearch360(datas) {
    const list = datas.result;
    const words = [];

    list.forEach((item) => {
        words.push(item.word);
    });

    return words;
}

/**
 * @desc 解析百度推荐关键词（2021-12-29）
 * @param {{ s: string[] }} datas
 */
function parseSearchBaidu(datas) {
    const list = datas.s;
    return (Array.isArray(list) ? list : []);
}

/**
 * @typedef WordsBing
 * @type {{ AS: { Results: { Suggests: { Txt: string }[] } } }}
 */

/**
 * @desc 解析 Bing 推荐关键词（2021-12-29）
 * @param {WordsBing} datas
 */
function parseSearchBing(datas) {
    const list = datas.AS.Results.Suggests;
    const words = [];

    list.forEach((item) => {
        words.push(item.Txt);
    });

    return words;
}

/**
 * @typedef MDNSearchIndexDatas
 * @type {{ title: string, url: string }[]}
 */

/**
 * @description 解析 MDN 搜索关键词
 * @param {MDNSearchIndexDatas} datas 关键词数据
 * @param {string} keyword 输入的关键词
 * @param {number} [max] 最多返回的结果数量，默认为 10
 * @returns {MDNSearchIndexDatas} 匹配到的关键词
 */
function parseSearchMDN(datas = [], keyword = '', max = 10) {
    /** @type {MDNSearchIndexDatas} */
    const result = [];
    const word = String(keyword).toLowerCase();

    let count = 0;

    for (const item of datas) {
        if (item.title.toLowerCase().indexOf(word) > -1) {
            result.push(item);
            if ((count += 1) >= max) {
                break;
            }
        }
    }

    return result;
}

/**
 * @description 获取搜索 URL
 * @param {string} type     搜索引擎类型
 * @param {string} word     搜索关键词
 * @param {string} [cbName] 回调函数名称，用于获取推荐关键词
 * @returns {(string|null)} 根据参数返回不同的结果
 * - 无 `cbName` 时返回搜索结果页面 URL
 * - 有 `cbName` 时返回推荐关键词 URL
 * - 查找失败时返回 `null`
 */
function getSearchURL(type, word, cbName) {
    if (!(type && word)) {
        return null;
    }

    const info = searchItems.find((item) => {
        return (item.name === type);
    });

    if (!info) {
        return null;
    }

    word = window.encodeURI(word);

    const regCb = new RegExp('{cb}');
    const regW = new RegExp('{w}');

    if (cbName) {
        const url = info.wordURL;
        return url.replace(regCb, cbName).replace(regW, word);
    } else {
        const url = info.resultURL;
        return url.replace(regW, word);
    }
}

/**
 * @description 解析推荐的关键词
 * @param   {string} type  来源类型
 * @param   {*}      datas 关键词数据
 * @param   {number} [max] 最大返回数量
 * @returns {string[]}     关键词列表
 */
function parseSearchWords(type = '', datas = null, max = 10) {
    if (!datas) {
        return [];
    }

    /** @type {string[]} */
    let words = [];

    try {
        switch (type) {
            case '360':
                words = parseSearch360(datas);
                break;
            case 'baidu':
                words = parseSearchBaidu(datas);
                break;
            case 'bing':
                words = parseSearchBing(datas);
                break;
            default:
                console.error('来源类型错误');
                return [];
        }
    } catch (error) {
        console.error('解析失败');
        return [];
    }

    const arrLength = words.length;
    const cutLength = Math.max(arrLength - max, 0);
    const cutStart = arrLength - cutLength;

    words.splice(cutStart, cutLength);

    let value = '';

    for (value of words) {
        if (typeof value !== 'string') {
            console.error('关键词的数据类型错误');
            return [];
        }
    }

    return words;
}

/** 搜索引擎列表 */
const searchEngines = {
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
            {
                name: 'QQ音乐',
                desc: 'y.qq.com',
                url: 'https://y.qq.com/n/ryqq/search?w=%keyword%',
                icon: 'website/qq_music.svg',
                show: true
            }
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
};

/**
 * @typedef {object} SearchItem
 * @property {string} name 名称
 * @property {string} resultURL 搜索结果页面 URL
 * @property {string} wordURL 推荐关键词 URL
 */

/** @type {SearchItem[]} */
const searchItems = [
    {
        name: '360',
        resultURL: 'https://www.so.com/s?q={w}',
        wordURL: 'https://sug.so.360.cn/suggest?format=json&word={w}&callback={cb}',
    },
    {
        name: 'baidu',
        resultURL: 'https://www.baidu.com/s?wd={w}',
        wordURL: 'https://suggestion.baidu.com/su?wd={w}&cb={cb}',
    },
    {
        name: 'bing',
        resultURL: 'https://cn.bing.com/search?q={w}',
        wordURL: 'https://api.bing.com/qsonhs.aspx?type=cb&q={w}&cb={cb}',
        // wordURL: 'https://sg1.api.bing.com/qsonhs.aspx?type=cb&cb={cb}&q={w}',
    },
];

export default {
    getSearchURL,
    parseSearchMDN,
    parseSearchWords,
    searchEngines,
};
