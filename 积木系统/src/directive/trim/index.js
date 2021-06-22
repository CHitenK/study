// 去掉输入框首尾空字符
export default {
  inserted(el, binding, vnode) {
    if (el.nodeName === 'INPUT') {
      if (el.value) {
        el.onblur = () => {
          el.value = el.value.replace(/^(\s|\xA0)+|(\s|\xA0)+$/gi, '')
        }
      }
    } else {
      const dom = el.getElementsByTagName('input')
      if (dom && dom.length > 0) {
        for (let key = 0; key < dom.length; key++) {
          dom[key].onblur = () => {
            if (dom[key].value) {
              dom[key].value = dom[key].value.replace(/^(\s|\xA0)+|(\s|\xA0)+$/gi, '')
            }
          }
        }
      }
    }
  }
}
