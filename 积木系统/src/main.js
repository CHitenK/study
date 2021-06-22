import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router/permission'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

import trim from '@/directive/trim/index'
import showImg from '@/directive/showImg/index'

// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'production') {
//   mockXHR()
// }

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.directive('trim', trim)
Vue.directive('showImg', showImg)

Vue.config.productionTip = false

// 开发时绕开登陆
// if (process.env.NODE_ENV === 'development') {
//   Cookies.set('JSESSIONID', '48569320DEABB31E1A35F7015FD5BlistAgreementF3B')
//   Cookies.set('SESSION', 'bdd9e014-01a3-4615-b6ce-3b1d1356dba4')
//   Cookies.set('sec_userid', '161', { expires: 7 })
//   Cookies.set('sec_username', 'scalemzc', { expires: 7 })
//   Cookies.set('sidebar_closed', '0', { expires: 7 })
// }

// 获取协议
// const protocol = window.location.protocol
// 正式环境/测试环境不是https协议时，定向到https下的页面
// if (protocol !== 'https:' && process.env.NODE_ENV === 'production') {
//   const url = window.location.href
//   window.location.href = url.replace(/http:/gi, 'https:')
// }
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
