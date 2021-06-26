import Vue from 'vue'
import Router from 'vue-router'

import { _require_index as _require } from '@/utils/import'

import Layout from '@/layout/Layout'
import Login from '@/views/login/login'


import indexRoutes from '@/embed/index/router'
import shopsRoutes from '@/embed/shops/router'
import wpayRoutes from '@/embed/waitpayment/router'
import myApplication from '@/embed/myApplication/router'
import commonRoutes from '@/embed/common/router'

Vue.use(Router)

const layoutRoutes = [
  // 首页
  {
    path: '/',
    name: 'layout',
    meta: { title: '整体布局' },
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index', name: 'index',
        meta: {
          title: '首页',
          icon: 'icon-tab_icon_home_def',
          activeIcon: 'icon-tab_icon_home_sel'
        },
        component: _require('index/index.vue')
      },
      {
        path: 'mine', name: 'mine',
        meta: {
          title: '我的',
          icon: 'icon-tab_icon_my_sel_',
          activeIcon: 'icon-tab_icon_my_sel'
        }, component: _require('mine/index.vue')
      },
      
    ]
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录' },
    component: Login,
    children: [
      
    ]
  }
 
]

const defaultRoutes = [
  {
    name: '404',
    path: '/404',
    component: () => import('@/components/Error/404.vue')
  },
  {
    path: '*', // 此处需特别注意至于最底部
    redirect: '/404'
  }
]

export default new Router({
  routes: [...indexRoutes.routes,
           ...shopsRoutes.routes,
           ...wpayRoutes.routes,
           ...myApplication.routes,
           ...layoutRoutes,
           ...defaultRoutes
          ],
  scrollBehavior: () => ({ y: 0 })
  // mode: 'history'
})
