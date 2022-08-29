const state = {
  loading: false
}

const mutations = {
  setLoading(state, boolean) {
    state.loading = boolean
  }
}

export default {
  state: state,
  mutations: mutations
}
