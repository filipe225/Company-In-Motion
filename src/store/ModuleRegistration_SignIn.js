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
        },
        updateUserDB: function(state, payload) {
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
                            projects = proj_refs.where('admin', 'array-contains', userData.id);
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
                    console.log(projectsResponse);
                    let projectDocs = projectsResponse.docs;
                    console.log(projectDocs);
                    const projects_count = projectDocs.length;
                    const step = 100 / (projects_count * 4);
                    commit('setLoadingProgressStep', step);
                    projectDocs.forEach( doc => {
                        let project_id = doc.id;
                        let project_data = doc.data();                       
                        commit('setLoadedProject', {id: project_id, ...project_data});   
                        commit('incrementProgressValue', true);
                    });

                    console.log("projects", getters.getProjects);

                    let user_projects = getters.getProjects;

                    // LOAD USERS IN EACH PROJECT
                    for(let i=0; i<user_projects.length; i++) {
                        let admin = user_projects[i].admin;
                        let clients = user_projects[i].clients;
                        let project_managers = user_projects[i].project_managers;
                        let associates = user_projects[i].associates;
                        
                        let admin_info = [];
                        let user_clients = [];
                        let user_project_managers = [];
                        let user_associates = [];
                        
                        // important to display user information in various pages
                        let project_users_all = [];

                        // cada projeto so pode ter um admin 
                        let admin_id = admin[0]; 
                        let adminRef = firebase.firestore().collection('users').doc(admin_id);
                        let adminResp = await adminRef.get();
                        let adminData = adminResp.data();
                        delete adminData.notes;
                        admin_info.push(adminData);
                        project_users_all.push(adminData);
                        commit('setUsersInProjectByType', {
                            project_index: i,
                            user_types: 'admin',
                            admin: admin_info
                        });

                        if(clients.length > 0) {
                            for(let y=0; y<clients.length; y++) {
                                let user_id = clients[y];
                                let userRef = firebase.firestore().collection('users').doc(user_id);
                                let userResp = await userRef.get();
                                let userData = userResp.data();
                                delete userData.notes;

                                user_clients.push(userData);
                                project_users_all.push(userData);
                            }
                            commit('setUsersInProjectByType', {
                                project_index: i,
                                user_types: 'clients',
                                clients: user_clients
                            });

                        }
                        if(project_managers.length > 0) {
                            for(let y=0; y<project_managers.length; y++) {
                                let user_id = project_managers[y];
                                let userRef = firebase.firestore().collection('users').doc(user_id);
                                let userResp = await userRef.get();
                                let userData = userResp.data();
                                delete userData.notes;

                                user_project_managers.push(userData);
                                project_users_all.push(userData);
                            }
                            commit('setUsersInProjectByType', {
                                project_index: i,
                                user_types: 'project_managers',
                                project_managers: user_project_managers
                            });
                        }
                        if(associates.length > 0) {
                            for(let y=0; y<associates.length; y++) {
                                let user_id = associates[y];
                                let userRef = firebase.firestore().collection('users').doc(user_id);
                                let userResp = await userRef.get();
                                let userData = userResp.data();
                                delete userData.notes;

                                user_associates.push(userData);
                                project_users_all.push(userData);
                            }
                            commit('setUsersInProjectByType', {
                                project_index: i,
                                user_types: 'associates',
                                associates: user_associates
                            });
                        }
                        commit('setProjectUsers', {
                            project_index: i,
                            project_users_all: project_users_all
                        });
                        commit('incrementProgressValue', true);
                    }

                    for(let i=0, len = user_projects.length; i<len; i++) {
                        const proj_files_ref = firebase.firestore().collection('project_files').doc(user_projects[i].id).collection("files");
                        let project_files_response = await proj_files_ref.get();

                        let project_files_docs = project_files_response.docs;
                        project_files_docs.forEach( file => {
                            let file_data = file.data();
                            commit('addFilesToProject', {id: user_projects[i].id, file: file_data})
                        });
                        commit('incrementProgressValue', true);
                    }

                    for(let i=0, len = user_projects.length; i<len; i++) {
                        const proj_events_ref = firebase.firestore().collection('project_events').doc(user_projects[i].id)
                        let project_events_response = await proj_events_ref.get();
                        let proj_events_data = project_events_response.data();
                        commit('addEventsToProject', {id: user_projects[i].id, events: proj_events_data})
                        console.log("events", proj_events_data);
                        commit('incrementProgressValue', true);
                    }


                    commit('incrementProgressValue', false);
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
                        const loginDateRef = firebase.firestore().collection('users').doc(newUser.id);
                        const loginDateResp = loginDateRef.update({
                            last_login: new Date().toISOString()
                        });
                        //dispatch('firebaseAutoSignIn', user);
                        //dispatch('firebaseGetUserDB', user.user.uid);
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
                        notes: [],
                        location: "",
                        company: "",
                        company_title: "",
                        description: "",
                        newsletter: false,
                        email_new_file: true,
                        email_new_task: true,
                        email_new_appointment: true                     
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
        },
        updateUserProfile: async function({commit}, payload) {
            const user_id = payload.user_id;
            const user_profile = payload.profile;

            try  {

                const updatedUser = {
                    displayName: user_profile.displayName,
                    email: user_profile.email,
                    type: user_profile.type,
                    notes: [],
                    location: user_profile.location,
                    company: user_profile.company,
                    company_title: user_profile.company_title,
                    description: user_profile.description,
                    newsletter: user_profile.checkboxNewsletter,
                    email_new_file: user_profile.checkboxEmailFiles,
                    email_new_task: user_profile.checkBoxEmailTasks,
                    email_new_appointment: true                  
                }

                const userRef = firebase.firestore().collection('users').doc(user_id);
                const userResp = await userRef.update(updatedUser);

                commit('updateUserDb', updatedUser);
                commit('setNewHttpCall', { response: 200, msg: 'Successfully updated user profile!'});
            } catch(error) {
                commit('setNewHttpCall', { response: 500, msg: 'Error updating user profile. Try again or contact support.'});
            }
        },
        updateUserEmail: async function({commit}, payload) {
            try {
                const currentUser = firebase.auth().currentUser;
                const newEmail = payload.newEmail;

                const ref = await currentUser.updateEmail(newEmail);
                console.log(ref);
                commit('setNewHttpCall', { response: 200, msg: 'Success. Try again or contact support.'});
            } catch (error) {
                commit('setNewHttpCall', { response: 500, msg: 'Error. Try again or contact support.'});

            }
        },
        updateUserPassword: async function({commit, getters}, payload) {
            try {
                const currentUser = firebase.auth().currentUser;
                const newPassword = payload.newPassword;

                const ref = await currentUser.updatePassword(newPassword);
                console.log(ref);
                commit('setNewHttpCall', { response: 200, msg: 'Success. Try again or contact support.'});
            } catch (error) {
                commit('setNewHttpCall', { response: 500, msg: 'Error. Try again or contact support.'});

            }
        },
        resetUserPassword: async function({commit}, payload) {
            try {            
                const ref = await firebase.auth().sendPasswordResetEmail(payload.email);
                console.log(ref);
                commit('setNewHttpCall', { response: 200, msg: 'Success. Try again or contact support.'});
            } catch (error) {
                commit('setNewHttpCall', { response: 500, msg: 'Error. Try again or contact support.'});
            }
        },
        deleteUser: async function({commit, getters}, payload) {
            try {
                const currentUser = firebase.auth().currentUser;
                const ref = currentUser.delete();
                console.log(ref);
                const userRef = firebase.firestore().collection('users').doc(payload.user_id);
                const userResp = await userRef.delete();
                console.log(userResp);
                commit('setNewHttpCall', { response: 200, msg: 'Success. Try again or contact support.'});
            } catch (error) {
                commit('setNewHttpCall', { response: 500, msg: 'Error. Try again or contact support.'});

            }
        },
    

    },

    getters: {
        isUserAuthenticated: function(state) {
            return state.user !== null && state.user !== undefined
        },
        getUser: function(state) {
            return state.user;
        },
        getUserDB: function(state) {
            return state.userDB;
        },
        getNotes: function(state) {
            return state.userDB.notes;
        },
    }
}

