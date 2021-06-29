import request from './../utils/http'
// 门店指数统计
export function count(data) {
  return request({
    url: 'h5/my/count',
    method: 'GET',
    header: {
      'Content-type': 'application/json'
    },
    data
  })
}
// 门店 / 个人资料
export function getShopMessage(data) {
  return request({
    url: 'h5/shop/mgmt/getShopMessage',
    method: 'GET',
    header: {
      'Content-type': 'application/json'
    },
    data
  })
}
// 获取微信配置
export function getWxConfig(data) {
  return request({
    url: 'wx/config/get',
    method: 'GET',
    header: {
      'Content-type': 'application/json'
    },
    data
  })
}
// 获取验证码
export function getVialidateCode(data) {
  return request({
    url: 'h5/user/mgmt/sms',
    method: 'GET',
    header: {
      'Content-type': 'application/json'
    },
    data
  })
}

// 校验验证码
export function valiDateCode(data) {
  return request({
    url: 'h5/user/mgmt/checkMessageCode',
    method: 'GET',
    header: {
      'Content-type': 'application/json'
    },
    data
  })
}

// 修改密码
export function modifyUserPassword(data) {
  return request({
    url: '/h5/user/mgmt/modifyUserPassword',
    method: 'PUT',
    header: {
      'Content-type': 'application/json'
    },
    data: JSON.stringify(data)
  })
}
