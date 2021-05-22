const path = require('path');

module.exports = {
    productionSourceMap: false,
    assetsDir: 'static',
    publicPath: './',
    outputDir: 'dist',

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
            chunks: ['chunk-common', 'chunk-vendors', 'mainPage']
        }
    },

    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            // 全局 Less 变量
            patterns: [
                path.resolve(__dirname, 'src/assets/css/variable.less')
            ]
        }
    },

    devServer: {
        port: 9005
    }
};
