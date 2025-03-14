mall-app-web

forked from macrozheng/mall-app-web

技术选型
技术	说明	官网
Vue	核心前端框架	https://vuejs.org
Vuex	全局状态管理框架	https://vuex.vuejs.org
uni-app	移动端前端框架	https://uniapp.dcloud.io
mix-mall	电商项目模板	https://ext.dcloud.net.cn/plugin?id=200

组件库 https://uviewui.com/
luch-request	HTTP请求框架	https://github.com/lei-mu/luch-request

构建vue3版本，进行中

```
src -- 源码目录
├── api -- luch-request网络请求定义
├── components -- 通用组件封装
├── js_sdk -- 第三方sdk源码
├── static -- 图片等静态资源
├── store -- vuex的状态管理
├── utils -- 工具类
└── pages -- 前端页面
    ├── address -- 地址管理页
    ├── brand -- 商品品牌页
    ├── cart -- 购物车页
    ├── category -- 商品分类页
    ├── coupon -- 优惠券页
    ├── index -- 首页
    ├── money -- 支付页
    ├── notice -- 通知页
    ├── order -- 订单页
    ├── product -- 商品页
    ├── public -- 登录页
    ├── set -- 设置页
    ├── user -- 会员页
    └── userinfo -- 会员信息页
```
