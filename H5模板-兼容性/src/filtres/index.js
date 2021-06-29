/** 处理金钱，数据返回的金金额单位都是’分‘，需要转化为元，若小数位0，则忽略小数
 * @param {Number} number 金额
 * @returns {Number} *100并保留两位小数的金额
 * */
export function money(number = 0) {
  if (isNaN(number)) {
    return 0
  }
  let result = (number / 100).toFixed(2).toString()
  if (result.indexOf('.00')) {
    result = result.replace('.00', '')
  }
  return result
}

/** 处理金钱并返回单位，数据返回的金金额单位都是’分‘，需要转化为元，若小数位0，则忽略小数,若金额大于1w,返回 万元 ，否则返回 元
 * @param {Number} number 金额
 * @returns {Number} *100并保留两位小数的金额
 * */
export function moneyAndUnit(number = 0) {
  let result = money(number)
  if (result > 10000) {
    result = (number / 100).toFixed(2).toString()
    if (result.indexOf('.00')) {
      result = result.replace('.00', '')
    }
    return result + '万元'
  }
  return result + '元'
}
