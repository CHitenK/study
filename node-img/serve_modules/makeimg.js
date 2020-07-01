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
// 数据查找
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
  let bgColor = "",
    bgImgSrc = bgData.bgImgSrc;
  bgColor = bgData.isTransmit
    ? "#" + query[bgData.transmitName]
    : bgData.bgColor;
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, bgData.width, bgData.height);
  ctx.save();
  // 绘制常规图片
  for (let i = 0; i < normalOpt.length; i++) {
    const item = normalOpt[i];
    let src = item.isTransmit ? query[transmitName] : item.src;
    const myimg = await loadImage(src);
    ctx.drawImage(myimg, item.px, item.py, item.width, item.height);
    ctx.save();
  }
  // 绘制文字
  for (let i = 0; i < textOpt.length; i++) {
    const item = textOpt[i];
    let des = item.isTransmit ? query[transmitName] : item.des;
    ctx.font = item.fontSize + "px" + ' "Microsoft YaHei"';
    ctx.fillStyle = item.fsColor;
    ctx.fillText(des, item.px, +item.py + 8);
    ctx.save();
  }
  content.set("content-type", "image/jpg");
  content.response.body = canvas.toBuffer();
});
// 列表分页
router.get("/list", async (content, next) => {
  const kk = await getList();
  console.log(kk);
  content.response.body = "success";
});
router.post("/makeimg/list", async (ctx, next) => {
  try {
    const array = await getList()
    const total = array[0]
    const content = array[1]
    ctx.response.body = { ...success, data: { total, content }}
  } catch {
    ctx.response.body = error
  }
 
});
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
function getList(opt = {}) {
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
    MakeImg.find(opt)
      .limit(4)
      .skip(4)
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
