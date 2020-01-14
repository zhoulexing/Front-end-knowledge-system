## webpack 关于 js 等的处理

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
-   最新 API 的配置
-   浏览器按需编译配置
