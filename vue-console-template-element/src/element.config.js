import Vue from 'vue'
import {
  Dialog,
  Button,
  Message
} from 'element-ui';
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 2020 }
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Message)

Vue.prototype.$message = Message;