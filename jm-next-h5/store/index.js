import { createStore } from 'stamen'

const { useStore, dispatch } = createStore({
    state: {
      bgData: {
      },
      normalOpt: [],
      textOpt: []
    },
    reducers: {
      // 更新底数据
      updateBg(state, data) {
        const old = JSON.parse(JSON.stringify(state.bgData))
        state.bgData = ''
        state.bgData = { ...old, ...data }
      },
      // 清除
      reseBg(state) {
        state.bgData = {}
      },
      // 切换开启/关闭网格
      swicthShowNet(state) {
        state.isShowNet = !state.isShowNet
      },
      updateNormalOpt(state, opt) {
        const { data, index } = opt
        const normalOpt = JSON.parse(JSON.stringify(state.normalOpt))
        normalOpt.splice(index, 1, data)
        state.normalOpt = normalOpt
      },
      insetNormalOpt(state, data) {
        state.normalOpt.push(data)
      },
      resetNormalOpt(state, data) {
        state.normalOpt = [ ...data ]
      },
      deleteNormalOpt(state, index) {
        const normalOpt = state.normalOpt
        normalOpt.splice(index, 1)
        state.normalOpt = normalOpt
      },
      updateTextOpt(state, opt) {
        const { data, index } = opt
        const textOpt = JSON.parse(JSON.stringify(state.textOpt))
        textOpt.splice(index, 1, data)
        state.textOpt = textOpt
      },
      insetTextOpt(state, data) {
        state.textOpt.push(data)
      },
      resetTextOpt(state, data) {
        state.textOpt = [ ...data ]
      },
      deleteTextOpt(state, index) {
        const textOpt = state.textOpt
        textOpt.splice(index, 1)
        state.textOpt = textOpt
      }
    } 
})
export { useStore, dispatch }