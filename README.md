# qiankn-aki.song

## 目录结构

- vue-element-qiankun 为主应用
- nav-app 为导航栏应用
- sidemenu-app 为侧边栏应用
- sub-app1 为子应用
- sub-app2 为子应用

## 启动

```js
cd vue-element-qiankun

执行 npm install:all 为所有应用安装依赖
执行 npm install:sub-app1 为子应1单独用安装依赖
执行 npm insatll:sub-app2 为子应2用单独依赖

执行 npm start 启动所有应用
执行 npm start:main 单独启动主应用
执行 npm start:sub-app1 单独启动子应用1
执行 npm start:sub-app2 单独启动子应用2

执行 npm run build 打包所有应用
执行 npm run build:main 单独打包主应用
执行 npm run build:sub-app1 单独打包子应用1
执行 npm run build:sub-app2 单独打包子应用2
执行 npm run build:stage 打包主应用开发版本(代码不压缩混淆且有map resource)

```

## 代码

### qiankun

- umijs 团队出品的半成品微前端框架, 内部实现是对 single-spa 的二次开发
- api

```js
import {
  registerMicroApps,
  runAfterFirstMounted,
  setDefaultMountApp,
  start
} from "qiankun";
```

- registerMicroApps

```js
// qiankun主函数, 作用 注册子应用
/* 函数接收三个参数,
第一个参数 所有子应用的数组
第二个参数 乾坤生命周期
第三个参数 个性化配置
*/
function registerMicroApps<T extends object = {}>(
  apps: Array<RegistrableApp<T>>,
  lifeCycles?: LifeCycles<T>,
  opts?: RegisterMicroAppsOpts,
): void;

// apps内每个子应用
/*
被注册的子应用需要提供的参数
name: 应用名,
entry: 入口(常用 //主机名), 或者提供一个对象{}, 内部是子应用所有的资源,
render: 渲染函数, 函数需要2个参数, appContent 子应用被读取后的html字符串, loading 加载状态,
activeRule: 激活函数, 函数内部可以自己实现激活规则,  返回值为true的时候, 代表子应用被触发, 如果返回值总是为true, 代表子应用常驻,
props: 主应用向子引用传值, 在子应用的mounted钩子内可以接收到主应用向子应用的通讯, 但只在子应用被mounted的时候通讯一次, 可以通过这个自定义一些配置告诉子应用
*/
type RegistrableApp = {
  // name to identify your app
  name: string;
  // where your sub app served from, supported html entry and config entry
  entry: string | { scripts?: string[]; styles?: string[]; html?: string };
  // render function called around sub app lifecycle
  render: (props?: { appContent: string; loading: boolean }) => any;
  // when sub app active
  activeRule: (location: Location) => boolean;
  // props pass through to sub app
  props?: object;
};

// qiankun提供的生命周期钩子函数
/*
钩子函数的参数是RegistrableApp, 返回一个promise
*/
type Lifecycle<T extends object> = (app: RegistrableApp<T>) => Promise<any>;
type LifeCycles<T extends object> = {
  beforeLoad?: Lifecycle<T> | Array<Lifecycle<T>>;
  beforeMount?: Lifecycle<T> | Array<Lifecycle<T>>;
  afterMount?: Lifecycle<T> | Array<Lifecycle<T>>;
  beforeUnmount?: Lifecycle<T> | Array<Lifecycle<T>>;
  afterUnmount?: Lifecycle<T> | Array<Lifecycle<T>>;
};
```

- 启动函数 `start(options: Options): void`
  | param | description | default |
  | :----: | :----: | :----: |
  | prefetch | Whether to prefetch assets of sub apps after first sub app mounted (在第一个子应用挂载后是否预加载其他子应用的资源) | true |
  | jsSandbox | While sandbox enabled, we could guarantee that sub apps is isolated with each others(沙箱能力, 保证子应用之间是互相独立的) | true |
  | singular | Only one sub app display at one runtime, that means a sub app will wait to mount until the before one unmounted(一个运行时只能展示一个子应用, 只有当前一个子应用被卸载, 才能加载第二个子应用) | true |
  | fetch | Set a custom fetch function(自定义请求子应用的 fetch 函数, 用来解决跨域问题) | 原生 fetch |

- setDefaultMountApp

```js
/**
   * @description 设置哪个子应用程序在主加载后默认处于活动状态
   * @param defaultAppLink: string 跳转链接
   * 不做配置默认根路劲
   */
function setDefaultMountApp(defaultAppLink: string): void;
```

- runAfterFirstMounted

```js
/**
   * @description 第一个应用构建完成后执行
   * @param 要执行的函数
   */
function runAfterFirstMounted(effect: () => void): void;
```

### 优化

1. 解决 子应用与主应用，子应用与子应用跨域问题
   主应用 -- main.js

```js
// 自定义请求函数, 设置cors头, 默认为*, 实际应用可以设置固定的域名
const request = url =>
  fetch(url, {
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  });
// 在启动函数内配置自定义请求函数
start({
  prefetch: false,
  fetch: request
});
```

2. 主应用改造为 vue-cli 应用
3. 主应用路由切换子应用
   router.js

```js
// 主应用router注册子应用路由, 不要指定component
import Layout from "@/layout";

const subRouter = {
  path: "/subapp",
  component: Layout,
  redirect: "/subapp/app1",
  name: "SubApp",
  meta: {
    title: "SubApp",
    icon: "table"
  },
  children: [
    {
      path: "app1",
      name: "sub-app1",
      meta: { title: "sub-app1" }
    },
    {
      path: "app2",
      name: "sub-app2",
      meta: { title: "sub-app2" }
    }
  ]
};
export default subRouter;
```

4. 子应用加载 qiankun 的生命周期
   sub-app 内必须暴露 3 个钩子函数
   主应用加载子应用的时候会去获取子应用暴露出来的钩子, 子应用不暴露钩子, 会报错

```js
export async function bootstrap() {
  console.log("subapp1 app bootstraped");
}

export async function mount(props) {
  vueOptions.el = "#subapp1";
  instance = new Vue({
    ...vueOptions,
    render: h => h(App)
  });
}

export async function unmount() {
  console.log("subapp1 app unmount");
  instance.$destroy();
  instance = null;
}
```

qiankun index.ts

```ts
let { bootstrap: bootstrapApp, mount, unmount } = await execScripts(jsSandbox); // 获取子应用暴露出来的钩子函数

if (!isFunction(bootstrapApp) || !isFunction(mount) || !isFunction(unmount)) {
  // fallback to global variable who named with ${appName} while module exports not found
  const globalVariableExports = (window as any)[appName] || {};
  bootstrapApp = globalVariableExports.bootstrap;
  // eslint-disable-next-line prefer-destructuring
  mount = globalVariableExports.mount;
  // eslint-disable-next-line prefer-destructuring
  unmount = globalVariableExports.unmount;
  if (!isFunction(bootstrapApp) || !isFunction(mount) || !isFunction(unmount)) {
    throw new Error(
      `You need to export the functional lifecycles in ${appName} entry`
    );
  }

  if (process.env.NODE_ENV === "development") {
    console.warn(
      `LifeCycles are not found from ${appName} entry exports, fallback to get them from window['${appName}'] `
    );
  }
}
```

5. 子应用内部切换路由
   sub-app router.js

```js
// 子应用的根路径要和主应用注册的一致
const baseUrl = "/subapp/app1";

const routes = [
  {
    path: baseUrl,
    name: "home",
    component: Home
  },
  {
    path: baseUrl + "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];
```

6. 子应用独立运行

```js
if (!window.singleSpaNavigate) {
  // 检测是否是single-spa状态, 不是则独立运行
  delete vueOptions.el;
  new Vue({ ...vueOptions, render: h => h(App) }).$mount("#subapp1");
}
```

7. 部署 --- https://github.com/umijs/qiankun/issues/64 #[Bug]vue-cli3 生产部署时发现的问题,并附带临时解决方法 #64 -部署跨域，nginx 配置

8. JS 变量隔离（qiankun 已有，使用 JS Sandbox）
   每个子应用都有相应的生命周期，同一时间内，只会有一个子应用的实例生效。js 沙箱封装在 qiankun 的生命周期中。
   当一个子应用被销毁，其 js 沙箱也就被销毁。唯一不足的地方是，window 的对象,无法隔离,最好不要绑定原型。

9. 一点总结 -子应用与主应用整合,是通过主应用请求子应用的域名或者地址，所以不必是一个目录，甚至子应用可以是在服务端。

10. css 污染问题

- 方案一: scoped（不安全: 可能会有重复）
- 方案二: 通过设置 namespace 的方式

```js
npm install postcss-selector-namespace
// postcss.config.js
'postcss-selector-namespace': {
  namespace(css) {
    // element-ui的样式不需要添加命名空间
    if (css.includes('element-variables.scss')) return ''
    return '.fa-spa' // 返回要添加的类名
  }
}
```

11. 支持单个子应用嵌套，可以在 B 应用 unmount 时手动卸载 C 应用.但是不支持多个子应用嵌套

12. 利用 Prefix 的方式来避免 CSS、Browser API、Web Event、Cookies 或 Local Storage 的冲突。

13. 你的子应用的容器是在主应用里动态生成的，需要确保子应用在 mount 前容器已经 ready

14. 利用 redux 实现主应用与子应用通信

### 待解决/待验证问题项

1. 全局状态、登录状态、用户信息之类的数据如何维护
2. history 模式子应用路由跳转后，可能会刷新页面出现 404 问题
3. hash 模式怎么实现

## 感谢
感谢 single-spa
感谢 umijs开发团队带来的qiankun
感谢wusp1994的qiankunTestByWu应用
