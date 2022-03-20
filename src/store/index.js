import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {

        /** 设置 */
        config: {
            fontSize: 16,
            showSiteTitle: true,
            sideMenuCollapse: true,
            searchEngine: '百度',
            searchSuggestion: false,
        },

        /** 显示加载动画 */
        showLoading: false,

    },
    getters: {},
    mutations: {

        /** 从本地储存中读取设置 */
        readConfig(state) {

            let keyName = 'fn_config';
            let storage = localStorage.getItem(keyName);
            let parsed = null;
            let config = state.config;

            try {
                parsed = JSON.parse(storage);
            } catch (error) {
                console.error('解析保存的设置失败。');
            }

            if (parsed && parsed.constructor === Object) {
                // [本地储存中有数据，读取]
                for (let key in config) {
                    let value = parsed[key];

                    if (typeof value !== 'undefined') {
                        config[key] = value;
                    }
                }
            } else {
                // [本地储存中无数据，写入]
                localStorage.setItem(keyName, JSON.stringify(config));
            }

        },

        /** 重置保存的设置 */
        resetConfig() {
            localStorage.removeItem('fn_config');
        },

        /**
         * @description 更新设置
         * @param {object} payload
         * @param {string} payload.key
         * @param {any}    payload.value
         */
        setConfig(state, payload) {

            const {
                key: cKey = null,
                value: cValue = null,
            } = payload;

            const { config } = state;

            if (cKey === null) {
                console.error('更新设置失败，key 为空。');
                return;
            }

            if (typeof config[cKey] === 'undefined') {
                console.error('更新设置失败，key 不存在。');
                return;
            }

            // 更新设置
            config[cKey] = cValue;
            // 保存设置
            localStorage.setItem('fn_config', JSON.stringify(config));

        },

        /** 切换加载动画显示隐藏 */
        toggleLoading(state, payload = false) {
            state.showLoading = payload;
        },

    },
    actions: {

        /** 切换导航链接侧边菜单显示隐藏 */
        toggleSideCollapse(store) {

            const { sideMenuCollapse } = store.state.config;

            store.commit('setConfig', {
                key: 'sideMenuCollapse',
                value: !sideMenuCollapse,
            });

        },

    },
    modules: {},
});
