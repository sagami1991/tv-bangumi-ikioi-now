const CopyWebpackPlugin = require('copy-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const dateFormat = require('dateformat');

module.exports = {
	entry: ["./src/ts/app.ts"],
	output: {
		path:"../server/public",
		filename: "bundle.js",
	},
	devtool: "source-map",
	resolve: {
		extensions: ["", ".ts", ".js"],
		alias: {
			handlebars: 'handlebars/dist/handlebars.min.js'
		}
	},
	module: {
		loaders: [
			{ test: /\.ts?$/, loader: "ts-loader" },
			{ test: /\.html$/, loader: 'raw'},
			{ test: /\.json$/, loader: 'json'},
			{ test: /\.scss$/, loaders: ['style', 'css', 'sass'] },
			{ test: /\.png$/, loader: "url?limit=10000&mimetype=image/png" },
			{ test: /\.jpg$/, loader: "url?limit=10000&mimetype=image/jpeg" },
		]
	},
	plugins: [
		new CopyWebpackPlugin([
			{ from: 'src/index.html', to: 'index.html' },
			{ from: 'src/loading.css', to: 'loading.css' },
			{ from: 'src/assets', to: 'assets' },
		]),
		new DefinePlugin({
			LAST_UPDATED: `"${dateFormat(new Date(),"yyyy/mm/dd HH:MM")}"`,
		}),
	],
};