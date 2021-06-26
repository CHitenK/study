
import shops from '@/views/shops/index'

const ROOT_PATH = '/shops'

const RoutesMap = [

]

const routes = [
  {
    path: '/shops',
    name: 'shops',
    meta: { title: '商铺' },
    component: shops,
    children: [
      
    ]
  }
]

export default { ROOT_PATH, RoutesMap, routes }