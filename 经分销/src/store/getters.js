const getters = {
  user: state => state.user,
  userId: state => state.user.userInfo ? state.user.userInfo.userId || '' : '',
  isCollapse: state => state.base.isCollapse,
  tagsList: state => state.tags.tagsList ? state.tags.tagsList || [] : [],
  tagBxWidth: state => state.tags.tagBxWidth,
  scrollTop: state => state.base.scrollTop
}
export default getters
