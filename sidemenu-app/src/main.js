import Vue from "vue";
import { Scrollbar, Menu } from "element-ui";
import App from "./App.vue";
import store from "./store";

if (!window.$store) {
  window.$store = {};
  window.$store.dispatch = function() {
    return null;
  };
}

Vue.use(Scrollbar);
Vue.use(Menu);

Vue.config.productionTip = false;

let instance = null;

function render() {
  instance = new Vue({
    store,
    render: h => h(App)
  }).$mount("#sidemenuApp");
}

if (!window.singleSpaNavigate) {
  // 检测是否是single-spa状态, 不是则独立运行
  render();
}

export async function bootstrap() {
  console.log("sidemenuApp app bootstraped");
}

export async function mount(props) {
  render();
}

export async function unmount() {
  instance.$destroy();
  instance = null;
}
