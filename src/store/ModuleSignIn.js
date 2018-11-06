

export default {
    state: {
        user: null
    },

    mutations: {

    },

    actions: {

    },

    getters: {
        isUserAuthenticated: function(state) {
            return state.user !== null && state.user !== undefined
        }
    }
}