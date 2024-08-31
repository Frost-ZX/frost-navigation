// 搜索引擎

import {
  ref,
} from 'vue';

import {
  SKEY_SEARCH_ENGINE_NAME,
} from '@/config/storage';

import {
  useLocalStorage,
} from '@vueuse/core';

import {
  $message,
} from './naive-ui';

/** 打开搜索结果页面 */
export function openSearchResult() {

  let engine = searchEngineName.value;
  let keyword = searchKeyword.value;
  let baseURL = '';
  let useURL = '';

  // 获取搜索引擎 URL
  for (let i = 0; i < searchEngineList.length; i++) {

    let category = searchEngineList[i];
    let engines = category.list;

    for (let j = 0; j < engines.length; j++) {
      let item = engines[j];
      if (item.name === engine) {
        baseURL = item.url;
      }
    }

    if (baseURL) {
      break;
    }

  }

  if (baseURL) {
    useURL = baseURL.replace(/%keyword%/, keyword);
  }

  if (useURL) {
    window.open(useURL, '_blank');
  } else {
    $message.error('搜索失败：找不到对应的搜索引擎');
  }

}

/** 搜索引擎列表 */
export const searchEngineList = [
  {
    title: '搜索',
    list: [
      {
        name: '百度',
        desc: 'www.baidu.com',
        url: 'https://www.baidu.com/s?wd=%keyword%',
        icon: 'baidu.svg',
        show: true,
      },
      {
        name: '必应',
        desc: 'cn.bing.com',
        url: 'https://cn.bing.com/search?q=%keyword%',
        icon: 'bing.svg',
        show: true,
      },
      {
        name: '搜狗',
        desc: 'www.sogou.com',
        url: 'https://www.sogou.com/web?query=%keyword%',
        icon: 'sogou.svg',
        show: true,
      },
      {
        name: '360',
        desc: 'www.so.com',
        url: 'https://www.so.com/s?q=%keyword%',
        icon: '360.svg',
        show: true,
      },
      {
        name: 'Google',
        desc: 'www.google.com',
        url: 'https://www.google.com/search?q=%keyword%',
        icon: 'google.svg',
        show: true,
      },
      {
        name: 'Yandex',
        desc: 'yandex.com',
        url: 'https://yandex.com/search/?text=%keyword%',
        icon: 'yandex.svg',
        show: true,
      }
    ]
  },
  {
    title: '多媒体',
    list: [
      {
        name: '网易云音乐',
        desc: 'music.163.com',
        url: 'https://music.163.com/#/search/m/?s=%keyword%',
        icon: 'netease_music.svg',
        show: true,
      },
      {
        name: 'AcFun',
        desc: 'www.acfun.cn',
        url: 'https://www.acfun.cn/search/?keyword=%keyword%',
        icon: 'acfun.svg',
        show: true,
      },
      {
        name: 'bilibili',
        desc: 'search.bilibili.com',
        url: 'https://search.bilibili.com/all?keyword=%keyword%',
        icon: 'bilibili.svg',
        show: true,
      },
      {
        name: 'QQ音乐',
        desc: 'y.qq.com',
        url: 'https://y.qq.com/n/ryqq/search?w=%keyword%',
        icon: 'qq_music.svg',
        show: true,
      }
    ]
  },
  {
    title: '技术',
    list: [
      {
        name: '博客园',
        desc: 'zzk.cnblogs.co',
        url: 'https://zzk.cnblogs.com/s?w=%keyword%',
        icon: 'cnblogs.svg',
        show: true,
      },
      {
        name: 'CSDN',
        desc: 'so.csdn.net',
        url: 'https://so.csdn.net/so/search/all?q=%keyword%',
        icon: 'csdn.svg',
        show: true,
      },
      {
        name: 'GitHub',
        desc: 'github.com',
        url: 'https://github.com/search?q=%keyword%',
        icon: 'github.svg',
        show: true,
      },
      {
        name: 'MDN',
        desc: 'developer.mozilla.org',
        url: 'https://developer.mozilla.org/zh-CN/search?q=%keyword%',
        icon: 'mdn.svg',
        show: true,
      }
    ]
  },
  {
    title: '设计',
    list: [
      {
        name: '站酷',
        desc: 'www.zcool.com.cn',
        url: 'https://www.zcool.com.cn/search/content?word=%keyword%',
        icon: 'zcool.svg',
        show: true,
      },
      {
        name: 'Iconfont',
        desc: 'www.iconfont.cn',
        url: 'https://www.iconfont.cn/search/index?searchType=icon&q=%keyword%',
        icon: 'iconfont.svg',
        show: true,
      }
    ]
  },
  {
    title: '社区',
    list: [
      {
        name: '知乎',
        desc: 'www.zhihu.com',
        url: 'https://www.zhihu.com/search?type=content&q=%keyword%',
        icon: 'zhihu.svg',
        show: true,
      }
    ]
  },
];

/** 搜索引擎名称 */
export const searchEngineName = useLocalStorage(SKEY_SEARCH_ENGINE_NAME, '必应');

/** 搜索关键词 */
export const searchKeyword = ref('');
