## 安装eslint

将eslint安装到本地

``` 
npm install eslint --save-dev
yarn add eslint -D
```

初始化配置文件

``` 
./node_modules/.bin/eslint --init
```

## 安装 eslint-config-xx、eslint-plugin-xx

exlint-plugin-**在配置的时候，可以省去eslint-plugin从而简写;
config已经在导出的配置结构中的plugins内包含了plugin对应的插件，以至于我们在实际.eslintrc文件内是不需要再重复添加到plugins的数组内的;
通过扩展的方式加载插件的规则如下：'plugin:${pluginName}/${configName}', configName是通过配置的configs文件设置的, 如下react配置;
```
module.exports = {
    rules: {},
    configs: {
        recomended: {
            plugins: ['react'],
            rules: {},
        },
        all: {
            plugins: ['react'],
            rules: {}
        }
    }
}
```
``` 
npm install eslint-config-prettier --save-dev // eslint解析器，用于解析typescript，从而检查和规范ts代码
npm install eslint-config-react --save-dev

npm install @typescript-eslint/eslint-plugin --save-dev // eslint插件，包含了各类定义好的检查ts代码的规范
npm install eslint-plugin-jsx-a11y --save-dev
npm install eslint-plugin-import --save-dev // 检验es6的import规则
```

## 配置.eslintrc.xx文件

``` 
module.exports = {
    parser:  '@typescript-eslint/parser', // 定义ESLint的解析器
    extends: [
        'plugin:@typescript-eslint/recommended', // 定义文件继承的子规范
        'plugin:react/recommended', // 检测和规范react代码
        'airbnb', // airbnb规范
    ],
    plugins: ['@typescript-eslint'], // 定义了该eslint文件所依赖的插件
    env: { // 指定代码的运行环境
        browser: true,
        node: true,
    },
    settings: {  // 自动发现React的版本，从而进行规范react代码           
        "react": {
            "pragma": "React",
            "version": "detect"
        }
    },   
    parserOptions: {  //    指定ESLint可以解析JSX语法
        "ecmaVersion": 2019,
        "sourceType": 'module',
        "ecmaFeatures":{
            jsx:true
        }
    },
    rules: { // 定义自己的规则

    }                          
}

```

## 编写脚本

```
--fix 自动修复所有格式问题
eslint 'src/**/*.{ts,js,tsx,jsx}' --fix -o eslint_log.log
```

## 代码格式化

``` 
npm install prettier --save-dev

// .prettierrc.js
module.exports = {
    printWidth: 120,
    tabWidth: 4,
    singleQuote: true,
    semi: true,
    trailingComma: 'es5',
    bracketSpacing: true,
    jsxBracketSameLine: true,
    arrowParens: 'always',
    parser: 'typescript'
};
```

## 强制校验和格式化

``` 
npm install husky lint-staged --save-dev

// package.json
{
    ...other,
    "husky": {
        "hooks": {
            "pre-commit": "lint-staged"
        }
    },
    "lint-staged": {
        "*.{ts,tsx}": [
            "npm run eslint",
            "prettier .prettierrc.js --write",
            "git add"
        ]
    }
}
```
