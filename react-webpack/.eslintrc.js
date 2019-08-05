module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
      legacyDecorators: true
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: './webpack.config.js',
      },
    },
  },
  rules: {
    'linebreak-style': [0, 'error', 'windows'], // 不同系统的换行方式
    'no-use-before-define': 0, // 定义必须在使用之前
    'indent': [0, 4], // 缩进4个空格
    'no-console': 0, // 保留console.log
    'no-mutable-exports': 0, // 导出必须加变量, true: export const num = 0; error: export 0
    'class-methods-use-this': 0, // 强制类方法内使用this，没有的话可改成静态的
    'react/destructuring-assignment': [0, 'always', { 'ignoreClassFields': true }], // state可以这样定义state = {}
    'react/sort-comp': 0, // React方法显示顺序
    'react/jsx-filename-extension': [1, { 'extensions': ['js', 'jsx'] }], // react组件文件后缀类型

  },
};
