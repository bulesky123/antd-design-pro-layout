# 项目介绍

应用react antd-design spa单例页面模式开发，提供通用的后台管理系统，技术目标为模块化开发、组件懒加载、自动化测试、模拟数据等方案提高开发效率。其中包含`antd-design-pro-layout`、`antd-design`、`less`、`bizCharts`、`react16.12`、`react-router4`、`webpack4` 格式化代码、`Jest.js`单元测试、可提供`预加载`功能。使用`mock`模拟数据方案。

### 接口文档api [接口文档api](./api.md)

## 目录结构

```html
|-- src
    |-- .babelrc                      // babel配置
    |-- .editorconfig
    |-- .eslintrc                     // eslint配置
    |-- .gitignore                    // git忽略
    |-- .postcssrc.js
    |-- jsconfig.json
    |-- npm-shrinkwrap.json
    |-- package.json
    |-- README.md
    |-- build                           // 项目构建文件
    |   |-- webpack.config.base.js
    |   |-- webpack.config.js
    |-- commands                        // 项目预览文件
    |   |-- preview.js
    |-- mocker                          // mock数据
    |   |-- index.js
    |-- src                             // 主代码
    |   |-- index.html
    |   |-- index.js                    // 入口文件
    |   |-- assets                      // 静态资源文件夹
    |   |   |-- css
    |   |   |   |-- common.less
    |   |   |-- img
    |   |   |   |-- bin.png
    |   |   |-- svg
    |   |       |-- back.svg
    |   |-- components                  // 项目公用组件
    |   |   |-- index.js                // 组件统一暴露出口
    |   |   |-- global-header
    |   |   |   |-- index.jsx
    |   |   |   |-- index.less
    |   |   |   |-- user-lang.jsx
    |   |   |   |-- user-setting.jsx
    |   |   |   |-- images
    |   |   |       |-- bug.gif
    |   |-- config                      // 项目配置文件（环境配置，区分测试，生产环境等）
    |   |   |-- index.js
    |   |   |-- rd.js                   // 测试环境
    |   |   |-- release.js              // 生产环境
    |   |-- Framework                   // 基础层 目前包括国际化
    |   |   |-- Language
    |   |   |   |-- index.js
    |   |   |   |-- core
    |   |   |       |-- defaults.js
    |   |   |       |-- language.js
    |   |   |-- Tools
    |   |       |-- index.js
    |   |       |-- core
    |   |           |-- defaults.js
    |   |           |-- tools.js
    |   |-- FrameworkCustomize          
    |   |   |-- languagePack
    |   |       |-- index.js
    |   |       |-- pack
    |   |           |-- en_US.js
    |   |           |-- zh_CN.js
    |   |-- pages                     // 项目page文件夹
    |   |   |-- 404.jsx               // 404
    |   |   |-- index.jsx             // 进入页面的第一个入口，做权限管理的地方
    |   |   |-- home                  // home页面
    |   |   |   |-- api.js            // home用的的api promise
    |   |   |   |-- index.jsx         
    |   |   |   |-- index.less
    |   |   |   |-- redux.js          // redux
    |   |   |   |-- components        // 组件
    |   |   |   |   |-- index.js
    |   |   |   |   |-- login-header
    |   |   |   |   |   |-- index.jsx
    |   |   |   |   |   |-- index.less
    |   |   |   |   |   |-- images
    |   |   |   |   |       |-- bg.png
    |   |   |   |   |-- mobile-form
    |   |   |   |       |-- index.jsx
    |   |   |   |       |-- index.less
    |   |   |   |-- images
    |   |   |       |-- check.png
    |   |   |       |-- no-check.png
    |   |-- router                    // 路由文件夹
    |   |   |-- async-load.jsx        // 异步加载组件
    |   |   |-- configs.jsx           // 路由配置
    |   |   |-- index.jsx
    |   |   |-- pro-layout.jsx        // antd-design-pro-layout
    |   |-- stores                    // store
    |   |   |-- index.js
    |   |-- utils                     // 工具函数
    |       |-- dom.js
    |       |-- history.js
    |       |-- http.js
    |       |-- httpmock.js
    |       |-- index.js
    |       |-- moment.js
    |       |-- tools.js
    |-- static                        // 不需要打包的静态资源文件，最后webpack会直接copy到dist
        |-- test.html
        |-- css
        |   |-- reset.css
        |-- images
        |   |-- favicon.png
        |   |-- robot.png
        |   |-- shareIcon.png
        |-- js
            |-- vconsole.min.js

```

## 主要依赖模块

- axios: >= 0.18.0 [中文文档](https://segmentfault.com/a/1190000008470355?utm_source=tuicool&utm_medium=referral) [官方文档](https://github.com/axios/axios/blob/master/README.md)
- react.js: >= 16.12.0 [中文参考文档](https://reactjs.bootcss.com/tutorial/tutorial.html) [英文文档](https://zh-hans.reactjs.org/)
- react-router-dom >= 4.2.2 [中文文档](http://react-guide.github.io/react-router-cn/docs/API.html)
- webpack >= 4.5.0 [官方文档](https://www.webpackjs.com/)
- bizCharts >= 3.5.6 [官方文档](https://bizcharts.net/products/bizCharts/docs/start)
- antd >= 3.26.7 [官方文档](https://ant.design/docs/react/introduce-cn)
- @ant-design/pro-layout >= 4.10.0 [官方文档](https://prolayout.ant.design/)

## 开发说明

### 规范

1. 文件名统一使用小写，多个单词使用 `-` 隔开。[参考](http://www.ruanyifeng.com/blog/2017/02/filename-should-be-lowercase.html)
2. DOM 的 class 命名统一使用 `-` 分割，方便阅读。 不得使用驼峰命名

### 启动开发环境

### 命令行

```bash
# 打开开发环境
npm run start || yarn start

# 打包 测试环境
npm run rd

# 打包 生产环境
npm run release

# 预览打包后静态文件
npm run preview

```

### 新增视图

1. 在 `src/pages` 下新建相关页面文件夹。文件名统一使用小写，多个单词使用 `-` 隔开。

2. 创建 `index.jsx` 文件作为视图组件的唯一入口。仅当前视图相关的图片和组件可以新建 `images` 和 `components` 文件夹（命名使用复数，不使用缩写）存放相关内容。

3. 页面统一使用less,命名文件名为。统一使用 `index.less`。

4. 页面中用的服务端接口，统一使用`api.js`返回一个promise对象。

```javascript
import { Http } from 'utils'

const login = params => Http.post('/api/telephony/login/index', params)


export { login }

```
5、页面中如果使用redux,统一命名为`redux.js`


### 新增 Store

1. 在 `src/store/index.js` 新建 `user.js`
```javascript
示例
import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from 'redux'
import thunk from 'redux-thunk'
import { global } from '@/pages/global/redux' // page页面定义的store


const store = createStore(
  combineReducers({
    global,
  }),
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
)

export default store

```


### 新增路由

> 路由名称使用驼峰式命名

1. 在 `router/config.js` 添加新增路由

    ```javascript
    {
      path: '/login', // 路由地址
      import: () => import(/* webpackChunkName: "in" */ '@/pages/login'), // 组件
      title: '数据管理系统', // 命称
      layout: true, // 是否自定义布局，true-用户自定义 false-使用antd-design-pro-layout布局
    }
    ```

[webpack 异步加载模块](https://webpack.docschina.org/api/module-methods/#import-)

## mock 测试数据

示例：

```javascript
  'POST /login/withtoken': Mock.mock({
    code: 200,
    retMsg: '调用成功',
    data: {
      token: 'AAAAAAAAAAAAAAAAAAAAA',
      list: [1, 2, 3, 4, 5],
    },
  }),
```

## 相关知识点参考链接

1. [require.context](https://webpack.docschina.org/guides/dependency-management/#require-context)
2. [图表资源](https://bizcharts.net/products/bizCharts/docs/start)
3. [UI资源](https://ant.design/docs/react/introduce-cn)
4. [官方文档](https://ant.design/docs/react/introduce-cn)
5. [官方文档](https://prolayout.ant.design/)

## 缓存策略 [详情](https://www.jianshu.com/p/54cc04190252)
- 【强缓存】 判断是否缓存的`依据`来自于`是否超出某个时间`或者`某个时间段`
    - 不会向服务器发送请求，直接从缓存读取。`from disk cache`、`from memory cache`
    - 缓存可以通过设置两种 `HTTP Header` 实现：`Expires` 和 `Cache-Control`。
        - Expires http1.0
            - 缓存过期时间，用来指定资源到期的时间，是服务器端的具体的时间点
            - Expires= `请求时间` + `max-age`，需要和`Last-modified`结合使用
            - 受限于本地时间，`如果修改了本地时间，可能会造成缓存失效`
        - Cache-Control http1.1
            - 主要用于控制网页缓存
            - 比如当`Cache-Control:max-age=300`时，则代表在这个请求正确返回时间`5分钟`内再次加载资源，就会命中强缓存。
            - public 响应可以被`客户端`和`代理服务器`缓存，任何`中间节点都可缓存`
            - private 响应只可以被`客户端缓存`，任何`中间点不做缓存`
            - max-age=30 缓存30秒后就过期，需要重新请求
            - s-maxage=30 覆盖max-age,作用一样，只在代理服务器中生效
            - no-store 不缓存任何响应
            - no-cache 资源被缓存但是`立即失败`，`下次会发起请求`验证资源是否过期
                - 表示`不使用 Cache-Control的缓存策略`，而是使用`协商缓存` `Etag` 或者`Last-Modified`
            - max-state=30 30秒内，即使缓存过期，也使用该缓存。
            - min-fresh=30 希望在30秒内获取最新的响应
- 【协商缓存】浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存
    - 协商缓存`生效`，返回`304`和`Not Modified`
    - 协商缓存`失效`，返回200和请求结果
    - Last-Modified
    - If-Modified-Since
