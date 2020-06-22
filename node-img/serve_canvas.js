const Koa = require('koa')
const Router = require('koa-router')
const router = new Router()
const app = new Koa()

var http = require('http')
var https = require('https')
var url = require('url')
const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(400, 600, 'jpg')
const ctx = canvas.getContext('2d')
const path = require('path')

router.get('/image', async (res, next) => {
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, 400, 600)
  ctx.save()
  ctx.font = '16px "Microsoft YaHei"'
  ctx.fillStyle = '#000'
  // ctx.rotate(0.1)
  ctx.fillText('非常好!', 10, 20)
  
  // Draw line under text
  var text = ctx.measureText('非常好!')
  ctx.strokeStyle = '#000'
  ctx.beginPath()
  ctx.lineTo(50, 102)
  ctx.lineTo(50 + text.width, 102)
  ctx.stroke() 
  ctx.save()
  const myimg = await loadImage('http://chimke.cn/images/add.png')
  ctx.drawImage(myimg, 10, 30, 60,60)
  console.log(myimg)
  res.set('content-type', 'image/png')
  res.response.body = canvas.toBuffer()
})

app.use(router.routes())
app.listen(2021, function() {
  console.log('----------------------2021端口启动了-------------------------')
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
        resolve(chunks)
      });
    })
  })
}