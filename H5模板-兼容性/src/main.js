// 外部执行文件
import './permission'
import './useMintUi.js'
import Vue from 'vue'
// 静态资源
import '@/assets/iconfont/index'
import '@/styles/index.scss' // 注意顺序
// 公告组件
import BaseIcon from '@/components/BaseIcon/index.vue' // svg组件
import BaseImg from '@/components/BaseImg/index.vue'// 图片组件，处理图片加载失败时显示默认图片
import BaseNoData from '@/components/BaseNoData/index.vue' // 无数据时显示
import BaseButton from '@/components/BaseButton/index.vue' // 无数据时显示
import BaseTitle from '@/components/BaseTitle/index.vue' // 无数据时显示
import Tabs from '@/components/Tabs/index.vue'
import Tab from '@/components/Tabs/tab.vue'
import BaseDlg from '@/components/BaseDlg/index.vue'
import Message from '@/components/BaseMessage/main.js'
// filter
import { money } from '@/filtres/index.js'
import { moneyAndUnit } from '@/filtres/index.js'
// 全家桶
import router from './router'
import store from './store'
import App from './App.vue'
// api
import UtilsAPI from '@/api/utils'

// 移动端事件
const VueTouch = require('vue-touch')

// 获取上传图片token
UtilsAPI.getUploadToken()

Vue.config.productionTip = false
// register globally
Vue.component('v-icon', BaseIcon)
Vue.component('v-img', BaseImg)
Vue.component('v-no-data', BaseNoData)
Vue.component('v-btn', BaseButton)
Vue.component('v-title', BaseTitle)
Vue.component('v-tabs', Tabs)
Vue.component('v-tab', Tab)
Vue.component('v-dlg', BaseDlg)

Vue.use(VueTouch, { name: 'v-touch' })

// 全局实例变量 - 图片上传地址
Vue.prototype.$file_upload = process.env.VUE_APP_FILE_UPLOAD
Vue.prototype.$message = Message

// 全局过滤器
Vue.filter('money', money)
Vue.filter('moneyAndUnit', moneyAndUnit)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
