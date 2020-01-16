import Vue from "vue";
import VueRouter from "vue-router";
import Nav from "../views/NavVue.vue";
Vue.use(VueRouter);
const baseUrl = "/navapp";

const routes = [
  {
    path: baseUrl,
    name: "Nav",
    component: Nav
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
