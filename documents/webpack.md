# webpack 配置文档(v4.41)

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
