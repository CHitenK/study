import axios from 'axios'
import { Message } from 'element-ui'
// export const urlOrigin = process.env.VUE_APP_API_ROOT

// create an axios instance

const service = axios.create({
  baseURL: '', // process.env.NODE_ENV === 'development' ? '' : process.env.VUE_APP_API_ROOT, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token')
    if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.token = `${token}`
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // 拦截字节流 暂时使用
    if ('size' in res) {
      return res
    }
    if (res.code === 1 || res.code === 200) { // 成功返回
      return res
    } else if (res.code === -2) { // // 未登录
      Message({
        message: res.msg,
        type: 'error',
        duration: 3 * 1000,
        showClose: true,
        onClose() {
          // 非开发环境跳转到登陆页
          if (process.env.NODE_ENV !== 'development') {
            // window.location.href = process.env.VUE_APP_API_ROOT + '/console/login.do'
          }
        }
      })
      return Promise.reject(res)
    } else if (res.code === 401) { // 未登陆
      Message({
        message: '请先登录',
        type: 'error',
        duration: 2 * 1000
      })
      sessionStorage.setItem('token', '')
      window.location.href = '/#/login'
    } else if (res.code === 503) {
      return res
    } else { // 出错处理
      Message({
        message: res.msg,
        type: 'error',
        duration: 3 * 1000,
        showClose: true,
        onClose() {
        }
      })
      return Promise.reject(res)
    }
  },
  error => {
    if (error.message.indexOf('401') > -1) {
      sessionStorage.setItem('token', '')
      sessionStorage.setItem('userName', '')
      window.location.reload()
      Message({
        message: '401用户未登录',
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 3 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
