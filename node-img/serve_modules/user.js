const Router = require('koa-router')
const router = new Router()
const User = require('./../db/user_db')
router.get('/user/info', async (ctx, next) => {
    const res = await inset()
    ctx.response.body = res
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

module.exports = router