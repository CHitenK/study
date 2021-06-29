const fs = require('fs');
const util = require('util');
const path = require('path');
const cssmin = require('cssmin');
const uglifyjs = require("uglify-js");
// callback转Promise
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const pLimit = require('p-limit');

// byte字节转换成kb
const change = (limit) => {
  if(!limit){
    return "0kb";
  }
  return (limit.length / 1024).toFixed(0) + "kb";
}

// 获得dist目录下的文件列表(js + css)
const getLocalAssets = (folder) => {
  // 返回的文件列表
  let fileArr = [];
  try{
    // 遍历文件，并返回列表
    let fileEach = function (dir) {
      let files = fs.readdirSync(dir);
      files.forEach(function (file){
        file = path.resolve(dir, file);
        let fileType = fs.statSync(file);
        if (fileType.isDirectory()){
          fileEach(file);
        } else {
          let extname = path.extname(file);
          let dirname = path.dirname(file);
          // 仅需要js和css文件
          if (('.js' === '' + extname || '.css' === '' + extname) && -1 == dirname.indexOf('assets') && -1 == dirname.indexOf('dll')) {
            fileArr.push(file);
          }
        }
      });
    }
    // 放入文件列表数组
    fileEach(folder);
  }catch(e){
    console.error(e);
  }
  // 返回文件列表
  return fileArr;
}

// 工作任务
const job = async (filePath) => {
  let result = '', origCode = '', extname = '';
  try{
    extname = path.extname(filePath);
    // 压缩前代码
    origCode = await readFile(filePath, 'utf8');
    // 压缩js
    if ('.js' === '' + extname) {
      // 转换后代码
      result = uglifyjs.minify(origCode).code;

    // 压缩css
    }else if('.css' === '' + extname){
      // 转换后代码
      result = cssmin(origCode);
    }
    // 写入压缩后的文件内容
    await writeFile(filePath, result, 'utf8');
    console.log(filePath + ' => ok');
    // 返回1
    return 1
  }catch(e){
    console.log('压缩失败')
    return e
  }
}

// 压缩转换汉代码
const compressCode = async (fileArr) => {
  let i = 0, len = fileArr.length;

  if(0 === len){
    console.log('文件列表为空，压缩完成！');
    return;
  }

  let funcs = [], p = null;

  // Promise同时进行的任务数
  const limit = pLimit(1);
  // 批量上传，并返回结果
  let results = await Promise.all(fileArr.map((filePath) => {
    return limit(() => job(filePath));
  }));
  return results;
}

const start = async () => {
  console.log('开始压缩代码')
  let distFolder = path.resolve(path.join(__dirname,'../dist'));
  let start = new Date().getTime();
  let fArr = getLocalAssets(distFolder);
  try{
    let resArr = await compressCode(fArr);
    console.log(`压缩成功，共压缩了${resArr.length}个文件`)
    // console.log(JSON.stringify(resArr));
    let end = new Date().getTime();
    console.log('压缩共耗时：' + (end - start)/1000 + '秒');
  }catch(e){
    console.error('压缩代码错误:' + e);
  }
  return 1;
}

module.exports.start = start;