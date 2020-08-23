const Router = require("koa-router");
const router = new Router();
const MakeImg = require("./../db/makeimg_db");
const { success, error } = require("./../utils/config");

var http = require("http");
var https = require("https");
var url = require("url");
const { createCanvas, loadImage } = require("canvas");
const path = require("path");
// 生成图片
router.get("/makeimg", async (content, next) => {
  const query = content.query;
  const dbData = await find({ id: query.id });
  const options = dbData[0];
  console.log(options);
  if (!options.id) {
    content.response.body = error;
    return false;
  }
  const { bgData, normalOpt, textOpt } = options;
  const canvas = createCanvas(bgData.width, bgData.height, "jpg");
  const ctx = canvas.getContext("2d");
  // 绘制底框
  if (bgData.isBgColor == 2 && bgData.bgImgSrc) { // 底图
    ctx.drawImage(bgData.bgImgSrc, 0, 0, bgData.width, bgData.height);
    ctx.save();
  } else { // 底色
    let bgColor = ""
    bgImgSrc = bgData.bgImgSrc;
    bgColor = bgData.isTransmit
    ? "#" + query[bgData.transmitName]
    : bgData.bgColor;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, bgData.width, bgData.height);
    ctx.save();
  } 

  // 绘制常规图片
  for (let i = 0; i < normalOpt.length; i++) {
    const item = normalOpt[i];
    let src = item.isTransmit ? query[transmitName] || item.defaultSrc  : item.src;
    const myimg = await loadImage(src);
    ctx.drawImage(myimg, item.px, item.py, item.width, item.height);
    ctx.save();
  }
  // 绘制文字
  for (let i = 0; i < textOpt.length; i++) {
    const item = textOpt[i];
    let des = item.isTransmit ? query[transmitName] || item.defaultDes : item.des;
    ctx.font = item.fontSize + "px" + ' "Microsoft YaHei"';
    ctx.fillStyle = item.fsColor;
    ctx.fillText(des, item.px, +item.py + 8);
    ctx.save();
  }
  content.set("content-type", "image/jpg");
  content.response.body = canvas.toBuffer();
});
// 数据插入
router.post("/api/makeimg/save", async (ctx, next) => {
  const res = { ...success, data: { flage: true } };
  const request = ctx.request.body;
  const flage = await inset(request);
  ctx.response.body = flage ? res : error;
});
//修改用餐人数的接口
router.put('/api/makeimg/test',async (ctx, next)=>{
  const res = { ...success, data: { flage: true } };
  const request = ctx.request.body;
  const flage = await inset(request);
  ctx.response.body = flage ? res : error;
})
// 列表分页
router.post("/api/makeimg/list", async (ctx, next) => {
  try {
    const query = ctx.request.body // 获取请求参数
    const page = { page: query.page, size: query.size }
    const queryData = {}
    if (query.id) {
      queryData.id = query.id
    } else if (query.name) {
      queryData.bgData.name = query.name
    } else if (query.creatName) {
      queryData.creatName = query.creatName
    }
    const array = await getList(page, queryData)
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
router.post('/api/makeimg/delete', async (ctx, next) => {
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
router.post('/api/makeimg/update', async (ctx, next) => {
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
    updateTime: Date.now()
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
function getList(pageData = {}, opt = {}) {
  console.log(pageData, opt)
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
    const size = pageData.size || 5
    const page = (pageData.page -1) || 0
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
// 查找
function find(opt) {
  return new Promise((s, r) => {
    MakeImg.find(opt, (err, res) => {
      if (err) {
        r(err);
      } else {
        s(res);
      }
    });
  });
}
module.exports = router
