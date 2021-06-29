/**
 * @file 基于用户相关操作API接口
 */

import request from '@/utils/request'

/**
 * 获取用户基本信息
 * @returns {Object} Promise
 */
function getUserBaseInfo() {
  return request({
    url: 'user/auth',
    method: 'get'
  })
}

/**
 * 修改用户基本资料
 * @param {string} actualName 真实姓名
 * @param {string} idCard 身份证号
 * @param {string} sex 性别
 * @param {string} location 所在地
 * @param {string} email 邮箱
 * @param {string} headPicUrl 头像地址
 * @param {int} province 身份Id
 * @param {int} city 市区Id
 * @returns {Object} Promise
 */
function updateUserInfo({ actualName, idCard, sex, location, email, headPicUrl, province, city }) {
  return request({
    url: 'user/update',
    method: 'post',
    data: { actualName, idCard, sex, location, email, headPicUrl, province, city }
  })
}

/**
 * 修改用户密码
 * @param {string} oldPwd 旧密码
 * @param {string} newPwd 新密码
 * @returns {Object} Promise
 */
function modifyPassword({ oldPwd, newPwd }) {
  return request({
    url: 'user/pwd',
    method: 'put',
    data: { oldPwd, newPwd }
  })
}

/**
 * 更改手机号码
 * @param {string} phone 用户手机号
 * @param {string} code 密码
 * @param {string} messageCode 密码
 * @returns {Object} Promise
 */
function modifyPhone({ phone, code, messageCode }) {
  return request({
    url: 'user/phone/update',
    method: 'post',
    data: { phone, code, messageCode }
  })
}

/**
 * 忘记密码-重置密码
 * @param {string} phone 用户手机号
 * @param {string} password 密码
 * @returns {Object} Promise
 */
function resetPassword({ phone, password }) {
  return request({
    url: 'user/reset',
    method: 'put',
    data: { phone, password }
  })
}

export default { getUserBaseInfo, updateUserInfo, modifyPassword, modifyPhone, resetPassword }
