module.exports = {
    // 打包的目录
    devServer: {
        proxy: {
            '/api': {
                target: 'http://59.41.101.237:9892', //对应服务器地址
                // target: 'http://59.41.101.237:9892',
                // target: 'http://new.topideal.mobi',
                changeOrigin: true, //允许跨域
                ws: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        }
    },
    chainWebpack: config => {
        const oneOfsMap = config.module.rule('less').oneOfs.store
        oneOfsMap.forEach(item => {
            item.use('sass-resources-loader').loader('sass-resources-loader').options({
                    // Provide path to the file with resources
                    resources: './src/assets/css/public.less',
                    // Or array of paths
                    // resources: ['./path/to/vars.scss', './path/to/mixins.scss']
                })
                .end()
        })
    },
    
  lintOnSave: false,
  productionSourceMap:false,
};
