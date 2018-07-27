const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
        filename: "[name].[chunkhash:8].js"
    },
    plugins: [
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
        }),
        new BundleAnalyzerPlugin({
            analyzerHost: '127.0.0.1',
            analyzerPort: 8888,
        })
    ]
}