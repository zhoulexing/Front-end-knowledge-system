const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require("webpack");


const DIR_NAME = "loader.source";
module.exports = {
    entry: `./${DIR_NAME}/index.js`,
    output: {
        path: path.resolve(__dirname, DIR_NAME),
        filename: "js/bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/,  
                use: ExtractTextPlugin.extract({ //将css变成外联模式
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                modules: true, //模块化
                                localIdentName: "[local]_[hash:base64:5]" //给类名添加hash，如果不想添加则用:global包起来
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: true,
                                config: {
                                    path: ".postcssrc.js" //在当前目录下的.postcssrc.js有相关配置
                                }
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 100, //超过100采用file-loader
                            //publicPath: "./loader.source/",
                            name: "./images/[name].[hash:base64:5].[ext]",
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
                    {
                        loader: "url-loader", //file-loader
                        options: {
                            limit: 10000,
                            name: "./fonts/[name].[hash:7].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.(htm|html)$/i,
                use: ["html-withimg-loader"]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[name].css'
        }),
    ]
};