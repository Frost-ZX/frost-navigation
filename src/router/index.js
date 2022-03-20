import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';
import utils from '@/assets/js/utils';
import store from '@/store/index';

Vue.use(VueRouter);

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.loadingBar) {
        store.commit('toggleLoading', true);
    }
    next();
});

router.afterEach((to) => {
    if (to.meta.loadingBar) {
        store.commit('toggleLoading', false);
    }
    utils.changeTitle(to.meta.title);
});

export default router;
