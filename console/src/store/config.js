import { createStore } from 'stamen'
const { useStore, dispatch } = createStore({
    state: {
      activeRoute: { id: 100 }, // 当前路由
      showLoading: false  // 是否显示加载菊花
    },
    reducers: {
      // 更新activeRoute数据
      updateActiveRoute(state, data) {
        state.activeRoute = { ...state.activeRoute, ...data }
      },
      setShowLoading(state, bl) {
        state.showLoading = bl
        console.log(state.showLoading)
      }
    } 
})
export { useStore, dispatch }