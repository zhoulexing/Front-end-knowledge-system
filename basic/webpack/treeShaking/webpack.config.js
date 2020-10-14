const path = require('path');

module.exports = {
    entry: './treeShaking/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    }
}