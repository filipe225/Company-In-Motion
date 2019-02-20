import * as firebase from 'firebase'

/*
name: 'Project #1',
description: 'jkabdlkasndlaskndaskldnaskl',
date: new Date().toDateString("yyyy-MM-dd"),
admin: 'jkqwhqwjhjhvadjkb',
clients: [
    {
        name: 'Client #1',
        profile: "/"
    }
],
associates: [
    {
        name: 'Associate #1',
        profile: "/"
    },
    {
        name: 'Associate #2',
        profile: "/"
    },
    {
        name: 'Associate #3',
        profile: "/"
    }
],
filesAwatingApproval: 2,
filesApproved: 4
*/

class Project {
    constructor(n, desc, adminID, firebaseUID) {
        this.id = firebaseUID || "";
        this.name = n;
        this.description = desc;
        this.created_in = new Date().toISOString();
        this.admin = [adminID];
        this.clients = [];
        this.associates = [];
        this.project_managers = [];
        this.events = [];
        this.files = [];
        this.tasks = [];
        this.appointments = [];
    }

    getObject() {
        return {
            name: this.name,
            description: this.description,
            created_in: this.created_in,
            admin: this.admin,
            clients: this.clients,
            associates: this.associates,
            project_managers: this.project_managers,
            files: this.files,
            tasks: this.tasks,
            appointments: this.appointments
        }
    }
}

class File {
    constructor() {

    }
}

export default {
    state: {
        projects: [],
        file_upload_progress: 0
    },

    mutations: {
        addUserToProject: function (state, payload) {
            let project_index = payload.project_index;
            let user_type = payload.user_type;
            let user = payload.user;
            let project = state.projects[project_index];

            if (project) {
                switch (user_type) {
                    case "project_manager":
                        project.project_managers.push(user);
                        break;
                    case "client":
                        project.clients.push(user);
                        break;
                    case "associate":
                        project.associates.push(user);
                        break;
                }
            }
        },

        addFilesToProject: function (state, payload) {
            let desired_project_index = state.projects.findIndex(proj => proj.id === payload.id);
            if (desired_project_index > -1) {
                if (!state.projects[desired_project_index].files) {
                    state.projects[desired_project_index].files = [];
                }
                state.projects[desired_project_index].files.push(payload.file);
            }
        },

        addEventsToProject: function (state, payload) {

            let desired_project_index = state.projects.findIndex(proj => proj.id === payload.id);
            if (desired_project_index > -1) {
                state.projects[desired_project_index].events = payload.events.events;
            }
        },

        deleteProject: function (state, payload) {
            let project_id = payload.project_id;
            let project_index = state.projects.findIndex(project => project.id === payload.project_id);
            state.projects.splice(payload.project_index, 1);
        },

        setUsersInProjectByType: function(state, payload) {
            let project_index = payload.project_index;
            switch(payload.user_types) {
                case "clients":
                    state.projects[project_index].clients = payload.clients;
                    break;
                case "project_managers":
                    state.projects[project_index].project_managers = payload.project_managers;
                    break;
                case "associates":
                    state.projects[project_index].associates = payload.associates;
                    break;
                case "admin":
                    state.projects[project_index].admin = payload.admin;
                    break;
            }
        },

        setProjects: function (state, payload) {
            state.projects = payload;
        },

        setNewProject: function (state, payload) {
            let newProject = new Project(payload.name, payload.description, payload.admin);
            newProject.events = payload.events;
            state.projects.push(newProject);
        },

        setLoadedProject: function (state, payload) {
            state.projects.push(payload);
        },

        setNewEventToProject: function (state, payload) {
            state.projects[payload.project_index].events.push(payload.eventData);
            console.log(state.projects);
        },

        setNewFileToProject: function (state, payload) {
            state.projects[payload.project_index].files.push(payload.fileData);
        },

        setFileUploadProgress: function (state, payload) {
            state.file_upload_progress = payload;
        },

        setProjectUsers: function(state, payload) {
            console.log("setProjectUsers", payload);
            state.projects[payload.project_index].all_users = payload.project_users_all;
        }
    },

    actions: {
        firebaseLoadProjects: function ({ commit, getters }, payload) {
            console.log("firebaseLoadProjects");
            let projects = getters.getProjects;
            projects = projects.reduce((a, b) => {
                a.push(b.id);
                return a;
            }, []);
            console.log(projects);

            projects.forEach(val => {
                console.log(val);
                let ref = firebase.firestore().collection('project_files').doc(val);
                ref.get().then(response => {
                    response.forEach(data => console.log(data.data()));
                }).catch(error => console.log(error));
            });
        },

        firebaseCreateNewProject: async function ({ commit, getters }, payload) {
            const signed_user = getters.getUserDB;
            let newProject = new Project(payload.name, payload.description, signed_user.id);

            const proj_refs = firebase.firestore().collection('projects')

            try {
                let events = [{
                    title: `Project ${payload.name} created`,
                    created_in: new Date().toISOString()
                }];

                let firstResponse = await proj_refs.add(newProject.getObject());
                let project_id = firstResponse.id;
                const proj_files_refs = firebase.firestore().collection('project_files').doc(project_id) //.collection("files");
                let secondResponse = await proj_files_refs.set({ files: [] });
                const proj_tasks_refs = firebase.firestore().collection('project_tasks').doc(project_id) //.collection("tasks");
                let thirdResponse = await proj_tasks_refs.set({ tasks: [] });
                const proj_budget_refs = firebase.firestore().collection('project_budget').doc(project_id);
                let fourthResponse = await proj_budget_refs.set({ budget: [] });
                const proj_events_refs = firebase.firestore().collection('project_events').doc(project_id)
                let fifthResponse = await proj_events_refs.set({ events })
                const proj_invites_refs = firebase.firestore().collection('project_invites').doc(project_id)
                let sixthResponse = await proj_invites_refs.collection('invites').doc("teste");

                commit('setNewProject', { name: payload.name, description: payload.description, admin: signed_user.id, events: events });
                commit('setNewHttpCall', { response: 200, msg: 'New project created!' })
            } catch (error) {
                console.log(error);
                commit('setNewHttpCall', { response: 500, msg: 'Error creating new project. Try Again or contact support.' })
            }
        },

        firebaseDeleteProject: async function ({ commit, getters }, payload) {
            if (payload.project_index === -1) return;
            console.log(payload);
            let projects = getters.getProjects;
            let project_index = payload.project_index;
            let project_id = projects[project_index].id;

            try {
                let projectRef = firebase.firestore().collection('projects').doc(project_id);
                let projectResp = await projectRef.delete();

                let projectFilesRef = firebase.firestore().collection('project_files').doc(project_id);
                let projectFilesResp = await projectFilesRef.delete();

                let projectTasksRef = firebase.firestore().collection('project_tasks').doc(project_id);
                let projectTasksResp = await projectTasksRef.delete();

                let projectEventsRef = firebase.firestore().collection('project_events').doc(project_id);
                let projectEventsResp = await projectEventsRef.delete();

                let projectBudgetRef = firebase.firestore().collection('project_budget').doc(project_id);
                let projectBudgetResp = await projectBudgetRef.delete();

                commit('setNewHttpCall', { response: 200, msg: `Project ${projects[project_index].name} was deleted!` })
                commit('deleteProject', { project_id: project_id, project_index: project_index });
            } catch (error) {
                console.log(error);
                commit('setNewHttpCall', { response: 500, msg: 'Error deleting project. Try Again or contact support.' })
            }

        },

        firebaseNewFileToApproval: async function ({ commit, getters }, payload) {
            commit('setFileUploadProgress', 0);
            let projects = getters.getProjects;
            let project_index = projects.findIndex(project => project.name === payload.project_name);
            let project_id = projects[project_index].id;
            try {
                let projectRef = firebase.storage().ref().child(project_id + "/" + payload.imageName);
                let uploadTask = projectRef.put(payload.image);

                // Listen for state changes, errors, and completion of the upload.
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                    function (snapshot) {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log(snapshot.state);
                        //console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.SUCCESS:
                                break;
                            case firebase.storage.TaskState.PAUSED: // or 'paused'
                                console.log('Upload is paused');
                                break;
                            case firebase.storage.TaskState.RUNNING: // or 'running'
                                console.log('Upload is running');
                                commit('setFileUploadProgress', progress);
                                break;
                        }
                    }, function (error) {
                        console.log(error);
                        commit('setNewHttpCall', { response: 500, msg: 'Error uploading file. Try again or contact support.' })
                    }, function () {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...

                        let file_id = uploadTask.snapshot.metadata.generation;

                        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                            let fileDownloadUrl = downloadURL.toString();

                            let current_user = getters.getUserDB;
                            let file_extension = payload.imageName.split(".").reverse();
                            file_extension = file_extension[0];

                            let fileData = {
                                fileId: file_id,
                                fileName: payload.imageName,
                                fileExtension: file_extension,
                                fileUrl: getters.getStorageBaseUrl + project_id + "/" + file_id,
                                fileDownloadUrl: fileDownloadUrl,
                                title: payload.title,
                                description: payload.description,
                                comments: [],
                                state: 'pending',
                                uploaderUserType: current_user.type,
                                uploaderUserId: current_user.id,
                                created_in: new Date().toISOString()
                            };

                            console.log(project_id, file_id);
                            let project_files_ref = firebase.firestore().collection('project_files').doc(project_id).collection('files').doc(file_id);
                            let project_files_response = project_files_ref.set(fileData);

                            commit('setNewFileToProject', { project_index: project_index, fileData: fileData });

                            const eventData = {
                                title: `File ${payload.imageName} sent for aproval by ${current_user.displayName}`,
                                created_in: new Date().toISOString()
                            };

                            let project_events_ref = firebase.firestore().collection('project_events').doc(project_id);
                            let project_events_response = project_events_ref.update('events', firebase.firestore.FieldValue.arrayUnion(eventData));

                            commit('setNewEventToProject', { project_index: project_index, eventData: eventData });

                            commit('setNewHttpCall', { response: 200, msg: 'File Uploaded correctly.' })
                        });

                    });


            } catch (error) {
                console.log(error);
                commit('setNewHttpCall', { response: 500, msg: 'Error uploading file. Try again or contact support.' })
            }
        },

        firebaseInviteAssociateClientManager: async function ({ commit, getters }, payload) {
            let projects = getters.getProjects;
            let project_index = projects.findIndex(project => project.name === payload.project_name);
            let project_uid = projects[project_index].id;

            let firebase_ref = firebase.firestore().collection("project_invites").doc(project_uid).collection('invites');

            let invite = {
                inviter: payload.inviter,
                invitee: payload.mail_to,
                date: new Date().toISOString(),
                state: "pending"
            }

            try {
                let invite_response = await firebase_ref.add(invite);
                console.log(invite_response);
                let invite_id = invite_response.id;
                console.log("INVITE ID", invite_id);
                let mail_response = await fetch('https://us-central1-companysimplify-1992.cloudfunctions.net/invitePersonToProject' +
                    '?mail_to=' + payload.mail_to +
                    '&project_name=' + payload.project_name +
                    '&main_link=' + payload.main_link + "/" + invite_id, {
                        method: "POST", // *GET, POST, PUT, DELETE, etc.
                        mode: "cors", // no-cors, cors, *same-origin
                        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                        credentials: "same-origin", // include, *same-origin, omit
                        headers: {
                            "Content-Type": "application/json; charset=utf-8",
                            // "Content-Type": "application/x-www-form-urlencoded",
                        },
                        redirect: "follow", // manual, *follow, error
                        referrer: "no-referrer", // no-referrer, *client
                        body: JSON.stringify(payload), // body data type must match "Content-Type" header           
                    })

                commit('setNewHttpCall', { response: 200, msg: "Email sent to " + payload.email_to + " ." })
            } catch (error) {
                commit('setNewHttpCall', { response: 500, msg: "Error sending email. Try again or contact support." })
            }
        },

        firebaseAddUserToProject: async function ({ commit, dispatch, getters }, payload) {
            let project_id = payload.project_id;
            //console.log(payload);
            try {
                // user ja registado? 
                // se nao, registar e adicionar a projecto
                var newUserId = null;

                if (payload.callToAction === "signin") {
                    let userData = payload.userData;     
                    let resp = await firebase.auth()
                                            .setPersistence(firebase.auth.Auth.Persistence.NONE)
                                            .signInWithEmailAndPassword(userData.email, userData.password);
                    
                    newUserId = resp.user.uid;

                } else if (payload.callToAction === "registration") {
                    let userData = payload.userData;
                    let userCreationResp = await firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password);
                    //console.log(userCreationResp);

                    newUserId = userCreationResp.user.uid;

                    const newUser = {
                        id: userCreationResp.user.uid,
                        displayName: userData.displayName,
                        email: userData.email,
                        type: payload.user_type,
                        created_in: new Date().toISOString(),
                        photo_url: 'https://firebasestorage.googleapis.com/v0/b/companysimplify-1992.appspot.com/o/users_avatars%2Fdefault%2Fuser_avatar_default.png?alt=media&token=b6883e32-5b03-48d2-9d9a-3c802e0e359b',
                        notes: []
                    }

                    let reference = firebase.firestore().collection("users").doc(newUserId)
                    let registerResp = await reference.set(newUser);
                }

                let project_inv_ref = firebase.firestore().collection('project_invites').doc(project_id).collection('invites').doc(payload.invite_id);
                let project_invite_resp = await project_inv_ref.get();

                let project_invite_data = project_invite_resp.data();
                console.log(project_invite_data);

                if (project_invite_data.state === "pending") {
                    // get user type and add a "s" to it to update the designated array
                    let user_type = payload.user_type + "s";
                    console.log("USER TYPE", user_type);

                    let invite_update_resp = project_inv_ref.update({
                        state: "accepted"
                    });

                    // VERIFICAR TIPO DE UTILIZADOR
                    const projectReference = firebase.firestore().collection('projects').doc(project_id);
                    let response = await projectReference.update(user_type, firebase.firestore.FieldValue.arrayUnion(newUserId));
                    console.log(response);

                    // Send mail to owner of project about new member
                    //newEmail();
                    commit('setNewHttpCall', { response: 200, msg: "User added to project!" })          
                } else {
                    throw new Error();
                }

                //APOS LOGIN FAZER LOAD DOS PROJECTOS
                dispatch('firebaseGetUserDB', newUserId);

            } catch (error) {
                commit('setNewHttpCall', { response: 500, msg: "Error adding user to project. Try again or contact support." })
                console.log(error);
                
            }

        },

        firebaseAproveFile: async function ({ commit, getters }, payload) {
            let projects = getters.getProjects;
            let project_index = projects.findIndex(project => project.name === payload.project_name);
            
            if (project_index === -1) {
                console.log("Error finding index of project");
                commit('setNewHttpCall', { response: 500, msg: `Error Aproving File ${file.fileName}. Try again or contact support.` })
                return;
            }

            let project = state.projects[project_index];
            let file = project.files.find(file => file.fileId === payload.file_id);
            let file_index = project.files.find(file => file.fileId === payload.file_id);
            project.files[file_index].state = "approved";

            try {
                // UPDATE DOCUMENT COORESPONDING TO FILE ID
                const fileRef = firebase.firestore().collection('project_files').doc(project.id).collection("files").doc(file.id);
                const fileResp = await fileRef.update({
                    state: 'approved',
                    updateDate: new Date().toISOString()
                });
                console.log(fileResp);
                
                // SEND EMAIL TO OWNER, PROJECT_MANAGERS AND CLIENTS OF PROJECT
                //sendEmail();

                commit('setNewHttpCall', { response: 200, msg: `${file.fileName} was successfully aproved!` })
            } catch (error) {
                commit('setNewHttpCall', { response: 500, msg: `Error Aproving File ${file.fileName}. Try again or contact support.` })
            }
        },

        firebaseRejectFile: async function ({ commit, getters }, payload) {
            let projects = getters.getProjects;
            let project_index = projects.findIndex(project => project.name === payload.project_name);
            
            if (project_index === -1) {
                console.log("Error finding index of project");
                commit('setNewHttpCall', { response: 500, msg: `Error rejecting file ${file.fileName}. Try again or contact support.` })
                return;
            }

            let project = state.projects[project_index];
            let file_index = project.files.find(file => file.fileId === payload.file_id);
            project.files[file_index].state = "rejected";

            try {
                // UPDATE DOCUMENT COORESPONDING TO FILE ID
                const fileRef = firebase.firestore().collection('project_files').doc(project.id).collection("files").doc(file.id);
                const fileResp = await fileRef.update({
                    state: 'rejected',
                    updateDate: new Date().toISOString()
                });
                console.log(fileResp);

                commit('setNewHttpCall', { response: 200, msg: `${file.fileName} was successfully rejected!!` })
            } catch (error) {
                commit('setNewHttpCall', { response: 500, msg: `Error rejecting file ${file.fileName}. Try again or contact support.` })
            }
        },

        // NOT IN USE
        firebasePendingFile: function ({ commit, getters }, payload) {
            let projects = getters.getProjects;
            let project_index = projects.findIndex(project => project.name === payload.project_name);
            if (project_index === -1) return;
            let project = state.projects[project_index];
            let file_index = project.files.find(file => file.fileId === payload.file_id);
            project.files[file_index].state = "pending";

            try {
                commit('setNewHttpCall', { response: 200, msg: `${file.fileName} was successfully rejected!!` })
            } catch (error) {
                commit('setNewHttpCall', { response: 500, msg: `Error rejecting file ${file.fileName}. Try again or contact support.` })
            }
        },

        firebaseNewCommentToFile: function ({ commit, getters }, payload) {

        },

        firebaseDeleteFileFromProject: function ({ commit, getter }, payload) {
            let project_name = payload.project_name;
            let file_index = payload.file_index;
            let file_id = payload.file_id;

            let projects = getters.getProjects;
            let project_index = projects.findIndex(project => project.name === project_name);
            let fileObj = projects[project_index].files[file_index];

            if (fileObj.fileId === file_id) {
                const filesRef = firebase.storage().ref(projects[project_index].id);
                //filesRef.delete();

                // SEND EMAIL TO TEAM MEMBERS REPORTING FILE DELETION
                // if the file uploaded was a mistake should everyone get an email?
            }

        }
    },

    getters: {
        getProjects: function (state) {
            return state.projects;
        },
        getFileUploadProgress: function (state) {
            return state.file_upload_progress;
        },
        getProjectEvents: function (state) {
            return function (payload) {
                let project_index = state.projects.findIndex(proj => proj.name === payload);
                return state.projects[project_index].events;
            }
        },
        getProjectFiles: function (state) {
            return function (payload) {
                let project_index = state.projects.findIndex(proj => proj.name === payload);
                return state.projects[project_index].files;
            }

        },
        getProjectFile: function (state) {
            return function ({ project_name, file_id }) {
                let project_index = state.projects.findIndex(project => project.name === project_name);
                console.log("index", project_index)
                if (project_index === -1) return;
                let project = state.projects[project_index];
                let file = project.files.find(file => file.fileId === file_id);
                return file;
            }
        },
        getProjectUsersByType: function (state) {
            return function (project_index, user_type) {
                switch (user_type) {
                    case "project_manager":
                        return state.projects[project_index].project_managers;
                    case "client":
                        return state.projects[project_index].clients;
                    case "associate":
                        return state.projects[project_index].associates;
                    default:
                        return null;
                }
            }
        },
        getUserInProject: function(state) {
            return function(projectName, userId) {
                let viewing_user = null;
                const projects = state.projects;
                const viewing_project = projects.filter( p => p.name === projectName)[0];
                if(viewing_project) {
                    const users_in_project = [].concat(
                            viewing_project.admin, 
                            viewing_project.clients,
                            viewing_project.associates,
                            viewing_project.project_managers);
                    viewing_user = users_in_project.filter( u => u.id === userId);
                    return viewing_user;
                }
            }
        },
        getUploaderInfo: function(state) {
            return function(project_name, uploader_id) {
                let project = state.projects.filter( proj => {
                    return proj.name === project_name;
                });
                if(project) {
                    return project[0].admin[0];
                }
            }
        }
    }
}

/*
    switch (payload.type) {
        case "project_manager":
            commit('addUserToProject', {
                project_index: project_index,
                user_type: "project_manager",
                user: newUser
            });
            project_users_to_update = getters.getProjectUsersByType(project_index, "project_manager");
            break;
        case "client":
            commit('addUserToProject', {
                project_index: project_index,
                user_type: "client",
                user: newUser
            });
            project_users_to_update = getters.getProjectUsersByType(project_index, "client");
            break;
        case "associate":
            commit('addUserToProject', {
                project_index: project_index,
                user_type: "associate",
                user: newUser
            });
            project_users_to_update = getters.getProjectUsersByType(project_index, "associate");
            break;
        default:
            throw new Error();
            break;
    } 

*/