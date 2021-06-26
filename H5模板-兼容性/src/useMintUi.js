/**
 * @flie 按照实际需要引入mint-UI
 * 
 * import { DatetimePicker } from 'mint-ui';


 * */

import Vue from 'vue'  
import { Swipe, SwipeItem, InfiniteScroll, DatetimePicker } from 'mint-ui'
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(DatetimePicker.name, DatetimePicker);
// Vue.use(Swipe)
// Vue.use(SwipeItem)
Vue.use(InfiniteScroll)
