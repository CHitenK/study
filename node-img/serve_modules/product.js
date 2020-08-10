const Router = require("koa-router");
const router = new Router();
const { productList, productDetail } = require("./../db/product_db");
const { success, error } = require("./../utils/config");

router.get("/product/list", async (ctx, next) => {
  try {
    const query = ctx.request.body // 获取请求参数
    const page = { page: query.page || 1, size: query.size || 5 }
    const array = await getList(page)
    const total = array[0]
    const content = array[1]
    ctx.response.body = { ...success, data: { total, content }}
  } catch {
    ctx.response.body = error
  }
})

console.log(productList)
// 列表查找
function getList(pageData = {}, opt = {}) {
  console.log(pageData, opt)
  const P1 = new Promise((s, r) => {
    productList.find(opt)
      .count((err, data) => {
        if (err) {
          r(0)
        } else {
          console.log(data, '12444')
          s(data)
        }
      })
  })
  const P2 = new Promise((s, r) => {
    const size = pageData.size || 5
    const page = (pageData.page -1) || 0
    productList.find()
      .limit(size)
      .skip(page * size)
      .exec((err, data) => {
        if (err) {
          r(false)
        } else {
          s(data)
        }
      })
  })
  return Promise.all([P1, P2])
}

module.exports = router