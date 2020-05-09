# webpack 配置文档(>v4.41)

## 配置模式

```
mode: "production" || "development"
```

## 配置入口

入口配置的方式有以下几种，值分别为字符串，对象，数组

```
entry: './src/index.js'
entry: {
    index: './src/index.js',
    main: './src/main.js'
}
entry: [
    './src/index.js',
    './src/main.js'
]
```

## 配置输出

```
output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:6].js',
    // 静态资源的引入路劲如: <script src='https://www.example.com/dist/main.342a01.js'/>
    publicPath: 'https://www.example.com',

    library: '变量名', // 在全局变量中增加一个library变量
    libraryTarget: 'umd', // 打包的模块化规范， var:通过<script>应用； this: 导出到this，通过this访问；window：导出到浏览器的 window 对象中
}
```

## 配置模块

```
module: {
    rules: [{
        test: /**.**/,
        use: '' | ['' | {}],
        options: {}
    }]
}
```

## 配置插件

```
plugins: [ new Plugin({}) ]
```

## 配置解析

```
resolve: {
    // 文件名后缀自动补全
    extensions: ['.js', '.ts', '.css', '.less'],
    // 配置import和require的别名
    alias: {
        module: path.resolve(__dirname, "module")
    },
    // 定义直接声明依赖名的模块(如react)搜索的目录, 提升构建速度
    modules: ["node_modules"],
}
```

## 配置 devtool

```
devtool: 'inline-source-map'
```

## 配置外部扩展

```
externals: {
    // 通过脚本引入，打包的时候不会将jQuery打包进去
    jquery: "jQuery",
}
```

## 构建目标

```
target: 'web' | 'node'
```

## 配置开发中

```
devServer: {
    host: '0.0.0.0',
    port: 8080,
    // 打包生成的静态文件所在的位置（若是devServer里面的publicPath没有设置，则会认为是output里面设置的publicPath的值）
    publicPath: path.resolve(__dirname, 'dist'),
    // 告诉服务器从哪里提供内容（只有想提供静态文件时才需要）
    contentBase: path.resolve(__dirname, 'publick'),
    hot: true | false,
    open: true | false,
    compress: true | false,
    proxy: {
        "/api/*": {
            target: "http://ip:port",
            socket: "socket",
            // 接受https
            secure: false
        }
    }
}
```

## 配置统计信息

```
stats: {
    warning: true | false,
}
```

## 配置性能

```
performance: {
    hints: false
}
```

## 配置优化

```
optimization: {
    usedExports: true, // 在压缩式进行tree-shaking
    minimizer: true | false, // 默认为true, 用TerserPlugin进行压缩
    minimizer: [ // 自定义压缩工具，可用多个
        new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: true, // Must be set to true if using source-maps in production
            terserOptions: {
            }
        }),
    ],
    runtimeChunk： true | "multiple" | object, // 入口起点添加一个额外 chunk
    splitChunks: { // 默认配置
        chunks: "async", // 表示从哪些chunks里面抽取代码，除了三个可选字符串值 initial、async、all 之外，还可以通过函数来过滤所需的 chunks
        minSize: 30000, // 表示抽取出来的文件在压缩前的最小大小，默认为 30000
        maxSize: 0, // 表示抽取出来的文件在压缩前的最大大小，默认为 0，表示不限制最大大小
        minChunks: 1, // 表示被引用次数，默认为1
        maxAsyncRequests: 5, // 最大的按需(异步)加载次数，默认为 5
        maxInitialRequests: 3, // 最大的初始化加载次数，默认为 3
        automaticNameDelimiter: "~", // 抽取出来的文件的自动生成名字的分割符，默认为 ~
        name: true, // 抽取出来文件的名字，默认为 true，表示自动生成文件名
        cacheGroups: { // cacheGroups 才是我们配置的关键, 它可以继承/覆盖上面 splitChunks 中所有的参数值, 除此之外还额外提供了三个配置，分别为：test, priority 和 reuseExistingChunk
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10 // 优先级
            },
            default: {
                minChunks: 2, // 依赖最少引入多少次才能进行拆包
                priority: -20,
                reuseExistingChunk: true, // 是否复用存在的chunk
            },
            reactBase: {
                name: "reactBase",
                test: module => {
                    return /react|redux|prop-types/.test(module.context);
                },
                chunks: "initial",
                priority: 10
            },
            reactVendor: {
                test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                name: "reactvendor"
            },
            utilityVendor: {
                test: /[\\/]node_modules[\\/](lodash|moment|moment-timezone)[\\/]/,
                name: "utilityVendor"
            },
            bootstrapVendor: {
                test: /[\\/]node_modules[\\/](react-bootstrap)[\\/]/,
                name: "bootstrapVendor"
            },
            vendor: {
                test: /[\\/]node_modules[\\/](!react-bootstrap)(!lodash)(!moment)(!moment-timezone)[\\/]/,
                name: "vendor"
            },
            styles: {
                name: "styles",
                test: /\.(less|css)$/,
                maxSize: 500000,
                chunks: "all",
                minChunks: 1,
                reuseExistingChunk: true,
                enforce: true
            },
        }
    },
    ...
}
```

## 配置样式

### style-loader

将编译完成的的 css 插入 html 中的工具, sourceMap 需要将其设置到前一个 loader，如 css-loader

```webpack.config.js
{
    test: /\.css$/,
    use: [{
        loader: 'style-loader',
        options: {
            injectType: 'styleTag', // 默认值, 每个文件会新建一个style元素
            injectType: 'singletonStyleTag', // 将所有的文件都放入一个style元素中, 会影响css-loader中的sourceMap
        }
    }, {
        loader: 'css-loader'
    }]
}
{
    test: /\.css$/,
    use: [{
        loader: 'style-loader',
        options: {
            injectType: 'linkTag', // 会通过外部问价的方式引入, 但需要file-loader的配合而不是css-loader
        }
    }, {
        loader: 'file-loader',
    }]
}
{
    test: /\.css$/,
    use: [{
        loader: 'style-loader',
        options: {
            // 都是延迟加载, 需要通过.use()方法使其加载
            injectType: 'lazyStyleTag',
            injectType: 'lazySingletonStyleTag'
        }
    }, {
        loader: 'css-loader',
    }]
}
```

### css-loader

css-loader 用来处理样式，可以将 css 模块化，但是涉及到 css 中的图片需要 url-loader 或 file-loader 配合,
没有 url-loader 或 file-loader，css 中 url 的路劲必须是绝对路劲或者将 options 中的 url 设置为 false，否则
会报错。

```webpack.config.js
{
    test: /\.css$/,
    use: [{
        loader: 'style-loader',
        options: {
            injectType: 'singletonStyleTag'
        }
    }, {
        loader: 'css-loader',
        options: {
            url: true, // 处理url, 'index.css'--->'./index.css'
            import: true, // 处理@import
            modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]', // :local(.container) {} :global {}
                context: path.resolve(__dirname, 'src'),
                hashPrefix: 'my-custom-hash',
            },
            sourceMap: false | true,
            // 0 => no loaders (default);
            // 1 => postcss-loader;
            // 2 => postcss-loader, sass-loader
            importLoaders: 2,
            localsConvention: 'camelCase' | 'asIs'
        }
    }, 'postcss-loader', 'sass-loader' ]
}
```

### postcss-loader

PostCSS 不是类似 Less，Sass，Stylus 那样的 CSS 预处理器，而是一种允许用 JS 插件来转变样式的工具。
它和 css-loader 有很多重合的地方：postcss-import 等同 import；modules 等同 exac 或 postcss-js。
另外 postcss-loader 还提供了压缩优化 css、自动添加浏览器私有前缀的问题。

```webpack.config.js
{
    test: /\.css$/,
    use: [{
        loader: 'style-loader',
    }, {
        loader: 'postcss-loader',
        options: {
            exac: true, // 在不使用postcss-js解析器的情况下启用css-in-js
            parser: 'sugarss', // 设置解析方式
            parser: 'postcss-js', // postcss-js设置css-in-js
            cofig: {
                path: './loadcss/', // 配置postcss.config.js路劲
            },

        }
    }]
}
```

```postcss.config.js
module.exports = {
    plugins: [ 
        // 指定@import引入css文件的功能和范围
        require("postcss-import") ({root: "./loadcss"}), 
        require("postcss-preset-env") (),
        // 支持css一些新的功能
        require("postcss-cssnext"), // 支持css一些新的功能, postcss-cssnext已经支持autoprefixer
        require("cssnano") (),
        // 压缩和优化css, 删除注释和重复样式等
        require("autoprefixer") ({// 解决浏览器私有前缀的问题
            overrideBrowserslist: ["> 1%","last 5 versions" ]
        }),
        // 添加命名空间
        require("postcss-selector-namespace") ({namespace:".custom-namespace"}),
    ];
}
```

### less-loader

less-loader 用来解析 less

```webpack.config.js
{
    test: /\.less$/,
    use: [{
        loader: 'less-loader',
        options: {
            // 解决引入antd按需加载的问题
            javascriptEnabled: true,
            // 定制主题
            modifyVars: { "@primary-color": "#1DA57A" },
            sourceMap: true
        }
    }]
}
```

### mini-css-extract-plugin & optimize-css-assets-webpack-plugin

mini-css-extract-plugin 是将 css 单独打包成文件的一个插件, 但是要将 css 进行压缩
还需要 optimize-css-assets-webpack-plugin 插件的配合。

```webpack.config.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCss = require('optimize-css-assets-webpack-plugin');
{
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash:8].css", // hash:8
        }),
        new OptimizeCss({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            // 移除所有的注释
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }),
    ]
    modules: {
        rules: [{
            test: /\.(css|less)$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '../', // 针对文件中url的处理，如background-image
                    hmr: process.env.NODE_ENV === 'development', // 设置热更新
                    reloadAll: true, // 如果热更新不生效, 则强制update
                }
            }, {
                loader: 'css-loader',
                options: {
                    url: false,
                }
            }, {
                loader: 'less-loader',
                options: {
                    javascriptEnabled: true,
                }
            }]
        }]
    }
}
```

### 总结

关于 css 的 webpack 配置，主要是处理以下几点：

-   less 或 sass 与处理器；
-   css 的模块化；
-   css 中图片 url 的处理；
-   css 的外联样式和外部文件样式；
-   css 自动添加各浏览器的前缀；
-   css 的压缩优化；

## 配置文件

file-loader 和 url-loader 都是用来处理页面引入文件路劲的问题。url-loader 主要是用来处理图片，
封装了 file-loader，当图片大小小于 limit 参数时，url-loader 将会把文件转为 DataURL，当图片大
小大于 limit 参数时，url-loader 会调用 file-loader 参数进行处理。另外，file-loader 还可以处理
子图图标文件。

```webpack.config.js
{
    test: /\.(png|jpg|gif)$/,
    use: ["url-loader?limit=8192&name=images/[name]_[sha512:hash:base64:7].[ext]"],
    include: path.resolve(__dirname, "src"),
}
```

```webpack.config.js
{
    test: /\.(eot|woff|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
    use: ["file-loader?name=iconfont/[name]_[sha512:hash:base64:7].[ext]"],
    include: path.resolve(__dirname, "src"),
}
```

## 配置 js

### babel-loader

babel 插件分为语法插件和转换插件, 语法插件除了特定的语法插件之外，babel 提供了一些预设的语法插件，如@babel/preset-env。
但是对于原型上的 API 如 includes、flat、Promise 等@babel/preset-env 转换不了，需要用到@babel/polyfill 或@babel/plugin-transform-runtime。

如果全部引入@babel/polyfill，则会导致文件过大，所以@babel/polyfill 提供了 useBuiltIns 属性来控制按需引入。它的值有三个分别为
false、entry、usage。false 不会考虑浏览器版本，直接全部引入；entry 则会根据配置的浏览器版本来按情况引入；usage 则根据实际的代码
情况来按需引入。useBuiltIns 的值为 usage 需要结合 corejs 来使用，默认不需要安转，版本为 2，不支持一些新的特性，core-js3 支持新的
特性，但需要添加配置。

@babel/polyfill 有两个缺点，一个是会污染全局变量，另一个是会使包的面积增大，因为每个 js 都会引入相同的处理函数。所以@babel/plugin-transform-runtime
就是用来解决这个问题。@babel/plugin-transform-runtime 除了配合@babel/polyfill 使用之外, 可以单独使用，另外也提供了，@babel/runtime-corejs2、
@babel/runtime-corejs3，添加这两个库，需要配置 corejs。

除此之外需要注意，在指定 targets 的 esmodules 为 true 时，browsers 将不生效；babel 升至 7 之后，export default { a } & import { a } from '../\*.js'写法不支持。

```webpack.config.js
{
    test: /\.js$/,
    use: [{
        loader: 'babel-loader'
    }]
}
```

```.babelrc
{
    presets: [
        ["@babel/preset-env", {
            "useBuiltIns": "entry" | "usage" | false,
            "corejs": 3

            "modules": "auto" | "amd" | "umd" | "systemjs" | "commonjs" | "cjs" | false,
            "debug": false,
            "targets": {
                "esmodules": true,
                "chrome": "58",
                "ie": "11",
                "node": "current" | true,
                "browsers": "> 0.25%, not dead"
            }
        }]
    ],
    plugins: [
        ["@babel/plugin-transform-runtime", {
            // 需要配合corejs
            corejs: false | 2 | 3,
            // 根据 browserslist 来确认是否转化 generator 函数 或 async 函数
            regenerator: false | true,
            // 是否将内联的 babel helpers 代码抽离到单独的 module 文件，避免内联的 helper 代码在多个文件重复出现
            helpers: false | true
            // 启用后，转换将使用不运行的助手 @babel/plugin-transform-modules-commonjs, 使系统构建更小
            useESModules: false | true
        }]
    ]
}
```

### 针对浏览器版本按需编译的配置

```.babelrc
{
    presets: [
        ["@babel/preset-env", {
            "targets": {
                "browsers": "> 0.25%, not dead"
            }
        }]
    ]
}
```

```package.json
{
    "browserslist": "> 0.25%, not dead" | "lase 2 Chrome versions"
}
```

```.browserslistrc
> 0.25%
not dead
|
lase 2 Chrome versions
```

### 总结

关于 js 的 webpack 配置，主要是处理以下几点：

-   最新语法的配置
    -   es2020 需要 babel 相关库大于 7.8.3
-   最新 API 的配置
-   浏览器按需编译配置
