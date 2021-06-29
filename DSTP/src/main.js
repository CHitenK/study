import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import store from "./store";
import "./assets/js/rem"
import "./assets/css/en.less"
import MetaInfo from 'vue-meta-info'

import { Select,Option,Pagination,Message,MessageBox,Button,Dialog,Tooltip,Carousel, CarouselItem, Checkbox, CheckboxButton, CheckboxGroup} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'animate.css'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: window.localStorage.getItem('lang') == null ? "cn" : window.localStorage.getItem('lang'),    // 语言标识
  messages: {
    'cn': require('./assets/lang/cn'),   // 中文语言包
    'en': require('./assets/lang/en')    // 英文语言包
  },
  silentTranslationWarn: true
})
import owlCarousel from './components/owlCarousel/owlCarousel'
Vue.component('owlCarousel', owlCarousel);
Vue.use(MetaInfo)
Vue.config.productionTip = false;
Vue.use(Select)
Vue.use(Option)
Vue.use(Pagination)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Tooltip)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.prototype.$msgbox = MessageBox;
import vuescroll from 'vuescroll/dist/vuescroll-native';
import 'vuescroll/dist/vuescroll.css';
Vue.use(vuescroll)
Vue.use(MetaInfo)
import VueFullPage from 'vue-fullpage.js'
Vue.use(VueFullPage);
import 'fullpage.js/vendors/scrolloverflow'
Vue.config.productionTip = false;
//注册全局组件----头部
import Headers from './components/headerfooter/headers.vue';
Vue.component('Headers', Headers);
//注册全局组件----route支持跳转外链
import XRouterLink from './components/router/routerLink';
Vue.component('x-router-link', XRouterLink);

//注册全局组件----底部
import Footers from './components/headerfooter/footers.vue';
// import de from "element-ui/src/locale/lang/de";
Vue.component('Footers', Footers);
router.beforeEach((to,from,next) => {
  if(to.path ==  from.path){
    if(to.path == '/'){
      next()
    } else{
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }else {
    next()
  }
})

router.afterEach( ( to, from, next ) => {
  setTimeout(()=>{
    //百度统计
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?e9e2981bab07356bf8af0c49184a1136";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
  },0);
});

new Vue({
  router,
  //store,
  i18n,
  render: h => h(App),
  mounted () {
    var event;
    if(typeof(Event) === 'function') {
      event = new Event('render-event');
    }else{
      event = document.createEvent('Event');
      event.initEvent('render-event', true, true);
    }
   document.dispatchEvent(event)
  }
}).$mount('#app')
// 通常都是在main.js中处理



// 实现Message消息提示每次只弹出一个
// 为了实现Class的私有属性
const showMessage = Symbol('showMessage')
/**
 *  重写ElementUI的Message
 *  single默认值true，因为项目需求，默认只弹出一个，可以根据实际需要设置
 */
class DonMessage {
    success (options, single = true) {
        this[showMessage]('success', options, single)
    }
    warning (options, single = true) {
        this[showMessage]('warning', options, single)
    }
    info (options, single = true) {
        this[showMessage]('info', options, single)
    }
    error (options, single = true) {
        this[showMessage]('error', options, single)
    }

    [showMessage] (type, options, single) {
        if (single) {
            // 判断是否已存在Message
            if (document.getElementsByClassName('el-message').length === 0) {
                Message[type](options)
            }
        } else {
            Message[type](options)
        }
    }
}

// ...

// 命名根据需要，DonMessage只是在文章中使用
Vue.prototype.$message = new DonMessage()

Vue.prototype.$vuescrollConfig = {
  vuescroll: {
    mode: 'native',//选择一个模式, native 或者 slide(pc&app)
    sizeStrategy: 'percent',//如果父容器不是固定高度，请设置为 number , 否则保持默认的percent即可
    detectResize: true//是否检测内容尺寸发生变化
  },
  scrollPanel: {
    initialScrollY: false,//只要组件mounted之后自动滚动的距离。 例如 100 or 10%
    initialScrollX: false,
    scrollingX: false,//是否启用 x 或者 y 方向上的滚动
    scrollingY: true,
    speed: 300,//多长时间内完成一次滚动。 数值越小滚动的速度越快
    easing: undefined,//滚动动画 参数通animation
    verticalNativeBarPos: 'right'//原生滚动条的位置
  },
  rail: {//轨道
    background: '#c3c3c3',//轨道的背景色
    opacity: 0,
    size: '6px',
    specifyBorderRadius: false,//是否指定轨道的 borderRadius， 如果不那么将会自动设置
    gutterOfEnds: null,
    gutterOfSide: '0px',//轨道距 x 和 y 轴两端的距离
    keepShow: false //是否即使 bar 不存在的情况下也保持显示
  },
  bar: {
    showDelay: 500,//在鼠标离开容器后多长时间隐藏滚动条
    onlyShowBarOnScroll: false,//当页面滚动时显示
    keepShow: false,//是否一直显示
    background: '#c3c3c3',
    opacity: 1,
    hoverStyle: false,
    specifyBorderRadius: false,
    minSize: false,
    size: '6px',
    disable: false,//是否禁用滚动条
  }
}
Vue.prototype.$addClass = function(obj, cls){
  if(obj.length>1){
    let obj_class,blank,added
    obj.forEach((item,key)=>{
      obj_class = item.className;//获取 class 内容.
      blank = (obj_class != '' ? ' ' : ''); //判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
      added = obj_class + blank + cls; //组合原来的 class 和需要添加的 class.
      item.className = added;//替换原来的 class.
    })
  }else{
    let obj_class = obj.className;//获取 class 内容.
    let blank = (obj_class != '' ? ' ' : ''); //判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
    let added = obj_class + blank + cls; //组合原来的 class 和需要添加的 class.
    obj.className = added;//替换原来的 class.
  }
}

Vue.prototype.$isInViewPortOfOne = function(el) {
  // viewPortHeight 兼容所有浏览器写法
  const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  const offsetTop = el.offsetTop
  const scrollTop = document.documentElement.scrollTop
  const top = offsetTop - scrollTop
  return top <= viewPortHeight+100
}