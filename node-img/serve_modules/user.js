const Router = require('koa-router')
const router = new Router()
router.get('/user/info', async (ctx, next) => {
    ctx.response.body = 'info'
})
module.exports = router