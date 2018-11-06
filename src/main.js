import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './store/store.js'
import router from './router'
import * as firebase from 'firebase'

import navbar from './components/NavBar'
//import Footer from './components/Footer'


Vue.component('navbar', navbar)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
  created: function(){
    firebase.initializeApp({
        apiKey: "AIzaSyA6VivsqbaZi9qdwe05ce-vmrLPWEfEhDk",
        authDomain: "companysimplify-1992.firebaseapp.com",
        databaseURL: "https://companysimplify-1992.firebaseio.com",
        projectId: "companysimplify-1992",
        storageBucket: "companysimplify-1992.appspot.com"
    })
  }
}).$mount('#app')
