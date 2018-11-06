import Vue from 'vue'
import Vuex from 'vuex'
import ModuleNotes from "./ModuleNotes.js"
import ModuleTasks from "./ModuleTasks.js"
import ModuleRegistration from './ModuleRegistration.js'
import ModuleSignIn from './ModuleSignIn.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        notes:  ModuleNotes,
        tasks:  ModuleTasks,
        user:   ModuleRegistration,
        signed: ModuleSignIn
    }
})