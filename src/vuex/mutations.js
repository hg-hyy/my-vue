import {
  VUE_LOGIN_IN,
  VUE_LOGIN_FAULT,
  VUE_LOGIN_ERROR,
  VUE_LOGIN_OUT
} from './types'
const mutations={
    increment(state) {
      state.count++
    },
    [VUE_LOGIN_IN](state, payload) {
      state.isAuthenticated = payload
    },
    [VUE_LOGIN_FAULT](state, payload) {
      state.msg = payload
    },
    [VUE_LOGIN_ERROR](state, payload) {
      state.msg = payload
    },
    [VUE_LOGIN_OUT](state, payload) {
      state.isAuthenticated = payload
    },
  }
  export default mutations