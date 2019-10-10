# webpack配置文档

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
    
