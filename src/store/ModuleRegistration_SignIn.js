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
                let userResponse = await userdb.get();
                console.log(userResponse);
                let firstDoc = userResponse.docs[0];
                if(firstDoc.exists) {
                    //let userId = firstDoc.id;
                    let userData = firstDoc.data(); 
                    commit('setUserDB', {...userData})
                    console.log(getters.getUserDB);

                    const proj_refs = firebase.firestore().collection('projects')
                    let projects = null;
                    switch (userData.type) {
                        case "admin":
                            projects = proj_refs.where('admin', '==', userData.id);
                            break;
                        case "associate":
                            projects = proj_refs.where('associates', 'array-contains', userData.id);
                            break;
                        case "client":
                            projects = proj_refs.where('clients', 'array-contains', userData.id);
                            break;
                        default:
                            return;
                            break;
                    }

                    console.log("projects", projects);

                    let projectsResponse = await projects.get();
                    console.log(projectsResponse);
                    let projectDocs = projectsResponse.docs;
                    projectDocs.forEach( doc => {
                        let project_id = doc.id;
                        let project_data = doc.data();                       
                        commit('setLoadedProject', {id: project_id, ...project_data});   
                    });

                    let user_projects = getters.getProjects;
                    for(let i=0, len = user_projects.length; i<len; i++) {
                        const proj_files_ref = firebase.firestore().collection('project_files').doc(user_projects[i].id)
                        let project_files_response = await proj_files_ref.get();
                        let proj_files_data = project_files_response.docs[0].data();
                        console.log(project_files_response);
                    }

                    commit('setNewHttpCall', {response: 200, msg: 'Projects loaded'})

                }
                
            } catch( error) {
                console.log(error);
                commit('setNewHttpCall', {response: 500, msg: 'Error loading projects'})
            }
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

