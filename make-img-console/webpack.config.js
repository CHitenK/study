const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin') // 压缩
// const CleanWebpackPlugin  = require('clean-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin");
 module.exports = {
    devtool: false, //'inline-source-map',
    entry: {
        index: './src/index.js',
        vendor: ['react','react-dom','react-router-dom', 'antd', 'axios']
    },
    output: {
        publicPath: '/',
        // filename: '[name].[chunkhash:8].js',//'[name].bundle.js',
        // path: path.resolve(__dirname, 'build')
        // filename: '[name].[chunkhash:8].js',
        filename: '[name].js', //出口名称
        // filename: 'bundle.js',
        // filename: "[name]-[hash].js",
        path: path.resolve(__dirname, 'build')
    },
    resolve:{
        extensions:['.js','.css','.json'] //用于配置程序可以自行补全哪些文件后缀
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
        }
       ]
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
                // target: 'http://chimke.cn:8088',
                changeOrigin: true,
              }
        }
    },
    plugins: [
      new CompressionPlugin({
        //asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      }),
        new ExtractTextPlugin("[name].[hash].css"),
        // new ExtractTextPlugin("/css/[name].css"),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlPlugin({
            template: 'src/index.html'
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //   names: ['vendor'],
        //   minChunks: Infinity,
        //   filename: 'common.bundle.[chunkhash].js',
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     filename: "vendor.js",
        //     // (Give the chunk a different name)
      
        //     minChunks: Infinity,
        //     // (with more entries, this ensures that no other module
        //     //  goes into the vendor chunk)
        //   }),
        new UglifyJSPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
    // optimization: {
    //     splitChunks: {
    //         // async表示只从异步加载得模块（动态加载import()）里面进行拆分
    //         // initial表示只从入口模块进行拆分
    //         // all表示以上两者都包括
    //         chunks: "all",
    //         minSize: 30000,   // 大于30k会被webpack进行拆包
    //         minChunks: 1,     // 被引用次数大于等于这个次数进行拆分
    //         // import()文件本身算一个
    //         // 只计算js，不算css
    //         // 如果同时有两个模块满足cacheGroup的规则要进行拆分，但是maxInitialRequests的值只能允许再拆分一个模块，那尺寸更大的模块会被拆分出来
    //         maxAsyncRequests: 2,  // 最大的按需加载（异步）请求次数
    //         // 最大的初始化加载请求次数,为了对请求数做限制，不至于拆分出来过多模块
    //         // 入口文件算一个
    //         // 如果这个模块有异步加载的不算
    //         // 只算js，不算css
    //         // 通过runtimeChunk拆分出来的runtime不算在内
    //         // 如果同时又两个模块满足cacheGroup的规则要进行拆分，但是maxInitialRequests的值只能允许再拆分一个模块，那尺寸更大的模块会被拆分出来
    //         maxInitialRequests: 3,
    //         automaticNameDelimiter: '-', // 打包分隔符
    //         name:true,
    //         cacheGroups: {
    //             // 默认的配置
    //             vendors: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 priority: -10
    //             },
    //             // 默认的配置，vendors规则不命中的话，就会命中这里
    //             default: {
    //                 minChunks: 2, // 引用超过两次的模块 -> default
    //                 priority: -20,
    //                 reuseExistingChunk: true
    //             },
    //         },
    //     }
    // }  
}