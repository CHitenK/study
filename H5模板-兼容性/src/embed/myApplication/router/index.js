
import myApplication from '@/views/myApplication/index'
import status from './../views/status.vue'

const ROOT_PATH = '/myApplication'

const RoutesMap = [

]

const routes = [
  {
    path: '/myApplication',
    name: 'myApplication',
    meta: { title: '我的申请' },
    component: myApplication,
    children: [
      {
        path: '/', name: 'status',
        meta: {
          title: '我的申请',
        },
        component: status
      },
      {
        path: '/status', name: 'status',
        meta: {
          title: '我的申请',
        },
        component: status
      },
    ]
  }
]

export default { ROOT_PATH, RoutesMap, routes }