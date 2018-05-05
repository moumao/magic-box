const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
// webpack4 无法使用

const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.config.js');

const publicConfig = {

    devtool: 'cheap-module-source-map',

    plugins: [
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
          'process.env': {
              'NODE_ENV': JSON.stringify('production')
           }
        }),
        new CleanWebpackPlugin(['dist'])
    ]

};

module.exports = merge(commonConfig, publicConfig);
