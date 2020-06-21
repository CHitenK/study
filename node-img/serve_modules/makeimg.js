
const Router = require('koa-router')
const router = new Router()
const User = require('./../db/user_db')
router.post('/makeimg/save', async (ctx, next) => {
    const res = { code: 200, data: { flage: true }}
    ctx.response.body = res
})

module.exports = router