import { lazy } from 'react'
const Index = lazy(() =>  import('./../views/index/index'))
const Makeimg = lazy(() =>  import('./../views/makeimg/index'))
const EditImg = lazy(() =>  import('./../views/edit/index'))
const List = lazy(() =>  import('./../views/list/index'))
const Compress = lazy(() =>  import('./../views/compress/index'))
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