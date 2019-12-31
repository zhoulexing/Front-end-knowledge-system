const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCss = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: './loadcss/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:8].js'
    },
    module: {
        rules: [{
            test: /\.(css|less)$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
            }, {
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                }
            }, {
                loader: 'postcss-loader'
            }, {
                loader: 'less-loader',
                options: {
                    javascriptEnabled: true
                }
            }]
        }, {
            test: /\.style.js$/,
            use: [
                'style-loader',
                { loader: 'css-loader', options: { importLoaders: 2 } },
                { loader: 'postcss-loader', options: { parser: 'postcss-js' } },
                'babel-loader'
            ]
        }, {
            test: /\.(png|jpg|gif)$/,
            use: ["url-loader?limit=1024&name=[name]_[sha512:hash:base64:7].[ext]"],
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './loadcss/index.ejs',
            filename: 'index.html',
            minify: process.env.NODE_ENV === 'production' ? {
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true
            } : {}
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css',
        }),
        process.env.NODE_ENV === 'production' ?
        new OptimizeCss({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }) : null,
    ].filter(Boolean)
}