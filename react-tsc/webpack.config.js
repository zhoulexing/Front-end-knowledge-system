const path = require("path");
const os = require("os");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCss = require("optimize-css-assets-webpack-plugin");
const HappyPack = require("happypack");

const IS_PRO = process.env.NODE_ENV === "production";
const sourcePath = path.resolve(__dirname, "./src");
const outPath = path.resolve(__dirname, "./dist");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });


module.exports = {
    mode: process.env.NODE_ENV,

    context: sourcePath,

    entry: "./index.tsx",

    output: {
        path: outPath,
        filename: "[name].js",
        chunkFilename: "[name].[hash:8].js",

        library: "reactTsc-[name]",
        libraryTarget: "umd",
        jsonpFunction: `webpackJsonp_reactTsc`
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/, // @babel/plugin-transform-typescript和@babel/preset-typescript
                exclude: /node_modules/,
                use: ["happypack/loader?id=ts"]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ["happypack/loader?id=js"]
            },
            {
                test: /\.(less|css)$/,
                exclude: /node_modules/,
                use: [
                    IS_PRO ? MiniCssExtractPlugin.loader : "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: !IS_PRO,
                            modules: {
                                localIdentName: "[local]--[hash:base64:5]"
                            }
                        }
                    },
                    "postcss-loader?cacheDirectory=true",
                    {
                        loader: "less-loader",
                        options: {
                            cacheDirectory: true,
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.(less|css)$/,
                include: /node_modules/,
                use: [
                    IS_PRO ? MiniCssExtractPlugin.loader : "style-loader",
                    "css-loader",
                    {
                        loader: "less-loader",
                        options: {
                            cacheDirectory: true,
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    "url-loader?limit=8192&name=images/[name]_[sha512:hash:base64:7].[ext]"
                ],
                include: sourcePath
            },
            {
                test: /\.(eot|woff|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
                use: [
                    "file-loader?name=iconfont/[name]_[sha512:hash:base64:7].[ext]"
                ],
                include: sourcePath
            }
        ]
    },

    devtool: IS_PRO ? "hidden-source-map" : "source-map", // cheap-module-eval-source-map

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        modules: ["node_modules"],
        alias: {
            "@": sourcePath
        }
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: "前沿前端",
            template: `./index.ejs`,
            filename: `index.html`,
            // 压缩html
            minify: {
                minifyJS: true,
                minifyCSS: true,
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true // 删除空白符与换行符
            }
            // append: {
            // body:"",
            // head: ""
            // }
        }),

        new webpack.HotModuleReplacementPlugin(),
        new HappyPack({
            id: "js",
            loaders: ["babel-loader?cacheDirectory=true"],
            threadPool: happyThreadPool,
            verbose: true // 是否允许happypack输出日志
        }),
        new HappyPack({
            id: "ts",
            loaders: [
                "babel-loader?cacheDirectory=true",
                "ts-loader?happyPackMode=true"
            ],
            threadPool: happyThreadPool,
            verbose: true
        }),
        new OptimizeCss({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require("cssnano"),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash:8].css",
            chunkFilename: "[name].[contenthash:8].css",
            disable: !IS_PRO
        })
    ].filter(Boolean),

    optimization: {
        usedExports: true,
        splitChunks: {
            chunks: "all",
            minSize: 30000,
            maxSize: 0,
            minChunks: 2,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: "~",
            name: true,
            cacheGroups: {
                styles: {
                    name: "styles",
                    test: /\.(less|css)$/,
                    chunks: "all",
                    minChunks: 1,
                    reuseExistingChunk: true,
                    enforce: true
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    priority: -10
                },
                commons: {
                    chunks: "initial",
                    minChunks: 2,
                    priority: -20,
                    maxInitialRequests: 5,
                    minSize: 0
                }
            }
        }
    },

    devServer: {
        headers: {"Access-Control-Allow-Origin": "*"},
        contentBase: sourcePath,
        compress: true,
        hot: true,
        historyApiFallback: true,
        host: "0.0.0.0",
        port: 8081
    }
};
