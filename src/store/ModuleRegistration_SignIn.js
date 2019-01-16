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

            //console.log(payload)
            const signed_user = payload;
            //const userdb = firebase.firestore().collection('users').where('id', '==', signed_user)
            const userdb = firebase.firestore().collection('users').doc(signed_user)

            try{
                let userResponse = await userdb.get();
                //console.log(userResponse);
                if(userResponse.exists) {
                    //let userId = firstDoc.id;
                    let userData = userResponse.data(); 
                    commit('setUserDB', {...userData})
                    //console.log(getters.getUserDB);

                    const proj_refs = firebase.firestore().collection('projects')
                    let projects = null;
                    switch (userData.type) {
                        case "admin":
                            projects = proj_refs.where('admin', '==', userData.id);
                            break;
                        case "project_manager":
                            projects = proj_refs.where('project_managers', 'array-contains', userData.id);
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

                    let projectsResponse = await projects.get();
                    //console.log(projectsResponse);
                    let projectDocs = projectsResponse.docs;
                    console.log(projectDocs);
                    projectDocs.forEach( doc => {
                        let project_id = doc.id;
                        let project_data = doc.data();                       
                        commit('setLoadedProject', {id: project_id, ...project_data});   
                    });

                    console.log("projects", getters.getProjects);

                    let user_projects = getters.getProjects;
                    for(let i=0, len = user_projects.length; i<len; i++) {
                        const proj_files_ref = firebase.firestore().collection('project_files').doc(user_projects[i].id).collection("files");
                        let project_files_response = await proj_files_ref.get();

                        let project_files_docs = project_files_response.docs;
                        project_files_docs.forEach( file => {
                            let file_data = file.data();
                            commit('addFilesToProject', {id: user_projects[i].id, file: file_data})
                        });
                    }

                    for(let i=0, len = user_projects.length; i<len; i++) {
                        const proj_events_ref = firebase.firestore().collection('project_events').doc(user_projects[i].id)
                        let project_events_response = await proj_events_ref.get();
                        let proj_events_data = project_events_response.data();
                        commit('addEventsToProject', {id: user_projects[i].id, events: proj_events_data})
                        console.log("events", proj_events_data);
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
            commit('setUserDB', null);
            commit('setProjects', []);
        },

        firebaseSignInUser: function({commit, dispatch}, payload) {
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
                            id: user.user.uid
                        }
                        commit("setUser", newUser);
                        //dispatch('firebaseAutoSignIn', user);
                        dispatch('firebaseGetUserDB', user.user.uid);
                    });
        },

        firebaseRegisterUser: function( {commit}, payload) {
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then( userData => {
                    const newUser = {
                        id: userData.user.uid,
                        displayName: payload.displayName,
                        email: payload.email,
                        type: payload.type,
                        created_in: new Date().toISOString(),
                        photo_url: 'https://firebasestorage.googleapis.com/v0/b/companysimplify-1992.appspot.com/o/users_avatars%2Fdefault%2Fuser_avatar_default.png?alt=media&token=b6883e32-5b03-48d2-9d9a-3c802e0e359b',
                        notes: []                      
                    }
                    console.log(newUser);                  
                    let reference = firebase.firestore().collection("users").doc(newUser.id)
                    return reference.set(newUser);
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

