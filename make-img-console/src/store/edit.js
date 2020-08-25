import { createStore } from 'stamen'

const { useStore, dispatch } = createStore({
    state: {
     
    },
    reducers: {
      // 更新底数据
      updateBg(state, data) {
        state.bgData = { ...state.bgData, ...data }
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
      deleteTextOpt(state, index) {
        const textOpt = state.textOpt
        textOpt.splice(index, 1)
        state.textOpt = textOpt
      },
      reset(state, data) {
        state = data
      }
    } 
})
export { useStore, dispatch }