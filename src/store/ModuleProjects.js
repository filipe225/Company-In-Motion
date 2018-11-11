import * as firebase from 'firebase'

export default {
    state: {
        projects: []
    },

    mutations: {
        setNewFileToApproval: function(state, payload) {
            state.projects.push(payload);
        }
    },

    actions: {
        firebaseLoadProjects: function({commit, getters}, payload) {
            const signed_user = getters.getUser;
            const proj_refs = firebase.firestore().collection('projects')
            const projects = proj_refs.where('associates', 'array-contains', signed_user.uid);
            console.log(projects)
        },

        firebaseNewFileToApproval: function({commit}, payload) {
            const filename = payload.image.name;
            const reference = firebase.storage().ref('project1/');
            reference.put(payload.image)
                .then( fileData => console.log(fileData))
                .catch( error => console.log(error));
        }
    },

    getters: {

    }
}