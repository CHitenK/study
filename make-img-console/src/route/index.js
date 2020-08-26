import Index from './../views/index/index'
import Makeimg from './../views/makeimg/index'
import EditImg from './../views/edit/index'
import List from './../views/list/index'
import Compress from './../views/compress/index'
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
  },
  {
    path: "/content/compress",
    component: Compress,
    name: '图片压缩'
  },
  {
    path: "/content/edit/:id",
    component: EditImg,
    name: '编辑'
  }
]

export default router