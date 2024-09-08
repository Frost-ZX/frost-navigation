import { createApp } from 'vue';
import { router } from './router';

import '@mdi/font/css/materialdesignicons.css';
import '@/assets/fonts/index.css';

import dayjs from 'dayjs';
import dayjsDuration from 'dayjs/plugin/duration';

import 'dayjs/locale/zh-cn';
import 'dayjs/locale/zh-hk';

import lunisolar from 'lunisolar';
import lunisolarLang1 from 'lunisolar/locale/en';
import lunisolarLang2 from 'lunisolar/locale/zh-cn';
import lunisolarFestivals from 'lunisolar/markers/festivals.zh-cn';

import App from './App.vue';

// 加载 Day.js Duration 插件
dayjs.extend(dayjsDuration);

// 配置 Day.js 默认语言
dayjs.locale('zh-cn');

// 加载 Lunisolar 语言包
lunisolar.locale([
  lunisolarLang1,
  lunisolarLang2,
], false);

// 加载 Lunisolar 节日列表
lunisolar.Markers.add(lunisolarFestivals, 'festivals');

// Lunisolar 全局配置
lunisolar.config({
  isUTC: false,
  lang: 'zh-cn',
});

const app = createApp(App);

app.use(router);
app.mount('#app');
