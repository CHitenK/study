const Axios = require('axios')
const Router = require('koa-router')
const router = new Router()
const User = require('./../db/user_db')
router.get('/user/info', async (ctx, next) => {
    const res = await inset()
    ctx.response.body = res
})

router.get('/user/token', async (ctx, next) => {
  const data = await getWxToken()
  console.log(data)
  ctx.response.body = data
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
            resoved(res.data)
        })
    })
}
module.exports = router