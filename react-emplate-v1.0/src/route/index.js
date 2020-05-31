
import Page from './../views/page/index'
import State from './../views/state/index'
import Eventt from './../views/event/index'
import List from './../views/list/index'
import If from './../views/if/index'
import ClassName from './../views/className/index'
import LifeCycle from './../views/lifeCycle/index'
const router = [
  {
    path: "/page",
    component: Page
  },
  {
    path: "/state",
    component: State
  },
  {
    path: "/event",
    component: Eventt
  },
  {
    path: "/list",
    component: List
  },
  {
    path: "/if",
    component: If
  },
  {
    path: "/className",
    component: ClassName
  },
  {
    path: "/lifeCycle",
    component: LifeCycle
  },
]

export default router