/**
 * 合法uri
 * @param {string} textval 待检测字符串
 * @returns {boolean} URL的合法性
 */
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/**
 * 小写字母
 * @param {string} str 待检测字符串
 * @returns {boolean} 验证是否通过
 */
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * 大写字母
 * @param {string} str 待检测字符串
 * @returns {boolean} 验证是否通过
 */
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * 大小写字母
 * @param {string} str 待检测字符串
 * @returns {boolean} 验证是否通过
 */
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * 验证手机号码
 * @param {string} str 待检测字符串
 * @returns {boolean} 验证是否通过
 */
export function validatePhone(str) {
  const myreg = /^1[34578]\d{9}$/
  if (!myreg.test(str)) {
    return false
  }
  return true
}

/**
 * 验证 任意整数，正小数（小数位不超过2位）
 * @param {string} str 待检测字符串
 * @returns {boolean} 验证是否通过
 */
export function validateDecimal(str) {
  const myreg = /^(([0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
  if (!myreg.test(str)) {
    return false
  }
  return true
}

/**
 * 验证 身份证
 * @param {string} str 待检测字符串
 * @returns {boolean} 验证是否通过
 */
export function validateIdCardNum(str) {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str)
}
