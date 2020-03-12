import axios from 'axios'

const actions = {
  login({
    commit
  }, value) {
    axios
      .post(value.url, value.newUser)
      .then(res => {
        if (res.data.isAuthenticated) {
          commit("VUE_LOGIN_IN", res.data.isAuthenticated)
        } else {
          commit("VUE_LOGIN_FAULT", res.data.msg)
        }
      })
      .catch(e => {
        commit("VUE_LOGIN_ERROR", e)
      })
  },
  logout({
    commit
  }) {
    commit("VUE_LOGIN_OUT", false)
  },
  signup({
    commit
  }, value) {
    axios
      .post(value.url, value.newUser)
      .then(res => {
        console.log(res.data)
        if (res.data.token) {
          commit("VUE_SIGN_UP", true)
        } else {
          commit("VUE_SIGN_FAULT", res.data.msg)
        }
      })
      .catch(e => {
        commit("VUE_SIGN_ERROR", e)
      })
  }
}

export default actions