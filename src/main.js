import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './store/store.js'
import router from './router'
import * as firebase from 'firebase'

import navbar from './components/NavBar'
//import Footer from './components/Footer'
import Alert from './components/AlertHttpResponse.vue'
import Footer from './components/Footer.vue'


Vue.component('navbar', navbar)
Vue.component('my-alert', Alert)
Vue.component('footer-bar', Footer)

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
    });
    firebase.auth().onAuthStateChanged( user => {
        if (user) {
            this.$store.dispatch('firebaseAutoSignIn', user);
            this.$store.dispatch('firebaseGetUserDB');
            this.$store.dispatch('firebaseLoadProjects');     
        }
    })
    console.log("El store", this.$store);
    
    //this.$store.dispatch('loadProfile');

  }
}).$mount('#app')


// https://www.dailycodingproblem.com/?ref=csdojo