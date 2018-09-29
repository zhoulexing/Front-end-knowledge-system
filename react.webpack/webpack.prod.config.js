const path = require("path");
const fs = require("fs");
const glob = require("glob");
const webpack = require("webpack");
const package = require("./package.json");
const htmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CleanCSSPlugin = require("less-plugin-clean-css");
const PurifyCSSPlugin = require('purifycss-webpack');
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const manifest = require('./dll/vendor-manifest.json');
const hasDlls = fs.existsSync('./dll/vendor-manifest.json');

const themePath = path.resolve(__dirname, package.theme);
const theme = require(themePath);

module.exports = {
    mode: "development",
    entry: {
        main: "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        // chunkhash不能与devServer一起使用
        filename: "[name].[chunkhash:8].js"
    },
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
        new CleanWebpackPlugin(["dist"]),
        // 模板插件
        new htmlWebpackPlugin({
            title: "react-webpack",
            template: "./src/index.ejs",
            //favicon: "./icons/favicon.ico",
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
        // 性能分析插件
        /*new BundleAnalyzerPlugin({
            analyzerHost: '127.0.0.1',
            analyzerPort: 8888
        }),*/
        // 分离css
        new MiniCssExtractPlugin({
            filename: "[name]_[chunkhash:8].css",
            chunkFilename: "[id]_[chunkhash:8].css"
        }),
        /*new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'src/index.ejs')),
            purifyOptions: {
                whitelist: ['*purify*']
            }
        })*/
    ],
    /*optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({})
        ]
    },*/
};