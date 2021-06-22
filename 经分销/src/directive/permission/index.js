/**
 * @description 用户操作是具有权限
 * 使用示例
 * <bottom v-permission="sale_retail_admin"></bottom>
*/
import config from '@u/config'
export default {
  inserted(el, binding, vnode) {
    //  不启用权限
    if (!config.btnPermission) return ''
    const { value } = binding
    if (value) {
      const btnList = sessionStorage.getItem('btnList') ? JSON.parse(sessionStorage.getItem('btnList')) : []
      if (!btnList.includes(value) && el) {
        const style = el.getAttribute('style') ? el.getAttribute('style') + ';display: none;' : 'display: none;'
        el.setAttribute('style', style)
        // el && el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="sale_retail_admin", ${el}`)
    }
  }
}
