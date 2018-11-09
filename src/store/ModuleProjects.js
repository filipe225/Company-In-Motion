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