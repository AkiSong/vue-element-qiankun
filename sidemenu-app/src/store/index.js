import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    settings: {
      sidebarLogo: true
    },
    app: {
      device: ""
    }
  },
  mutations: {},
  actions: {},
  modules: {}
});
