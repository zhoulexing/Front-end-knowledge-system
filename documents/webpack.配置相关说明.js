/* 
    webpack相关文档说明（具体见webpack.demo）
    1 输入输出（webpack.entry.ouput.config.js）
        针对webpack进行简单的输入输出。 
    2 加载资源(webpack.loader.source.config.js)
        2.1 加载css|less
            对css要进行以下处理：less转化、模块化、class名添加hash、添加前缀、形成外联样式且将css全部放一起。
        2.2 加载图片
            使用file-loader || url-loader, url-loader包含了file-loader
        2.3 加载字体图标
            使用file-loader || url-loader 
    3 开发环境（webpack.development.env.config.js）
        3.1 uglifyjs-webpack-plugin用于压缩代码，而且对于没有引用的方法或模块都会进行删除（Tree Shaking）。
    4 生产环境（webpack.production.env.config.js）
        4.1 在开发环境中，我们需要具有强大的、具有实时重新加载(live reloading)或热模块替换(hot module replacement)能力的 
            source map 和 localhost server。在生产环境中，我们的目标则转向于关注更小的 bundle，更轻量的 source map，
            以及更优化的资源，以改善加载时间。
        4.2 import()和require.ensure() 异步动态的导入，output属性里的chunkFilename属性就是存储这种异步加载的模块。
            具体看production.env下的js文件。
    5 构建性能
        5.1 将 loaders 应用于最少数的必要模块中。
            {
                test: /\.js$/,
                loader: "babel-loader"
            } 
            =>
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "src"),
                loader: "babel-loader"
            }
        5.2 使用DllPlugin 将更改不频繁的代码进行单独编译。
        5.3 减少编译的整体大小，以提高构建性能。
            1. 使用 更少/更小 的库。
            2. 在多页面应用程序中使用 CommonsChunksPlugin。
            3. 在多页面应用程序中以 async 模式使用 CommonsChunksPlugin。
            4. 移除不使用的代码。
            5. 只编译你当前正在开发部分的代码。
        5.4 使用 cache-loader 启用持久化缓存。
        5.5 在内存中编译。
            1. webpack-dev-server
            2. webpack-hot-middleware
            3. webpack-dev-middleware
*/

/* 
    相关未解决问题
    1 webpack处理文字图标的时候， 引入的第三方css的class名变了，如何不变？
    2 服务器端渲染该如何配置
    3 文件缓存和文件hash的问题
*/

