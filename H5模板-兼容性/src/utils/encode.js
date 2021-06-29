/**
 * application/json to application/x-www-form-urlencoded
 * @param {Object} data 数据
 * @returns {string} 编码数据
 */
function form_urlencode(data) {
  let ret = ''
  for (var it in data) {
    if (!(typeof data[it] === 'undefined' || data[it] === null)) {
      ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`
    }
  }

  return ret
}

export default { form_urlencode }
