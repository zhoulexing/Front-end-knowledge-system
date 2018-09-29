<<<<<<< HEAD
const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const manifest = require('./dll/vendor-manifest.json');
const hasDlls = fs.existsSync('./dll/vendor-manifest.json');

module.exports = {
    mode: "development",
    entry: {
        main: "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        // chunkhash不能与devServer一起使用
        filename: "[name].[hash:8].js"
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: "[local]_[hash:base64:5]"
                        }
                    },
                    "postcss-loader",
                    "less-loader"
                ],
                include: path.resolve(__dirname, "src")
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // 模板插件
        new htmlWebpackPlugin({
            title: "react-webpack",
            //favicon: "./public/favicon.png",
            template: "./src/index.ejs",
            inject: "body",
            hasDll: !!hasDlls,
            bundleName: manifest.name
        }),
        // 用来检索分离出的第三方库
        new webpack.DllReferencePlugin({ manifest, context: "./dll" }),
        new CopyWebpackPlugin([
            { from: "./dll", to: "./dll" },
            { from: "./images", to: "./images" }
        ]),
        /*new FaviconsWebpackPlugin({
            logo: "./public/favicon.png",
            prefix: "icons/",
            icons: {
                android: false,
                firefox: false,
                appleStartup: false
            }
        })*/
    ],
    devServer: {
        // 设置基本目录结构
        contentBase: path.resolve(__dirname, "dist"),
        // 服务器ip
        host: "127.0.0.1",
        // 配置端口号
        port: 9000,
        // 设置为true，当源文件改变时会自动刷新页面
        inline: true,
        // 服务端压缩是否开启
        compress: true,
        // 热更新, 需要在命令行加--hot或者在plugins里添加webpack.HotModuleReplacementPlugin()
        hot: true
    }
=======
const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const apiMocker = require("webpack-api-mocker");

const manifest = require('./dll/vendor-manifest.json');
const hasDlls = fs.existsSync('./dll/vendor-manifest.json');

module.exports = {
    mode: "development",
    entry: {
        main: "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        // chunkhash不能与devServer一起使用
        filename: "[name].[hash:8].js"
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ["babel-loader"],
                include: path.resolve(__dirname, "src")
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: "[local]_[hash:base64:5]"
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
                        }
                    }
                ],
                include: path.resolve(__dirname, "src")
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // 模板插件
        new htmlWebpackPlugin({
            title: "react-webpack",
            favicon: "./images/favicon.ico",
            template: "./src/index.ejs",
            inject: "body",
            hasDll: !!hasDlls,
            bundleName: manifest.name
        }),
        // 用来检索分离出的第三方库
        new webpack.DllReferencePlugin({ manifest, context: "./dll" }),
        new CopyWebpackPlugin([
            { from: "./dll", to: "./dll" },
            { from: "./images", to: "./images" }
        ]),
        new MiniCssExtractPlugin({
            filename: "[name]_[chunkhash:8].css",
            chunkFilename: "[id]_[chunkhash:8].css"
        }),
    ],
    devServer: {
        before(app) {
            apiMocker(app, path.resolve("./mocker/index.js"))
        },
        // 设置基本目录结构
        contentBase: path.resolve(__dirname, "dist"),
        // 服务器ip
        host: "127.0.0.1",
        // 配置端口号
        port: 9000,
        // 设置为true，当源文件改变时会自动刷新页面
        inline: true,
        // 服务端压缩是否开启
        compress: true,
        // 热更新, 需要在命令行加--hot或者在plugins里添加webpack.HotModuleReplacementPlugin()
        hot: true
    }
>>>>>>> 329e955cdf99505048ec277f0980a9c01dba27d2
};