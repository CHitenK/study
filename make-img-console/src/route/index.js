import Index from './../views/index/index'
import Makeimg from './../views/makeimg/index'
import List from './../views/list/index'
const router = [
  {
    path: "/content/index",
    component: Index,
    name: '首页'
  },
  {
    path: "/content/list",
    component: List,
    name: '分享图管理'
  },
  {
    path: "/content/makeimg",
    component: Makeimg,
    name: '新增分享图'
  }
]

export default router