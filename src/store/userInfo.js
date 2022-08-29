const state = {
  token: 'default'
}

const mutations = {
  setToken(state, index) {
    state.token = index
    // console.log('store-token', state.token)
  }
}

export default {
  state: state,
  mutations: mutations
}
