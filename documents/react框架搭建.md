### 脚手架及相关配置
1. webpack4.x
    * entry
    * output
    * devtool
        帮助快速定位位置
    * devServer
    * module
        js, less, url, png
    * resolve
        可配置别名，方便引入
    * optimization
        提取公共模块
    

    * 添加注解功能，如：@connect
        npm install babel-plugin-transform-decorators-legacy --save-dev
        .babelrc: { plugins: ["transform-decorators-legacy"] }
    * 处理es6等高级API语法
        import "@babel/polyfill"
    * 热更新
        devServer: { hot: true, ... },
        plugins: [ new webpack.HotModuleReplacementPlugin(), ... ],
        if(module.hot) { ... }

    * 添加代理
    * 字体图标
    
2. uva
3. umi


### 功能架构
1. 将react, react-router连接redux
    * 下载安装包
        npm install react, react-dom, redux, react-redux, react-router, react-router-dom, react-router-redux@next
    * 创建store
        redux扩展：连接redux浏览器扩展程序
        中间件：routerMiddleware中间件、 redux-logger中间件、redux-saga中间件
    * 全局loading状态
        
2. 骨架屏


### 测试






