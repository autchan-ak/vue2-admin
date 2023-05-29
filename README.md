# vue2-admin

vue2 后台管理系统模板
[gitee 地址](https://gitee.com/todpole/vue2-admin)

本项目可作为模板进行二次开发，基础功能均可以直接复用。

- 项目技术栈基于 `ES2015+、vue、vuex、vue-router 、vue-cli 、axios`；
- 支持本地 `mock` 数据 ( 基于 `Mockjs + webpack dev server` )；
- 支持异步请求代理；
- 支持模块化开发
- 自动发现并注册路由、`store`；
- 自动注册组件；
- .env.development.local 覆盖 env

### 安装依赖 node: '>=12.0.0'

```
npm install
```

### 启动项目

```
npm run serve
```

### 打包上线

```
npm run build
```

### 修改配置

```javascript
// vue.config.js
module.exports = {
  chainWebpack: (config) => {
    config.module.rule("svg").exclude.add(resolve("src/assets/icon")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icon"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
};
```

### 使用

el 图标也可传入

```html
<svg-icon icon="name" />
```

### 修该颜色

```css
// 删除SVG文件中的 fill
.index-head-centent-right-list-icon-is {
  color: #f515ea !important;
  width: 20px;
  height: 22px;
  fill: currentColor; //重点
}
```


### 默认启动为mock
- 账号：admin  || autchan  || test
- 密码：随意
- （三个账号都一样）



### 文件目录说明src下

```
└──/assets/                   静态资源
│  ├── ...
│  ├──
├── /components/              全局组件
│  ├── index.js               自动注册 实例 入口
│  ├── ...
│  │
├── /directive/               全局指令
│  ├── index.js               自动注册 实例 入口
│  ├── ...
│  │
├── /filters/                 全局过滤器
│  ├── index.js               自动注册 实例 入口
│  ├── ...
│  │
├── /layout/                  布局页
│  ├── ...                    不多解释
│  │
├── /modules/                 模块开发
│  ├── /test/                 示例模版
│  ├── ...                    页面都在此处开发
│  │
├── /request/                 请求方法
│  ├── ...                    不多解释
│  │
├── /router/                  路由
│  ├── ...                    不多解释
│  │
├── /store/                   数据存储
│  ├── ...                    不多解释
│  │
├── /utils/                   工具方法文件夹
│  │  ├── BaseUtil.js         业务工具类
│  │  ├── ComponentUtil.js    注册组件类
│  │  ├── CryptUtil.js        加密工具类
│  │  ├── functions.js        公共方法类
│  │  ├── ProjectTools.js     保存信息类
│  │  ├── RegExpUtil.js       各种正则方法类
│  │  ├── theme.js            主题样式类
│  │  └── ...
├── package.json
├── README.md

```