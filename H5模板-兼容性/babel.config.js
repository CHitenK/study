module.exports = {
  presets: [
    '@vue/app'
  ],
  /* plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]*/
  'plugins': [['component',
    {
      'libraryName': 'mint-ui',
      'style': true
    }
  ]]
}
