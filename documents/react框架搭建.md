### 脚手架及相关配置
1. webpack4.x
    * mode 
        模式
    * entry
        入口
    * output
        出口
    * devtool
        帮助快速定位代码在文件中的位置
    * devServer
        服务
    * module
        模块化js, less, url, png
    * plugins
        插件
    * resolve
        alias可配置别名，方便引入
    * optimization
        提取公共模块
    
    
    * 配置antd按需加载
        npm install babel-plugin-import --save-dev
        .babelrc: { pligins: ["import", { "libraryName": "antd", "style": true }] }
    * 配置生成html
        plugins: [ new HtmlWebpackPlugin() ]
    * 配置全局变量
        plugins: [ new webpack.DefinePlugin({ PRODUCTION: JSON.stringify(true) }) ]
    * 配置react组件懒加载
        npm install --save-dev babel-plugin-syntax-dynamic-import
        .babelrc: { 
            presets: [["env", { "modules": false }]],
            plugins: ["syntax-dynamic-import"]
        }
    * 配置动态链接库文件
        webpack.DllPlugin, webpack.DllReferencePlugin
    * 配置注解功能，如：@connect
        npm install babel-plugin-transform-decorators-legacy --save-dev
        .babelrc: { plugins: ["transform-decorators-legacy"] }
    * 配置class里属性可以不写this功能, 如：state = {}
        npm install babel-plugin-transform-class-properties --save-dev
        .babelrc: { plugins: ["transform-class-properties"] }
    * 配置es6等高级API语法
        import "@babel/polyfill"
    * 配置热更新
        devServer: { hot: true, ... },
        plugins: [ new webpack.HotModuleReplacementPlugin(), ... ],
        if(module.hot) { ... }
    * 配置代理
        devServer: {
            proxy: {
                "/api/*": {
                    target: "http://127.0.0.1:3000",
                    secure: false  //接受https
                }
            }
        }
    
2. dva
    * .webpackrc.js
        参照dva文档以及wepack4.x配置内容进行配置

3. umi


### 功能架构
1. 将react, react-router连接redux
    * 下载安装包
        npm install react, react-dom, redux, react-redux, react-router, react-router-dom, react-router-redux@next
    * 创建store
        redux扩展：连接redux浏览器扩展程序
        中间件：routerMiddleware中间件、 redux-logger中间件、redux-saga中间件
        路由：react-router, Loadable
        权限：checkPermissions
    * 全局loading状态
        dva-loading, react-redux-loading-bar

2. 骨架屏
    * Skeleton

3. 处理字体图标

### 测试






