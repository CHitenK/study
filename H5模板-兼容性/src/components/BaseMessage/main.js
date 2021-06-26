import Vue from 'vue'
import Main from './index.vue'

const MessageConstructor = Vue.extend(Main)

const Message = (options) => {
  options = options || {}
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  const instance = new MessageConstructor({
    data: options
  })

  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.show = true
  instance.dom = instance.vm.$el

  return instance.vm
}

export default Message
