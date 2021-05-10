const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

module.exports = {
    entry: "./jsonP/main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            maxAsyncRequests: 5,
            minSize: 30000,
            maxSize: 0,
            minChunks: 2,
        },
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: "server",
            generateStatsFile: true,
            statsOptions: { source: false },
        }),
    ],
};
