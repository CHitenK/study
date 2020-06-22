
const Router = require('koa-router')
const router = new Router()
const MakeImg = require('./../db/makeimg_db')
const { success, error } = require('./../utils/config')
router.post('/makeimg/save', async (ctx, next) => {
    const res = { ...success, data: { flage: true }}
    const request = ctx.request.body
    console.log(request)
    const flage = await inset(request)
    ctx.response.body = flage ? res : error
})

function inset(data) {
    const makeimg = new MakeImg({
       ...data,
       id: 'MKI' + Date.now(),
       creatTime: Date.now(), 
       updateTime: Date.now()
    })
    return new Promise((resoved, reject) => {
        makeimg.save((err, res) => {
            if (err) {
                reject('error')
            }
            else {
                resoved(true)
            }
        })
    })
   
}


module.exports = router