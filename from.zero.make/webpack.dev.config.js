const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const manifest = require('./dll/vendor-manifest.json');
const bundleConfig = require("./dll/bundle-config.json");
const hasDlls = fs.existsSync('./dll/vendor-manifest.json');

module.exports = {
    entry: {
        index: "./entry/entry.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        // 热更新和chunkhash不能一起使用，二者只能用一个
        filename: "[name].[hash:8].js"
    },
    devServer: {
        hot: true, // 开启热替换
        contentBase: path.join(__dirname, "dist"),
        compress: false,
        port: 9000
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.(less|css)$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    use:[ 'css-loader','less-loader'],
                    fallback: 'style-loader',
                }),
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].[hash:8].css',
            disable: false,
            allChunks: true
        }),
        new CopyWebpackPlugin([
            {
                from: "./dll",
                to: "./dll"
            }
        ]),
        new HtmlWebpackPlugin({
            title: 'webpack',
            template: './entry/entry.ejs',
            inject: 'body',
            hasDll: !!hasDlls,
            bundleName: bundleConfig.vendor.js
        }),
        new webpack.DllReferencePlugin({
            manifest
        })
    ]
}