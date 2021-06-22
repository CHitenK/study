import serviceMz from '../libs/requestMz'
// 商品数据
export function activityShowProductListTest(data) {
  return serviceMz({
    url: '/productData/activityShowProductList',
    method: 'post',
    data: data
  })
}
// 校验活动是否正在进行中
export function verifyAcivityUnderwayTest(data) {
  return serviceMz({
    url: 'promotionActivity/verifyAcivityUnderway',
    method: 'get',
    params: data
  })
}

