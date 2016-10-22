const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const webpackMerge = require('webpack-merge');
const devConfig = require('./webpack.dev.js');

module.exports = webpackMerge(devConfig, {
	devtool: "",
	plugins: [
		new DedupePlugin(),
		new UglifyJsPlugin({
			beautify: false, //prod
			mangle: { screw_ie8 : true }, //prod
			compress: { screw_ie8: true }, //prod
			comments: false //prod
		})
	],
});