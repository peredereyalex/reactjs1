var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var settings = {
	plugins: [
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
