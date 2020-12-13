const Axios = require('axios')
const sha1 = require('sha1')
const Router = require('koa-router')
const router = new Router()
const User = require('./../db/user_db')
router.get('/user/info', async (ctx, next) => {
    const res = await inset()
    ctx.response.body = res
})

router.get('/user/token', async (ctx, next) => {
  const data1 = await getWxToken()
  const data2 = await getTac(data1)
  const noncestr = 'OIfKqwerujhfTyui'
  const timestamp = parseInt(Date.now() / 1000)
  const url = 'http://chimke.cn:8083/pages/login/index'
  const str = `jsapi_ticket=${data2}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`
  const sh = sha1(str)
  const yaya = {
    appId: 'wx17d304d815b5193f', // 必填，公众号的唯一标识
    timestamp: timestamp, // 必填，生成签名的时间戳
    nonceStr: noncestr, // 必填，生成签名的随机串
    signature: sh
  }
  ctx.response.body = {
    resultCode: "0",
    resultMsg: "success",
    data: yaya
  }
})
function inset() {
    const user = new User({
        userName : 'Tracy McGrady',                 //用户账号
        userpwd: 'abcd',                            //密码
        userAge: 37,                                //年龄
        logindate : new Date()                      //最近登录时间
    })
    return new Promise((resoved, reject) => {
        user.save((err, res) => {
            if (err) {
                reject('error')
            }
            else {
                resoved('succes')
            }
    
        })
    })
   
}

function getWxToken() {
    return new Promise((resoved, reject) => {
        Axios({
            method: 'GET',
            url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx17d304d815b5193f&secret=3f79fd1aa7db75aeb7c0ee51e7d23760'
        }).then(res => {
            console.log('access_token', res.data)
            if (res.data.access_token) {
                resoved(res.data.access_token)
            } else {
                reject(null)
            }
        }).catch(err => {
            reject(null)
        })
    })
}
function getTac(data) {
    return new Promise((resoved, reject) => {
        Axios({
            method: 'GET',
            url: `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${data}&type=jsapi`
        }).then(res => {
            console.log('ticket', res.data)
            if (res.data.ticket) {
                resoved(res.data.ticket)
            } else {
                reject(null)
            }
        })
    })    
}
module.exports = router