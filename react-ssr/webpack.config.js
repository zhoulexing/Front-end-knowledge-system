const webpack = require('webpack');

module.exports = {
    entry: './client/index.js',
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'public'),
        publicPath: '/'
    },
    resolve: {
        extensions: [".js", ".jsx", ".less", ".css"],
        modules: ["node_modules"],
        alias: require("./client/alias")
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel-loader'],
            }
        ]
    }
};