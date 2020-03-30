import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store"; //nav自己的状态, 可以不用

if (!window.$store) {
  window.$store = {
    state: {},
    mutations: {},
    actions: {},
    getters: {}
  };
  window.$store.dispatch = function() {
    return null;
  };
}

Vue.config.productionTip = false;

Vue.use(ElementUI);

let instance = null;

const vueOptions = {
  router,
  store
};

if (!window.singleSpaNavigate) {
  new Vue({ ...vueOptions, render: h => h(App) }).$mount("#navapp");
}

export async function bootstrap() {
  console.log("navapp app bootstraped");
}

export async function mount(props) {
  instance = new Vue({
    ...vueOptions,
    render: h => h(App)
  }).$mount("#navapp");
}

export async function unmount() {
  console.log("navapp app unmount");
  instance.$destroy();
  instance = null;
}
