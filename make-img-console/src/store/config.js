import { createStore } from 'stamen'
const nameArray = ['高富帅', '奈我何', '晏清窈', '路人甲', '醉沙疆', '海上花', '衾枕寒', '凌云児', '莫筱夜', '天羽葵']
const index = Date.now() % 10
const { useStore, dispatch } = createStore({
    state: {
      activeRoute: { id: 100 }, // 当前路由
      userName: nameArray[index],
      showLoading: false  // 是否显示加载菊花
    },
    reducers: {
      // 更新activeRoute数据
      updateActiveRoute(state, data) {
        state.activeRoute = { ...state.activeRoute, ...data }
      },
      setShowLoading(state, bl) {
        state.showLoading = bl
      }
    } 
})
export { useStore, dispatch }