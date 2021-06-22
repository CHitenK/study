
/**
 * @description 新增专题的store
 */
const state = {
  activeComponent: { // 当前组件数据
    name: '', // 当前组件名称
    uuid: '' // 数据Id 为空时是默认数据
  },
  titleData: {// 专题标题数据
    // status: '-2' // 状态 -1已下线，0待上线，1上线中 -2 草稿
  },
  // 积木手机模拟框的数据
  jmData: [],
  // 当前操作数据的组件uuID
  activeUuid: null,
  saveCommitFlage: 0, // 提交，保存 触发随机数
  scrollOptions: {}, // 滚动模拟框位置数据
  scrollTopOptions: {}, // 设置滚到某组件对应的目标div
  navActiveUuid: '', // 导航（锚点） active
  scrollFoot: 0 // 滚动到底部触发随机数
}

const mutations = {
  ACTIVECOMPONET: (state, data) => {
    state.activeComponent = data
  },
  TITLE_DATA: (state, data) => {
    state.titleData = { ...data }
  },
  JM_DATA_ADD: (state, data) => {
    state.jmData.push(data)
  },
  ACTIVE_UUID: (state, id) => {
    state.activeUuid = id
  },
  JM_DATA_DELETE: (state, id) => {
    let key = ''
    state.jmData.forEach((item, i) => {
      if (item.uuid === id) {
        key = i
      }
    })
    if (key === '') return false // 拦截
    if (key === 0) { // 删除数组第一个元素
      if (state.jmData.length === 1) { // 最后一个元素 设置当前组件为title 组件 uuid 为空
        state.activeComponent = { name: 'title', uuid: '' }
        state.activeUuid = ''
      } else { // 设置当前组件为下标为1的组件
        state.activeComponent = { name: state.jmData[1].name, uuid: state.jmData[1].uuid }
        state.activeUuid = state.jmData[1].uuid
      }
    } else { // 删除不是第一个元素
      state.activeComponent = { name: state.jmData[key - 1].name, uuid: state.jmData[key - 1].uuid }
      state.activeUuid = state.jmData[key - 1].uuid
    }
    state.jmData.splice(key, 1) // 删除数据
  },
  JM_DATA_MOTO_UP: (state, id) => {
    let key = ''
    state.jmData.forEach((item, i) => {
      if (item.uuid === id) {
        key = i
      }
    })
    if (key === '' || key === 0 || state.jmData.length === 1) return false
    const target1 = state.jmData[key]
    const target2 = state.jmData[key - 1]
    state.jmData.splice(key - 1, 2, target1, target2)
  },
  JM_DATA_MOTO_DOWN: (state, id) => {
    let key = ''
    state.jmData.forEach((item, i) => {
      if (item.uuid === id) {
        key = i
      }
    })
    if (key === '' || state.jmData.length === key + 1) return false
    const target1 = state.jmData[key]
    const target2 = state.jmData[key + 1]
    state.jmData.splice(key, 2, target2, target1)
  },
  JM_DATA_COPY: (state, id) => {
    let key = ''
    state.jmData.forEach((item, i) => {
      if (item.uuid === id) {
        key = i
      }
    })
    if (key === '') return false
    const target1 = JSON.stringify(state.jmData[key])
    const target2 = { ...JSON.parse(target1), uuid: Date.now() }
    if (target2.name === 'jm-banner' && target2.businessData.modelName && target2.businessData.modelId) {
      target2.businessData.modelName = ''
      target2.businessData.modelId = ''
    }
    state.jmData.push(target2)
    state.activeComponent = { name: target2.name, uuid: target2.uuid }
    state.activeUuid = target2.uuid
  },
  JM_DATA_CHANGE: (state, options) => {
    const { index, data } = options
    const tData = JSON.parse(JSON.stringify({ ...data }))
    state.jmData.splice(index, 1, tData)
  },
  SAVE_COMMIT_FLAGE: (state, data) => {
    state.saveCommitFlage = data
  },
  SCROLL_OPITIOS_SET: (state, data) => {
    state.scrollOptions = data
  },
  SCROLL_TOP_OPITIONS_SET: (state, data) => {
    state.scrollTopOptions = data
  },
  NAV_ACTICE_UUID_SET: (state, data) => {
    state.navActiveUuid = data
  },
  JM_DATA_INIT: (state, data) => {
    state.jmData = data
  },
  SCROLL_FOOT_SET: (state, data) => {
    state.scrollFoot = data
  }
}

const actions = {
  SET_ACTIVECOMPONET({ commit }, data) {
    commit('ACTIVECOMPONET', data)
  },
  SET_TITLE_DATA({ commit }, data) {
    commit('TITLE_DATA', data)
  },
  SET_ACTIVE_UUID({ commit }, id) {
    commit('ACTIVE_UUID', id)
  },
  ADD_JM_DATA({ commit }, data) {
    commit('JM_DATA_ADD', data)
  },
  DELETE_JM_DATA({ commit }, id) {
    commit('JM_DATA_DELETE', id)
  },
  MOTO_UP_JM_DATA({ commit }, id) {
    commit('JM_DATA_MOTO_UP', id)
  },
  MOTO_DOWN_JM_DATA({ commit }, id) {
    commit('JM_DATA_MOTO_DOWN', id)
  },
  COPY_JM_DATA({ commit }, id) {
    commit('JM_DATA_COPY', id)
  },
  CHANGE_JM_DATA({ commit }, options) {
    commit('JM_DATA_CHANGE', options)
  },
  SET_SAVE_COMMIT_FLAGE({ commit }, data) {
    commit('SAVE_COMMIT_FLAGE', data)
  },
  SET_SCROLL_OPITIOS({ commit }, data) {
    commit('SCROLL_OPITIOS_SET', data)
  },
  SET_SCROLL_TOP_OPITIONS({ commit }, data) {
    commit('SCROLL_TOP_OPITIONS_SET', data)
  },
  SET_NAV_ACTICE_UUID({ commit }, data) {
    commit('NAV_ACTICE_UUID_SET', data)
  },
  INIT_JM_DATA({ commit }, data) {
    commit('JM_DATA_INIT', data)
  },
  SET_SCROLL_FOOT({ commit }, data) {
    commit('SCROLL_FOOT_SET', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
