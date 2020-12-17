const getters = {
  user: state => state.user,
  userId: state => state.user.userInfo ? state.user.userInfo.userId || '' : ''
}
export default getters
