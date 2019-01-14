

export default {

    state: {
        newHttpCall: {
            response: null,
            msg: ''
        }
    },

    mutations: {
        setNewHttpCall: function(state, payload) {
            console.log('setNewHttpCall', payload);
            state.newHttpCall = payload;
        }
    },

    actions: {

    },

    getters: {
        getHttpCallResponse: function(state) {
            return state.newHttpCall;
        },

        getStorageBaseUrl: function() {
            return 'gs://companysimplify-1992.appspot.com/';
        }
    }
}