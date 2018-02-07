const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const utils = require("utils");


const name = "font.file";
module.exports = {
    entry: "./" + name + "/index.js",
    output: {
        path: path.resolve(__dirname, name),
        filename: "bundle.js"
    },
    module: {
        rules: [
            /*{
                test: /\.css$/,
                use: ["style-loader","css-loader"]
            },*/
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
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            limit: 100,
                            name: "fonts/[name].[hash:7].[ext]"
                        }
                    }
                ]
            }
        ]
    },
     plugins: [
        new ExtractTextPlugin({ 
            filename: '[name].css'
        }),
    ]
};