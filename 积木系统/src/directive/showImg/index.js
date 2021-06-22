// 上传图片组件显示图片
export default {
  inserted(el, binding, vnode) {
    if (!el) return false
    const dome = el.getElementsByClassName('el-upload-list')
    if (dome && dome[0]) {
      const { id } = binding.value
      dome[0].onmouseover = (e) => {
        const imgDom = document.getElementById(id)
        const imgSrc = imgDom.getAttribute('src')
        if (!imgSrc || !imgDom) return false
        imgDom.setAttribute('style', 'display: inline-block; z-index: 10;')
      }
      dome[0].onmouseout = (e) => {
        const imgDom = document.getElementById(id)
        if (!imgDom) return false
        imgDom.setAttribute('style', 'display: none;')
      }
    }
  }
}
