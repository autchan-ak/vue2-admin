# vue2-admin

vue2 后台管理系统模板

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
