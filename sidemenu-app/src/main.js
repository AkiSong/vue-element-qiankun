import Vue from "vue";
import { Scrollbar, Menu, MenuItem, Submenu } from "element-ui";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./icons";

if (!window.$store) {
  window.$store = {};
  window.$store.dispatch = function() {
    return null;
  };
}

Vue.use(Scrollbar);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);

Vue.config.productionTip = false;

let instance = null;

function render() {
  instance = new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount("#sidemenuApp");
}

if (!window.singleSpaNavigate) {
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
