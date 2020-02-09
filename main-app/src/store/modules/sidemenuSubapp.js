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
  setAppContent({ commit, state }, { appContent, loading }) {
    if (state.appContent !== appContent) {
      commit('SET_APP_CONTENT', { appContent, loading })
    } else {
      commit('SET_APP_LOADING', loading)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
