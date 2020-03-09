import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './vuex/store'
import routes from './route/routes.js'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/display.css';
import './assets/styles/bootstrap.min.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import app from './App.vue'

Vue.use(VueRouter)
Vue.use(Antd)

// Vue.component(Button.name, Button);
Vue.config.productionTip = false

const router = new VueRouter({
  routes
})

store.commit('increment')

// console.log(store.state.count)
// console.log(router)
// console.log(store.getters.getcount)
new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')
