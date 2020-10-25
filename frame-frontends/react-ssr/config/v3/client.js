const path = require('path');

module.exports = {
    mode: 'development',
    entry: './client/v3/index.js',
    output: {
        path: path.resolve(__dirname, '../../dist/v3/static'),
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