
module.exports = {
  publicPath: '/jm',
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 7799,
    https: false,
    hotOnly: false,
    proxy: {
      '/': {
        target: 'https://corss-aws.topgoods.mobi', //  代理 测试环境
        changeOrigin: true
      }
    },
    before: app => {
    }
  }
}
