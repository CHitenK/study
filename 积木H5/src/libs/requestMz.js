import axios from 'axios'
// create an axios instance
const serviceMz = axios.create({
  baseURL: process.env.VUE_APP_MZ_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 18000 // request timeout
})

// request interceptor
serviceMz.interceptors.request.use(
  config => {
    // do something before request is sent
    // if (getToken()) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
    // }
    // config.headers['Content-Type'] = 'application/json';
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
serviceMz.interceptors.response.use(
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

    // if the custom code is not -1, it is judged as an error.
    if (res.code !== 1) {
      return Promise.reject(res || 'Error')
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  })

export default serviceMz
