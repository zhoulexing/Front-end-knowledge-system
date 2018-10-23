### webpack配置说明文档

#### 配置模式, 必填
	mode: "production" || "development"

#### 配置输入，值可以为对象 | 数组 | 字符串，
	数组的话可以添加babel-polyfill, 并且是多入口最终打包成一个文件
	entry: {
		main: "./src/index.js"
	}

#### 配置输出
	output: {
		// 配置输出路劲
		path: path.resolve(__dirname, "dist"),
		// 输出的文件名称，注：chunkhash不能与devServer一起使用
		filename: "[name].[hash:6].js",
		// 文件解析路径，index.html中引用的路径会被设置为相对于此路径
		publicPath: "dist/",
		// 非入口的chunk的文件名，路径相对于output.path目录
		chunkFilename: "[name].[hash:6].js",
		// 如果设置此选项，会将 bundle 导出为 library
		library: "[name]_[hash:6]"
	}

#### 配置开发工具，适用于开发阶段，为了快速定位到源文件
	devtool: "inline-source-map" || "eval-source-map" || ...
	// 配置开发时的服务
	cnpm install webpack-dev-server --save-dev
	devServer: {
		// 本地服务器所加载的页面的目录
		contentBase: path.resolve(__dirname, "dist"),
		// 服务器ip
		host: "127.0.0.1"
		// 端口号
		port: 9000,
		// 设置为true，当源文件改变时会自动刷新页面, 默认为true
		inline: false,
		// 服务端压缩是否开启
		compress: true | false,
		// 热更新, 需要在命令行加--hot或者在plugins里添加webpack.HotModuleReplacementPlugin()
		hot: true,
		// 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
		historyApiFallback: true,  // 不跳转
		// 自动打开浏览器
		open: true,
		// 配置代理
		proxy: {
		    // 匹配请求路劲
			"/api/*": {
			    // 目标服务器
			    target: "http://ip:port",
			    // 设置socket
			    socket: "socket",
			    // 接受https
			    secure: false
			}
		}
		// 配置mock
		cnpm install webpack-api-mocker --save-dev
		before(app) {
            apiMocker(app, path.resolve("./mocker/index.js"))
        }
		// ./mocker/index.js
		module.exports = {
		[`GET /api/user`]: (req, res) => {
			return res.json({
				id: 1,
				username: 'kenny',
				sex: 6
			});
		}
	}

#### 配置分离第三方库
    // webpack.dll.config.js
	cnpm install clean-webpack-plugin --save-dev
	module.exports = {
		entry: {
			vendor: Object.keys(package.dependencies).filter(item => {
				return item.indexOf('normalize') < 0;
			})
		},
		output: {
			path: path.resolve(__dirname, "dll"),
			filename: "dll.[name]_[hash:6].js"
		},
		plugins: [
			new CleanWebpackPlugin(["dist"]),
			new webpack.DllPlugin({
				path: path.resolve(__dirname, "dll/", "[name]-manifest.json"),
				name: "dll.[name]_[hash:6].js"
			})
		]
	}
    // webpack.dev.config.js, 然后通过html-webpack-plugin将此js引入进去或者通过assets-webpack-plugin
    module.exports = {
        plugins: [
			new webpack.DllReferencePlugin({ manifest: require("./dll/vender-manifest.json"), context: "./dll" }),
			// 或者
			new AssetsPlugin({
				filename: 'bundle-config.json',
				path: './dll/'
			})
		]
    }
		
#### 配置js&jsx
    cnpm install --save-dev babel-loader babel-core babel-preset-react
        babel-preset-env transform-runtime babel-plugin-transform-runtime
        babel-plugin-import babel-polyfill
    babel-loader: babel的loader包
    babel-core: babel的核心包
    babel-preset-es2015: 解析es6的包
    babel-preset-env: 解析es6的包（官方最新推荐）
    babel-preset-react: 解析React的JSX的包
    transform-runtime: 让我们使用新代码, 在运行时转化
    babel-polyfill: 功能等同与transform-runtime
    babel-plugin-transform-runtime: 解决transform-runtime文件过大的问题
    babel-plugin-import: 按需加载
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: ["babel-loader"]
            }
        ]
    }

#### 配置开发模式的less加载, 文件不分离
	cnpm install --save-dev style-loader css-loader less less-loader autoprefixer mini-css-extract-plugin
	postcss-loader purifycss-webpack
	module: {
	    rules: [
	        {
                test: /\.less$/,
                use: [
                    // string || object
                    {
                        loader: "style-loader",
                        options: {
                            // 配置热更新
                            hmr: true,
                            // 设置模块ID基础
                            base: true,
                            // 添加自定义 attrs 到 <style></style>
                            attrs: {},
                            // 转换/条件加载 CSS，通过传递转换/条件函数
                            transform: false(Function),
                            // 要在头部的开头插入样式元素
                            insertAt: "top",
                            // 给定位置中插入 <style></style>
                            insertInto: <head>
                            // 启用/禁用 Sourcemap
                            sourceMap: false,
                            // 启用 source map 后，将相对 URL 转换为绝对 URL
                            convertToAbsoluteUrls: false,
                            // 如果已定义，则style-loader将重用单个 <style> 元素
                            singleton: true
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            // 解析 URLs 路径, URLs 以 / 开头将不会被翻译
                            // url(/image.png) => url(/image.png)
                            // root: ".", url(/image.png) => url(./image.png)
                            root: /
                            // 启用/禁用css-modules模式
                            modules: false,
                            // 启用/禁用 @import 处理
                            import: true,
                            // 启用/禁用 url() 处理
                            url: true,
                            // 启用/禁用 压缩, 无效果
                            minimize: true,
                            // 启用/禁用 Sourcemaps
                            sourceMap: false,
                            // 导出以驼峰化命名的类名
                            camelCase: false,
                            // 在 css-loader 前应用的 loader 的数
                            importLoaders: 0,
                            // css作用域, 配置生成标识符
                            localIdentName: "[local]_[hash:base64:5]"
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            // 支持css-in-js
                            exec: undefined(Boolean),
                            // Set Parser
                            parser: undefined(String | Object),
                            // Set PostCSS Syntax
                            syntax: undefined(String | Object),
                            // Set PostCSS Stringifier
                            stringifier: undefined(String | Object),
                            // Set postcss.config.js config path && ctx
                            config: undefined(Object),
                            // Set PostCSS Plugins
                            plugins: [],
                            // Enable Source Maps
                            sourceMap: false(String|Boolean)
                        },

                        // postcss配置在postcss.config.js
                        module.exports = {
                            plugins: [
                                require("autoprefixer")({ browsers: ["last 2 versions", "> 1%"] })
                            ]
                        }
                        // postcss配置在webpack.config.js下的postcss:function
                        postcss: function() {
                            return [autoprefixer({ browsers: ["last 2 versions", "> 1%"] })]
                        }
                    }
                    {
                        // 从node_modules导入less模块，只需加~，@import "~bootstrap/less/bootstrap"
                        loader: "less-loader",
                        options: {
                            // 只有结合extract-text-webpack-plugin或者mini-css-extract-plugin才能使用sourceMap
                            sourceMap: true,
                            // 是否进行压缩
                            compress: false,
                            // 通过主题来修改less变量
                            modifyVars: theme,
                            // 在less中计算的时候会用到
                            strictMath: true,
                            // ie8兼容性
                            noIeCompat: true,
                            // 使用插件
                            plugins: [new CleanCSSPlugin({ advance: true })],
                            // less版本大于4的需要加上此属性
                            javascriptEnabled: true
                        }
                    }
                ]
            }
	    ]
	}

#### 配置生产模式下的less加载，文件分离，以及压缩css, 清除无用的css
	const MiniCssExtractPlugin = require("mini-css-extract-plugin");
	const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
	const PurifyCSSPlugin = require("purifycss-webpack"); // purifycss-webpack purify-css
	module: {
	    rules: [
	        {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    ...(同上)
                ]
            }
	    ]
	},
	plugins: [
	    new MiniCssExtractPlugin({
            filename: "[name]_[chunkhash:8].css",
            // 针对按需加载的js文件中的css文件
            chunkFilename: "[id]_[chunkhash:8].css"
        }),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'src/*.ejs'))
        })
	],
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({})
        ]
    }

#### 配置路劲解析, 处理路劲引用问题, file-loader, url-loader
    [ext]: 资源扩展名
    [name] 资源的基本名称
    [path] 资源相对于 context 查询参数或者配置的路径
    [hash] 内容的哈希值，默认为十六进制编码的 md5
    [<hashType>:hash:<digestType>:<length>]
        hashType, 即 sha1, md5, sha256, sha512
        digestType, 即 hex, base26, base32, base36, base49, base52, base58, base62, base64
        length 字符的长度
    outputPath: 自定义的输出路径
    publicPath: 自定义的发布目录
    module: {
        rules: [
            {
                test:/\.(eot|woff|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
                use: ["file-loader?name=[name]_[sha512:hash:base64:7].[ext]&publicPath=assets/&outputPath=src/images/"],
                ||
                use: ["file-loader?name=dist/assets/[name]_[sha512:hash:base64:7].[ext]"],
                include: path.resolve(__dirname, "src"),
            },
            {
                test:/\.(png|jpg|gif)$/,
                use: ["url-loader?limit=8192&name=[name]_[sha512:hash:base64:7].[ext]&publicPath=assets/&outputPath=src/images/"],
                ||
                use: ["url-loader?limit=8192&name=dist/assets/[name]_[sha512:hash:base64:7].[ext]"],
                include: path.resolve(__dirname, "src"),
            }
        ]
    }

#### 配置antd的js&css按需加载
    cnpm install babel-plugin-import --save-dev
    {
        presets: [],
        plugins: [
            ["import", { "libraryName": "antd", "style": true }]
        ]
    }

#### 配置生成html
    plugins: [
        new htmlWebpackPlugin({
            title: "react-webpack",
            template: "./src/index.ejs",
            inject: "body",
            ...
        })
    ]

#### 配置favicon图标
    cnpm install favicons-webpack-plugin --save-dev
    plugins: [
        new FaviconsWebpackPlugin({
            logo: "./images/head.jpg",
            prefix: "icons/",
            icons: {
                android: false,
                appleIcon: false,
                appleStartup: false,
                coast: false,
                favicons: true,
                firefox: false,
                opengraph: false,
                twitter: false,
                yandex: false,
                windows: false
            }
        }),
    ]

#### 配置解析
    resolve: {
        // 后缀名自动补全
        extensions: [".js", ".jsx", ".less", ".css"],
        // 配置别名
        alias: {
            '@': path.resolve(__dirname, "src"),
            ...
        },
        // 告诉 webpack 解析模块时应该搜索的目录
        modules: [path.resolve(__dirname, "src"), "node_modules"]
    }

#### 配置外部扩展, import的时候不会将其打包进来，而是在运行时去外部（<script>）获取这些扩展依赖
    externals: {
        jquery: "jQuery",
        ...
    }

#### 分离代码配置
    optimization: {
        splitChunks: {
            chunks: "all", // initial(初始块) || async(按需加载块) || all(全部块, 默认),
            minSize: 30000, // 表示在压缩前的最小模块大小, 默认为0, 3000
            minChunks: 2, // 表示被引用次数，默认为1,
            maxAsyncRequests: 5, // 最大的按需(异步)加载次数，默认为1,
            maxInitialRequests: 3, // 最大的初始化加载次数，默认为1,
            name: true, // 拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成,
            cacheGroups: { // 缓存组
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors"
                }
            },
            priority: 表示缓存的优先级, 及权重
            test: 缓存组的规则，表示符合条件的的放入当前缓存组，值可以是function、boolean、string、RegExp，默认为空,
            reuseExistingChunk: 表示可以使用已经存在的块，即如果满足条件的块已经存在就使用已有的，不再创建一个新的块
        }
    }

#### 服务端渲染

#### 代码检查

#### 测试

=========================================================================

#### 配置中相关问题
    - 懒加载react组件
    cnpm install --save-dev babel-plugin-syntax-dynamic-import
    .babelrc:
    plugins: ["syntax-dynamic-import"]

    ||

    - 转化懒加载组件
    cnpm install --save-dev babel-plugin-dynamic-import-node
    .babelrc:
        plugins: ["dynamic-import-node"]

    - class支持 load = () => {}写法
    cnpm install --save-dev babel-plugin-transform-class-properties
    .babelrc:
        plugins: ["transform-class-properties"]

    - 热更新
    对于react需要通过module.hot去处理;
    对于dva需要通过babel插件
    cnpm install --save-dev  babel-plugin-dva-hmr
    .babelrc:
            plugins: ["dva-hmr"]

    - 对css的class名加了hash则需要对antd的库和自身的库进行两次不一样的处理
    {
        loader: "css-loader",
        options: {
            modules: true,
            localIdentName: "[local]_[hash:base64:5]",
            // 启用压缩, 无效果
            minimize: true
        }
    }

    ||

    {
        loader: "css-loader"
    }
    - 并行执行库
    cnpm install --save-dev parallel-webpack



		
