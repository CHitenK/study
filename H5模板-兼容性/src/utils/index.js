/** 解析获取封面图片字符串为数组并返回第一个图片
 * @param coverUrls {String} 字符串数组
 * @return Array 解析后的数组
 * */
export function getFirstCoverUrls(coverUrls) {
  if (coverUrls != null) {
    return coverUrls.split(',')[0]
  } else {
    return ''
  }
}
