import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './store/store.js'
import router from './router'
import * as firebase from 'firebase'

// fusion chart
import VueFusionCharts from 'vue-fusioncharts';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';

//import the theme
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'

  
import navbar from './components/NavBar'
//import Footer from './components/Footer'
import Alert from './components/AlertHttpResponse.vue'
import Footer from './components/Footer.vue'

// register VueFusionCharts component
Vue.use(VueFusionCharts, FusionCharts, Charts, FusionTheme)

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
    /*     
    firebase.auth().onAuthStateChanged( user => {
        console.log("Auth Changed", user);
        if (user) {
            this.$store.dispatch('firebaseAutoSignIn', user);
            this.$store.dispatch('firebaseGetUserDB', user.uid);
            //this.$store.dispatch('firebaseLoadProjects');     
        } else {
            this.$store.dispatch('firebaseUserLogout');
        }
    })
    console.log("El store", this.$store); 
    */

  }
}).$mount('#app')