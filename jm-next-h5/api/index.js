import request from './../utils/http'

export function getDetail(data) {
  return request({
    url: '/jm/detail',
    method: 'get',
    params: data
})
}