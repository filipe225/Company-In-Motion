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
            this.$store.dispatch('firebaseGetUserDB', user.uid);
            //this.$store.dispatch('firebaseLoadProjects');     
        }
    })
    console.log("El store", this.$store);
    
    //this.$store.dispatch('loadProfile');

  }
}).$mount('#app')


// https://www.dailycodingproblem.com/?ref=csdojo

/*
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function() {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });
*/