module.exports = {
  plugins: {
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009'
      },
      stage: 3,
      features: {
        'custom-properties': false,
      },
    },
    'postcss-px-to-viewport': {
      unitToConvert: 'px',    // 需要转换的单位
      viewportWidth: 750,     // 设计稿宽度
      unitPrecision: 3,       // 转换小数点精度
      propList: [             // 需转换的属性， *为全部转换
        '*'
      ],
      viewportUnit: 'vw',     // 转换后的单位
      fontViewportUnit: 'vw', // 同上
      selectorBlackList: [],  // 转换黑名单，用于屏蔽一些 css rule中不需要转换的 class(id,tag等)
      minPixelValue: 1,       // 最小不转换单位，比如1px
      mediaQuery: false,      // 是否转换@media中的内容
      replace: true,
      exclude: []
      // exclude: /(\/|\\)(node_modules)(\/|\\)/,  // 排除目录
    }
  },
}