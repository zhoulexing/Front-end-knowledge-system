const path = require('path');

module.exports = {
    mode: 'development',
    entry: './client/v2/index.js',
    output: {
        path: path.resolve(__dirname, '../../dist/v2/static'),
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