import Vue from 'vue'
import Vuex from 'vuex'
import ModuleNotes from "./ModuleNotes.js"
import ModuleTasks from "./ModuleTasks.js"
import Registration_SignIn from './ModuleRegistration_SignIn.js'
import ModuleProjects from './ModuleProjects.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user:   Registration_SignIn,
        projects: ModuleProjects,
        notes:  ModuleNotes,
        tasks:  ModuleTasks
    }
})