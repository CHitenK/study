const state = {
  isCollapse: false, // 左侧菜单打开/关闭
  scrollTop: 0 // 滚动高度
}

const mutations = {
  UPDATE_STATE: (state, data) => {
    state[data.key] = data.value
  }
}

const actions = {
  AC_UPDATE_STATE({ commit }, data) {
    commit('UPDATE_STATE', data)
  }
}

export default {
  namespaced: true, // 命名空间 this.$store.commit('XXX/SETXXX',sth); this.$store.getters['XXX/getXXX'];
  state,
  mutations,
  actions
}
