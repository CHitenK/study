// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import router from './router'
import store from './store'

import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.css'

Vue.config.productionTip = false
Vue.use(Element, { size: 'small', zIndex: 3000 })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
