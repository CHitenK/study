import { _require_embed } from '@/utils/import'

import BaseLayout from '@/layout/EmbedLayout.vue'

const _require = _require_embed('supply')
const ROOT_PATH = '/_supply'

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
