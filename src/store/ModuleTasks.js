const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fermentum sit amet dolor et mollis. Ut venenatis mauris eu semper efficitur. Cras sed tristique felis, nec semper est. Sed purus tortor, pharetra in lacus vel, lobortis pretium mi. Donec aliquet rutrum felis id accumsan. Donec gravida maximus tellus, id finibus magna interdum sed. Vestibulum tincidunt vulputate ligula, vel bibendum elit porttitor vitae. Mauris consequat odio non mollis pharetra. Suspendisse ut sapien finibus, ornare augue eget, efficitur ipsum. Sed vehicula finibus orci, at luctus mi faucibus et. Quisque ipsum nisi, hendrerit ac dignissim eget, aliquam vitae velit. Integer eget sem tempus, tempus nunc eget, sodales nulla. Phasellus sed consequat magna. Ut orci sapien, lobortis sit amet venenatis vitae, egestas non dui."

const colors = ['cyan', 'yellow', 'blue', 'red', 'green', 'indigo', 'purple'];

const task_status = ['backlog', 'development', 'in progress', 'done'];

const timelines = [
    {
        id: 1,
        event: lorem.slice(0,10),
        date: new Date().toDateString("yyyy-MM-dd"),
        color: Math.floor( (Math.random() * colors.length - 1) + 1 )
    },
    {
        id: 2,
        event: lorem.slice(10,20),
        date: new Date().toDateString("yyyy-MM-dd"),
        color: Math.floor( (Math.random() * colors.length - 1) + 1 )
    },
    {
        id: 3,
        event: lorem.slice(20,30),
        date: new Date().toDateString("yyyy-MM-dd"),
        color: Math.floor( (Math.random() * colors.length - 1) + 1 )
    },
    {
        id: 4,
        event: lorem.slice(0,10),
        date: new Date().toDateString("yyyy-MM-dd"),
        color: Math.floor( (Math.random() * colors.length - 1) + 1 )
    },
    {
        id: 5,
        event: lorem.slice(10,20),
        date: new Date().toDateString("yyyy-MM-dd"),
        color: Math.floor( (Math.random() * colors.length - 1) + 1 )
    },
    {
        id: 6,
        event: lorem.slice(20,30),
        date: new Date().toDateString("yyyy-MM-dd"),
        color: Math.floor( (Math.random() * colors.length - 1) + 1 )
    },
    {
        id: 7,
        event: lorem.slice(0,10),
        date: new Date().toDateString("yyyy-MM-dd"),
        color: Math.floor( (Math.random() * colors.length - 1) + 1 )
    }
]

export default {
    state: {
        tasks: [
            {
                id: 1,
                title: 'Tasks #1',
                content: lorem.slice(0, 20),
                date: new Date().toDateString("yyyy-MM-dd hh:mm"),
                deadline: null,
                creator: 'Filipe',
                assignee: 'Filipe',
                status: task_status.indexOf("backlog")
            },
            {
                id: 2,
                title: 'Tasks #2',
                content: lorem.slice(0, 20),
                date: new Date().toDateString("yyyy-MM-dd hh:mm"),
                deadline: null,
                creator: 'Filipe',
                assignee: 'Filipe',
                status: task_status.indexOf("backlog")
            },
            {
                id: 3,
                title: 'Tasks #3',
                content: lorem.slice(0, 20),
                date: new Date().toDateString("yyyy-MM-dd hh:mm"),
                deadline: null,
                creator: 'Filipe',
                assignee: 'Filipe',
                status: task_status.indexOf("in progress")
            },
            {
                id: 4,
                title: 'Tasks #4',
                content: lorem.slice(0, 20),
                date: new Date().toDateString("yyyy-MM-dd hh:mm"),
                deadline: null,
                creator: 'Filipe',
                assignee: 'Filipe',
                status: task_status.indexOf("development")
            },
            {
                id: 5,
                title: 'Tasks #5',
                content: lorem.slice(0, 20),
                date: new Date().toDateString("yyyy-MM-dd hh:mm"),
                deadline: null,
                creator: 'Filipe',
                assignee: 'Filipe',
                status: task_status.indexOf("done")
            },
            {
                id: 6,
                title: 'Tasks #1',
                content: lorem.slice(0, 20),
                date: new Date().toDateString("yyyy-MM-dd hh:mm"),
                deadline: null,
                creator: 'Filipe',
                assignee: 'Filipe',
                status: task_status.indexOf("backlog")
            },
            {
                id: 7,
                title: 'Tasks #2',
                content: lorem.slice(0, 20),
                date: new Date().toDateString("yyyy-MM-dd hh:mm"),
                deadline: null,
                creator: 'Filipe',
                assignee: 'Filipe',
                status: task_status.indexOf("backlog")
            },
            {
                id: 8,
                title: 'Tasks #3',
                content: lorem.slice(0, 20),
                date: new Date().toDateString("yyyy-MM-dd hh:mm"),
                deadline: null,
                creator: 'Filipe',
                assignee: 'Filipe',
                status: task_status.indexOf("in progress")
            },
            {
                id: 9,
                title: 'Tasks #4',
                content: lorem.slice(0, 20),
                date: new Date().toDateString("yyyy-MM-dd hh:mm"),
                deadline: null,
                creator: 'Filipe',
                assignee: 'Filipe',
                status: task_status.indexOf("development")
            },
            {
                id: 10,
                title: 'Tasks #5',
                content: lorem.slice(0, 20),
                date: new Date().toDateString("yyyy-MM-dd hh:mm"),
                deadline: null,
                creator: 'Filipe',
                assignee: 'Filipe',
                status: task_status.indexOf("done")
            },
            {
                id: 11,
                title: 'Tasks #1',
                content: lorem.slice(0, 20),
                date: new Date().toDateString("yyyy-MM-dd hh:mm"),
                deadline: null,
                creator: 'Filipe',
                assignee: 'Filipe',
                status: task_status.indexOf("backlog")
            },
            {
                id: 12,
                title: 'Tasks #2',
                content: lorem.slice(0, 20),
                date: new Date().toDateString("yyyy-MM-dd hh:mm"),
                deadline: null,
                creator: 'Filipe',
                assignee: 'Filipe',
                status: task_status.indexOf("backlog")
            },
            {
                id: 13,
                title: 'Tasks #3',
                content: lorem.slice(0, 20),
                date: new Date().toDateString("yyyy-MM-dd hh:mm"),
                deadline: null,
                creator: 'Filipe',
                assignee: 'Filipe',
                status: task_status.indexOf("in progress")
            },
            {
                id: 14,
                title: 'Tasks #4',
                content: lorem.slice(0, 20),
                date: new Date().toDateString("yyyy-MM-dd hh:mm"),
                deadline: null,
                creator: 'Filipe',
                assignee: 'Filipe',
                status: task_status.indexOf("development")
            },
            {
                id: 15,
                title: 'Tasks #5',
                content: lorem.slice(0, 20),
                date: new Date().toDateString("yyyy-MM-dd hh:mm"),
                deadline: null,
                creator: 'Filipe',
                assignee: 'Filipe',
                status: task_status.indexOf("done")
            }
        ]
    },

    mutations: {

    },

    actions: {

    },

    getters: {
        orderedTasks: function(state, getters) {

        },
        getTasks: function(state, getters) {
            return state.tasks;
        },
        getTasksById: function(state, getters) {
            return function(id) {
                return state.tasks.find( obj => obj.id === id);
            }
        }
    }

} 