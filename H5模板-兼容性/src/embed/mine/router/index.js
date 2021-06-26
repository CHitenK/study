import { _require_embed } from '@/utils/import'

import BaseLayout from '@/layout/EmbedLayout.vue'

const _require = _require_embed('mine')
const ROOT_PATH = '/_mine'

const RoutesMap = [

]

const routes = [
  {
    path: ROOT_PATH,
    component: BaseLayout,
    redirect: `${ROOT_PATH}`,
    meta: {},
    children: [...RoutesMap]
  }
]

export default { ROOT_PATH, RoutesMap, routes }
