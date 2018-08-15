const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        main: "./index.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        // chunkhash不能与devServer一起使用
        filename: "[name].[hash:8].js"
    },
    devtool: "",
    module: {},
    plugins: [
        new htmlWebpackPlugin({
            title: "react-webpack",
            template: "./index.ejs",
            inject: "body"
        }),
    ],
    devServer: {
        // 设置基本目录结构
        contentBase: path.resolve(__dirname, "dist"),
        // 服务器ip
        host: "127.0.0.1",
        // 配置端口号
        port: 9000,
        // 服务端压缩是否开启
        compress: true,
        // 热更新, 需要在命令行加--hot或者在plugins里添加webpack.HotModuleReplacementPlugin()
        hot: true
    }
};