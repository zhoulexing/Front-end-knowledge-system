const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: "./img.handle/index.js",
    output: {
        path: path.resolve(__dirname, "img.handle"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            /*  {
                 test: /\.css$/,
                 use: ["style-loader","css-loader"]
             }, */
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
                            //publicPath: "./img.handle/",
                            name: "[name].[hash].[ext]",
                            outputPath: "./img/"
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