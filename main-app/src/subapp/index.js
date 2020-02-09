import {
  registerMicroApps,
  runAfterFirstMounted,
  setDefaultMountApp,
  start
} from 'qiankun-test'

function genActiveRule(routerPrefix) {
  return location => location.pathname.startsWith(routerPrefix)
}

// 请求子应用跨域
const request = url =>
  fetch(url, {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })

export default {
  data() {
    return {
      sidemenuSubapp: {},
      workSubapp: {},
      subappRegistry: [],
      lifeCycles: {}
    }
  },
  watch: {
    sidemenuSubapp(obj) {
      this.$store.dispatch('sidemenuSubapp/setAppContent', obj)
    },
    workSubapp(obj) {
      this.$store.dispatch('workSubApp/setAppContent', obj)
    }
  },
  mounted() {
    this.runSubApp()
  },
  methods: {
    renderSidemenuSubApp(navapp) {
      this.sidemenuSubapp = { ...navapp }
    },
    renderWorkSubApp(renderWorkSubApp) {
      this.workSubapp = { ...renderWorkSubApp }
    },
    runSubApp() {
      this.subappRegistry = [
        // {
        //   name: 'vue sidermenu-app',
        //   entry: '//localhost:8084',
        //   render: this.renderSidemenuSubApp,
        //   activeRule: () => true
        // },
        {
          name: 'vue nav-app',
          entry: '//localhost:8083',
          render: this.renderSidemenuSubApp,
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
            if (name !== 'vue nav-app' || name !== 'vue sidermenu-app') {
              console.log('beforeMount触发了')
              this.$store.commit('workSubApp/SET_APP_LOADING', false)
            }
          }
        ],
        afterUnmount: [
          app => {
            const { name, render } = app
            if (name !== 'vue nav-app' || name !== 'vue sidermenu-app') {
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
