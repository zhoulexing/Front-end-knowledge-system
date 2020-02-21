const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    cache: {
        type: "filesystem"
    },
    mode: process.env.NODE_ENV,
    entry: './loadjs/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash:8].js',
        chunkFilename: "[name].[chunkhash:8].js"
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
            minify: {
                minifyJS: true,
                minifyCSS: true,
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true // 删除空白符与换行符
            },
        }),
    ].filter(Boolean),
    optimization: {
        chunkIds: "deterministic",
        moduleIds: "deterministic",
        splitChunks: {
            chunks: "all", 
            minSize: 30000, 
            maxSize: 100000,
            minChunks: 1,
            maxAsyncRequests: 30, 
            maxInitialRequests: 30, 
            automaticNameDelimiter: "~", 
            name: false,
            cacheGroups: { 
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            },
            minSize: {
                javascript: 0,
                style: 0,
            },
            maxSize: {
                javascript: 30000,
                style: 30000,
            }
        }
    },
}