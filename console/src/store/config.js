import { createStore } from 'stamen'
const { useStore, dispatch } = createStore({
    state: {
      activeRoute: { id: 100 } // 当前路由
    },
    reducers: {
      // 更新activeRoute数据
      updateActiveRoute(state, data) {
        state.activeRoute = { ...state.activeRoute, ...data }
      }
    } 
})
export { useStore, dispatch }