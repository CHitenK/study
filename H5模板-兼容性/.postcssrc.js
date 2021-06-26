module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px2rem': {
      postcss: function() {
        return [require('postcss-px2rem')({remUnit: 75})];
      }
    }
  }
}
