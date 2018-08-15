const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const manifest = require('./dll/vendor-manifest.json');
const bundleConfig = require("./dll/bundle-config.json");
const hasDlls = fs.existsSync('./dll/vendor-manifest.json');

module.exports = {
    mode: "production",
    entry: {
        main: "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        // chunkhash不能与devServer一起使用
        filename: "[name].[chunkhash:8].js"
    },
    module: {},
    plugins: [
        // 模板插件
        new htmlWebpackPlugin({
            title: "react-webpack",
            template: "./src/index.ejs",
            inject: "body",
            hasDll: !!hasDlls,
            bundleName: bundleConfig.vendor.js
        }),
        // 用来检索分离出的第三方库
        new webpack.DllReferencePlugin({ manifest }),
        new CopyWebpackPlugin([
            { from: "./dll", to: "./dll" }
        ]),
        // 性能分析插件
        new BundleAnalyzerPlugin({
            analyzerHost: '127.0.0.1',
            analyzerPort: 8888
        })
    ]
};