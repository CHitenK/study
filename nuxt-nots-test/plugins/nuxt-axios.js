
export default function ({ $axios, redirect }) {
  /*   */
  // $axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

  $axios.onRequest(config => {
    return config
  })

  $axios.onResponse(res => {
  })

  $axios.onError(error => {
    return error
  })
}