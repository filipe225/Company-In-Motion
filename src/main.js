import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './store/store.js'
import router from './router'

import navbar from './components/NavBar'
//import Footer from './components/Footer'


Vue.component('navbar', navbar)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
