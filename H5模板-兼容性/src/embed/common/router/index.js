import { _require_embed } from '@/utils/import'

import BaseLayout from '@/layout/EmbedLayout.vue'

const _require = _require_embed('common')
const ROOT_PATH = '/_common'

const RoutesMap = [
  {
    path: 'login',
    name: 'login',
    meta: { title: '账号登陆' },
    component: _require('login/index.vue')
  },
  {
    path: 'gotBackPassword',
    name: 'gotBackPassword',
    meta: { title: '找回密码' },
    component: _require('gotBackPassword/index.vue')
  },
  {
    path: 'register',
    name: 'register',
    meta: { title: '注册' },
    component: _require('register/index.vue')
  }
]

const routes = [
  {
    path: ROOT_PATH,
    component: BaseLayout,
    redirect: `${ROOT_PATH}/login`,
    meta: {},
    children: [...RoutesMap]
  }
]

export default { ROOT_PATH, RoutesMap, routes }
