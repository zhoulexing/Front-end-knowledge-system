const path = require('path');

module.exports = {
    mode: 'development',
    entry: './loadcss/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:8].js'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.(css|less)$/,
            use: ['css-loader']
        }]
    }
}