// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import router from './router'
import store from './store'
import { getParam } from './utils/tool'
import { successMsg, errorMsg, warningMsg, alertSuccess, alertError, alertWarning, showToast, exportFile, formatDate, transformZeroBl } from './utils/common'
// import 'element-ui/lib/theme-chalk/index.css'
import './theme/index.css'
import '@/styles/index.css'

import YFXBreadcrumb from '@c/JFX-library/JFX-breadcrumb/index.vue'
import JFXSearchPanel from '@c/JFX-library/JFX-search-panel/index.vue'
import JFXTable from '@c/JFX-library/JFX-table/index.vue'
import JFXTitle from '@c/JFX-library/JFX-panel-title/index.vue'
import JFXGoback from '@c/JFX-library/JFX-goback/index.vue'
import JFXDialog from '@c/JFX-library/JFX-dialog/index.vue'
import JFXUpload from '@c/JFX-library/JFX-upload/index.vue'
import JFXInput from '@c/JFX-library/JFX-input/index'
import JFXRefreshBtn from '@c/JFX-library/JFX-refreshBtn/index'
import permission from '@/directive/permission/index'
import countWidth from '@/directive/countWidth/index'
import maxSpot from '@/directive/decimalsMax/index'

// 注册全局组件
Vue.component('JFX-back', JFXGoback)
Vue.component('JFX-Breadcrumb', YFXBreadcrumb)
Vue.component('JFX-search-panel', JFXSearchPanel)
Vue.component('JFX-table', JFXTable)
Vue.component('JFX-title', JFXTitle)
Vue.component('JFX-Dialog', JFXDialog)
Vue.component('JFX-upload', JFXUpload)
Vue.component('JFX-Input', JFXInput)
Vue.component('JFX-refresh-btn', JFXRefreshBtn)

// 全局指令
Vue.directive('permission', permission) // 用户操作权限
Vue.directive('count-width', countWidth) // 是否计算table操作栏宽度
Vue.directive('max-spot', maxSpot) // 最大输入多少个小数位

// 全局方法
Vue.prototype.$successMsg = successMsg
Vue.prototype.$errorMsg = errorMsg
Vue.prototype.$warningMsg = warningMsg
Vue.prototype.$alertSuccess = alertSuccess
Vue.prototype.$alertError = alertError
Vue.prototype.$alertWarning = alertWarning
Vue.prototype.$showToast = showToast
Vue.prototype.$exportFile = exportFile
Vue.prototype.$formatDate = formatDate
Vue.prototype.$transformZeroBl = transformZeroBl

Vue.config.productionTip = false
Vue.use(Element, { size: 'small', zIndex: 3000 })

// 判断是不是旧系统加载进入 oldsystem代表旧系统进入 隐藏头部，tag栏，左侧菜单栏
sessionStorage.setItem('from', getParam('from') || '')
if (getParam('token')) {
  sessionStorage.removeItem('btnList') // 用户从旧系统进入时 清除权限列表
  sessionStorage.setItem('token', getParam('token'))
  sessionStorage.setItem('from', 'oldsystem') // 存在token就可以大概率认定是从旧系统进来的
}
const url = decodeURI(window.location.href)
sessionStorage.setItem('iframeCompany', getParam('company', url))
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
