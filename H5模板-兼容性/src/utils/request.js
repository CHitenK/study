import axios from 'axios'
import store from '../store'
// import Cookies from 'js-cookie'
// import { Message } from 'element-ui'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL ? process.env.VUE_APP_API_URL : '',
  timeout: 15000, // 请求超时时间15s
  headers: { 'Cache-Control': 'no-cache', 'If-Modified-Since': '0' }
})

// request拦截器
service.interceptors.request.use(config =>
  // if (store.getters.token) {
  //   config.headers['X-Token'] = getCookies() // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  config, (error) => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    res.now = new Date(response.headers.date).getTime()
    if (res.code === 'unauthorized') {
      // 用户登陆信息失效
      // 移除用户Cookie信息
      store.dispatch('REMOVE_USER')
      // 弹出登陆框 - 让用户登陆
      store.dispatch('LOGIN_SHOW', () => { window.location.reload() })
    } else if (res.code !== 'success') {
      // Message.error(res.message)  // 暂时去掉全局提示
      return Promise.reject(res)
    }
    return response.data
  },
  (error) => {
    console.log(`err:${error}`) // for debug
    return Promise.reject(error.response.data)
  },
)

export default service
