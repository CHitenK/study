const state = {
  userInfo: {} // 用户信息
}

const mutations = {
  SET_USER_INFO: (state, data) => {
    state.userInfo = data
  }
}

const actions = {
  AC_SET_USER_INFO({ commit }, data) {
    commit('SET_USER_INFO', data)
  }
}

export default {
  namespaced: true, // 命名空间 this.$store.commit('XXX/SETXXX',sth); this.$store.getters['XXX/getXXX'];
  state,
  mutations,
  actions
}
