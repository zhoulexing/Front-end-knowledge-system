const webpack = require("webpack");
const path = require("path");
const package = require("./package.json");
const AssetsPlugin = require('assets-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    entry: {
        //如果使用了chrome的vue-devtool，那打包的时候把vue也排除掉，因为压缩过的vue是不能使用vue-devtool的
        vendor: Object.keys(package.dependencies).filter((item) => {
            return item.indexOf('normalize') < 0 && item != 'vue';
        })
    },
    output: {
        path: path.resolve(__dirname, "dll"),
        filename: "dll.[name]_[hash:6].js",
        library: '[name]_[hash:6]'
    },
    plugins: [
        new CleanWebpackPlugin(["dll"]),
        new webpack.DllPlugin({
            path: path.join(__dirname, 'dll/', '[name]-manifest.json'),
            name: '[name]_[hash:6]'
        }),
        new AssetsPlugin({
            filename: 'bundle-config.json',
            path: './dll/'
        })
    ]
}