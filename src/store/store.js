import Vue from 'vue'
import Vuex from 'vuex'
import ModuleNotes from "./ModuleNotes.js"
import ModuleTasks from "./ModuleTasks.js"
import Registration_SignIn from './ModuleRegistration_SignIn.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        notes:  ModuleNotes,
        tasks:  ModuleTasks,
        user:   Registration_SignIn
    }
})