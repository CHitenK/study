import config from './config.read'
export default {
  pages: [
    'pages/index/index',
    'pages/login/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: config.navigationBarBackgroundColor, //'#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}
