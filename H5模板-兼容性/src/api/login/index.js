import request from '@/utils/request'

/**
 * 门户页面 - 登陆
 * @param {string} phone 手机号码
 * @param {string} password 密码
 * @returns {Object} Promise
 */
function login({ userName, password }) {
  return request({
    url: 'user/login',
    method: 'post',
    data: { userName, password }
  })
}

/**
 * 门户页面 - 注册
 * @param {string} phone 手机号码
 * @param {string} messageCode 短信验证码
 * @param {string} code 图片验证码
 * @param {string} password 密码
 * @returns {Object} Promise
 */
function register({ phone, messageCode, code, password }) {
  return request({
    url: 'user/register',
    method: 'post',
    data: { phone, messageCode, code, password }
  })
}

/**
 * 门户页面 - 注销
 * @returns {Object} Promise
 */
function logout() {
  return request({
    url: 'user/logout',
    method: 'get'
  })
}

export default { login, register, logout }
