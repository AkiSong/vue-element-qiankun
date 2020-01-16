import {
  registerMicroApps,
  runAfterFirstMounted,
  setDefaultMountApp,
  start
} from "qiankun-test";
import store from '@/store'

// function renderWorkSubApp({ appContent, loading }) {}

// function renderLayoutSubApp({ appContent, loading }) {
//   // store.dispatch('layoutSubapp/setAppContent', { appContent, loading })
// }

function genActiveRule(routerPrefix) {
  return location => location.pathname.startsWith(routerPrefix)
}
// const subappRegistry = [
//   {
//     name: 'vue sub-app1',
//     entry: '//localhost:8081',
//     renderWorkSubApp,
//     activeRule: genActiveRule('/subapp/app1')
//   },
//   {
//     name: 'vue sub-app2',
//     entry: '//localhost:8082',
//     renderWorkSubApp,
//     activeRule: genActiveRule('/subapp/app2')
//   },
//   {
//     name: 'vue nav-app',
//     entry: '//localhost:8083',
//     render: renderLayoutSubApp,
//     // activeRule: genActiveRule('/dashboard')
//     activeRule: () => true
//   }
// ]

// const lifeCycles = {
//   beforeLoad: [
//     app => {
//       console.log('before load', app)
//     }
//   ],
//   beforeMount: [
//     app => {
//       console.log('before mount', app)
//       // store.commit('subApp/SET_APP_LOADING', false)
//     }
//   ],
//   afterUnmount: [
//     app => {
//       const { name, render } = app
//       if (name !== 'vue nav-app') {
//         console.log('afterUnmount触发了')
//         // render({ appContent: '', loading: false })
//       }
//     }
//   ]
// }

// 请求子应用跨域
const request = url =>
  fetch(url, {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })

// // 注册子应用
// registerMicroApps(subappRegistry, lifeCycles);
// // 在主加载后默认处于活动状态
// setDefaultMountApp("/");
// // 第一个应用构建完成后执行
// runAfterFirstMounted(() => console.info("first app mounted"));

// start({
//   prefetch: false,
//   fetch: request,
//   singular: false
// });

export default {
  data() {
    return {
      layoutSubapp: {},
      workSubapp: {},
      subappRegistry: [],
      lifeCycles: {}
    }
  },
  watch: {
    layoutSubapp(obj) {
      this.$store.dispatch('layoutSubapp/setAppContent', obj)
    },
    workSubapp(obj) {
      this.$store.dispatch('subApp/setAppContent', obj)
    }
  },
  mounted() {
    this.runSubApp()
  },
  methods: {
    renderLayoutSubApp(navapp) {
      this.layoutSubapp = { ...navapp }
    },
    renderWorkSubApp(renderWorkSubApp) {
      this.workSubapp = { ...renderWorkSubApp }
    },
    runSubApp() {
      this.subappRegistry = [
        {
          name: 'vue nav-app',
          entry: '//localhost:8083',
          render: this.renderLayoutSubApp,
          activeRule: () => true
        },
        {
          name: 'vue sub-app1',
          entry: '//localhost:8081',
          render: this.renderWorkSubApp,
          activeRule: genActiveRule('/subapp/app1')
        },
        {
          name: 'vue sub-app2',
          entry: '//localhost:8082',
          render: this.renderWorkSubApp,
          activeRule: genActiveRule('/subapp/app2')
        }
      ]
      this.lifeCycles = {
        beforeLoad: [
          app => {
            console.log('before load', app)
          }
        ],
        beforeMount: [
          app => {
            const { name } = app
            if (name !== 'vue nav-app') {
              console.log('beforeMount触发了')
              store.commit('subApp/SET_APP_LOADING', false)
            }
          }
        ],
        afterUnmount: [
          app => {
            const { name, render } = app
            if (name !== 'vue nav-app') {
              console.log('afterUnmount触发了')
              render({ appContent: '', loading: false })
            }
          }
        ]
      }
      // 注册子应用
      registerMicroApps(this.subappRegistry, this.lifeCycles)
      // 在主加载后默认处于活动状态
      setDefaultMountApp('/')
      // 第一个应用构建完成后执行
      runAfterFirstMounted(() => console.info('first app mounted'))

      start({
        prefetch: false,
        fetch: request,
        singular: false,
        jsSandbox: true
      })
    }
  }
}
