const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.jsx",
    output: {
        filename: "[name].[hash:8].js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "test",
            template: `./src/index.ejs`,
            filename: `index.html`,
            // 压缩html
            minify: {
                minifyJS: true,
                minifyCSS: true,
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true // 删除空白符与换行符
            }
        }),
    ],
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [ __filename ] // 当你 CLI 自动添加它时，你可以忽略它
        }
    }
}