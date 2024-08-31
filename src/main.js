import { createApp } from 'vue';
import { router } from './router';

import '@mdi/font/css/materialdesignicons.css';

import lunisolar from 'lunisolar';
import lunisolarLang1 from 'lunisolar/locale/en';
import lunisolarLang2 from 'lunisolar/locale/zh-cn';
import lunisolarFestivals from 'lunisolar/markers/festivals.zh-cn';

import App from './App.vue';

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
