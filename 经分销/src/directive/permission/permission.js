import store from '@/store'
export default {
  inserted(el, binding, vnode) {
    //  开发者绕过权限
    if (process.env.VUE_ROUTE_PROMISE === 'none') return ''
    const { value } = binding
    if (value && value instanceof Array && value.length > 0) {
      const { promiseRule } = store.state.permission
      const key = value[0]
      const promise = value[1]
      if (promiseRule[key] && !promiseRule[key].includes(promise)) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}
