import router from './index'
import { getToken } from '@/api/login/index'
import { Message } from 'element-ui'

const WHITE_PATH = ['/login', '/404', '/404'] // 白名单
// 全局路由守卫
router.beforeEach(async(to, from, next) => {
  const { path, query } = to
  if (WHITE_PATH.includes(path)) { // 白名单path 直接通过
    next()
  } else {
    const token = sessionStorage.getItem('token') // 获取token
    // 正常跳转到专题列表页
    if (token && !query.usd && !query.name) {
      next()
    } else if (path === '/pageManage/buildBlockList' && query.usd && query.name) { // 不存在token(从跨境+跳转),且是去到默认页
      try {
        const data = await getToken({ secUserId: query.usd })
        if (data.code === 200) {
          sessionStorage.setItem('token', data.data.token)
          sessionStorage.setItem('userName', query.name)
          sessionStorage.setItem('channelOptions', JSON.stringify(data.data.channelList || []))
          next('/pageManage/buildBlockList')
        } else {
          next('/login')
        }
      } catch (err) {
        next('/login')
      }
    } else { // 不存在token定向到登录
      Message({
        message: '请先登录!',
        type: 'error'
      })
      next('/login')
    }
  }
})
export default router
