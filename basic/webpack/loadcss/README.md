## webpack关于css、less等的处理


### style-loader
将编译完成的的css插入html中的工具

```webpack.config.js
{
    test: /\.css$/,
    use: [{
        loader: 'style-loader',
        options: {
            injectType: 'styleTag', // 默认值, 每个文件会新建一个style元素
            injectType: 'singletonStyleTag', // 将所有的文件都放入一个style元素中
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
css-loader用来处理样式，可以将css模块化，但是涉及到css中的图片需要url-loader或file-loader配合,
没有url-loader或file-loader，css中url的路劲必须是绝对路劲或者将options中的url设置为false，否则
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
PostCSS不是类似Less，Sass，Stylus那样的CSS预处理器，而是一种允许用JS插件来转变样式的工具。
```webpack.config.js
{
    test: /\.css$/,
    use: [{
        loader: 'style-loader',
    }, {
        loader: 'postcss-loader',
        options: {
            parser: 'sugarss', // 设置解析方式
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
        require("postcss-import")({
            root: "./loadcss"
        }),
        // 支持css一些新的功能, postcss-cssnext已经支持autoprefixer
        require("postcss-preset-env")(),
        require("postcss-cssnext")(),
        // 压缩和优化css, 删除注释和重复样式等
        require("cssnano")();
    ]
}
```


### less-loader