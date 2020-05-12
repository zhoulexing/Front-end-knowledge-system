### 项目介绍

react-tsc是为了私下学习和研究前端前言的项目，会随着前端新技术的更新而更新。

### 项目效果

无。

### 项目特点

针对新技术的研究，特点就是新、杂。
| 特性 | 描述 |
| ---  | :--: |
| react v16.8+ | 可使用react的新特性，hooks和新的生命周期等 |
| redux redux-saga ｜ 用redux做数据管理，saga做中间件 ｜
| typescript ｜ 使用javascript超集，加强类型规范 ｜
| ES2020+ | 支持ES2020版本及以上的新特性 |


### 项目结构（目录）

``` 
├── /node_modules/       # 第三方类库和工具
├── /src/                # 应用源码
│ ├── /assets/           # 静态资源
│ ├── /common/           # 公共部分
│ ├── /components/       # 自定义组件
│ ├── /layouts/          # 布局
│ ├── /routes/           # 路由信息
│ ├── /types/            # typescript的声明文件
│ ├── /utils/            # 功能性方法库
│ ├── index.ejs          # html模版
│ ├── index.less         # 全局样式
│ ├── index.tsc          # 项目的入口文件
│ └── router.tsx         # 全局路由文件
├── postcss.config.js    # postcss的配置文件
├── .babelrc             # babel的配置文件
├── .gitignore           # git忽略文件
├── webpack.config.js    # 扩展 webpack 配置
├── tsconfig.json        # typescript的配置文件
└── package.json         # 配置入口文件、依赖和 scripts
```

### 项目依赖环境

node v6+

### 项目运行

``` 
npm install
yarn install (如果没有需要安装)
cnpm install (如果没有需要安装)

npm run start
open http://localhost:8081/
```

### 项目风格

```
TSLint
```

### 项目测试

无。

### 项目部署

```
npm run build
```
