import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_API_ROOT || '',
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // const token = sessionStorage.getItem('token')
    // if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
    //   config.headers.token = `${token}`
    // }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    // 拦截字节流 暂时使用
    if ('size' in res) {
      return res
    }
    if (res.code === 1 || res.code === 200) { // 成功返回
      return res
    } else if (res.code === -2) { // // 未登录
      return Promise.reject(res)
    } else if (res.code === 401) { // 未登陆
      window.location.href = '/#/login'
    } else if (res.code === 503) {
      return res
    } else { // 出错处理
      return Promise.reject(res)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service