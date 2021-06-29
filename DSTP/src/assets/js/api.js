import { POST } from './request'
export const Api = {
    newsList (params) {
        return POST(
            '/api/front/meet/newsList.do', // 新闻列表
            params
        )
    },
    newsDetails (params) {
        return POST(
            '/api/front/meet/articleDetails.do', // 新闻详情
            params
        )
    },
    recommendNewsList (params) { // 新闻最新动态
        return POST(
            '/api/front/meet/recommendNewsList.do',
            params
        )
    },
    register (params) {
        return POST(
            '/api/front/other/registered.do', // 注册
            params
        )
    },
    smsVerification (params) {
        return POST(
            '/api/front/other/sms.do', // 发送短信验证码
            params
        )
    },
    unionRecruit (params) {
        return POST(
            '/api/front/joinus/index.do', // DTP联盟招募
            params
        )
    },
    navigList (params) {
        return POST(
            '/api/front/meet/navigList.do', // 全球抗疫，广东担当
            params
        )
    },
    expertList (params) {
        return POST(
            '/api/front/expert/index.do', // 专家在线
            params
        )
    },
    advisory (params) {
        return POST(
            '/api/front/other/advisory.do', //  咨询服务
            params
        )
    },
    legalSecrecy (params) {
        return POST(
            '/api/front/home/legalSecrecy.do', // 隐私条款、法律声明
            params
        )
    },
    // 下拉数据
    demandList (params) {
      return POST(
          '/api/front/link/demand.do', // 隐私条款、法律声明
          params
      )
   },
   // 保存服务方案
   setScheme (params) {
    return POST(
        '/api/front/common/scheme.do', // 隐私条款、法律声明
        params
    )
 },
    smsOrigin (params) {
        return POST(
            '/api/front/other/originSMS.do', // 加入溯源发送短信验证码
            params
        )
    },
    joinOrigin (params) {
        return POST(
            '/api/front/other/joinOrigin.do', // 加入溯源
            params
        )
    },
    legalize (params) {
        return POST(
            '/api/front/meet/legalize.do', // 抗疫物资认证工厂列表页
            params
        )
    },
    registrationTerms (params) {
        return POST(
            '/api/front/home/registrationTerms', // 注册DTP账号须知
            params
        )
    },
    settleRoles (params) {
        return POST(
            '/api/front/joinus/settleRoles.do', // 入驻角色
            params
        )
    },
}