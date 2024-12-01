// 搜索引擎

import {
  ref,
} from 'vue';

import {
  storeSearchView,
} from './local-storage';

import {
  $message,
} from './naive-ui';

import icon_baidu from '@/assets/website-icon/baidu.svg';
import icon_bing from '@/assets/website-icon/bing.svg';
import icon_sogou from '@/assets/website-icon/sogou.svg';
import icon_360 from '@/assets/website-icon/360.svg';
import icon_google from '@/assets/website-icon/google.svg';
import icon_yandex from '@/assets/website-icon/yandex.svg';
import icon_netease_music from '@/assets/website-icon/netease_music.svg';
import icon_acfun from '@/assets/website-icon/acfun.svg';
import icon_bilibili from '@/assets/website-icon/bilibili.svg';
import icon_qq_music from '@/assets/website-icon/qq_music.svg';
import icon_cnblogs from '@/assets/website-icon/cnblogs.svg';
import icon_csdn from '@/assets/website-icon/csdn.svg';
import icon_github from '@/assets/website-icon/github.svg';
import icon_mdn from '@/assets/website-icon/mdn.svg';
import icon_zcool from '@/assets/website-icon/zcool.svg';
import icon_iconfont from '@/assets/website-icon/iconfont.svg';
import icon_zhihu from '@/assets/website-icon/zhihu.svg';

/** 打开搜索结果页面 */
export function openSearchResult() {

  let engine = storeSearchView.searchEngineName.value;
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
        icon: icon_baidu,
        show: true,
      },
      {
        name: '必应',
        desc: 'cn.bing.com',
        url: 'https://cn.bing.com/search?q=%keyword%',
        icon: icon_bing,
        show: true,
      },
      {
        name: '搜狗',
        desc: 'www.sogou.com',
        url: 'https://www.sogou.com/web?query=%keyword%',
        icon: icon_sogou,
        show: true,
      },
      {
        name: '360',
        desc: 'www.so.com',
        url: 'https://www.so.com/s?q=%keyword%',
        icon: icon_360,
        show: true,
      },
      {
        name: 'Google',
        desc: 'www.google.com',
        url: 'https://www.google.com/search?q=%keyword%',
        icon: icon_google,
        show: true,
      },
      {
        name: 'Yandex',
        desc: 'yandex.com',
        url: 'https://yandex.com/search/?text=%keyword%',
        icon: icon_yandex,
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
        icon: icon_netease_music,
        show: true,
      },
      {
        name: 'AcFun',
        desc: 'www.acfun.cn',
        url: 'https://www.acfun.cn/search/?keyword=%keyword%',
        icon: icon_acfun,
        show: true,
      },
      {
        name: 'bilibili',
        desc: 'search.bilibili.com',
        url: 'https://search.bilibili.com/all?keyword=%keyword%',
        icon: icon_bilibili,
        show: true,
      },
      {
        name: 'QQ音乐',
        desc: 'y.qq.com',
        url: 'https://y.qq.com/n/ryqq/search?w=%keyword%',
        icon: icon_qq_music,
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
        icon: icon_cnblogs,
        show: true,
      },
      {
        name: 'CSDN',
        desc: 'so.csdn.net',
        url: 'https://so.csdn.net/so/search/all?q=%keyword%',
        icon: icon_csdn,
        show: true,
      },
      {
        name: 'GitHub',
        desc: 'github.com',
        url: 'https://github.com/search?q=%keyword%',
        icon: icon_github,
        show: true,
      },
      {
        name: 'MDN',
        desc: 'developer.mozilla.org',
        url: 'https://developer.mozilla.org/zh-CN/search?q=%keyword%',
        icon: icon_mdn,
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
        icon: icon_zcool,
        show: true,
      },
      {
        name: 'Iconfont',
        desc: 'www.iconfont.cn',
        url: 'https://www.iconfont.cn/search/index?searchType=icon&q=%keyword%',
        icon: icon_iconfont,
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
        icon: icon_zhihu,
        show: true,
      }
    ]
  },
];

/** 搜索关键词 */
export const searchKeyword = ref('');
