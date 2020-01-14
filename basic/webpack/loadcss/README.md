## webpack 关于 css、less 等的处理

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
    plugins: [ // 指定@import引入css文件的功能和范围
            require("postcss-import") ({root: "./loadcss"}), // 支持css一些新的功能, postcss-cssnext已经支持autoprefixer
            require("postcss-preset-env") (), require("postcss-cssnext") (), // 压缩和优化css, 删除注释和重复样式等
            require("cssnano") () ; // 解决浏览器私有前缀的问题
            require("autoprefixer") () ; ];
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

### file-loader & url-loader

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

### 总结

关于 css 的 webpack 配置，主要是处理以下几点：

-   less 或 sass 与处理器；
-   css 的模块化；
-   css 中图片 url 的处理；
-   css 的外联样式和外部文件样式；
-   css 自动添加各浏览器的前缀；
-   css 的压缩优化；
