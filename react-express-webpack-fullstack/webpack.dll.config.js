const path = require("path");
const webpack = require("webpack");
const package = require("./package.json");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
	entry: {
		vendor: ["react", "react-dom", "react-router", "react-router-dom", "react-redux"]
	},
	output: {
		path: path.resolve(__dirname, "dll"),
		filename: "[name].dll.js"
	},
	plugins: [
		new CleanWebpackPlugin("dll"),
		new webpack.DllPlugin({
			path: path.resolve(__dirname, "dll/", "[name].manifest.json"),
			name: "[name].dll.js"
		})
	]
}