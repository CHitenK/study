import service from '../libs/request'
// 返回给落地页专题数据（content里边不含业务数据） 改成请求整条json
export function fetchPageInfo(data) {
  return service({
    // url: '/base/block/findBlock',
    url: '/base/block/findOneBlock',
    method: 'get',
    params: data
  })
}
// 获取组件业务数据 /base/block/getBusinessData
export function getJmBusinessData(data) {
  return service({
    url: '/base/block/getBusinessData',
    method: 'get',
    params: data
  })
}
// 查看首页是否有在线生效的专题
export function isAvailable(data) {
  return service({
    url: '/base/block/isAvailable',
    method: 'get',
    params: data
  })
}