import Vue from 'vue'
import Router from 'vue-router'

import AuthGuard from './auth-guard.js'

import Home from './views/Home.vue'
import Timeline from "./views/Timeline.vue"
import SignIn from './views/SignIn.vue'
import Register from './views/Register.vue'
import ContactUs from './views/ContactUs.vue'
import DashBoard from './views/DashBoard.vue'
import Tasks from './views/Tasks.vue'
import Projects from './views/Projects.vue'
import ProjectUserInvited from './views/ProjectUserInvited.vue'
import ProjectFiles from './views/ProjectFiles.vue'
import ProjectTasks from './views/ProjectTasks.vue'
import ProjectSendFileToAproval from './views/ProjectSendFileToAproval.vue'
import ProjectReviewFile from './views/ProjectReviewFile.vue'
import ProjectCalendar from './views/ProjectCalendar.vue'
import Relax from './views/Relax.vue'
import UserProfile from './views/UserProfile.vue'

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
        path: '/tasks',
        name: 'tasks',
        component: Tasks,
        beforeEnter: AuthGuard
    },
    {
        path: '/contact_us',
        name: 'contact_us',
        component: ContactUs,
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashBoard,
        beforeEnter: AuthGuard
    },
    {
        path: '/projects',
        name: 'projects',
        component: Projects,
        beforeEnter: AuthGuard
    },
    {
        path: '/projects/:project_id/:user_type/invitation/:inviter_id/:fb_invite_id',
        name: 'user_invitation',
        component: ProjectUserInvited
    },
    {
        path: '/projects/:project_name/calendar',
        name: 'project_calendar',
        component: ProjectCalendar,
        beforeEnter: AuthGuard
    },
    {
        path: '/projects/:project_name/project_tasks',
        name: 'project_tasks',
        component: ProjectTasks,
        beforeEnter: AuthGuard
    },
    {
        path: '/projects/:project_name/project_files',
        name: 'project_files',
        component: ProjectFiles,
        beforeEnter: AuthGuard
    },
    {
        path: '/projects/:project_name/send_file_to_approval',
        name: 'send_file_to_approval',
        component: ProjectSendFileToAproval,
        beforeEnter: AuthGuard
    },
    {
        path: '/projects/:project_name/project_files/file_review/:file_id',
        name: 'file_review',
        component: ProjectReviewFile,
        beforeEnter: AuthGuard
    },
    {
        path: "/relax",
        name: "relax",
        component: Relax
    },
    {
        path: "/user_profiles/:user_id",
        name: "user_profiles",
        component: UserProfile,
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

});
