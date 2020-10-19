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
const productRoute = require('./serve_modules/product')
const jmRoute = require('./serve_modules/jm')

app.use(bodyParser())
app.use(router.routes()) 
app.use(userRoter.routes())
app.use(makeImgRoter.routes())
app.use(uploadRoute.routes())
app.use(productRoute.routes())
app.use(jmRoute.routes())
app.listen(2020, '0.0.0.0', function() {
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
