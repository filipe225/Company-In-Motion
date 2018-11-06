const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fermentum sit amet dolor et mollis. Ut venenatis mauris eu semper efficitur. Cras sed tristique felis, nec semper est. Sed purus tortor, pharetra in lacus vel, lobortis pretium mi. Donec aliquet rutrum felis id accumsan. Donec gravida maximus tellus, id finibus magna interdum sed. Vestibulum tincidunt vulputate ligula, vel bibendum elit porttitor vitae. Mauris consequat odio non mollis pharetra. Suspendisse ut sapien finibus, ornare augue eget, efficitur ipsum. Sed vehicula finibus orci, at luctus mi faucibus et. Quisque ipsum nisi, hendrerit ac dignissim eget, aliquam vitae velit. Integer eget sem tempus, tempus nunc eget, sodales nulla. Phasellus sed consequat magna. Ut orci sapien, lobortis sit amet venenatis vitae, egestas non dui."

const colors = ['cyan', 'yellow', 'blue', 'red', 'green', 'indigo', 'purple'];

const task_status = ['backlog', 'development', 'in progress', 'done'];

export default {
    state: {
        notes: [
            {
                id: 1,
                content: lorem.slice(0, 40),
                date: "2018-11-05"
            },
            {
                id: 2,
                content: lorem.slice(40, 60),
                date: "2018-11-06"
            },
            {
                id: 3,
                content: lorem.slice(0, 90),
                date: "2018-11-12"
            },
            {
                id: 4,
                content: lorem.slice(50),
                date: "2018-11-30"
            }
        ]
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
        deleteNote: function(state, id) {
            state.notes.slice(id, 1);
        }
    },

    actions: {

    },

    getters: {
        orderedNotes: function(state, getters) {
            return getters.getNotes.sort( (a, b) => a.id - b.id);
        },
        getNotes: function(state) {
            return state.notes;
        },
        getNodeById: function(state) {
            return function(id) {
                return state.notes.find( val => val.id === id);
            }
        }
    }

} 