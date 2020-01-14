const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: './loadjs/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:8].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader'
            }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './loadjs/index.ejs',
            filename: 'index.html',
            minify: process.env.NODE_ENV === 'production' ? {
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true
            } : {}
        }),
    ].filter(Boolean)
}