const state = {
  anchor: false
}

const mutations = {
  setAnchor(state, index) {
    state.anchor = index
    // console.log('store-token', state.token)
  }
}

export default {
  state: state,
  mutations: mutations
}
