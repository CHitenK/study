const Router = require("koa-router");
const router = new Router()
const path = require('path')
const multer = require('koa-multer');//加载koa-multer模块

// 上传 图片
var storage = multer.diskStorage({
    //文件保存路径
    destination: function(req, file, cb) {
        // cb(null, path.resolve('./') + '/images/')
        cb(null, path.resolve('./../../') + '/images/upload/' )
    },
    //修改文件名称
    filename: function(req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
//加载配置
var upload = multer({
   storage: storage
})
//  上传图片
router.post('/api/file/upload', upload.single('file'), async(ctx, next) => {
    ctx.body = {
        filename: ctx.req.file.filename  //返回文件名
    }
})

module.exports = router