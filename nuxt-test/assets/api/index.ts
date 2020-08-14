import request from './../../plugins/axios'

export function getList(data:object = {}): any {
  console.log(23)
   return request({
     url: '/api/product/list',
     method: 'get',
     params: data
   })
}