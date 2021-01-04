import route from '@/router/menu-route'

const initTags = [] // 是一个树结构的数据

function mapTree (data) {
  data.map(items => {
    if ((!items.children || items.children.length < 1) && items.meta.affix) {
      initTags.push({
        path: items.path,
        name: items.name,
        meta: items.meta
      })
    }
    if (items.children) {
      mapTree(items.children)
    }
  })
}

mapTree(route)

const state = {
  tagsList: initTags, // tag list
  tagBxWidth: 'calc(160px * 5)', // tag栏宽度 默认
  tagScrollLeft: 0 // tag 滚动长度
}

const mutations = {
  SET_TAGS_LIST: (state, data) => {
    state.tagsList = data
  },
  ADD_TAGS_LIS: (state, data) => {
    state.tagsList.push(data)
  },
  DELETE_TAGS_LIST: (state, index) => {
    const tagsList = state.tagsList
    tagsList.splice(index, 1)
    state.tagsList = tagsList
  },
  UPDATE_STATE: (state, data) => {
    state[data.key] = data.value
  }
}

const actions = {
  AC_SET_TAGS_LIST ({ commit }, data) {
    commit('SET_TAGS_LIST', data)
  },
  AC_ADD_TAGS_LIST ({ commit }, data) {
    commit('ADD_TAGS_LIS', data)
  },
  AC_DELETE_TAGS_LIST ({ commit }, index) {
    commit('DELETE_TAGS_LIST', index)
  },
  AC_UPDATE_STATE ({ commit }, data) {
    commit('UPDATE_STATE', data)
  }
}

export default {
  namespaced: true, // 命名空间 this.$store.commit('XXX/SETXXX',sth); this.$store.getters['XXX/getXXX'];
  state,
  mutations,
  actions
}
