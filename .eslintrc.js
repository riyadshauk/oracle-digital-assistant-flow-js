module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'lines-between-class-members': 0,
    'no-unused-vars': 0,
    // 'typescript/no-unused-vars': 1,
    'import/no-unresolved': 0,
    'import/newline-after-import': 0,
    'eol-last': 0,
    'no-return-assign': 0,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
};
