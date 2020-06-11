const muneList = [
  // {
  //   groupName: '首页',
  //   id: 0,
  //   path: '/content/index'
  // },
  {
    groupName: '系统管理',
    id: 10,
    path: '',
    children: [
      {
        name: '用户列表',
        id: 101,
        path: '/content/user'
      }
    ]
  },
  {
    groupName: '业务管理',
    id: 20,
    path: '',
    children: [
      {
        name: '分享图管理',
        id: 201,
        path: '/content/share'
      }
    ]
  }
]
export default muneList