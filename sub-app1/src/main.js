import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";

if(!window.$store){
  window.$store = {}
  window.$store.dispatch = function(){return null}
}

Vue.config.productionTip = false;

Vue.use(ElementUI);

let instance = null;

const vueOptions = {
  el: "#subapp1",
  router,
  store
};

if (!window.singleSpaNavigate) {
  // 检测是否是single-spa状态, 不是则独立运行
  delete vueOptions.el;
  new Vue({ ...vueOptions, render: h => h(App) }).$mount("#subapp1");
}

export async function bootstrap() {
  console.log("subapp1 app bootstraped");
}

export async function mount(props) {
  vueOptions.el = "#subapp1"
  instance = new Vue({
    ...vueOptions,
    render: h => h(App)
  });
}

export async function unmount() {
  // console.log("subapp1 app unmount");
  instance.$destroy();
  instance = null;
}
