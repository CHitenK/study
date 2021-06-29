
import wpay from '@/views/waitpayment/index.vue'
import wpaydetail from '@/views/waitpayment/paydetail.vue'
import wpayItem from '../views/wpayItem.vue'

const ROOT_PATH = '/wpay'
const RoutesMap = [

]

const routes = [
  {
    path: '/wpay',
    name: 'wpay',
    meta: { title: '我的待缴费' },
    component: wpay,
    children: [
      {
        path: '/', name: 'itmes',
        meta: {
          title: '我的待缴费',
        },
        component: wpayItem
      },
      {
        path: 'itmes', name: 'itmes',
        meta: {
          title: '我的待缴费',
        },
        component: wpayItem
      },
    ]
  },
  {
    path: '/wpaydetail',
    name: 'wpaydetail',
    meta: { title: '缴费详情' },
    component: wpaydetail,
    children: []
  }

]

export default { ROOT_PATH, RoutesMap, routes }