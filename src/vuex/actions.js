import axios from 'axios'

const actions={
    login({commit}, value) {
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
    logout({commit}) {
      commit("VUE_LOGIN_OUT", false)
    },
    increment (context) {
      context.commit('increment')
    }
  }

  export default actions