# webpack 配置文档

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
    publicPath: path.resolve(__dirname, 'dist'),
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
    minimizer: [
        new TerserPlugin({
            cache: true,
            parallel: true
        }),
    ],
    splitChunks: {
        chunks: "async",
        maxAsyncRequests: 5,
        minSize: 50000
    }
}
```
