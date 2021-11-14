module.exports = {
    plugins: {
        'autoprefixer': {
            overrideBrowserslist: [
                'Android >= 4.0',
                'iOS >= 8'
            ]
        },
        'postcss-pxtorem': {
            mediaQuery: true,
            propList: ['*'],
            rootValue: 16,
            unitPrecision: 4,
        }
    }
};
