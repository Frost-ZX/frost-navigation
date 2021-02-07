module.exports = {
    plugins: {
        'autoprefixer': {
            overrideBrowserslist: [
                'Android >= 4.0',
                'iOS >= 8'
            ]
        },
        'postcss-pxtorem': {
            rootValue: 16,
            propList: ['*']
        }
    }
};
