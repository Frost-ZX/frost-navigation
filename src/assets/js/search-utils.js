/**
 * @description 解析推荐的关键词
 * @param {string} type 来源类型
 * @param {*} datas 关键词数据
 * @param {number} [max] 最大返回数量
 * @returns {string[]} 关键词列表
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
            case 'baidu':
                words = parseSearchBaidu(datas);
            case 'bing':
                words = parseSearchBing(datas);
            default:
                break;
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
 * @description 获取搜索 URL
 * @param {string} type 搜索引擎类型
 * @param {string} word 搜索关键词
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
