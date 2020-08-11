import request from './../../plugins/axios'

function getList(data:object = {}): any {
   return request({
     url: '/product/list'
   })
}