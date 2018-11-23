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

        firebaseGetUserDB: async function({commit, getters, dispatch}, payload) {
            console.log('firebaseGetUserDB');
            //const signed_user = getters.getUser;

            const firestore = firebase.firestore();
            const settings = {/* your settings... */ timestampsInSnapshots: true};
            firestore.settings(settings);

            const signed_user = payload;
            const userdb = firebase.firestore().collection('users').where('id', '==', signed_user)

            try{
                let userData = await userdb.get();
                console.log(userData);
                console.log(userData.length);
                if(userData.length === "1") {
                    console.log(userData);
                }
                
            } catch( error) {
                console.log(error);
            }

            /*
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
                                        //dispatch('firebaseLoadProjects');                                   
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
            */
        },

        firebaseUserLogout: function({commit}) {
            firebase.auth().signOut();
            commit('setUser', null);
        },

        firebaseSignInUser: function({commit}, payload) {
            firebase.auth()
                    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
                    .then(function() {
                        return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password);
                    })
                    .catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(errorCode, errorMessage);
                    })
                    .then( user => {
                        console.log("signed", user);
                        const newUser = {
                            id: user.uid
                        }
                        commit("setUser", newUser);
                    });
            /*
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then( user => {
                    console.log("signed", user);
                    const newUser = {
                        id: user.uid
                    }
                    commit("setUser", newUser);
                })
                .catch( error => console.log(error));
            */
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

