## babel各个库的作用

- babel-cli: babel的命令行工具，用来编译文件
- babel-core: babel的核心，可以将源代码转换成抽象语法树
- babel-node: node环境中的命令行工具，底层用babel-register
- babel-register: 通过require钩子，将自身绑定到node的require模块上，并在运行时即时编译
- babel-polyfill: 用来编译js高级版的API
- babel-transform-runtime: 与babel-polyfill功能一样


