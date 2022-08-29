import { createStore } from 'vuex'
import userInfo from './userInfo'
import pageInfo from './pageInfo'
import anchorInfo from './anchorInfo'

export default createStore({
  modules: {
    userInfo,
    pageInfo,
    anchorInfo
  }
})
