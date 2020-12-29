import Vue from 'vue'
import VueRouter from 'vue-router'
//先使用 vue的uuse来使用vueroute
Vue.use(VueRouter)
//定义route路由
const routes = [
  {
    path: '/',
    name: 'lay',
    component: () => import('./../layout/index'),
    children: []
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./../views/login/index')
  }
]
//history模式就是我们学的history的go，reward。pushState。replaceState啊等。
const router = new VueRouter({
  mode: 'history',
  base: '',
  routes
})
//导出route组件
export default router