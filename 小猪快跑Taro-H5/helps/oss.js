const fs = require("fs");
const path = require('path');
const OSS = require('ali-oss');
const pkgJson = require('../package');
const pLimit = require('p-limit');

let ossEnv = process.env.ENV || 'dev';

// 获取工程名
const getProjectName = () => {
  // package.json配置了name属性
  if(!!pkgJson.name){
    return pkgJson.name;
  }
  // 直接获取文件夹的名字
  let rootPath = path.resolve(path.join(__dirname,'../'));
  let pathArrr = rootPath.split(path.sep);
  let rootFolderName = pathArrr[pathArrr.length -1];
  return rootFolderName;
}

// 本地静态资源文件夹
const localAssetFolder = 'dist';
// 远端静态资源文件夹 - 默认当前工程名
const remoteAssetFolder = getProjectName();

// 实例化OSS客户端对象
const client = new OSS(pkgJson.ossConfig);

// 查看bucket列表
const listBuckets = async () => {
  try{
    let buckets = await client.listBuckets();
    buckets.map((bucket, i) => {
      console.log('bucket:', bucket);
    })
  }catch(e){
    console.error(e)
  }
}

// 获得本地静态资源目录下的文件列表
const getLocalAssets = (staticFolder) => {
  // 返回的文件列表
  let fileArr = [];
  // 遍历文件，并返回列表
  let fileEach = function (dir) {
    let files = fs.readdirSync(dir);
    files.forEach(function (file){
      file = path.resolve(dir, file);
      let fileType = fs.statSync(file);
      if (fileType.isDirectory()){
        fileEach(file);
      } else {
        fileArr.push(file);
      }
    });
  }
  // 放入文件列表数组
  fileEach(staticFolder);
  // 返回文件列表
  return fileArr;
}

// 绝对路径转相对路径
const absolute2Relative = (absoultePath, staticFolder) => {
  // 双斜扛\\转成反斜杠/
  let item = String(absoultePath).replace(/\\/g,'/');
  // 截取静态资源（static开始）后面的路径
  let relativePath = item.slice(item.indexOf(staticFolder)).replace(staticFolder, "");
  // 返回相对路径
  return relativePath;
}

// 任务函数
const job = async (localPath, staticFolder) => {
  // 获取相对路径
  let relativePath = absolute2Relative(localPath, staticFolder);
  // 远端文件路径 - 默认带有环境变量子文件夹
  let remotePath = remoteAssetFolder + '/' + ossEnv + relativePath;
  // 若禁用了环境变量子文件夹，则不拼接
  if(!!pkgJson.config.disableOssEnv){
    // 远端文件路径
    remotePath = remoteAssetFolder + relativePath;
  }
  // 上传到OSS
  await client.put(remotePath, localPath);
  console.log(localPath + ' >> ' + remotePath);
  return 1;
}

// 上传多个文件到OSS
const uploadFiles2Oss = async (fileLocalPaths, staticFolder) => {
  try{
    console.log('开始上传文件，请稍候……')
    // Promise同时进行的任务数
    const limit = pLimit(4);
    // 批量上传，并返回结果
    let results = await Promise.all(fileLocalPaths.map((localPath) => {
      return limit(() => job(localPath, staticFolder));
    }));
    console.log('上传了:', results.length, '个文件');
    return results;
  }catch(e){
    console.error(`上传失败：${e}`);
    return e;
  }
}

// 开始任务方法
const start = async () => {
  // 启动时间
  let startTime = new Date().getTime();

  // 本地文件列表
  let localFiles = getLocalAssets(localAssetFolder);
  // 空值判断
  if(0 === localFiles.length){
    console.log('要上传的文件列表为空');
    return false;
  }
  // 批量上传文件
  await uploadFiles2Oss(localFiles, localAssetFolder)
  // 结束时间
  let endTime = new Date().getTime();
  // 消耗时间
  let wastTime = (endTime - startTime)/1000;
  console.log('执行耗时：' + wastTime + '秒');
  return 1;
}

// 启动任务
module.exports.start = start;