const Router = require("koa-router");
const router = new Router();
const { jmData } = require("./../db/jm_db");
const { success, error } = require("./../utils/config");

router.get("/jm/detail", async (ctx, next) => {
  try {
    const { id } = ctx.request.query // 获取请求参数
    const array = await getDetail({ specialId: id })
    const data = array ? array[0] : null
    ctx.response.body = { ...success, data: data || null }
  } catch {
    ctx.response.body = error
  }
})

// 详情查找
function getDetail(opt) {
  return new Promise((resolve, reject) => {
    jmData.find(opt, (err, data) => {
      if (err) {
        reject(false)
      } else {
        resolve(data)
      }
    })
  })
}

module.exports = router