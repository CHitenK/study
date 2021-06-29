import { observable, action, computed } from 'mobx'

const defalutStore = () => {
  return {
    userInfo: {},
    token: ''
  }
}
class AppStore {
  @observable state = defalutStore()
  // 用户信息
  @computed get userInfo() {
    return  Object.keys(this.state.userInfo).length > 0 ? this.state.userInfo : null
  }
  // tokenId
  @computed get authToken() {
    return this.state.token
  }
  // 设置token
  @action setToken = (token) => {
    this.state.token = token
  }
  // 设置用户信息
  @action setUserInfo = (data) => {
    this.state.userInfo = Object.keys(this.state.userInfo).length > 0 ? { ...this.state.userInfo, ...data } : data
  }
}

export default new AppStore()