const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

 module.exports = {
    devtool: 'inline-source-map',
    entry: {
        index: './src/index.js'
    },
    output: {
        publicPath: '/',
        filename: 'bundle.js',
        path: __dirname + '/build' //path.resolve(__dirname, 'build')
    },
    module: {
        rules: [{
            test: /\.css$/,
            loader:['style-loader', 'css-loader']
        }, {
            test: /\.scss$/,
            loader: ['style-loader', 'css-loader', 'sass-loader']
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: 'img/[name].[hash:7].[ext]'
            }
        }, {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    devServer: {
        contentBase: './build',
        port: 7777,
        inline: true,
        hot: true,
        open: true,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:2020',
                changeOrigin: true,
              }
        }
    },
    plugins: [
        new ExtractTextPlugin("styles.css"),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlPlugin({
            template: 'src/index.html'
        })
    ]
}