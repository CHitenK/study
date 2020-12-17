import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'

Vue.use(Vuex)

const modules = {
  user
}

const store = new Vuex.Store({
  modules,
  getters
})

export default store
