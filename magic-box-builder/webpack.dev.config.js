const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.config.js');

const devConfig = {

    devtool: 'inline-source-map',

    /*输出到dist文件夹，输出文件名字为bundle.js*/
    output: {
        filename: '[name].[hash].js',
    },

    devServer: {
        port: 3002,
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true,
        hot: true
    }

};

module.exports = merge(commonConfig, devConfig);
