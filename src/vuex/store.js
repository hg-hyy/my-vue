import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    isAuthenticated: false,
    msg: ''
  },
  getters: {
    getcount: state => {
      return state.count
    },
    setcount:state=>{
      return state.count+1
    }
  },
  mutations,
  actions
})

export default store