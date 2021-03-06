const MY_CONSTS = {
    PLANS: {
        PLAN_FREE: {
            MAX_PROJETOS: 1,
            MAX_FILE_SIZE: 2048,
            MAX_STORAGE: 500 * 1024,
            MAX_TASKS: 50,
            MAX_APPOINTMENTS: 20
        },
        PLAN_BASIC: {
            MAX_PROJECTS: 5,
            MAX_FILE_SIZE: 10240,
            MAX_TASKS: 100,
            MAX_APPOINTMENTS: 50
        },
        PLAN_PREMIUM: {
            MAX_PROJECTS: 10,
            MAX_FILE_SIZE: 51200,
            MAX_TASKS: 300,
            MAX_APPOINTMENTS: 100
        }
    }
}

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
                state.loadingDataProgress.value = -1;
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