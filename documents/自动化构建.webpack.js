/*
* webpack自动化构建项目的相关步骤
* 1 安装webpack： npm install -g webpack
* 2 新建webpack.config.js文件
* 3 webpack简介
*   webpack的配置项主要包括以下几点
*   3.1 entry: 入口，定义要打包的文件
*   3.2 output: 出口，定义打包输出的文件，包括路径、文件名
*   3.3 module: webpack将所有资源都看成是模块，而模块就需要加载器，主要定义一些loader，可能用到的loader, 版本2和版本1配置不一样
*       3.3.1 处理样式: sass-loader, style-loader, css-loader, 将sass转化成css
*       3.3.2 图片处理: url-loader, file-loader, image-webpack-loader, 将图片转化成base64或者进行压缩
*       3.3.3 js处理: bable-loader, babel-preset-es2015, babel-preset-react, 将es6或者更高级的代码转化成es5的代码
*   3.4 resolve: 定义能够被打包的文件，文件名后缀
*   3.5 plugins: 定义一些额外的插件
* 4 使用webpack-dev-sever启动服务器
*   4.1 刷新功能（支持两种模式的自动刷新）
*       4.1.1 iframe模式
*       4.1.2 inline模式： 命令行模式只需要加上--line选项即可
*   4.2 支持热更新（Hot ModuleReplacement): 命令行模式只要加上--hot即可
* 5 配置React, ES6 & babel
*   5.1 直接在项目根目录下创建.babelrc文件，添加{"presets": ["react", "es2015"]}即可
* 6 使用ESlint进行代码检查
*   6.1 特点
*       6.1.1 默认规则包含所有JSLint, JSHint中存在的规则，易迁移
*       6.1.2 规则可配置性高，可设置"警告"，"错误"两个等级，或者直接禁用
*       6.1.3 ESLint支持JSX，不过目前为alpha版本，正式版发布之前可以先使用eslint-plugin-react替代
*   6.2 配置
*       使用.eslintrc文件（支持JSON和YAML两种语法）
*       在package.json中添加eslintConfig配置块
*       直接在代码文件种定义
* 7 样式处理
*   7.1 主要使用sass预处理器编写样式，需要先通过sass-loader处理成css，然后再通过css-loader加载成css模块，
*       最后由 style-loader 加载器对其做最后的处理，从而运行时可以通过 style 标签将其应用到最终的浏览器环境。
* 8 图片处理
*   8.1 file-loader: 默认情况下会根据图片生成对应的MD5hash的文件格式
*   8.2 url-loader: url-loader类似于file-loader，但是url-loader可以根据自定义文件大小或者转化为base64格式的dataUrl，
*       或者单独作为文件，也可以自定义对应的hash文件名
*   8.3 image-webpack-loader: 提供压缩图片的功能
* 9 配置生产环境
*   9.1 前端开发环境通常分为两种
*       9.1.1 开发环境：需要日志输出，sourcemap，错误报告等等
*       9.1.2 生产环境：需要做代码压缩，对文件名进行hash处理等等
*   9.2 区分环境，webpack提供了DefinePlugin设置环境变量，后面会根据设置的不同环境变量决定是否打包压缩，
*       还是启动dev server或者是prod server
*   9.3 代码压缩，webpack提供了内建插件，直接配置以下代码即可压缩代码
*   9.4 添加Hash缓存，对于没有修改的文件，从缓存中获取文件；对于已经修改的文件，不要从缓存中获取
*   9.5 自动生成页面，文件名带上hash值后，这个值在每次编译的时候都会发生变化，都需要在html文件里手动修改引用的文件名，
*       这种重复工作很琐碎且容易出错，这里我们可以使用html-webpack-plugin来帮我们自动处理这件事情， 用来简化创建服
*       务于webpackbundle的HTML文件
* 10 构建流程图
*   10.1 npm start: 启动开发模式下的server
*   10.2 npm run start:prod: 启动生产模式的server
*   10.3 npm run build: 打包生产模式的代码
*   10.4 npm run lint: eslint 代码检查
*   10.5 npm run lint:watch: eslint监视
*   10.6 npm run remove:build: 删除dist目录
*   10.7 npm run clean:build: 清除dist目录
* 11 文件说明
*   11.1 .babelrc: 配置es2015, react解析器
*   11.2 .eslintrc: 配置eslint代码检查
*   11.3 server.js: 配置本地server(包含dev server和prod server)
*   11.4 webpack.config.dev.js: 开发模式相关配置
*   11.5 webpack.config.prod.js: 生产模式相关配置
* */
