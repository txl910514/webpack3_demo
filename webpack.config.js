/**
 * Created by txl-pc on 2017/7/6.
 */
var path = require('path');
var webpack = require("webpack");
let HtmlWebpackPlugin = require('html-webpack-plugin');
const utils = {
    assetsPath: function (_path) {
        return path.posix.join('static', _path)
    }
}
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
var pngUse = [
    {
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
    }
]
module.exports = {
    entry: {
        index: './src/js/index.js',
        merge: './src/js/merge.js',
        socket: './src/js/socket.js',
        indexeddb: './src/js/indexeddb.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('src')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use:[{
                  loader: 'babel-loader'
                }]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                exclude: /(node_modules|bower_components)/,
                use: pngUse
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),

        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: "index",
            filename: 'index.html',
            template: path.resolve(__dirname, './index.html'),
            chunks: ['index', 'vendor'],
            inject: true
        }),
        new HtmlWebpackPlugin({
            title: "merge",
            filename: 'merge_img.html',
            template: path.resolve(__dirname, './merge_img.html'),
            chunks: ['merge', 'vendor'],
            inject: true
        }),
        new HtmlWebpackPlugin({
            title: "socket",
            filename: 'socket.html',
            template: path.resolve(__dirname, './socket.html'),
            chunks: ['socket', 'vendor'],
            inject: true
        }),
        new HtmlWebpackPlugin({
            title: "indexeddb",
            filename: 'indexeddb.html',
            template: path.resolve(__dirname, './indexeddb.html'),
            chunks: ['indexeddb', 'vendor'],
            inject: true
        })
    ]
};