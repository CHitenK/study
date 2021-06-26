# 洪湾渔港海鲜交易平台

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Run your unit tests

```
npm run test:unit
```

### Run your end-to-end tests

```
npm run test:e2e
```

## 关于项目

#### 脚手架

> vue-cli 3.0.0

#### UI 框架

> element-ui

#### 项目结构

```
hwyg-h5-front
├── babel.config.js                    // babel-loader 配置
├── cypress.json                       // package.json
├── jsdoc-vue.conf.json                // 生成api文档的jsdoc配置
├── package.json                       // package.json
├── public                             // 存放  html模板和 favicon.ico和第三方不打包资源
├── README.md                          // 导读文件
├── src
│   ├── api                            // 所有请求
│   ├── App.vue                        // 入口页面
│   ├── assets                         // 主题 字体等静态资源
│   ├── components                     // 全局公用组件
│   ├── embed                          // 项目独立页面(按模块划分)
│   ├── filtres                        // 全局 filter
│   ├── layout                         // 布局用的组件
│   ├── main.js                        // 入口 加载组件 初始化等
│   ├── mixins                         // 混入到全局的mixins
│   ├── permission.js                  // 路由拦截/权限管理
│   ├── router                         // 路由
│   ├── store                          // 全局 store管理
│   ├── styles                         // 全局样式
│   ├── useMintUi.js                   // 注册element-ui组件
│   ├── utils                          // 全局公用方法
│   └── views                          // 整体页面(按tabs划分)
└── vue.config.js                      // 覆盖替换脚手架关于 webpack等
```

#### api 和 views 格式要求建议

建议根据业务模块来划分 views，并且 将 views 和 api 两个模块一一对应，从而方便维护。
