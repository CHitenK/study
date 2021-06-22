import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import importDirective from './directives/index';
import '@/styles/index.styl'
import 'amfe-flexible';
import './cube-ui';
import VueLazyload from 'vue-lazyload'
Vue.config.productionTip = false;

importDirective(Vue);
Vue.use(VueLazyload, {
  preLoad: 2,
  error: 'dist/error.png',
  loading: 'https://img.e111.com.cn/group1/M00/01/60/Cg1F-V2yX1eAFm8EAAPYwoa8rFs051.gif',
  attempt: 1
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');