import Vue from 'vue'
import Router from 'vue-router'
import MenuList from './menul-route'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/content/home'
  },
  {
    path: '/content',
    name: 'content',
    component: () => import('@/layout/index/index'),
    children: MenuList
  },
  {
    path: '/404',
    component: () => import('@/layout/404/index')
  },
  {
    path: '*',
    redirect: '/404'
  }
]
const router = new Router({
  mode: 'history',
  routes
})
// 全局路由守卫
router.beforeEach(async (to, from, next) => {
  console.log(23)
  next()
})

export default router
