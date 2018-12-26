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
        this.admin = adminID;
        this.clients = [];
        this.associates = [];
        this.project_managers = [];
        this.events = [];
        this.files = [];
    }

    getObject() {
        return {
            name: this.name,
            description: this.description,
            created_in: this.created_in,
            admin: this.admin,
            clients: this.clients,
            associates: this.associates,
            project_managers: this.project_managers
        }
    }
}

export default {
    state: {
        projects: [],
        file_upload_progress: 0
    },

    mutations: {
        deleteProject: function(state, payload) {
            let project_id = payload.project_id;
            let project_index = state.projects.findIndex(project => project.id === payload.project_id);
            state.projects.splice(payload.project_index, 1);
        },

        setProjects: function (state, payload) {
            state.projects = payload;
        },

        setNewProject: function (state, payload) {
            let newProject = new Project(payload.name, payload.description, payload.admin);
            newProject.events = payload.events;
            state.projects.push(newProject);
        },

        setLoadedProject: function(state, payload) {
            state.projects.push(payload);
        },

        setNewObjectForProject: function(state, payload) {
            let desired_project_index = state.projects.findIndex( proj => proj.id === payload.id);
            if(desired_project_index > -1) {
                console.log("Object.assign", payload.data);
                //Object.assign(state.projects[desired_project_index], payload.data);
                //state.projects[desired_project_index][key] = payload.data;
            }else {
                console.log(payload);
            }
            
        },

        setNewEventToProject: function(state, payload) {
            state.projects[payload.project_index].events.push(payload.eventData);
            console.log(state.projects);
        },

        setNewFileToProject: function (state, payload) {
            state.projects[payload.project_index].files.push(payload.fileData);
        },
        
        setFileUploadProgress: function(state, payload) {
            state.file_upload_progress = payload;
        }
    },

    actions: {
        firebaseProjectAddUse: function({ commit}, payload) {
            let ref = firebase.firestore().collection('projects').where('name', '==', payload.project_name)
            let coiso = ref.get().then( data => {

            })
            .catch( error => {

            });
        },

        firebaseLoadProjects: function ({ commit, getters }, payload) {
            console.log("firebaseLoadProjects");
            let projects = getters.getProjects;
            projects = projects.reduce((a, b) => {
                a.push(b.id);
                return a;
            }, []);
            console.log(projects);

            projects.forEach( val => {
                console.log(val);
                let ref = firebase.firestore().collection('project_files').doc(val);
                ref.get().then(response =>  {
                    response.forEach( data => console.log(data.data()));
                }).catch( error => console.log(error));
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
                let secondResponse = await proj_files_refs.set({files: []});
                const proj_tasks_refs = firebase.firestore().collection('project_tasks').doc(project_id) //.collection("tasks");
                let thirdResponse = await proj_tasks_refs.set({tasks: []});
                const proj_budget_refs = firebase.firestore().collection('project_budget').doc(project_id);
                let fourthResponse = await proj_budget_refs.set({budget: []});
                const proj_events_refs = firebase.firestore().collection('project_events').doc(project_id)
                let fifthResponse = await proj_events_refs.set({ events })

                commit('setNewProject', {name: payload.name, description: payload.description, admin: signed_user.id, events: events});
                commit('setNewHttpCall', {response: 200, msg: 'New project created!'})
            } catch(error) {
                console.log(error);
                commit('setNewHttpCall', {response: 500, msg: 'Error creating new project. Try Again or contact support.'})
            }
        },

        firebaseDeleteProject: async function({commit, getters}, payload) {
            if(payload.project_index === -1) return;
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

                commit('setNewHttpCall', {response: 200, msg: `Project ${projects[project_index].name} was deleted!`})
                commit('deleteProject', {project_id: project_id, project_index: project_index});
            } catch(error) {
                console.log(error);
                commit('setNewHttpCall', {response: 500, msg: 'Error deleting project. Try Again or contact support.'})
            }

        },

        firebaseNewFileToApproval: async function ({ commit, getters }, payload) {
            commit('setFileUploadProgress', 0);
            let projects = getters.getProjects;
            let project_index = projects.findIndex( project => project.name === payload.project_name);
            let project_id = projects[project_index].id;
            try{
                let projectRef = firebase.storage().ref().child(project_id + "/" + payload.imageName);
                let uploadTask = projectRef.put(payload.image);

                // Listen for state changes, errors, and completion of the upload.
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                function(snapshot) {
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
                }, function(error) {
                    console.log(error);
                    commit('setNewHttpCall', {response: 500, msg: 'Error uploading file. Try again or contact support.'})
                }, function() {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...

                    let file_id = uploadTask.snapshot.metadata.generation;

                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
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
        
                        commit('setNewFileToProject', {project_index: project_index, fileData: fileData});
        
                        const eventData = {
                            title: `File ${payload.imageName} sent for aproval by ${current_user.displayName}`,
                            created_in: new Date().toISOString()
                        };
        
                        let project_events_ref = firebase.firestore().collection('project_events').doc(project_id);
                        let project_events_response =  project_events_ref.update('events', firebase.firestore.FieldValue.arrayUnion(eventData));
        
                        commit('setNewEventToProject', {project_index: project_index, eventData: eventData});
        
                        commit('setNewHttpCall', {response: 200, msg: 'File Uploaded correctly.'})
                    });

                });


            }catch(error) {
                console.log(error);
                commit('setNewHttpCall', {response: 500, msg: 'Error uploading file. Try again or contact support.'})
            }
        },

        firebaseInviteAssociateClientManager: function({commit}, payload) {
            fetch('https://us-central1-companysimplify-1992.cloudfunctions.net/inviteAssociateClient' +
                    '?mail_to=' + payload.mail_to +
                    '&project_name=' + payload.project_name +
                    '&main_link=' + payload.main_link , {
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
            .then(response => {
                if(response.status === 200) {
                    commit('setNewHttpCall', { response: "success", msg: "Email sent"})
                }
            })
            .catch( error => {
                commit('setNewHttpCall', { response: "error", msg: "Error sending email. Try again or contact support."})
            })
        },

        firebaseAddUserToProject: async function({commit, getters}, payload) {
            let projects = getters.getProjects;
            let project_index = projects.findIndex( project => project.id === payload.id);
            let project = projects[project_index];
            
            try {
                let user_type = paylaod.user_type;

                const projectReference = firebase.firestore().collection('projects').doc(project.id);
                let response = await projectReference.update();
                commit('setNewHttpCall', { response: "success", msg: "User added to project!"})
            } catch(error) {
                console.log(error);
                commit('setNewHttpCall', { response: "error", msg: "Error adding user to project. Try again or contact support."})
            }

        },

        firebaseAproveFile: function({commit, getters}, payload) {
            let projects = getters.getProjects;
            let project_index = projects.findIndex( project => project.name === project_name);
            if(project_index === -1) return;
            let project = state.projects[project_index];
            let file = project.files.find( file => file.fileId === file_id);
            
            try {
                const fileRef = firebase.firestore().collection('project_files').doc(project.id).collection("files").doc(file.id);
                // UPDATE ARRAY IN SPECIFIC INDEX
                console.log(fileRef);
                commit('setNewHttpCall', { response: "success", msg: `${file.fileName} was successfully aproved!`})
            } catch(error) {
                commit('setNewHttpCall', { response: "error", msg: `Error Aproving File ${file.fileName}. Try again or contact support.`})
            }
        },

        firebaseDisaproveFile: function({commit, getters}, payload) {
            let projects = getters.getProjects;
            let project_index = projects.findIndex( project => project.name === project_name);
            if(project_index === -1) return;
            let project = state.projects[project_index];
            let file = project.files.find( file => file.fileId === file_id);
            
            try {
                commit('setNewHttpCall', { response: "success", msg: `${file.fileName} was successfully disaproved!!`})
            } catch(error) {
                commit('setNewHttpCall', { response: "error", msg: `Error Disaproving File ${file.fileName}. Try again or contact support.`})
            }
        },

        firebaseNewCommentToFile: function({commit, getters}, payload) {
            
        },

        firebaseDeleteFileFromProject: function({commit, getter}, payload) {
            let project_name = payload.project_name;
            let file_index = payload.file_index;
            let file_id = payload.file_id;

            let projects = getters.getProjects;
            let project_index = projects.findIndex( project => project.name === project_name );
            let fileObj = projects[project_index].files[file_index];

            if(fileObj.fileId === file_id) {
                const filesRef = firebase.storage().ref(projects[project_index].id);
                //filesRef.delete();
            }

        }
    },

    getters: {
        getProjects: function(state) {
            return state.projects;
        },
        getFileUploadProgress: function(state) {
            return state.file_upload_progress;
        },
        getProjectEvents: function(state) {
            return function(payload) {
                let project_index = state.projects.findIndex( proj => proj.name === payload);
                return state.projects[project_index].events;    
            }
        },
        getProjectFiles: function(state) {
            return function(payload) {
                let project_index = state.projects.findIndex( proj => proj.name === payload);
                return state.projects[project_index].files;                
            }

        },
        getProjectFile: function(state) {
            return function({project_name, file_id}) {
                let project_index = state.projects.findIndex( project => project.name === project_name);
                console.log("index", project_index)
                if(project_index === -1) return;
                let project = state.projects[project_index];
                let file = project.files.find( file => file.fileId === file_id);
                return file;
            }
        }
    }
}