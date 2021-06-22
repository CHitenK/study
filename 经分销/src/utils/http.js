import axios from 'axios'
import { errorMsg, alertError } from './common'
import { getBaseUrl } from '@u/tool'
const service = axios.create({
  baseURL: '', // 不需设置，在拦截处处理
  timeout: 90 * 1000, // request timeout,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
})

// request interceptor
service.interceptors.request.use(
  config => {
    // 处理url
    if (!config.url.includes('http') && process.env.NODE_ENV !== 'development') {
      config.url = getBaseUrl(config.url) + config.url
    }
    const token = sessionStorage.getItem('token')
    if (token) { // 判断是否存在token
      config.url = config.url.includes('?') ? config.url + `&token=${token}&t=${Date.now()}` : config.url + `?token=${token}&t=${Date.now()}`
      const contentType = config.headers['Content-Type'] || ''
      if (contentType.includes('application/json') && !Array.isArray(config.data)) {
        config.data = config.data ? { token, ...config.data } : { token }
      }
    }
    return config
  },
  error => {
    console.log(error, 67) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === undefined && res.data === undefined && res instanceof Blob) {
      return res
    }
    // 强制静code转string
    res.code = res.code ? res.code + '' : ''
    const codes = ['10000', '10007'] // 允许请求成功的code集合 10000 请求成功，10007 未选择公司主体
    if (codes.includes(res.code) || res.state === 200) { // 成功返回
      return res
    } else if (res.code === '99998') { // 未登录
      alertError(res.message, () => {
        const from = sessionStorage.getItem('from')
        if (from !== 'oldsystem') {
          window.location.href = '/login'
        }
      })
      return Promise.reject(res)
    } else { // 出错处理/系统异常
      const message = res.data && res.data.lenght > 3 ? res.data : res.message || res.expMessage
      errorMsg(message || '系统异常')
      console.log('请求出错', res)
      return Promise.reject(res)
    }
  },
  error => {
    console.log(JSON.stringify(error))
    errorMsg('系统繁忙, 稍后重试')
    return Promise.reject(error)
  }
)

export default service
