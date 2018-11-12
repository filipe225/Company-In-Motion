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
    constructor(n, desc, adminID) {
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
        firebaseLoadProjects: function ({ commit, getters }, payload) {
            const signed_user = getters.getUser;
            const proj_refs = firebase.firestore().collection('projects')
            let projects = null;
            switch (signed_user.type) {
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
                    commit('setProjects', projects);
                    commit('setNewHttpCall', {response: 200, msg: 'Projects loaded'})
                })
                .catch(error => {
                    console.log(error);
                    commit('setNewHttpCall', {response: 500, msg: 'Error loading projects'})
                });


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

        firebaseNewFileToApproval: function ({ commit }, payload) {
            const filename = payload.image.name;
            //const project_id = payload.id
            const reference = firebase.firestore().collection('projects');
            reference.put(payload.image)
                .then(fileData => console.log(fileData))
                .catch(error => console.log(error));
        }
    },

    getters: {
        getProjects: function(state) {
            return state.projects;
        }
    }
}