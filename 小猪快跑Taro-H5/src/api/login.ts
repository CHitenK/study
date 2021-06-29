import request from './../utils/http'

export function getValidateImgUrl() {
  return request({
    url: 'user/captcha?type=3',
    method: 'post',
    header: {
      'Content-type': 'application/json'
    }
  })
}

// 登录请求
export function reqLogin(params) {
  return request({
    url: 'user/token',
    method: 'post',
    data: params,
    header: {
      'Content-Type': 'application/json'
    }
  });
}

// 判断用户角色
export function canLogin(params) {
  return request({
    url: 'h5/user/mgmt/check',
    method: 'GET',
    data: params,
    header: {
      'Content-Type': 'application/json'
    }
  });
}

// 获取用户openID
export function getWxOpenId(params) {
  return request({
    url: 'wx/getWxOpenId',
    method: 'GET',
    data: params,
    header: {
      'Content-Type': 'application/json'
    }
  });
}

// 登录新接口，关联openID
export function newReqLogin(params) {
  return request({
    url: 'h5/user/mgmt/token',
    method: 'post',
    data: params,
    header: {
      'Content-Type': 'application/json'
    }
  });
}
