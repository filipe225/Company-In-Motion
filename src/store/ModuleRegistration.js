import * as firebase from 'firebase'

export default {
    state: {
        user: null
    },

    mutations: {
        setUser: function(state, payload) {
            state.user = payload;
        }
    },

    actions: {
        firebaseRegisterUser: function( {commit}, payload) {
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then( user => {
                    const newUser = {
                        id: user.uid,                       
                    }
                    commit('setUser', user)
                })
                .catch( error => {
                    console.log(error);
                })
        }
    },

    getters: {
        getUser: function(state) {
            return state.user;
        } 
    }
}

