import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  txt: 'im main'
}

const getters = {}

const mutations = {
  TEXT_MSG: (state, payload) => {
    state.txt = payload
  }
}

const actions = {}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
