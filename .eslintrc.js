module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
    },
    extends: ['airbnb-base', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 2018,
    },
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': 'error',
        'no-inline-comments': 'warn',
        'import/prefer-default-export': 0,
        'class-methods-use-this': 0,
        'no-param-reassign': 0,
        'no-restricted-syntax': 0,
    },
};
