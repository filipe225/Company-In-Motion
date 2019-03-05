import * as firebase from 'firebase'

export default {
    state: {
        tasks: [
            {
                id: 'ANI334JWDN1921',
                title: 'lorem lorem lorem ipsum',
                description: 'jbe ihqeoikdn as dhqpwo qndqpwdaskdm q dqhwidcbdbi poqjeqd',
                state: 2,
                priority: 4,
                created_in: new Date().toDateString(),
                deadline: new Date().toDateString(),
                created_by: 'JKSHD712B2UO3Y',
                assignee: '3SDFWg70hIh33nabFOUvXUdQB4P2',
                tags: '',
                watchers: []
            },
            {
                id: 'ANI334JWDN1921',
                title: 'lorem lorem lorem ipsum',
                description: 'jbe ihqeoikdn as dhqpwo qndqpwdaskdm q dqhwidcbdbi poqjeqd',
                state: 1,
                priority: 1,
                created_in: new Date().toDateString(),
                deadline: new Date().toDateString(),
                created_by: 'JKSHD712B2UO3Y',
                assignee: '3SDFWg70hIh33nabFOUvXUdQB4P2',
                watchers: []
            },
            {
                id: 'ANI334JWDN1921',
                title: 'lorem lorem lorem ipsum',
                description: 'jbe ihqeoikdn as dhqpwo qndqpwdaskdm q dqhwidcbdbi poqjeqd',
                state: 3,
                priority: 2,
                created_in: new Date().toDateString(),
                deadline: new Date().toDateString(),
                created_by: 'JKSHD712B2UO3Y',
                assignee: '3SDFWg70hIh33nabFOUvXUdQB4P2',
                watchers: []
            },
            {
                id: 'ANI334JWDN1921',
                title: 'lorem lorem lorem ipsum',
                description: 'jbe ihqeoikdn as dhqpwo qndqpwdaskdm q dqhwidcbdbi poqjeqd',
                state: 4,
                priority: 3,
                created_in: new Date().toDateString(),
                deadline: new Date().toDateString(),
                created_by: 'JKSHD712B2UO3Y',
                assignee: '3SDFWg70hIh33nabFOUvXUdQB4P2',
                watchers: []
            },
            {
                id: 'ANI334JWDN1921',
                title: 'lorem lorem lorem ipsum',
                description: 'jbe ihqeoikdn as dhqpwo qndqpwdaskdm q dqhwidcbdbi poqjeqd',
                state: 2,
                priority: 5,
                created_in: new Date().toDateString(),
                deadline: new Date().toDateString(),
                created_by: 'JKSHD712B2UO3Y',
                assignee: '3SDFWg70hIh33nabFOUvXUdQB4P2',
                watchers: []
            },
            {
                id: 'ANI334JWDN1921',
                title: 'lorem lorem lorem ipsum',
                description: 'jbe ihqeoikdn as dhqpwo qndqpwdaskdm q dqhwidcbdbi poqjeqd',
                state: 2,
                priority: 4,
                created_in: new Date().toDateString(),
                deadline: new Date().toDateString(),
                created_by: 'JKSHD712B2UO3Y',
                assignee: '3SDFWg70hIh33nabFOUvXUdQB4P2',
                tags: '',
                watchers: []
            },
            {
                id: 'ANI334JWDN1921',
                title: 'lorem lorem lorem ipsum',
                description: 'jbe ihqeoikdn as dhqpwo qndqpwdaskdm q dqhwidcbdbi poqjeqd',
                state: 1,
                priority: 1,
                created_in: new Date().toDateString(),
                deadline: new Date().toDateString(),
                created_by: 'JKSHD712B2UO3Y',
                assignee: '3SDFWg70hIh33nabFOUvXUdQB4P2',
                watchers: []
            },
            {
                id: 'ANI334JWDN1921',
                title: 'lorem lorem lorem ipsum',
                description: 'jbe ihqeoikdn as dhqpwo qndqpwdaskdm q dqhwidcbdbi poqjeqd',
                state: 3,
                priority: 2,
                created_in: new Date().toDateString(),
                deadline: new Date().toDateString(),
                created_by: 'JKSHD712B2UO3Y',
                assignee: '3SDFWg70hIh33nabFOUvXUdQB4P2',
                watchers: []
            },
            {
                id: 'ANI334JWDN1921',
                title: 'lorem lorem lorem ipsum',
                description: 'jbe ihqeoikdn as dhqpwo qndqpwdaskdm q dqhwidcbdbi poqjeqd',
                state: 4,
                priority: 3,
                created_in: new Date().toDateString(),
                deadline: new Date().toDateString(),
                created_by: 'JKSHD712B2UO3Y',
                assignee: '3SDFWg70hIh33nabFOUvXUdQB4P2',
                watchers: []
            },
            {
                id: 'ANI334JWDN1921',
                title: 'lorem lorem lorem ipsum',
                description: 'jbe ihqeoikdn as dhqpwo qndqpwdaskdm q dqhwidcbdbi poqjeqd',
                state: 2,
                priority: 5,
                created_in: new Date().toDateString(),
                deadline: new Date().toDateString(),
                created_by: 'JKSHD712B2UO3Y',
                assignee: '3SDFWg70hIh33nabFOUvXUdQB4P2',
                watchers: []
            },
            {
                id: 'ANI334JWDN1921',
                title: 'lorem lorem lorem ipsum',
                description: 'jbe ihqeoikdn as dhqpwo qndqpwdaskdm q dqhwidcbdbi poqjeqd',
                state: 2,
                priority: 4,
                created_in: new Date().toDateString(),
                deadline: new Date().toDateString(),
                created_by: 'JKSHD712B2UO3Y',
                assignee: '3SDFWg70hIh33nabFOUvXUdQB4P2',
                tags: '',
                watchers: []
            },
            {
                id: 'ANI334JWDN1921',
                title: 'lorem lorem lorem ipsum',
                description: 'jbe ihqeoikdn as dhqpwo qndqpwdaskdm q dqhwidcbdbi poqjeqd',
                state: 1,
                priority: 1,
                created_in: new Date().toDateString(),
                deadline: new Date().toDateString(),
                created_by: 'JKSHD712B2UO3Y',
                assignee: '3SDFWg70hIh33nabFOUvXUdQB4P2',
                watchers: []
            },
            {
                id: 'ANI334JWDN1921',
                title: 'lorem lorem lorem ipsum',
                description: 'jbe ihqeoikdn as dhqpwo qndqpwdaskdm q dqhwidcbdbi poqjeqd',
                state: 3,
                priority: 2,
                created_in: new Date().toDateString(),
                deadline: new Date().toDateString(),
                created_by: 'JKSHD712B2UO3Y',
                assignee: '3SDFWg70hIh33nabFOUvXUdQB4P2',
                watchers: []
            },
            {
                id: 'ANI334JWDN1921',
                title: 'lorem lorem lorem ipsum',
                description: 'jbe ihqeoikdn as dhqpwo qndqpwdaskdm q dqhwidcbdbi poqjeqd',
                state: 4,
                priority: 3,
                created_in: new Date().toDateString(),
                deadline: new Date().toDateString(),
                created_by: 'JKSHD712B2UO3Y',
                assignee: '3SDFWg70hIh33nabFOUvXUdQB4P2',
                watchers: []
            },
            {
                id: 'ANI334JWDN1921',
                title: 'lorem lorem lorem ipsum',
                description: 'jbe ihqeoikdn as dhqpwo qndqpwdaskdm q dqhwidcbdbi poqjeqd',
                state: 2,
                priority: 5,
                created_in: new Date().toDateString(),
                deadline: new Date().toDateString(),
                created_by: 'JKSHD712B2UO3Y',
                assignee: '3SDFWg70hIh33nabFOUvXUdQB4P2',
                watchers: []
            },
            {
                id: 'ANI334JWDN1921',
                title: 'lorem lorem lorem ipsum',
                description: 'jbe ihqeoikdn as dhqpwo qndqpwdaskdm q dqhwidcbdbi poqjeqd',
                state: 2,
                priority: 4,
                created_in: new Date().toDateString(),
                deadline: new Date().toDateString(),
                created_by: 'JKSHD712B2UO3Y',
                assignee: '3SDFWg70hIh33nabFOUvXUdQB4P2',
                tags: '',
                watchers: []
            },
            {
                id: 'ANI334JWDN1921',
                title: 'lorem lorem lorem ipsum',
                description: 'jbe ihqeoikdn as dhqpwo qndqpwdaskdm q dqhwidcbdbi poqjeqd',
                state: 1,
                priority: 1,
                created_in: new Date().toDateString(),
                deadline: new Date().toDateString(),
                created_by: 'JKSHD712B2UO3Y',
                assignee: '3SDFWg70hIh33nabFOUvXUdQB4P2',
                watchers: []
            },
            {
                id: 'ANI334JWDN1921',
                title: 'lorem lorem lorem ipsum',
                description: 'jbe ihqeoikdn as dhqpwo qndqpwdaskdm q dqhwidcbdbi poqjeqd',
                state: 3,
                priority: 2,
                created_in: new Date().toDateString(),
                deadline: new Date().toDateString(),
                created_by: 'JKSHD712B2UO3Y',
                assignee: '3SDFWg70hIh33nabFOUvXUdQB4P2',
                watchers: []
            },
            {
                id: 'ANI334JWDN1921',
                title: 'lorem lorem lorem ipsum',
                description: 'jbe ihqeoikdn as dhqpwo qndqpwdaskdm q dqhwidcbdbi poqjeqd',
                state: 4,
                priority: 3,
                created_in: new Date().toDateString(),
                deadline: new Date().toDateString(),
                created_by: 'JKSHD712B2UO3Y',
                assignee: '3SDFWg70hIh33nabFOUvXUdQB4P2',
                watchers: []
            },
            {
                id: 'ANI334JWDN1921',
                title: 'lorem lorem lorem ipsum',
                description: 'jbe ihqeoikdn as dhqpwo qndqpwdaskdm q dqhwidcbdbi poqjeqd',
                state: 2,
                priority: 5,
                created_in: new Date().toDateString(),
                deadline: new Date().toDateString(),
                created_by: 'JKSHD712B2UO3Y',
                assignee: '3SDFWg70hIh33nabFOUvXUdQB4P2',
                watchers: []
            },
            {
                id: 'ANI334JWDN1921',
                title: 'lorem lorem lorem ipsum',
                description: 'jbe ihqeoikdn as dhqpwo qndqpwdaskdm q dqhwidcbdbi poqjeqd',
                state: 2,
                priority: 4,
                created_in: new Date().toDateString(),
                deadline: new Date().toDateString(),
                created_by: 'JKSHD712B2UO3Y',
                assignee: '3SDFWg70hIh33nabFOUvXUdQB4P2',
                tags: '',
                watchers: []
            },
            {
                id: 'ANI334JWDN1921',
                title: 'lorem lorem lorem ipsum',
                description: 'jbe ihqeoikdn as dhqpwo qndqpwdaskdm q dqhwidcbdbi poqjeqd',
                state: 1,
                priority: 1,
                created_in: new Date().toDateString(),
                deadline: new Date().toDateString(),
                created_by: 'JKSHD712B2UO3Y',
                assignee: '3SDFWg70hIh33nabFOUvXUdQB4P2',
                watchers: []
            },
            {
                id: 'ANI334JWDN1921',
                title: 'lorem lorem lorem ipsum',
                description: 'jbe ihqeoikdn as dhqpwo qndqpwdaskdm q dqhwidcbdbi poqjeqd',
                state: 3,
                priority: 2,
                created_in: new Date().toDateString(),
                deadline: new Date().toDateString(),
                created_by: 'JKSHD712B2UO3Y',
                assignee: '3SDFWg70hIh33nabFOUvXUdQB4P2',
                watchers: []
            },
            {
                id: 'ANI334JWDN1921',
                title: 'lorem lorem lorem ipsum',
                description: 'jbe ihqeoikdn as dhqpwo qndqpwdaskdm q dqhwidcbdbi poqjeqd',
                state: 4,
                priority: 3,
                created_in: new Date().toDateString(),
                deadline: new Date().toDateString(),
                created_by: 'JKSHD712B2UO3Y',
                assignee: '3SDFWg70hIh33nabFOUvXUdQB4P2',
                watchers: []
            },
            {
                id: 'ANI334JWDN1921',
                title: 'lorem lorem lorem ipsum',
                description: 'jbe ihqeoikdn as dhqpwo qndqpwdaskdm q dqhwidcbdbi poqjeqd',
                state: 2,
                priority: 5,
                created_in: new Date().toDateString(),
                deadline: new Date().toDateString(),
                created_by: 'JKSHD712B2UO3Y',
                assignee: '3SDFWg70hIh33nabFOUvXUdQB4P2',
                watchers: []
            }
        ]
    },

    mutations: {

    },

    actions: {
        saveNewTaskToProject: async function({commit}, payload) {
            console.log(payload);

            let project_id = payload.project_id;
            let taskObj = payload.taskObj;

            try {            
                let taskRef = firebase.firestore().collection('projects_tasks')
                                            .doc(project_id).collection('tasks');
                let taskResp = await taskRef.add({taskObj});
                let task_id = taskResp.uid;
                taskObj.id = task_id;
                commit('addNewTaskToProejct', {
                    project_id: project_id,
                    task: taskObj
                });
                commit('setNewHttpCall', { response: 200, msg: `New Task successfully added!!` })
            } catch (error) {
                console.log(error);
                commit('setNewHttpCall', { response: 500, msg: `Error inserting new task. Try again or contact support.` })
            }

        },
        // NOT IN USE
        updateTaskToProject: async function({commit}, payload) {
            let project_id = payload.project_id;
            let task_id = payload.task_id;
            let taskObj = payload.taskObj;

            try {
                let taskRef = firebase.firestore().collection('projects_tasks')
                                            .doc(project_id)
                                            .collection('tasks')
                                            .doc(task_id);
                let taskResp = await taskRef.update(taskObj);

                commit('updateTaskToProject', {
                    project_id: project_id,
                    task_id: task_id,
                    task: taskObj
                });

                commit('setNewHttpCall', { response: 200, msg: `${file.fileName} was successfully rejected!!` })
            } catch (error) {
                commit('setNewHttpCall', { response: 500, msg: `Error rejecting file ${file.fileName}. Try again or contact support.` })
            }
        }
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