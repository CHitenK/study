const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const sharp = require('sharp')
const textToSVG = require('text-to-svg').loadSync()
const Router = require('koa-router')
const fs = require('fs')
const mime = require('mime-types') //需npm安装
const router = new Router()
var http = require('http')
var url = require('url')
const userRoter = require('./serve_modules/user')
const makeImgRoter = require('./serve_modules/makeimg')
const uploadRoute = require('./serve_modules/upload')

router.get('/image', async (ctx, next) => {
  // ctx.response.body = '<h5>Index</h5>';
  try {
    let options = {
      x: 0,         //文本开头的水平位置（默认值：0）
      y: 0,         // 文本的基线的垂直位置（默认值：0）
      fontSize: 18, // 字体大小
      anchor: 'top', // 坐标中的对象锚点
      attributes: {
          fill: '#000' // 文字颜色
      }
    }
    let textSVG = textToSVG.getSVG('我的店铺名', options)
    const img = await getImgs('http://chimke.cn/images/add.png')
    console.log(textSVG)
    const svgBuffer = Buffer.from(textSVG)
    const semiTransparentRedPng1 = await sharp({
      create: {
        width: 400,
        height: 400,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    }).composite([{
      input: semiTransparentRedPng,
      gravity: 'southeast',
      top: 30,
      left: 15
    }]).png()

    console.log(semiTransparentRedPng)

    ctx.set('content-type', 'image/png')
    ctx.response.body = semiTransparentRedPng1
  } catch(err) {
    console.log('失败',err)
    ctx.response.body = {
      code: 500,
      data: {},
      masg: '出错了'
    }
  }
  
})
app.use(bodyParser())
app.use(router.routes()) 
app.use(userRoter.routes())
app.use(makeImgRoter.routes())
app.use(uploadRoute.routes())
app.listen(2020, function() {
  console.log('----------------------2020端口启动了-------------------------')
})

function getImgs(imgurl) {
  var options = url.parse(imgurl)
  return new Promise((resolve, reject) => {
    // 请求图片资源
    http.get(options, function (response) {
      var chunks = []
      response.on('data', function (chunk) {
        chunks.push(chunk)
      }).on('end', function() {
        var buffer = Buffer.concat(chunks)
        resolve(buffer)
      });
    })
  })
}
