// const isProduction = (process.env.NODE_ENV === 'production');

module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/recommended',
        'eslint:recommended',
    ],
    parserOptions: {
        parser: '@babel/eslint-parser',
    },
    rules: {
        // 'no-console': (isProduction ? 'warn' : 'off'),
        // 'no-debugger': (isProduction ? 'warn' : 'off'),
        'vue/html-closing-bracket-newline': 'off',
        'vue/html-indent': 'off',
        'vue/html-self-closing': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/no-v-html': 'off',
        'vue/singleline-html-element-content-newline': 'off',
    }
};
