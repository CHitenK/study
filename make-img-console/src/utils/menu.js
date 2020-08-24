import React from 'react'
import { HomeOutlined, InsertRowAboveOutlined, SaveOutlined, DatabaseOutlined } from '@ant-design/icons'
const muneList = [
  {
    name: '首  页',
    id: 100,
    path: '/content/index',
    isMenu: true,
    icon: <HomeOutlined />
  },
  {
    name: '分享图管理',
    id: 101,
    path: '/content/list',
    icon: <InsertRowAboveOutlined />,
    isMenu: true
  },
  {
    name: '生成分享图',
    id: 102,
    path: '/content/makeimg',
    isMenu: true,
    icon: <SaveOutlined />
  },
  {
    name: '图片压缩',
    id: 103,
    path: '/content/compress',
    isMenu: true,
    icon: <DatabaseOutlined />
  }
]
export default muneList