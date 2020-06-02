## 安装 eslint

将 eslint 安装到本地

```
npm install eslint --save-dev
yarn add eslint -D
```

初始化配置文件

```
./node_modules/.bin/eslint --init
```

## 编写脚本

```
--fix 自动修复所有格式问题
--ext 根据文件后缀来lint
-o 输出到日志文件
eslint 'src/**/*.{ts,js,tsx,jsx}' --fix -o eslint_log.log
eslint src --fix --ext .ts,.tsx
```

## eslint-config-xx、eslint-plugin-xx 区别

eslint-config-xx 通过 extends 的方式引入规则，它在导出的配置结构中的 plugins 内添加了 plugin 对应的插件，以至于我们在实际.eslintrc 文件内是不需要再重复添加到 plugins 的数组内;
通过扩展（extends）的方式加载插件的规则如下：'plugin:${pluginName}/${configName}', configName 是通过配置的 configs 文件设置的, 如下 react 配置;

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

## 配置.eslintrc.xx 文件(基于 react、typescript、prettier)

```
npm install eslint --save-dev // ESLint的核心
npm install @typescript-eslint/parser --save-dev // 定义ESLint的解析器
npm install @typescript-eslint/eslint-plugin --save-dev // typescript规范
npm install eslint-plugin-react --save-dev // react规范
npm install eslint-config-airbnb --save-dev // airbnb规范
npm install eslint-plugin-jsx-a11y --save-dev // jsx的rules规范
npm install eslint-plugin-import --save-dev // 在使用 import 的时候，一些 rules 规范

npm install prettier --save-dev // prettier插件的核心代码
npm install prettier eslint-config-prettier --save-dev // 解决ESLint中的样式规范和prettier中样式规范的冲突，以prettier的样式规范为准，使ESLint中的样式规范自动失效
npm install prettier eslint-plugin-prettier --save-dev // 将prettier作为ESLint规范来使用
module.exports = {
    parser:  '@typescript-eslint/parser', // 定义ESLint的解析器
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'airbnb', // airbnb规范

        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
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

## 代码格式化

基于编辑器的话，可在项目中新建 prettier 配置文件，然后通过快捷键即可进行格式化，.prettierrc 的优先级会高于 vscode 全局配置 setting.json 中的优先级；
使用基本的方式：prettier --config --write ./_.{js,ts,css,json}；
对目录下所有文件格式化："format": "onchange 'src/\*\*/_.js' -- prettier --write {{changed}}"；

```
npm install prettier --save-dev

// .prettierrc.(.yaml,.yml,.json) | prettier.config.js
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

## 构建代码工作流

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
            "prettier prettier.config.js --write",
            "git add"
        ]
    }
}
```

## gitlab 的 CI/CD

```
// package.json
"script": {
    "lint": "eslint src --fix --ext .ts,.tsx"
}

// .gitlab-ci.yml
stages:
    - lint

before_script:
    - git fetch --all
    - npm install

lint:
    state: lint
    script:
        - npm run lint
    only
        - 特定分支1
        - 特定分支2
```
