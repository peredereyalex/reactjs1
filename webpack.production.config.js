var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var settings = {
	plugins: [
	    new webpack.optimize.UglifyJsPlugin({
	    	minimize: true,
		}),
	    new webpack.optimize.DedupePlugin(),
	    new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		})
	],
	module: ['es2015', 'react']
}

module.exports = {
    entry: {
        bundle: './dev/react/App.jsx'
    },
    output: {
        filename: './assets/js/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                   presets: settings.module
                }
            }
        ]
    },
    plugins: settings.plugins,
    devServer: {
        historyApiFallback: true
    }
};
