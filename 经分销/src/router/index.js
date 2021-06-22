import Vue from 'vue'
import NProgress from 'nprogress'
import Router from 'vue-router'
import MenuList from './menu-route'
import 'nprogress/nprogress.css'
import config from '@u/config'
import { errorMsg } from '@u/common'
import lodash from 'lodash'
import { getPessionList, getUserInfo } from '@a/base/index'
Vue.use(Router)
NProgress.configure({ showSpinner: false })
const routes = [
  {
    path: '/',
    redirect: '/storage/orderlist'
  },
  {
    path: '/login',
    component: () => import('@/layout/login/index')
  },
  {
    path: '/404',
    component: () => import('@/layout/404/index')
  },
  {
    path: '*',
    component: () => import('@/layout/404/index')
  },
  ...MenuList
]
const router = new Router({
  mode: 'history',
  routes
})
// 全局路由守卫
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  const { path, matched } = to
  if (config.whiteRoutes.includes(path) || !config.usePermission || sessionStorage.getItem('from') === 'oldsystem') { // 白名单path,不启用权限,旧系统跳转 直接通过
    if (!sessionStorage.getItem('btnList') && sessionStorage.getItem('from') === 'oldsystem') { // 旧系统跳转过来获取按钮权限列表
      try {
        const token = sessionStorage.getItem('token') // 获取token
        const res = await getPessionList(token)
        const { btnList } = res.data
        sessionStorage.setItem('btnList', JSON.stringify(btnList)) // 保存用户按钮权限列表
        // 获取用户信息并保存
        //  getAndsaveUserInfo()
        const res1 = await getUserInfo()
        const { merchantId = '', merchantName = '', userType = '', merchantCode = '', id = '', username = '' } = res1.data
        const userInfo = { merchantId: merchantId ? merchantId.toString() : '', merchantName, userType, merchantCode, id: id ? id.toString() : '', username }
        // userType 用户类型 1 平台用户 2 商家(超管理) 3 商家用户
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo)) // 用户信息
      } catch (err) {
        console.log(err)
        sessionStorage.removeItem('btnList')
      }
    }
    next()
  } else {
    const token = sessionStorage.getItem('token') // 获取token
    if (!token) { // 未登录
      errorMsg('用户未登录，请先登录')
      next('/login')
    } else { // 已经登录的做权限拦截
      const target = matched ? matched[matched.length - 1] : {}
      const treeMenuList = sessionStorage.getItem('treeMenuList') ? JSON.parse(sessionStorage.getItem('treeMenuList')) : []
      const flage = lodash.find(treeMenuList, { url: target.path })
      if (flage) {
        next()
      } else {
        next('/common/permission')
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
export default router
