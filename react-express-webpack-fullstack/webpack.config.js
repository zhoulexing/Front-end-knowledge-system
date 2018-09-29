const webpack = require("webpack");
const path = require("path");

const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const Uglifyjs = require("uglifyjs-webpack-plugin");

const alias = require("./src/alias");
const proxy = require("./src/proxy");
const theme = require("./src/theme");

const ENV = process.env.NODE_ENV || "development";
const IS_PROD = ENV === "production";

const SOURCE_DIR = path.resolve(__dirname, "src");
const OUTPUT_DIR = path.resolve(__dirname, "client");

module.exports = {
    entry: "./index.js",
    context: SOURCE_DIR,
    output: {
        path: OUTPUT_DIR,
        // chunkhash不能与devServer一起使用
        filename: "[name].[hash:8].js",
        chunkFilename: "[name].[chunkhash:8].js"
    },
    devServer: {
        contentBase: OUTPUT_DIR,
        host: "127.0.0.1",
        port: 9000,
        inline: true,
        // 服务端压缩
        compress: true,
        hot: true,
        //progress: true,
        // 路劲跳转始终执向index.html
        historyApiFallback: true,
        // 设置代理
        proxy: proxy
    },
    devtool: IS_PROD ? "source-map" : "eval-source-map", // inline-source-map || eval-source-map
    resolve: {
        // 配置别名
        alias: alias,
        extensions: [".js", ".jsx", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ["babel-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: "[local]_[hash:base64:5]",
                            // 启用压缩, 无效果
                            minimize: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "less-loader",
                        options: {
                            modifyVars: theme,
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                include: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "less-loader",
                        options: {
                            modifyVars: theme,
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test:/\.(eot|woff|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
                use: ["file-loader?name=client/assets/iconfont/[name]_[sha512:hash:base64:7].[ext]"],
                exclude: /node_modules/
            },
            {
                test:/\.(png|jpg|gif|svg)$/,
                // 图片大小小雨8192采用data_url方式加载图片
                use: ["url-loader?limit=8192&name=client/assets/images/[name]_[sha512:hash:base64:7].[ext]"],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        // 热更新
        new webpack.HotModuleReplacementPlugin(),
        // 设置html模板
        new htmlWebpackPlugin({
            template: "./index.ejs",
            title: "众智平台",
            favicon: "assets/images/favicon.ico",
            inject: true
        }),
        // 对分离的css进行命名
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash:8].css",
            chunkFilename: "[id].[chunkhash:8].css"
        }),
        // new Uglifyjs()
    ],
    // 分离第三方库
    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "initial"
                }
            }
        },
        // 在生产模式下对css进行压缩
        minimizer: [
            new OptimizeCSSAssetsPlugin({})
        ]
    }
}