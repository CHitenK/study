import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import base from './modules/base'
import tags from './modules/tags'
Vue.use(Vuex)

const modules = {
  user,
  base,
  tags
}

const store = new Vuex.Store({
  modules,
  getters
})

export default store
