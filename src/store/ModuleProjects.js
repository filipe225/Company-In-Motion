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
        this.date = new Date().toISOString();
        this.admin = adminID;
        this.clients = [];
        this.associates = [];
        this.files = [];
    }

    getObject() {
        return {
            name: this.name,
            description: this.description,
            date: this.date,
            admin: this.admin,
            clients: this.clients,
            associates: this.associates,
            files: this.files
        }
    }
}

export default {
    state: {
        projects: []
    },

    mutations: {
        setProjects: function (state, payload) {
            state.projects = payload;
        },

        setNewProject: function (state, payload) {
            let newProject = new Project(payload.name, payload.description, payload.admin);
            state.projects.push(newProject);
        },

        setLoadedProject: function(state, payload) {
            state.projects.push(payload);
        },

        setNewFileToApproval: function (state, payload) {
            state.projects.push(payload);
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
        },

        firebaseAddNewProject: function ({ commit, getters }, payload) {
            const signed_user = getters.getUserDB;
            const proj_refs = firebase.firestore().collection('projects')
            let newProject = new Project(payload.name, payload.description, signed_user.id);
            proj_refs.add(newProject.getObject())
                    .then(response => {
                        console.log(response);
                        commit('setNewProject', {name: payload.name, description: payload.description, admin: signed_user.id});
                        commit('setNewHttpCall', {response: 200, msg: 'New project created!'})
                    })
                    .catch(error => {
                        console.log(error);
                        commit('setNewHttpCall', {response: 500, msg: 'Error creating new project. Try Again or contact support.'})
                    });


        },

        firebaseNewFileToApproval: function ({ commit, getters }, payload) {
            let projects = getters.getProjects;
            let project_index = projects.findIndex( project => project.name === payload.project_name);
            let project_id = projects[project_index].id;
            const reference = firebase.storage().ref(project_id)
            reference.put(payload.image)
                .then(fileData =>  {
                    console.log("firebaseNewFileToApproval", fileData)
                    let fileId = fileData.uid;
                    let aprovalData = {
                        fileId: fileId,
                        title: payload.title,
                        description: payload.description,
                        comments: []
                    }
                    let ref = firebase.firestore().collection('projects').doc(project_id);
                    ref.update('files', firebase.firestore.FieldValue.arrayUnion(aprovalData))
                        .then( response => {
                            commit('setNewHttpCall', {response: 200, msg: 'Success'})
                        })
                        .catch( error => {
                            console.log(error);
                            commit('setNewHttpCall', {response: 500, msg: 'Error'})
                        })
                })
                .catch(error => console.log(error));
        },

        firebaseInviteAssociateClient: function({commit}, payload) {
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
                commit('setNewHttpCall', { response: "error", msg: "Error sending email. Please try again."})
            })
        }
    },

    getters: {
        getProjects: function(state) {
            return state.projects;
        }
    }
}