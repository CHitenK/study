#积木系统
#
介绍

积木系统落地页，主要基于vue、vue-cli、cube-ui等开发完成。积木系统落地页有这丰富的功能组件、提炼了典型的业务模型，如：搜索、轮播广告位、锚点、商品、优惠券、销售奖励、快捷导航、底栏。
## 功能

搜索、轮播广告位、锚点、商品、优惠券、销售奖励、快捷导航、底栏
## 前序准备
你需要在本地安装 node 和 git。本项目技术栈基于 ES2015+、vue、vue-router 、vue-cli 、axios 和 cube-ui。


## 目录结构
```
│ .browserslistrc
│ .env.development //开发环境参数
│ .env.production //生产环境参数
│ .env.test //测试环境参数
│ .eslintrc.js //代码规范规则配置
│ .gitignore
│ babel.config.js
│ package-lock.json
│ package.json
│ postcss.config.js
│ README.md
│ vue.config.js //vue-cli3配置项
├─dist //测试环境、正式环境打包输出
├─public
│ │ favicon.ico
│ │ index.html
│ │ robots.txt
│ └─img
│ └─images
│   black.png
│   buyCar.png
│   good_box.png
│   nav-cart.png
│   nav-index-activated.png
│   nav-me.png
│   price_bottom.png
│   price_center.png
│   red.png
│   tab-cart.png
│   tab-index-activated.png
│   tab-me.png
│   tab-shop.png
└─src
│ App.vue
│ cube-ui.js
│ main.js
│ registerServiceWorker.js
│ theme.styl
├─api //接口
│ jmBusinessApi.js
│ jmPageConfig.js
├─assets //静态资源
│ └─font //字体图标
│   iconfont.eot
│   iconfont.svg
│   iconfont.ttf
│   iconfont.woff
│   iconfont.woff2
├─common //组件通用方法
│ ├─helpers
│ │ dom.js
│ │ env.js
│ └─mixins
│   scroll.js
├─components //组件
│ │ childwrapper.vue //组件渲染
│ │ FooterTabbar.vue //底栏
│ │ jm-banner.vue //轮播广告位
│ │ jm-coupon.vue //优惠券
│ │ jm-nav-ele.vue //锚点插槽
│ │ jm-nav.vue //锚点导航
│ │ jm-product.vue //商品
│ │ jm-sales.vue //销售奖励
│ │ jm-scroll-nav-bar.vue //锚点滚动导航
│ │ jm-search.vue //搜索
│ │ jm-shortcut.vue //快捷方式
│ │ jm-sticky-ele.vue //吸顶插槽
│ └─ jm-sticky.vue //吸顶
├─directives //指令
│ directives.js
│ index.js
├─libs //页面公用方法
│ ease.js //cube-ui动画效果
│ request.js //封装axios（页面配置接口）
│ requestKj.js //封装axios (跨境加接口)
├─mockData // 模拟数据
├─router // 积木落地页路由
│ index.js
├─store //积木vuex
│ index.js
├─styles
│ font.styl //字体图标样式
│ index.styl //统一输出样式
└─views 落地页
```
## 安装

```
# 克隆项目
git clone http://106.75.169.117/cross-border-plus/jm-landing-page.git

# 进入项目目录
cd jm-landing-page

# 安装依赖
npm install

# 建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 本地开发 启动项目
npm run serve

# 测试环境 打包
npm run test

# 生产环境 打包
npm run build
```
tips:
Windows 用户若安装不成功，很大概率是node-sass安装失败，关注下相关issue。
另外因为 node-sass 是依赖 python环境的，如果你之前没有安装和配置过的话，需要自行查看一下相关安装教程。


