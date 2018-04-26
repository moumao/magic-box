const path = require('path');

module.exports = {

    /*入口*/
    entry: path.join(__dirname, 'src/index.js'),

    /*输出到dist文件夹，输出文件名字为bundle.js*/
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$$/,
                use: ['babel-loader?cacheDirectory=true'],
                include: path.join(__dirname, 'src')
            },
            {
            test: /\.(png|svg|jpg|gif|ico)$/,
                use: [
                    'file-loader?name=[name].[ext]'
                ]
            }
        ]
    },

    devServer: {
        port: 3002,
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true
    }
};