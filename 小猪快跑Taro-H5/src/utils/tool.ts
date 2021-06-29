
// 文字省略号处理
export function  handleShenLuue(str, len = 16) {
  if (!str) return ''
  if (str.length > len) {
    return str.substring(0, len) + '...'
  } else {
    return str
  }
}