const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = 

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:8].js'
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: ['loader']
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "React Origin Code",
            template: `./src/index.ejs`,
            filename: `index.html`,
            // 压缩html
            minify: {
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true
            }
        }),
    ]
}