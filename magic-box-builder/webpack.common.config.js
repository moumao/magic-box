const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

    /*入口*/
    entry: {
        app: [
            "babel-polyfill",
            path.join(__dirname, 'src/index.js')
        ],
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
    },

    /*输出到dist文件夹，输出文件名字为bundle.js*/
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        publicPath : '/'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                include: path.join(__dirname, 'src'),
                use:
                // ExtractTextPlugin.extract(
                    [{
                        loader: 'style-loader'
                      }, {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                      },{
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9' // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009',
                                })
                           ]
                        },
                      },
                    ],
                // )
            },
            {
              test: /\.css$/,
              include: /node_modules|antd\.css/,
              use: [{
                  loader: 'style-loader'
                }, {
                  loader: 'css-loader',
                }
              ],
            },
            {
                test: /\.(js|jsx)$$/,
                use: ['babel-loader?cacheDirectory=true'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            }
        ]
    },

    plugins: [
        // new ExtractTextPlugin('[name].[chunkhash].css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        }),
        new webpack.HashedModuleIdsPlugin()
    ],

    optimization: {
          runtimeChunk: {
              name: "runtime"
          },
          splitChunks: {
              name: 'vendor'
          }
    },

    resolve: {
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            component: path.join(__dirname, 'src/component'),
            router: path.join(__dirname, 'src/router'),
            actions: path.join(__dirname, 'src/redux/actions'),
            reducers: path.join(__dirname, 'src/redux/reducers')
        }
    }

};
