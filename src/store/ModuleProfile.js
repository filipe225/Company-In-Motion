
export default {
    state: {
        data: {
            username: 'filipe',
            password: '1234',
            email: 'hadespower@gmail.com',
            created: '2018-06-23',
            lastLogin: new Date().toDateString("yyyy-MM-dd")
        }
    },

    mutations: {
        editUserData: function(state, newData) {
            let keys = Object.keys(newData);
            keys.forEach( key => {
                state.data[key] = newData[key];
            });
        }
    },

    actions: {

    },

    getters: {
        getUserData: function(state) {
            return {
                username: state.data.username,
                email: state.data.email
            }
        }
    }

} 