import request from './../../plugins/axios'

export function getList(data) {
   return request({
     url: '/api/product/list',
     method: 'get',
     params: data
   })
}