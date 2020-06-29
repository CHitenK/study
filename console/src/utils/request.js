import axios from 'axios'   

const request = axios.create({
    baseURL: '',
    timeout: 20000
})

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
       // config.headers.token = `${token}`
       return config;
    }, function (error) {
        // 对请求错误做些什么
       return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    const res = response.data
    if (res.code === 401) { // 未登录

    } else if (res.code === 200) {
        return response
    } else {
        return Promise.reject(response)
    }
    
}, function (error) {
   // 对响应错误做点什么
   return Promise.reject(error);
})
export default request