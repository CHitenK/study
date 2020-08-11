import axios from 'axios'

const service = axios.create({
  // baseURL: '/',
  timeout: 15000
})
// 请求拦截 可在请求头中加入token等
service.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截 对响应消息作初步的处理
service.interceptors.response.use(resp => {
  const res = resp.data
  if (res.code === 200 || res.code === 'success') {
    return res
  }
  return Promise.reject(res)
}, error => {
  return Promise.reject(error.response)
})

export default service