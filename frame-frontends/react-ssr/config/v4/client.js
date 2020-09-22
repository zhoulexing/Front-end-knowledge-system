const path = require('path');

module.exports = {
    mode: 'development',
    entry: './client/v4/index.js',
    output: {
        path: path.resolve(__dirname, '../../dist/v4/static'),
        filename: 'index.js'
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
};