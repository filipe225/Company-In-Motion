import * as firebase from 'firebase'

export default {
    state: {
        user: null,
        userDB: null
    },

    mutations: {
        setUser: function(state, payload) {
            state.user = payload;
            console.log("payload", payload);
        },
        setUserDB: function(state, payload) {
            state.userDB = payload;
        }
    },

    actions: {
        firebaseAutoSignIn: function({commit}, payload) {
            console.log('firebaseAutoSignIn');
            commit('setUser', payload);          
        },

        firebaseGetUserDB: function({commit, getters}, payload) {
            console.log('firebaseGetUserDB');
            const user = getters.getUser;
            const userdb = firebase.firestore().collection('users').where('id', '==', user.uid)
            userdb.get()    
                .then( data => {
                    data.forEach( doc => {
                        if(doc.exists) {
                            commit('setUserDB', doc.data());
                        }
                    })
                })
                .catch( error => {
                    console.log(error);
                })
        },

        firebaseUserLogout: function({commit}) {
            firebase.auth().signOut();
            commit('setUser', null);
        },

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
                .then( userData => {
                    const newUser = {
                        id: userData.user.uid,
                        displayName: payload.displayName,
                        email: payload.email,
                        type: payload.type,
                        notes: []                      
                    }
                    console.log(newUser);                  
                    let reference = firebase.firestore().collection("users")
                    return reference.add(newUser);
                })
                .then(data =>  {
                    console.log('database ->' , data);
                    //commit('setUser', userData.user.uid);
                })
                .catch( error => {
                    console.log(error);
                });
        }
    

    },

    getters: {
        isUserAuthenticated: function(state) {
            return state.user !== null && state.user !== undefined
        },
        getUser: function(state) {
            return state.user;
        },
        getUserDB: function(state) {
            return state.userDB
        },
        getNotes: function(state) {
            return state.userDB.notes;
        },
    }
}

