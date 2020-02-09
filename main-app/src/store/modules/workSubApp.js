const state = {
  appContent: '',
  loading: false
}

const mutations = {
  SET_APP_CONTENT: (state, { appContent, loading }) => {
    state.appContent = appContent
    state.loading = loading
  },
  SET_APP_LOADING: (state, status) => {
    state.loading = status
  }
}

const actions = {
  setAppContent({ commit }, payload) {
    commit('SET_APP_CONTENT', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
