import * as firebase from 'firebase'

export default {
    state: {
        user: null
    },

    mutations: {
        setUser: function(state, payload) {
            state.user = payload;
            console.log("payload", payload);
        }
    },

    actions: {
        firebaseSignInUser: function({commit}, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then( user => {
                    console.log("signed", user);
                    const newUser = {
                        id: user.uid
                    }
                    commit("setUser", newUser);
                })
                .catch( error => console.log(error));
        },

        firebaseRegisterUser: function( {commit}, payload) {
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then( user => {
                    const newUser = {
                        id: user.uid,                       
                    }
                    commit('setUser', user.uid)
                })
                .catch( error => {
                    console.log(error);
                })
        }
    },

    getters: {
        isUserAuthenticated: function(state) {
            return state.user !== null && state.user !== undefined
        },
        getUser: function(state) {
            return state.user;
        } 
    }
}

