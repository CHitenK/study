import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

const modulesFiles = require.context('./sy_modules', true, /\.js$/)
import addBuildBlock from '@/views/pageManage/store/index'
import editBuildBlock from '@/views/pageManage/store/edit'
// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
// 新增积木store
modules.addBuildBlock = addBuildBlock
modules.editBuildBlock = editBuildBlock
const store = new Vuex.Store({
  modules,
  getters
})

export default store
