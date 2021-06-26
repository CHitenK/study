import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import router from './router'

import Cookies from 'js-cookie'

const INTERCEPT = []
// (谁还敢乱动我的cookie)
const TOKEN_NAME = window.btoa('token')

router.beforeEach((to, from, next) => {
  NProgress.start()
  document.title = to.meta.title?(`物业管理系统-${to.meta.title}`) : '物业管理系统'
  if (INTERCEPT.some(val => to.path.startsWith(val))) {
    // 验证是否有登陆
    if (Cookies.get(TOKEN_NAME)) {
      next()
    } else {
      // 重定向到首页
      next({ path: '/' })
      NProgress.done()
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
