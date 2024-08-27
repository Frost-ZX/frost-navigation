import { createApp } from 'vue';
import { router } from './router';

import '@mdi/font/css/materialdesignicons.css';

import App from './App.vue';

const app = createApp(App);

app.use(router);
app.mount('#app');
