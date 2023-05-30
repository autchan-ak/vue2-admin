# vue2-admin

vue2 后台管理系统模板
[gitee 地址](https://gitee.com/todpole/vue2-admin)

本项目可作为模板进行二次开发，基础功能均可以直接复用。

- 项目技术栈基于 `ES2015+、vue、vuex、vue-router 、vue-cli 、axios`；
- 支持本地 `mock` 数据 ( 基于 `Mockjs + webpack dev server` )；
- 支持异步请求代理；
- 支持模块化开发
- 支持权限化显示
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


### SVG使用
将 svg 保存在 `/src/assets/icon`

el 图标也可传入

```html
<svg-icon icon="name" />
```

### 默认启动为mock
- 账号：admin  || autchan  || test
- 密码：随意
- （三个账号都一样）

### 项目截图

<img src="src/assets/image/项目截图1.png" alt="项目截图" width="45%"><img src="src/assets/image/项目截图5.png" alt="项目截图" width="45%" >
<img src="src/assets/image/项目截图3.png" alt="项目截图" width="45%" ><img src="src/assets/image/项目截图4.png" alt="项目截图" width="45%" >
<img src="src/assets/image/项目截图2.png" alt="项目截图" width="45%" ><img src="src/assets/image/项目截图7.png" alt="项目截图" width="45%" >
<img src="src/assets/image/项目截图6.png" alt="项目截图" width="45%" ><img src="src/assets/image/项目截图8.png" alt="项目截图" width="45%" >



### 接口返回说明
```js
{
  "data": "数据",
  "meta": {
    "msg": "提示信息",
    "status": "状态码",
    "type": "error||success"
  }
}

"状态码":[
  "200":"成功，不带弹窗",
  "401":"token失效，重新登陆",
  "201":"成功，带弹窗",
]
```


### 目录结构说明

```
└──/assets/                   静态资源
│  ├── /icon/                 svg图标
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


### 最后

- 如果喜欢一定要 star哈!!!（谢谢!!）
- 如果有意见和问题 请在 lssues提出，我看到后会解答。
- 作者公众号

<img src="src/assets/image/公众号.png" alt="公众号" width="60%" >
