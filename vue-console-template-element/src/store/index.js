import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import tags from './modules/tags'
Vue.use(Vuex)

const modules = {
  user,
  tags
}

const store = new Vuex.Store({
  modules,
  getters
})

export default store
