module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    browser: true
  },
  extends: ['./src/api/.eslintrc.js'],
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  settings: {
    'html/html-extensions': ['.html', '.vue']
  },
  'overrides': [{
    'files': ['./src/api/.eslintrc.js'],
    'rules': {
      'valid-jsdoc': 0,
      'require-jsdoc': 0
    }
  }],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  }
}
