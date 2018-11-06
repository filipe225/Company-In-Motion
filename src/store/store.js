import Vue from 'vue'
import Vuex from 'vuex'
import ModuleNotes from "./ModuleNotes.js";
import ModuleTasks from "./ModuleTasks.js";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        notes: ModuleNotes,
        tasks: ModuleTasks
    }
})