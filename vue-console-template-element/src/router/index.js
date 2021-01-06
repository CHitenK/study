import Vue from 'vue'
import NProgress from 'nprogress'
import Router from 'vue-router'
import MenuList from './menu-route'
import 'nprogress/nprogress.css'
// NProgress.configure({ parent: '#00BFFF' })
Vue.use(Router)

NProgress.configure({ showSpinner: false })
const routes = [
  {
    path: '/',
    redirect: '/content/home'
  },
  {
    path: '/404',
    component: () => import('@/layout/404/index')
  },
  {
    path: '*',
    redirect: '/404'
  },
  ...MenuList
]
const router = new Router({
  mode: 'history',
  routes
})
// 全局路由守卫
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})
export default router
