const CompressionWebpackPlugin = require('compression-webpack-plugin')

const productionGzipExtensions = ['js', 'css']
const needGzipBuild = process.env.VUE_APP_GZIP === 'gzip'
const path = require('path')
module.exports = {
  baseUrl: process.env.BASE_URL,
  // 去掉打包的sourceMap
  productionSourceMap: false,
  css: {
    sourceMap: true
  },
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: [path.resolve('src/styles/*.scss')]
        })
        .end()
    })
  },
  // 配置 webpack-dev-server 行为。
  devServer: {
    open: false,
    // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/cli-service.md#配置代理
    proxy: {
      '/rest': {
        target: 'http://192.168.0.171:8090',
        changeOrigin: true
      },
      '/file': {
        target: 'http://192.168.0.171:8085',
        changeOrigin: true
      },
      '/oauth': {
        target: 'http://192.168.0.171:8090',
        changeOrigin: true
      },
      '/data': {
        target: 'http://192.168.0.171:8088',
        changeOrigin: true
      }
    }
    // proxy: 'http://192.168.0.155:8090' // string | Object
    // proxy: 'http://192.168.0.35:8088'
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 启用Gzip压缩
      if (needGzipBuild) {
        config.plugins.push(new CompressionWebpackPlugin({
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp(
            '\\.(' + productionGzipExtensions.join('|') + ')$'
          ),
          threshold: 10240,
          minRatio: 0.8
        }))
      }
    }
  }
}
