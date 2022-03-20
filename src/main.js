import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';

import 'ress/ress.css';
import 'font-awesome/css/font-awesome.min.css';
import './assets/css/element.scss';
import './assets/css/global.less';

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
