import {
  VUE_LOGIN_IN,
  VUE_LOGIN_FAULT,
  VUE_LOGIN_ERROR,
  VUE_LOGIN_OUT,
  VUE_SIGN_UP,
  VUE_SIGN_FAULT,
  VUE_SIGN_ERROR
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
    [VUE_SIGN_UP](state, payload) {
      state.isAuthenticated = payload,
      state.email = payload
    },
    [VUE_SIGN_FAULT](state, payload) {
      state.msg = payload
    },
    [VUE_SIGN_ERROR](state, payload) {
      state.msg = payload
    },
  }
  export default mutations