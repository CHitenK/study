import {POST, GET} from './request'
export const Api = {
    indexMenu (params) { // DTP头部导航栏
        return POST(
            'api/front/column/list.do',
            params
        )
    },
    indexLoad (params) { // DTP首页
        return POST(
            'api/front/home/index.do',
            params
        )
    },
    footerLoad (params) { // DTP底部导航栏
        return POST(
            'api/front/home/bottom.do',
            params
        )
    },
    keywordLoad (params) { // 底部关键字
        return POST(
          'api/front/meet/keyword.do',
          params
        )
    },
    meetLoad (params) { // 认识DTP
        return POST(
            'api/front/meet/index.do',
            params
        )
    },
    centralizeLoad (params) { // 集成服务
        return POST(
          'api/front/joinus/centralize.do',
            params
        )
    },
    confrontLoad (params) { // 全球抗疫频道
        return POST(
          'api/front/confront/index.do',
            params
        )
    },
    leaveDo(params){ // 企业留言 userName=姓名11&tel=手机号码11&companyName=公司名称11&message=留言内容11
        return POST(
          'api/front/other/leave.do',
          params
        )
    },
    settleDo(params){ // 立即入驻 userName=姓名11&tel=手机号码11&companyName=公司名称11&position=职位11&emil=邮箱11&roles=roles11
      return POST(
        'api/front/other/settle.do',
        params
      )
    },
    linksLoad () { // 底部友情链接
        return POST(
          'api/front/link/index.do',
          {}
        )
    },
    digitalService (params) {
      return POST(
          '/api/front/market/index.do',
          params
      )
    },
    settlePlatform (params) {
        return POST(
            'api/front/home/settlePlatform.do', // banner上的新闻滚动
            params
        )
    },
    origin (params) {
        return POST(
            'api/front/origin/index.do', // 溯源服务
            params
        )
    },
    recommendNewsList (params) { // 新闻最新动态
        return POST(
            '/api/front/meet/recommendNewsList.do',
            params
        )
    },
    category (params) {  // 安心找抗疫产品分类
         return GET(
            '/api/front/confront/category.do',
            params
         )
    },
    pandemicProducts (params) {  // 安心找抗疫产品
      return GET(
         '/api/front/confront/products.do',
         params
      )
    },
    demand (params) { //询价表单
      return GET(
        '/api/front/confront/demand.do',
        params
     )
    },
    roles () {
        return GET(
            'api/front/client/roles.do', // 注册角色
            {}
        )
    },
    warrant () {
        return GET(
            'api/front/home/warrant.do', // 授权认证书
            {}
        )
    },
}
