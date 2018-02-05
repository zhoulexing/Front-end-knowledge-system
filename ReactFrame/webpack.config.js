const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry: __dirname + "/app/entries/index.js",
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "大前端之react",//生成的html文件的标题为'match'
            template: "app/entries/index.ejs",//生成的html文件名称为'index.html'
            inject: "body"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("[name].[contenthash].css")
    ],
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.(less|css)$/,
                use: ExtractTextPlugin.extract({
                    use:[ 'css-loader','less-loader'],
                    //fallback: 'style-loader',
                }),
            }
        ]
    },
    devServer: {
        host: "127.0.0.1",
        port: 8080,
        historyApiFallback: true,
        inline: true,
        proxy: {
            "/api/": {
                target: "http://127.0.0.1:8080",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    }
};