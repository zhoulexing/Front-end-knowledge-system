const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
};