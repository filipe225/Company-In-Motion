import * as firebase from 'firebase'
/*
displayName: "Admin"
email:"admin@admin.com"
id:"KCh8PRPT3Mctz3ErNnw65ACuxAn2"
notes: []
type:"admin"
*/
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

        firebaseGetUserDB: function({commit, getters, dispatch}, payload) {
            console.log(arguments);
            console.log('firebaseGetUserDB');
            const signed_user = getters.getUser;
            console.log()
            const userdb = firebase.firestore().collection('users').where('id', '==', signed_user.uid)
            userdb.get()    
                .then( data => {
                    data.forEach( doc => {
                        if(doc.exists) {
                            commit('setUserDB', doc.data());
                            const proj_refs = firebase.firestore().collection('projects')
                            let projects = null;
                            switch (doc.data().type) {
                                case "admin":
                                    projects = proj_refs.where('admin', '==', signed_user.uid);
                                    break;
                                case "associate":
                                    projects = proj_refs.where('associates', 'array-contains', signed_user.uid);
                                    break;
                                case "client":
                                    projects = proj_refs.where('clients', 'array-contains', signed_user.uid);
                                    break;
                                default:
                                    return;
                                    break;
                            }
                
                            projects.get()
                                .then(response => {
                                    console.log(response);
                                    response.forEach( doc => {
                                        let id = doc.id;
                                        let data = doc.data();
                                        commit('setLoadedProject', {id, ...data});   
                                        dispatch('firebaseLoadProjects');                                   
                                    });
                                    commit('setNewHttpCall', {response: 200, msg: 'Projects loaded'})
                                })
                                .catch(error => {
                                    console.log(error);
                                    commit('setNewHttpCall', {response: 500, msg: 'Error loading projects'})
                                });
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
                    commit('setNewHttpCall', { response: 200, msg: 'Registration was Successful.'})
                })
                .catch( error => {
                    console.log(error);
                    commit('setNewHttpCall', { response: 500, msg: 'Error registering user. Try Again.'})
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

