import route from '@/router/menu-route'

const initTags = [] // 是一个树结构的数据
const activeTages = []
function mapTree(data) {
  const newestRoute = window.location.pathname
  data.map(items => {
    // 保证页面刷新时，保留当前页面url对应的tab数据
    if (items.redirect === newestRoute) { // 一级菜单是路由情况
      activeTages.push({
        path: items.path,
        name: items.name,
        meta: items.meta
      })
    }
    if ((!items.children || items.children.length < 1) && items.meta.affix) {
      initTags.push({
        path: items.path,
        name: items.name,
        meta: items.meta,
        fullPath: items.path
      })
    } else if (items.children) {
      // 保证页面刷新时，保留当前页面url对应的tab数据
      let route
      items.children.forEach(item => {
        if (item.path === newestRoute && !item.meta.affix) {
          route = item
        } else if (item.path.includes('/:') && !item.meta.affix) {
          const array = item.path.split('/:') || []
          if (newestRoute.includes(array[0])) {
            route = { ...item, path: newestRoute }
          }
        }
      })
      if (route) {
        activeTages.push({
          path: route.path,
          name: route.name,
          meta: route.meta
        })
      }
    }
    if (items.children) {
      mapTree(items.children)
    }
  })
}

mapTree(route)

const state = {
  tagsList: [...initTags, ...activeTages], // tag list
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
  AC_SET_TAGS_LIST({ commit }, data) {
    commit('SET_TAGS_LIST', data)
  },
  AC_ADD_TAGS_LIST({ commit }, data) {
    commit('ADD_TAGS_LIS', data)
  },
  AC_DELETE_TAGS_LIST({ commit }, index) {
    commit('DELETE_TAGS_LIST', index)
  },
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
