import { stat } from "fs";


export default {

    state: {
        newHttpCall: {
            response: null,
            msg: ''
        },
        loadingDataProgress: {
            step: 0,
            value: 0
        }
    },

    mutations: {
        setNewHttpCall: function(state, payload) {
            console.log('setNewHttpCall', payload);
            state.newHttpCall = payload;
        },

        setLoadingProgressStep: function(state, payload) {
            state.loadingDataProgress.step = payload;
            state.loadingDataProgress.value = 0;
        },

        incrementProgressValue: function(state, payload) {
            //console.log(state.loadingDataProgress.step, state.loadingDataProgress.value);
            if(!payload) {
                state.loadingDataProgress.step = 0;
                state.loadingDataProgress.value = 100;
                return;
            }

            state.loadingDataProgress.value += state.loadingDataProgress.step;
            if(state.loadingDataProgress.value > 100) {
                state.loadingDataProgress.value = 100;
            }
        }
    },

    actions: {

    },

    getters: {
        getHttpCallResponse: function(state) {
            return state.newHttpCall;
        },

        getLoadingProgress: function(state) {
            return state.loadingDataProgress;
        },

        getStorageBaseUrl: function() {
            return 'gs://companysimplify-1992.appspot.com/';
        }
    }
}