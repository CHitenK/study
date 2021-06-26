import request from '@/utils/request'
import Vue from 'vue'
import axios from 'axios'

/**
 * 获取省市信息
 * @param {string} id 省份ID
 * @returns {Object} Promise
 */
function getAreaInfo(id) {
  return request({
    url: 'user/area/get',
    method: 'get',
    params: { id }
  })
}

/**
 * 获取用户实时状态
 * @returns {Object} Promise
 */
function getUserAuthType() {
  return request({
    url: 'user/status',
    method: 'get'
  })
}

/**
 * 获取对公账号绑定信息
 * @returns {Object} Promise
 */
function getPubAccountInfo() {
  return request({
    url: 'publicAccount',
    method: 'get'
  })
}

/**
 * 获取上传口令
 * @returns {void}
 */
function getUploadToken() {
  axios.get('/oauth/token').then(response => {
    // 全局实例变量 - 图片上传头信息
    Vue.prototype.$upload_header = response.data.data
  }).catch(e => {
    console.log(e.message)
  })
}

export default { getAreaInfo, getUserAuthType, getPubAccountInfo, getUploadToken }
