/* 
 babel相关知识
 1 配置文件.bablerc
    {
        "presets": [], 
        "plugins": [] 
    }
    1.1 ES2015转码规则
        npm install --save-dev babel-preset-es2015
    1.2 react转码规则
        npm install --save-dev babel-preset-react
    1.3 ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
        npm install --save-dev babel-preset-stage-0
        npm install --save-dev babel-preset-stage-1
        npm install --save-dev babel-preset-stage-2
        npm install --save-dev babel-preset-stage-3
    1.4 然后将这些规则加入.babelrc
        {
            "presets": [
            "es2015",
            "react",
            "stage-2"
            ],
            "plugins": []
        }
2 命令行转码
    npm install --global babel-cli
3 babel-node
    babel-cli工具自带一个babel-node命令，提供一个支持ES6的REPL环境
4 babel-register
    babel-register模块改写require命令，为它加上一个钩子。此后，每当使用require加载.js、.jsx、.es和.es6后缀名的文件，就会先用Babel进行转码
    npm install --save-dev babel-register
5 babel-core
    如果某些代码需要调用Babel的API进行转码，就要使用babel-core模块
    npm install babel-core --save
6 babel-polyfill
    Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、
    Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码
    npm install --save babel-polyfill
    import 'babel-polyfill';
    // 或者
    require('babel-polyfill');
7 与其他工具的配合（如ESLint和Mocha）
    npm install --save-dev eslint babel-eslint
    然后，在项目根目录下，新建一个配置文件.eslint，在其中加入parser字段。
    {
        "parser": "babel-eslint",
        "rules": {
            ...
    }
}

*/