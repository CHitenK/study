import request from '@/utils/request'
const baseUrl = process.env.VUE_APP_API_ROOT || ''
const tokenUrl = process.env.VUE_GET_TOKEN_URL || ''
/**
 * @description 登录接口
 * @param {String}} userName 用户名
 * @param {String}} userName 用户名
 * @returns {Promise}
 */
export function login(data) {
  return request({
    url: baseUrl + '/sso/secuser/login',
    method: 'post',
    data: data
  })
}
/**
 * @description 单点登录获取token信息
 */
export function getToken(data) {
  return request({
    url: tokenUrl + '/sso/secuser/getToken',
    method: 'post',
    data
  })
}
