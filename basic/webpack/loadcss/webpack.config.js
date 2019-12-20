const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
                loader: 'style-loader',
                options: {
                    injectType: 'singletonStyleTag', 
                }
            }, {
                loader: 'postcss-loader',
                options: {
                    // parser: 'sugarss',
                    config: {
                        path: './loadcss/'
                    },
                    // exec: true,
                }
            }, {
                loader: 'less-loader'
            }]
        }, {
            test: /\.style.js$/,
            use: [{
                loader: 'style-loader',
                options: {
                    injectType: 'singletonStyleTag', 
                }
            }, {
                loader: 'postcss-loader',
                options: {
                    exec: true
                }
            }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './loadcss/index.ejs',
            filename: 'index.html'
        })
    ]
}