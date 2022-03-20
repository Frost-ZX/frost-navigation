import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';
import config from '@/assets/js/config';
import utils from '@/assets/js/utils';

Vue.use(VueRouter);

const router = new VueRouter({
    routes
});

// to, from, next
router.beforeEach((to, from, next) => {
    if (to.meta.loadingBar) {
        config.loading.subPage = true;
    }
    next();
});

// to, from
router.afterEach((to) => {
    if (to.meta.loadingBar) {
        config.loading.subPage = false;
    }
    utils.changeTitle(to.meta.title);
});

export default router;
