import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';

import navLinks from '../public/static/js/navLinks'
import utils from './assets/js/utils'

import 'ress/ress.css';
import 'element-ui/lib/theme-chalk/index.css';

(function () {
    var init = utils.initNavLinkID();

    navLinks.forEach(item => {
        init(item);
    });
})();

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
    router,
    data: function () {
        return {
            navLinks,
            utils
        }
    },
    render: h => h(App)
}).$mount('#app');
