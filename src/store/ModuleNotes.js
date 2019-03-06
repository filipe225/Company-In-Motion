import * as firebase from 'firebase'

export default {
    state: {
        // NOTES ARE SAVED IN userDB
    },

    mutations: {
        addNote: function(state, note) {
            let new_index = state.notes[state.notes.length - 1].id + 1;
            let new_note = {
                id: new_index,
                content: note,
                date: new Date().toDateString("yyyy-MM-dd")
            }
            state.notes.push(new_note);
        },
        updateNote: function(state, note) {
            const index = state.userDB.notes.findIndex( n => n.id == note.id);
            if( index !== -1) {
                state.userDB.notes[index] = note;
            }
        },
        deleteNote: function(state, id) {
            const index = state.userDB.notes.findIndex( n => n.id == note.id);
            if( index !== -1) {
                state.userDB.notes.splice(index, 1);
            }
        }
    },

    actions: {
        firebaseLoadNotes: function({commit, getters}, payload) {
            const user = getters.getUser;
            const userdb = firebase.firestore().collection('users').where('id', '==', user.uid)
            userdb.get()    
                .then( data => {
                    console.log("user Notes");
                    console.log(data);
                })
                .catch( error => {
                    console.log(error);
                })
        },

        firebaseMutateNote: function({commit, getters}, payload) {
            const user = getters.getUser;
            const userRef = firebase.firestore().collection('users');

            switch(payload.action) {
                case 'add':
                    break;
                case 'update':
                    break;
                case 'delete':
                    break;
                default:
                    alert('erro firebaseMutateNote')
                    break;
            }
        }
    },

    getters: {
        orderedNotes: function(state, payload) {
            return state.userDB.notes.sort( (a, b) => a.id - b.id);
        },
        getNodeById: function(state) {
            return function(id) {
                return state.notes.find( val => val.id === id);
            }
        }
    }

} 