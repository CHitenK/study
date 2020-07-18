const path = require('path')
const { injectBabelPlugin } = require('react-app-rewired')
const rewireLess = require('react-app-rewire-less')
const rewirePostcss = require('react-app-rewire-postcss');
const px2rem = require('postcss-px2rem')
module.exports = function override(config, env) {
    config = injectBabelPlugin(['import', { libraryName: 'antd-mobile', style: 'css' }], config)
    config = rewireLess.withLoaderOptions({
        modifyVars: { "@primary-color": "#1DA57A" },
    })(config, env)
    // 重写postcss
    rewirePostcss(config,{
        plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
                autoprefixer: {
                    flexbox: 'no-2009',
                },
                stage: 3,
            }),
           //关键:设置px2rem
            px2rem({
                remUnit: 75,
                exclude:/node-modules/
            })
        ],
    })
    config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, 'src')
    }
    return config
}