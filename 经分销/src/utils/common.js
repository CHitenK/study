/**
 * @description 封装Vue全局方法
 */

import { Message, MessageBox } from 'element-ui'
import { getBaseUrl } from '@u/tool'
import { getUserInfo } from '@a/base/index'
/**
 * @description 成功提示
 * @param {String|Object} opt
 * @description 使用示例
 * this.$successMsg('操作成功啦', () => { // 关闭后执行})
 * this.$successMsg({ message: '操作成功啦' })

 */
export function successMsg(opt, fn) {
  Message.closeAll()
  const data = typeof (opt) === 'string' ? { message: opt, onClose: fn || null } : opt || {}
  delete data.type
  return Message({
    type: 'success',
    customClass: 'message-sucess-bx',
    duration: 4000,
    offset: 30,
    showClose: false,
    ...data
  })
}

/**
 * @description 失败提示
 * @param {String|Object} opt
 * @description 使用示例
 * this.$errorMsg('操作失败啦', () => { // 关闭后执行})
 * this.$errorMsg({ message: '操作失败啦' })
 */
export function errorMsg(opt, fn) {
  Message.closeAll()
  const data = typeof (opt) === 'string' ? { message: opt, onClose: fn } : opt || {}
  delete data.type
  return Message({
    type: 'error',
    customClass: 'message-error-bx',
    duration: 4000,
    offset: 30,
    showClose: false,
    ...data
  })
}

/**
 * @description 失败提示
 * @param {String|Object} opt
 * @description 使用示例
 * this.$warningMsg('操作警告啦', () => { // 关闭后执行})
 * this.$warningMsg({ message: '操作警告啦' })
 */
export function warningMsg(opt, fn) {
  Message.closeAll()
  const data = typeof (opt) === 'string' ? { message: opt, onClose: fn || null } : opt || {}
  delete data.type
  return Message({
    type: 'warning',
    customClass: 'message-warning-bx',
    duration: 4000,
    offset: 30,
    showClose: false,
    ...data
  })
}

// 弹窗提示
export function messageBox(opt) {
  Message.closeAll()
  const dom = opt.dom
  delete opt.dom
  delete opt.message
  MessageBox({
    dangerouslyUseHTMLString: true,
    message: dom,
    customClass: 'mine-messageBox-bx',
    confirmButtonClass: 'message-box-sure',
    // closeOnClickModal: false,
    // closeOnPressEscape: false,
    cancelButtonClass: 'message-box-cancel',
    ...opt
  })
}

/**
 * @description 成功弹出层提示
 * @description 使用示例
 * 	this.alertSuccess({ message: '内容', callback: (e) => { console.log(e)}})
 *  this.alertSuccess('内容', () => {})
*/
export function alertSuccess(opt, fn) {
  const data = typeof (opt) === 'string' ? { message: opt, callback: fn } : opt || {}
  const dom = `
    <div class="mine-messageBox clr-act">
      <i class="el-icon-circle-check messageBox-icon"></i>
      <div class="messageBox-text mr-t-10 fs-18">
        ${data.message}
      </div>
    </div>
  `
  data.dom = dom
  data.callback = data.callback || null
  return messageBox(data)
}

/**
 * @description 错误弹出层提示
 * 使用示例
 * 	this.$alertError({ message: '不好意思操作失误', callback: (e) => { console.log(e)}})
 *  this.$alertError('内容', () => {})
*/
export function alertError(opt, fn) {
  const data = typeof (opt) === 'string' ? { message: opt, callback: fn } : opt || {}
  // <i class="el-icon-close fs-20 clr-III close-msg-btn"></i>
  const dom = `
    <div class="mine-messageBox clr-r">
      <i class="el-icon-circle-close messageBox-icon"></i>
      <div class="messageBox-text mr-t-10 fs-18">
        ${data.message}
      </div>
    </div>
  `
  data.dom = dom
  data.callback = data.callback || null
  data.confirmButtonClass = 'message-box-sure bgc-r message-box-error b-n'
  return messageBox(data)
}

/**
 * @description 警告弹出层
 * 使用示例
 * 	this.$alertWarning({ message: '不好意思操作失误', callback: (e) => { console.log(e)}})
 *  this.$alertWarning('不好意思操作失误', () => {})
*/
export function alertWarning(opt, fn) {
  const data = typeof (opt) === 'string' ? { message: opt, callback: fn } : opt || {}
  const dom = `
    <div class="mine-messageBox clr-warn">
      <i class="el-icon-warning-outline messageBox-icon"></i>
      <div class="messageBox-text mr-t-10 fs-18">
        ${data.message}
      </div>
    </div>
  `
  data.dom = dom
  data.callback = data.callback || null
  data.confirmButtonClass = 'message-box-sure bgc-warn b-n'
  return messageBox(data)
}

/**
 * @description ElementUI MessageBox弹窗
 * 使用示例
 * this.$showToast('content')
 * this.$showToast('content', () => { console.log(1) })
 * this.$showToast({ content: 'content', title: 'title', type: 'error'}, () => { console.log(1) })
*/
export function showToast(options = {}, cb = () => { }, catchCb = () => { }) {
  const data = typeof options === 'string' ? {
    content: options,
    title: '提示',
    type: 'warning'
  } : {
      content: options.content || '确认操作？',
      title: options.title || '提示',
      type: options.type || 'warning'
    }
  const msgBox = MessageBox.confirm(data.content, data.title, {
    confirmButtonText: options.confirmButtonText || '确定',
    cancelButtonText: '取消',
    type: data.type
  }).then(
    () => { cb() },
    () => { catchCb() }
  )
  return msgBox
}

/**
 * @description 全局导出
 * @param {*} url 导出地址 不需要加ip
 * @param {*} data 请求数据
 */
export function exportFile(url, data) {
  if (!url.includes('token')) {
    const token = sessionStorage.getItem('token')
    url = url.includes('?') ? url + `&token=${token}` : url + `?token=${token}`
  }
  url = getBaseUrl(url) + url
  let str = ''
  if (data) {
    for (const key in data) {
      str += `&${key}=${data[key]}`
    }
    url = url + str
  }
  console.log('导出地址', url)
  window.open(url, '_blank')
  // window.location.href = urlStr
}

/**
 * @param {Number} dateParams => 时间戳
 * @param {String} format  => 转换时间格式
 * @param {String} timeUnit (second, millisecond)  => 时间单位  默认时间戳是 秒(second),
 */
export function formatDate(dateParams, format = 'yyyy-MM-dd HH:mm:ss', timeUnit = 'second') {
  if (Number(dateParams)) {
    if (timeUnit === 'second') {
      // 时间戳秒要转换成毫秒
      // dateParams = dateParams * 1000
    } else if (timeUnit === 'millisecond') {
      // 毫秒时间戳
      dateParams = dateParams * 1000
    }
  } else if (new Date(dateParams) === 'Invalid Date') {
    console.error('参数值:', dateParams, '不符合日期格式')
    return '不符合日期格式 Invalid Date'
  }
  let date = new Date(dateParams)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let strDate = date.getDate()
  let strHours = date.getHours()
  let strMinutes = date.getMinutes()
  let strSeconds = date.getSeconds()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  if (strHours >= 0 && strHours <= 9) {
    strHours = '0' + strHours
  }
  if (strMinutes >= 0 && strMinutes <= 9) {
    strMinutes = '0' + strMinutes
  }
  if (strSeconds >= 0 && strSeconds <= 9) {
    strSeconds = '0' + strSeconds
  }

  return format
    .replace('yyyy', year)
    .replace('MM', month)
    .replace('dd', strDate)
    .replace('HH', strHours)
    .replace('mm', strMinutes)
    .replace('ss', strSeconds)
}

/**
 * 获取用户信息并保存
 */
export async function getAndsaveUserInfo() {
  try {
    const res = await getUserInfo()
    const { merchantId = '', merchantName = '', userType = '', merchantCode = '', id = '', username = '' } = res.data
    const userInfo = { merchantId: merchantId ? merchantId.toString() : '', merchantName, userType, merchantCode, id: id ? id.toString() : '', username }
    // userType 用户类型 1 平台用户 2 商家(超管理) 3 商家用户
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo)) // 用户信息
  } catch (error) {
    console.log(error)
    sessionStorage.removeItem('userInfo')
  }
}

// 有值，字符0， 数字0, 返回Boolen值true
export function transformZeroBl(val) {
  if (val) return true
  if (val === '0' || val === 0 || (val !== null && Number(val) === 0)) return true
  return false
}
