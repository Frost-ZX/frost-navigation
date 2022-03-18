const path = require('path');

const { defineConfig } = require('@vue/cli-service');

const { npm_package_name: packageName } = process.env;

function addStyleRes({ config = null, processor = '', patterns = [] }) {
    if (!config) {
        return;
    }

    const rule = config.module.rule(processor);
    const types = ['normal', 'normal-modules', 'vue', 'vue-modules'];

    types.forEach((type) => {
        rule.oneOf(type)
            .use('style-resources-loader')
            .loader('style-resources-loader')
            .options({ patterns });
    });
}

if (packageName) {
    process.title = packageName;
}

module.exports = defineConfig({

    assetsDir: 'static',
    outputDir: 'dist',
    publicPath: './',
    productionSourceMap: false,
    transpileDependencies: false,

    chainWebpack: (config) => {
        addStyleRes({
            config,
            processor: 'less',
            patterns: [
                path.resolve(__dirname, 'src/assets/css/variable.less'),
            ]
        });
    },

    configureWebpack: {
        resolve: {
            fallback: {
                'stream': false
            }
        }
    },

    devServer: {
        host: '0.0.0.0',
        port: 9005,
    },

    pages: {
        mainPage: {
            // 入口
            entry: 'src/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist 的输出
            filename: 'index.html',
            // 标题
            title: 'Frost 网址导航',
            // 包含的块
            chunks: ['chunk-common', 'chunk-vendors', 'mainPage'],
        },
    },

});
