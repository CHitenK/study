const initTags = [
  {
    path: '/content/home/page1', // 路径
    name: 'home-page1', // 名称
    meta: {
      title: '页面一',
      affix: true
    }
  }
]

const state = {
  tagsList: initTags // tag
}

const mutations = {
  SET_TAGS_LIST: (state, data) => {
    state.tagsList = data
  }
}

const actions = {
  AC_SET_TAGS_LIST ({ commit }, data) {
    commit('SET_TAGS_LIST', data)
  }
}

export default {
  namespaced: true, // 命名空间 this.$store.commit('XXX/SETXXX',sth); this.$store.getters['XXX/getXXX'];
  state,
  mutations,
  actions
}
