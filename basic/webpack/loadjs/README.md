## webpack关于js等的处理

### babel-loader
babel插件分为语法插件和转换插件, 语法插件除了特定的语法插件之外，babel提供了一些预设的语法插件，如@babel/preset-env。
但是对于原型上的API如includes、flat、Promise等@babel/preset-env转换不了，需要用到@babel/polyfill或@babel/plugin-transform-runtime。

如果全部引入@babel/polyfill，则会导致文件过大，所以@babel/polyfill提供了useBuiltIns属性来控制按需引入。它的值有三个分别为
false、entry、usage。false不会考虑浏览器版本，直接全部引入；entry则会根据配置的浏览器版本来按情况引入；usage则根据实际的代码
情况来按需引入。useBuiltIns的值为usage需要结合corejs来使用，默认不需要安转，版本为2，不支持一些新的特性，core-js3支持新的
特性，但需要添加配置。

@babel/polyfill有两个缺点，一个是会污染全局变量，另一个是会使包的面积增大，因为每个js都会引入相同的处理函数。所以@babel/plugin-transform-runtime
就是用来解决这个问题。@babel/plugin-transform-runtime除了配合@babel/polyfill使用之外, 可以单独使用，另外也提供了，@babel/runtime-corejs2、
@babel/runtime-corejs3，添加这两个库，需要配置corejs。

除此之外需要注意，在指定targets的esmodules为true时，browsers将不生效；babel升至7之后，export default { a } & import { a } from '../*.js'写法不支持。

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

