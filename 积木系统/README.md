# 后台系统开发 BAAE

## 使用命令

``` bash

# 项目启动前准备
node平台
全局vue-cli

# 项目安装依赖
npm run install

# 开发环境运行
npm run dev 

# 线上（生产）环境构建
npm run build:prod

# 测试环境构建
npm run build:test

# 生成api文档
npm run api-doc
```

## 重点说明

- `模块导入规则`

  | 描述 | 引用 |
  | - | - |
  | 引用src下文件 | @ |

## 关于项目

- `核心框架`
  - vue v2.*
  - vue-router v3.*
  - vuex v3.*

- `脚手架`
  - vue-cli 3.0.0

- `UI 框架`
  - element-ui v2.12.0
- `第三方插件库`
  - [axios](https://www.kancloud.cn/yunye/axios/234845) - *Ajax封装库*
  - [js-cookie](https://www.npmjs.com/package/js-cookie) - *cookie操作函数库*
  - [nprogress](https://www.npmjs.com/package/nprogress) - *页眉加载进度条*

## 项目结构

``` text
├── build                         // 打包配置文件
├── config                        // 覆盖替换脚手架关于 webpack等的配置
├── docker                        // 部署在测试环境时使用的dockerFile
├── favicon.ico                   // iocn
├── index.html                    // 入口文件 html
├── jsdoc-vue.conf.json           // 生成api文档的jsdoc配置
├── package-lock.json             // package-lock.json
├── package.json                  // package.json
├── src
|   |__ _components               // 全局公用组件 （自定义）
│   ├── api                       // 所有请求 api
│   ├── App.vue                   // 入口页面
│   ├── assets                    // 主题 字体等静态资源
│   ├── components                // 全局公用组件 （vue-admin自带）
│   ├── directive                 // 全局指令
│   ├── errorLog.js               // 错误组件
│   ├── filters                   // 全局 filter
│   ├── icons                     // iocns
│   ├── lang                      // 语言包
│   ├── main.js                   // 入口文件 加载组件 初始化等
│   ├── mixins                    // 混入到全局的mixins
│   ├── permission.js             // 路由拦截/权限管理
│   ├── plugs                     // 公共指令 过滤器入口
│   ├── router                    // 路由
│   ├── store                     // 全局 store管理
│   ├── styles                    // 全局样式
│   ├── utils                     // 全局公用方法
│   └── views                     // 页面组件
└── static                        // 静态资源

```

## api 和 views 格式要求建议

建议根据业务模块来划分 views，并且 将 views 和 api 两个模块一一对应，从而方便维护。

## 项目存在问题

- 暂无未解决问题
- 暂无未完成需求
