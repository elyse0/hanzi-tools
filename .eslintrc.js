module.exports = {
    ignorePatterns: ['pinyinDict.ts'],
    env: {
        browser: true,
        es2021: true,
        'jest/globals': true,
    },
    extends: [
        'airbnb-base',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 13,
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
        'jest',
    ],
    rules: {
        indent: ['error', 4],
        'max-len': 'off',
        'import/prefer-default-export': 'off',
        'arrow-body-style': 'off',
        'no-restricted-syntax': 'off',
        'no-shadow': 'off',
        'guard-for-in': 'off',
        'prefer-destructuring': 'off',
        'no-case-declarations': 'off',
    },
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
};
