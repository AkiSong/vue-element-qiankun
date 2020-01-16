import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.prototype.$test = "sub";

let instance = null;

const vueOptions = {
  el: "#subapp2",
  router,
  store
};

if (!window.singleSpaNavigate) {
  // 检测是否是single-spa状态, 不是则独立运行
  delete vueOptions.el;
  new Vue({ ...vueOptions, render: h => h(App) }).$mount("#subapp2");
}

export async function bootstrap() {
  console.log("subapp2 app bootstraped");
}

export async function mount(props) {
  instance = new Vue({
    ...vueOptions,
    render: h => h(App)
  });
}

export async function unmount() {
  console.log("subapp2 app unmount");
  instance.$destroy();
  instance = null;
}
