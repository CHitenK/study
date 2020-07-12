const Router = require("koa-router");
const router = new Router();
const MakeImg = require("./../db/makeimg_db");
const { success, error } = require("./../utils/config");

var http = require("http");
var https = require("https");
var url = require("url");
const { createCanvas, loadImage } = require("canvas");
const path = require("path");
// 数据插入
router.post("/makeimg/save", async (ctx, next) => {
  const res = { ...success, data: { flage: true } };
  const request = ctx.request.body;
  const flage = await inset(request);
  ctx.response.body = flage ? res : error;
});
// 列表分页
router.get("/list", async (content, next) => {
  console.log()
  const kk = await getList();
  content.response.body = "success";
});
router.post("/makeimg/list", async (ctx, next) => {
  try {
    const query = ctx.request.body // 获取请求参数
    const page = { page: query.page, size: query.size }
    delete query.page
    delete query.size
    const array = await getList(page, query)
    const total = array[0]
    const content = array[1]
    ctx.response.body = { ...success, data: { total, content }}
  } catch {
    ctx.response.body = error
  }
 
});
/**
 * @default 通过id删除数据
 * @param {String} id 
 */
router.post('/makeimg/delete', async (ctx, next) => {
  try {
    const query = ctx.request.body
    console.log('删除，传入数据', query)
    const data = await deleteData({ 'id': query.id })
    if (data === true) {
      ctx.response.body = { ...success, data: { falge: true }}
    } else {
      ctx.response.body = { ...error, data: { falge: false }}
    }
  }catch {
    ctx.response.body = error
  }
})
/**
 * @description 修改数据
 */
router.post('/makeimg/update', async (ctx, next) => {
  try {
    const query = ctx.request.body
    const id = query.id
    delete query.id
    const data = await update(id,  query)
    if (data === true) {
      ctx.response.body = { ...success, data: { falge: true }}
    } else {
      ctx.response.body = { ...error, data: { falge: false }}
    }
  }catch {
    ctx.response.body = error
  }
})
// 插入
function inset(data) {
  const makeimg = new MakeImg({
    ...data,
    id: "MKI" + Date.now(),
    creatTime: Date.now(),
    updateTime: Date.now(),
  });
  return new Promise((resoved, reject) => {
    makeimg.save((err, res) => {
      if (err) {
        reject("error");
      } else {
        resoved(true);
      }
    });
  });
}
// 请求图片
function getImgs(imgurl) {
  var options = url.parse(imgurl);
  return new Promise((resolve, reject) => {
    // 请求图片资源
    https.get(options, function (response) {
      var chunks = [];
      response
        .on("data", function (chunk) {
          chunks.push(chunk);
        })
        .on("end", function () {
          var buffer = Buffer.concat(chunks);
          resolve(chunks);
        });
    });
  });
}
// 列表查找
function getList({page, size}, opt = {}) {
  const P1 = new Promise((s, r) => {
    MakeImg.find(opt)
      .count((err, data) => {
        if (err) {
          r(0)
        } else {
          s(data)
        }
      })
  })
  const P2 = new Promise((s, r) => {
    const size = size || 5
    const page = (page -1) || 0
    MakeImg.find(opt)
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
// 删除数据
function deleteData(opt) {
  return  new Promise((s, r) => {
    MakeImg.deleteOne(opt, (err, data) => {
      if (err) {
        console.log('删除数据出错：', err)
        r(false)
      } else {
        console.log('删除数据成功：', data)
        if (data.deletedCount > 0) {
          s(true)
        } else {
          r(false)
        }
      }
    })
  })
}
/**
 * @description 更新数据
 */
function update(id, opt) {
  console.log(id, opt )
  return  new Promise((s, r) => { 
    MakeImg.updateOne({ id: id }, opt, (err,doc) => {
      if(err) {
        console.log('更新数据报错', err)
        r(false)
        return false
      }
      console.log('更新数据成功', doc)
      if (doc.nModified > 0 ) {
        s(true)
      } else {
        r(false)
      }
      
    })
  })
}
module.exports = router
