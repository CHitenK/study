import serviceKj from '../libs/requestKj'
// 商品数据
export function activityShowProductList(data) {
  return serviceKj({
    url: '/productData/activityShowProductList',
    method: 'post',
    data: data
  })
}
// 优惠卷数据
export function activityGetCoupon(data) {
  return serviceKj({
    url: '/couponspage/getConponsByTemplateIdToUserId',
    method: 'post',
    data: data
  })
}
// 销售奖励数据
export function getDarenSale(data) {
  return serviceKj({
    url: '/daren/getDarenSaleAmountByActivityId',
    method: 'post',
    data: data
  })
}
// 校验活动是否正在进行中
export function verifyAcivityUnderway(data) {
  return serviceKj({
    url: 'promotionActivity/verifyAcivityUnderway',
    method: 'get',
    params: data
  })
}
// 获取优惠卷信息
export function couponContent(data) {
  return serviceKj({
    url: 'couponspage/getCouponsByIdAndUserInfo',
    method: 'get',
    params: data
  })
}
// 用户类型判断
export function targetPeople(data) {
  return serviceKj({
    url: '/productData/checkUserType',
    method: 'get',
    params: data
  })
}
// 新增根据优惠券模板id获取优惠券信息（为了一元购）
export function findCouponsById(data) {
  return serviceKj({
    url: '/couponspage/findCouponsById',
    method: 'get',
    params: data
  })
}

// 领取优惠卷
export function getConponsByTemplateIdToUserId(data) {
  return serviceKj({
    url: '/couponspage/getConponsByTemplateIdToUserId',
    method: 'post',
    params: data
  })
}

// 新用户领券资格
export function getNewUserCoupons(data) {
  return serviceKj({
    url: '/couponspage/getPopupCoupons',
    method: 'get',
    params: data
  })
}

// 新用户领券
export function getNewUserCouponIndex(data) {
  return serviceKj({
    url: '/couponspage/getConponsByTemplateIdToUserId',
    method: 'post',
    params: data
  })
}

// 新用户优惠券是否可再领
export function getCouponsReachAble(data) {
  return serviceKj({
    url: '/couponspage/getCouponsReachAble',
    method: 'get',
    params: data
  })
}

// 新用户立即使用
export function couponsUseImmediately(data) {
  return serviceKj({
    url: '/promotion/couponsUseImmediately',
    method: 'post',
    params: data
  })
}