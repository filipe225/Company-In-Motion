

export default {

    state: {
        newHttpCall: {
            response: null,
            msg: ''
        }
    },

    mutations: {
        setNewHttpCall: function(state, payload) {
            console.log('setNewHttpCall');
            state.newHttpCall = payload;
        }
    },

    actions: {

    },

    getters: {
        getHttpCallResponse: function(state) {
            return state.newHttpCall;
        }
    }
}