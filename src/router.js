import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Timeline from "./views/Timeline.vue"
import SignIn from './views/SignIn.vue'
import Project from './views/Project.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
        path: "/signin",
        name: "signin",
        component: SignIn
    },
    {
        path: '/projects/project_name',
        name: 'project',
        component: Project
    },
    {
        path: "/timeline",
        name: 'timeline',
        component: Timeline
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ],
  mode: 'history'
})


/*

*/
