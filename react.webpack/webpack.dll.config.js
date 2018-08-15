const package = require("./package.json");
const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
    entry: {
        vendor: Object.keys(package.dependencies).filter(item => {
            return item.indexOf('normalize') < 0;
        })
    },
    output: {
        path: path.resolve(__dirname, "dll"),
        filename: "dll.[name]_[hash:6].js",
        // 设置library名称, 配合libraryTarget可以设置模块类型的变量
        library: "[name]_[hash:6]"
    },
    plugins: [
        new CleanWebpackPlugin(["dll"]),
        // 将第三方库生成一个js和一个json文件
        new webpack.DllPlugin({
            path: path.resolve(__dirname, "dll/", "[name]-manifest.json"),
            name: "dll.[name]_[hash:6].js"
        }),
        new AssetsPlugin({
            filename: 'bundle-config.json',
            path: './dll/'
        })
    ]
}