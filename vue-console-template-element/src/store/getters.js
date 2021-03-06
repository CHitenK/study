const getters = {
  user: state => state.user,
  userId: state => state.user.userInfo ? state.user.userInfo.userId || '' : '',
  tagsList: state => state.tags.tagsList ? state.tags.tagsList || [] : [],
  tagBxWidth: state => state.tags.tagBxWidth
}
export default getters
