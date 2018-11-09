import Vue from 'vue'
import Router from 'vue-router'

import AuthGuard from './auth-guard.js'

import Home from './views/Home.vue'
import Timeline from "./views/Timeline.vue"
import SignIn from './views/SignIn.vue'
import Register from './views/Register.vue'
import Projects from './views/Projects.vue'
import ApproveFile from './views/ApproveFile.vue'

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
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/projects',
        name: 'projects',
        component: Projects,
        beforeEnter: AuthGuard
    },
    {
        path: '/projects/project_name/file_approval',
        name: 'file_approval',
        component: ApproveFile,
        beforeEnter: AuthGuard
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
{
    path: '/about',
    name: 'about',
    component: About
},
{
    path: '/contact_us',
    name: 'contact',
    component: ContactUs
},
{
    path: '/user_profile',
    name: 'profile',
    component: UserProfile
},
{
    path: '/notes_tasks',
    name: 'notes_tasks',
    component: Notes
},
{
    path: '/projects',
    name: 'projects',
    component: Projects
},
{
    path: '/projects/new_project',
    name: 'new_project',
    component: NewProject
},
{
    path: '/projects/budget',
    name: 'budget',
    component: Budget
},
{
    path: '/projects/:project_name/tasks',
    name: 'tasks',
    component: Tasks
},
{
    path: '/projects/:project_name/file_to_approve',
    name: 'file_to_approve',
    component: FileToApprove
},
{
    path: '/projects/:project_name/approve_file',
    name: 'approve_file',
    component: ApproveFile
},

*/
