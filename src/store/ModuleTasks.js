import * as firebase from 'firebase'

export default {
    state: {
        tasks: []
    },

    mutations: {
        setTasksArray: function(state, payload) {
            state.tasks = payload;
        },
        addNewTask: function(state, payload) {
            state.tasks.push(payload);
            console.log(state.tasks);
        },
        resetTasks: function(state) {
            state.tasks = [];
        }
    },

    actions: {
        getTasksFromFirebase: async function({commit, getters}, payload) {
            const project_id = getters.getProjectIdByName(payload.project_name);

            let taskRef = firebase.firestore()
                                    .collection('project_tasks')
                                    .doc(project_id)
                                    .collection('tasks');
            let taskResp = await taskRef.get();
            console.log(taskResp);
            let documents = taskResp.docs;
            documents.forEach( doc => {
                let taskData = doc.data();
                commit('addNewTask', taskData);
            });
        },
        saveNewTaskToProject: async function({commit}, payload) {
            let project_id = payload.project_id;
            let taskObj = {
                title: payload.taskObj.title,
                description: payload.taskObj.description,
                priority: payload.taskObj.priority,
                state: payload.taskObj.state,
                assignee: payload.taskObj.assignee,
                dueDate: new Date(payload.taskObj.dueDate).toISOString()
            }
            console.log(taskObj);

            try {            
                let taskRef = firebase.firestore().collection('project_tasks')
                                            .doc(project_id).collection('tasks');
                let taskResp = await taskRef.add(taskObj);
                let task_id = taskResp.uid;
                taskObj.id = task_id;
                console.log(taskResp);
/*                 commit('addNewTaskToProject', {
                    project_id: project_id,
                    task: taskObj
                }); */
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
            let taskObj = {
                title: payload.taskObj.title,
                description: payload.taskObj.description,
                priority: payload.taskObj.priority.value,
                state: payload.taskObj.state.value,
                assignee: payload.taskObj.assignee,
                dueDate: new Date(payload.taskObj.dueDate).toISOString(),
                timeSpent: payload.taskObj.timeSpent
            }

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