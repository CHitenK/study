import Cookies from 'js-cookie'

import LoginAPI from '@/api/login'

// (谁还敢乱动我的cookie)
const TOKEN_NAME = window.btoa('token')

const app = {
  state: {
    user: Cookies.get(TOKEN_NAME) ? JSON.parse(window.decodeURIComponent(window.atob(Cookies.get(TOKEN_NAME)))) : null,
    contactPhone: '',
    login: false,
    loginMQ: [],
    register: false,
    registerMQ: [],
    forgotPassword: false,
    closeCallback: null
  },
  mutations: {
    SET_USER_TOKEN: (state, userInfo) => {
      state.user = userInfo
      // 存储用户登陆token - 7天
      Cookies.set(TOKEN_NAME, window.btoa(window.encodeURIComponent(JSON.stringify(userInfo))), { expires: 7 })
    },
    REMOVE_USER_TOKEN: (state) => {
      state.user = null
      // 移除用户登陆token
      Cookies.remove(TOKEN_NAME)
    },
    SET_CONTACT_PHONE: (state, contactPhone) => {
      state.contactPhone = contactPhone
    },
    SET_LOGIN_MODEL: (state, status) => {
      state.login = status
    },
    SET_FORGOTPASSWORD_MODEL: (state, status) => {
      state.forgotPassword = status
    },
    SET_REGISTER_MODEL: (state, status) => {
      state.register = status
    },
    SET_LOGIN_CALLBACK: (state, callback) => {
      state.loginMQ.push(callback)
    },
    REMOVE_LOGIN_CALLBACK: (state, type) => {
      state.loginMQ = !type ? state.loginMQ.filter(val => val.type) : []
    },
    SET_REGISTER_CALLBACK: (state, callback) => {
      state.registerMQ.push(callback)
    },
    REMOVE_REGISTER_CALLBACK: (state, type) => {
      state.registerMQ = !type ? state.registerMQ.filter(val => val.type) : []
    },
    SET_LOGIN_CLOSE_CALLBACK: (state, callback) => {
      state.closeCallback = callback
    }
  },
  actions: {
    SET_USER: ({ commit }, userInfo) => {
      commit('SET_USER_TOKEN', userInfo)
    },
    SET_PHONE: ({ commit }, contactPhone) => {
      commit('SET_CONTACT_PHONE', contactPhone)
    },
    REMOVE_USER: ({ commit }) => {
      commit('REMOVE_USER_TOKEN')
    },
    LOGIN_SHOW: ({ commit }, closeCallback) => {
      commit('SET_LOGIN_MODEL', true)
      commit('SET_LOGIN_CLOSE_CALLBACK', closeCallback)
    },
    REMOVE_LOGIN_CLOSE_CALLBACL: ({ commit }) => {
      commit('SET_LOGIN_CLOSE_CALLBACK', null)
    },
    LOGIN_HIDDEN: ({ commit }) => {
      commit('SET_LOGIN_MODEL', false)
    },
    FORGOTPASSWORD_SHOW: ({ commit }) => {
      commit('SET_FORGOTPASSWORD_MODEL', true)
    },
    FORGOTPASSWORD_HIDDEN: ({ commit }) => {
      commit('SET_FORGOTPASSWORD_MODEL', false)
    },
    REGISTER_SHOW: ({ commit }) => {
      commit('SET_REGISTER_MODEL', true)
    },
    REGISTER_HIDDEN: ({ commit }) => {
      commit('SET_REGISTER_MODEL', false)
    },
    ADD_LOGIN_CALLBACK({ commit }, callback) {
      commit('SET_LOGIN_CALLBACK', callback)
    },
    CLEAR_LOGIN_CALLBACK({ commit }, type = false) {
      commit('REMOVE_LOGIN_CALLBACK', type)
    },
    ADD_REGISTER_CALLBACK({ commit }, callback) {
      commit('SET_REGISTER_CALLBACK', callback)
    },
    CLEAR_REGISTER_CALLBACK({ commit }, type = false) {
      commit('REMOVE_REGISTER_CALLBACK', type)
    },
    // 用户登陆
    LGOIN_SYSTEM: ({ commit, state }, userInfo) => {
      // 请求登陆接口
      LoginAPI.login(userInfo).then((response) => {
        var data = response.data
        // 设置用户信息
        commit('SET_USER_TOKEN', data)
        // 循环消息队列
        state.loginMQ.forEach(val => { val.success(data) })
      }).catch(e => {
        // 循环消息队列
        state.loginMQ.forEach(val => { val.error(e) })
      })
    },
    // 用户登出
    LGOOUT_SYSTEM: ({ commit }) => {
      // 请求登陆接口
      LoginAPI.logout().then((response) => {
        // 设置用户信息
        commit('REMOVE_USER_TOKEN')
        // 刷新页面
        window.location.reload()
      }).catch(e => {

      })
    },
    // 用户注册
    REGISTER_USER: ({ state }, userInfo) => {
      // 请求注册接口
      LoginAPI.register(userInfo).then((response) => {
        var data = response.data
        // 循环消息队列
        state.registerMQ.forEach(val => { val.success(data) })
      }).catch(e => {
        // 循环消息队列
        state.registerMQ.forEach(val => { val.error(e) })
      })
    }
  }
}

export default app
