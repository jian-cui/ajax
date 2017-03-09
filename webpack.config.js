var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        './src/ajax.js'
    ],
    output: {
        // path: 'dist/',
        path: '../mysite/frontend/src/common/',
        filename: 'ajax.js',
        library: 'ajax',
        libraryTarget: 'umd'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: [
                path.resolve(__dirname, 'dist'),
                path.resolve(__dirname, 'node_modules'),
            ],
            loaders: 'babel-loader',
            options: {
                presets: ['es2015']
            }
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: true,
          }
        }),
    ]
}