<template>
  <v-container fluid grid-list-lg>
	<v-dialog v-model="newTaskDialog" max-width="500">
	  <v-card>
		<h4 class="pa-3">New Task</h4>
		<v-form v-model="newTaskValid" class="px-3 pb-2">
            <v-text-field v-model="newTaskModel.title" :counter="75" 
                :rules="newTaskRules.titleRules" label="Title" required></v-text-field>

            <v-textarea v-model="newTaskModel.description" label="Description"
                      :counter="1000"  :rules="newTaskRules.descriptionRules" ></v-textarea>
            
            <v-menu
                ref="menu"
                v-model="datePickerMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="datePicker"
                lazy transition="scale-transition"
                offset-y full-width min-width="290px">
                    <v-text-field
                        slot="activator"
                        v-model="newTaskModel.dueDate"
                        label="Due Date"
                        append-icon="event"
                        readonly clearable></v-text-field>
                <v-date-picker v-model="newTaskModel.dueDate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="datePickerMenu = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.menu.save(datePicker)">OK</v-btn>
                </v-date-picker>
            </v-menu>

            <v-select v-model="newTaskModel.state" label="State"
                :rules="newTaskRules.stateRules"
                item-text="text" item-value="value"
                :items="newTaskFixedData.states"></v-select>

            <v-select v-model="newTaskModel.assignee" label="Assignee" clearable
                :items="newTaskFixedData.assignees">
                  <template slot="selection" slot-scope="data">
                        <v-flex xs2>
                            <v-avatar size="20">
                                <img :src="data.item.photo_url"/>
                            </v-avatar>
                        </v-flex>
                        <v-flex class='ml-1'>
                            {{ data.item.displayName }}
                        </v-flex>
                </template>
                <template slot="item" slot-scope="data" >
                    <v-list-tile-avatar>
                        <img :src="data.item.photo_url" />
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.displayName"></v-list-tile-title>
                    </v-list-tile-content>
                </template>
            </v-select>

            <v-select v-model="newTaskModel.priority" label="Priority" required
                :rules="newTaskRules.priorityRules"
                item-text="text" item-value="value"
                :items="newTaskFixedData.priorities"></v-select>


            <v-btn  @click="newTaskDialog = false">Cancel</v-btn>
            <v-btn class="page-main-button" :disabled="!newTaskValid"
                 @click="saveNewTask">Save New Task</v-btn>
		</v-form>
	  </v-card>
	</v-dialog>

    <v-dialog v-model="deleteTaskDialog" max-width="500">
        <v-card>
            <v-card-title>
                <h6 class="normal">Delete Task</h6>
            </v-card-title>
            <v-card-text>
                You are about to delete the task <b>{{ deleteTask.title }}</b>.
                Are you sure?
            </v-card-text>
            <v-card-actions>
                <v-btn flat @click="deleteTaskDialog = false;">Cancel</v-btn>
                <v-btn flat class="" @click="deleteTaskFromProject">Confirm Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="editTaskSideDialog" max-width="600px" 
            content-class="task-edit-dialog" grid-list-lg>
        <v-card class="task-edit-card">
            <v-card-title>
                <span class="headline">Task View</span>
            </v-card-title>
            <v-card-text>
                <v-text-field v-model="viewingTaskInfo.title"
                    label="Title"></v-text-field>

                                    <v-textarea v-model="viewingTaskInfo.description"
                    label="Description"></v-textarea>
            
            
                <v-menu ref="menu_edit_task" v-model="datePickerMenu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="datePicker2"
                    lazy transition="scale-transition"
                    offset-y full-width min-width="290px">
                        <v-text-field
                            slot="activator"
                            v-model="viewingTaskInfo.dueDate"
                            label="Due Date"
                            append-icon="event"
                            readonly clearable></v-text-field>
                    <v-date-picker v-model="viewingTaskInfo.dueDate" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="datePickerMenu2 = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.menu_edit_task.save(datePicker2)">OK</v-btn>
                    </v-date-picker>
                </v-menu>
            
            
                <v-select v-model="viewingTaskInfo.state" label="State"
                    :rules="newTaskRules.stateRules" dense
                    item-text="text" item-value="value"
                    :items="newTaskFixedData.states"></v-select>
            
            
                <v-select v-model="viewingTaskInfo.priority" label="Priority" required
                    :rules="newTaskRules.priorityRules" dense 
                    item-text="text" item-value="value"
                    :items="newTaskFixedData.priorities"></v-select>
            
            
                <v-select v-model="viewingTaskInfo.assignee" label="Assignee" clearable
                    dense :items="newTaskFixedData.assignees"
                    item-text="displayName" item-value="id">
                    <template slot="selection" slot-scope="data">
                            <v-flex xs2>
                                <v-avatar size="20">
                                    <img :src="data.item.photo_url"/>
                                </v-avatar>
                            </v-flex>
                            <v-flex class='ml-1'>
                                {{ data.item.displayName }}
                            </v-flex>
                    </template>
                    <template slot="item" slot-scope="data" >
                        <v-list-tile-avatar>
                            <img :src="data.item.photo_url" />
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title v-html="data.item.displayName"></v-list-tile-title>
                        </v-list-tile-content>
                    </template>
                </v-select>
            
            
                {{ viewingTaskInfo.timeSpent }}
            
            
                {{ viewingTaskInfo.created_in }}
            
            
                {{ viewingTaskInfo.created_by }}
            
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="editTaskSideDialog = false">Close</v-btn>
                <v-btn color="red" flat @click="confirmDelete">Delete Task</v-btn>
                <v-btn class="page-main-button" flat @click="updateViewingTask">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

	<v-layout>
	  <v-flex xs12>
		<header style="height: 50px; margin-bottom: 30px;">
		  <h3 class="left">{{ project_name }} Tasks</h3>
		  <v-btn flat class="page-main-button right"
			v-if="tasks.length < TASK_LIMIT"
			@click="newTaskDialog = true;">New Task
			<v-icon right>add_circle</v-icon>
		  </v-btn>
		  <div class="right">
			<p
			  v-bind:class="'task-counter ' + (tasks.length === TASK_LIMIT ? 'tasks-limit' : tasks.length > TASK_LIMIT-30 ? 'tasks-close-limit' : 'tasks-far-limit')">{{ tasks.length + "/" + TASK_LIMIT }}</p>
		  </div>
		</header>
	  </v-flex>
	</v-layout>

	<v-layout row>
	  <v-flex md3 justify-center class="droppable-area">
		<h4 class="text-xs-center">BackLog</h4>
		<v-divider style="margin-bottom: 10px;"></v-divider>
		<v-card v-bind:title="'Double click to open. Assignee: ' + getUserDisplayName(task.assignee)"  v-bind:id="'coiso-' + index"
		  class="taskCard" v-for="(task, index) in tasksBacklog"
		  v-bind:key="index" @dblclick="viewTaskDetails(1, index)">
		  <v-card-title>{{task.title}}</v-card-title>
		  <v-card-actions>
			<div>{{ new Date(task.dueDate).toDateString() }}</div>
			<div v-bind:class="'priority priority-' + task.priority">
				<v-icon flat>arrow_upward</v-icon>
			</div>
			<v-spacer></v-spacer>
			<div class="right">
                <v-responsive>
                    <v-avatar size="30">
                        <img v-bind:src="getUserPhoto(task.assignee)" alt="user_photo" >
                    </v-avatar>
                </v-responsive> 
            </div>
		  </v-card-actions>
		</v-card>
	  </v-flex>
	  <v-flex md3 justify-center class="droppable-area">
			<h4 class="text-xs-center">To Do Next</h4>
			<v-divider style="margin-bottom: 10px;"></v-divider>
			<v-card	title="double click me to open"	id="myid"
				class="taskCard" v-for="(task, index) in tasksToDoNext"
				v-bind:key="index" @dblclick="viewTaskDetails(2, index)">
			<v-card-title>{{task.title}}</v-card-title>
			<v-card-actions>
				<div>{{ new Date(task.dueDate).toDateString() }}</div>
				<div v-bind:class="'priority priority-' + task.priority">
					<v-icon flat>arrow_upward</v-icon>
				</div>
				<v-spacer></v-spacer>
				<div class="right">
                    <v-responsive>
                        <v-avatar size="30">
                            <img v-bind:src="getUserPhoto(task.assignee)" alt="user_photo" >
                        </v-avatar>
                    </v-responsive> 
                </div>
			</v-card-actions>
			</v-card>
	  </v-flex>
	  <v-flex md3 justify-center class="droppable-area">
			<h4 class="text-xs-center">In Progress</h4>
			<v-divider style="margin-bottom: 10px;"></v-divider>
			<v-card	title="double click me to open"	id="myid"
				class="taskCard" v-for="(task, index) in tasksInProgress"
				v-bind:key="index" @dblclick="viewTaskDetails(3, index)">
			<v-card-title>{{task.title}}</v-card-title>
			<v-card-actions>
				<div>{{ new Date(task.dueDate).toDateString() }}</div>
				<div v-bind:class="'priority priority-' + task.priority">
					<v-icon flat>arrow_upward</v-icon>
				</div>
				<v-spacer></v-spacer>
                <div class="right">
                    <v-responsive>
                        <v-avatar size="30">
                            <img v-bind:src="getUserPhoto(task.assignee)" alt="user_photo" >
                        </v-avatar>
                    </v-responsive> 
                </div>
                
			</v-card-actions>
			</v-card>
	  </v-flex>
	  <v-flex md3 justify-center class="droppable-area">
			<h4 class="text-xs-center">Done</h4>
			<v-divider style="margin-bottom: 10px;"></v-divider>
			<v-card	title="double click me to open"
				id="myid" class="taskCard bg-green-light"
				v-for="(task, index) in tasksDone"
				v-bind:key="index" @dblclick="viewTaskDetails(4, index)">
			<v-card-title>{{task.title}}</v-card-title>
			<v-card-actions>
                <div class="left">
                    <v-responsive>
                        <v-avatar size="30">
                            <img v-bind:src="getUserPhoto(task.assignee)" alt="user_photo" >
                        </v-avatar>
                    </v-responsive> 
                </div>
                <v-spacer></v-spacer>
                <div>{{ task.finished ? task.finished_in.split(" ").slice(0,3).join(" ") : "" }}</div>
			</v-card-actions>
			</v-card>
	  </v-flex>
	</v-layout>
  </v-container>
</template>

<script>

export default {
	data: function() {
		return {
            TASK_LIMIT: 75,
            datePicker: new Date().toISOString().substr(0, 10),
            datePickerMenu: false,
            datePicker2: new Date().toISOString().substr(0, 10),
            datePickerMenu2: false,
			editTaskSideDialog: false,
			newTaskDialog: false,
            newTaskValid: true,
            newTaskFixedData: {
                states: [
                        {text: 'Backlog', value: 1},
                        {text: 'To do next', value: 2},
                        {text: 'In progress', value: 3},
                        {text: 'Done', value: 4}
                    ],
                priorities: [
                        {text: 'Normal', value: 1},
                        {text: 'Medium', value: 2},
                        {text: 'High', value: 3},
                        {text: 'Major', value: 4},
                        {text: 'Show stopper', value: 5}
                    ],
                assignees: []
            },
			newTaskModel: {
				title: '',
                description: '',
                priority: { text: 'Normal', value: 1},
                dueDate: '',
                assignee: '',
                state: { text: 'Backlog', value: 1}
			},
			newTaskRules: {
				titleRules: [v => !!v || "Required"],
                descriptionRules: [v=> !!v || "Required"],
                stateRules: [ v => !!v || "Required"],
                priorityRules: [ v => !!v || "Required"]
			},
			viewTaskDialog: false,
			viewingTaskInfo: {},
            deleteTaskDialog: false,
            deleteTask: {},

			STATES: {
				BACKLOG: 1,
				TO_DO_NEXT: 2,
				IN_PROGRESS: 3,
				DONE: 4
			},
			PRIORITIES: {
				NORMAL: 1,
				MEDIUM: 2,
				HIGH: 3,
				MAJOR: 4,
				SHOW_STOPPER: 5
			}
		}
	},

	computed: {
		tasks: function() {
			return this.$store.getters.getTasks(this.project_id);
		},
		tasksBacklog: function() {
			return this.tasks
						.filter( task => {
							return task.state === this.STATES.BACKLOG;
						})
						.sort( (a, b) => {
							return b.priority - a.priority;
						});
	    },
		tasksToDoNext: function() {
			return this.tasks
						.filter( task => {
							return task.state === this.STATES.TO_DO_NEXT;
						})
						.sort( (a, b) => {
							return b.priority - a.priority;
						});
		},
		tasksInProgress: function() {
			return this.tasks
						.filter( task => {
							return task.state === this.STATES.IN_PROGRESS;
						})
						.sort( (a, b) => {
							return b.priority - a.priority;
						});
		},
		tasksDone: function() {
			return this.tasks
						.filter( task => {
							return task.state === this.STATES.DONE;
						})
						.sort( (a, b) => {
							return b.priority - a.priority;
						});
        },
        projectUsers: function() {
            return this.$store.getters.getUsersInProject(this.project_name);
        },
        userDB: function() {
            return this.$store.getters.getUserDB;
        }
	},

	created: function() {
        this.project_name = this.$route.params.project_name;
        this.project_id = this.$store.getters.getProjectIdByName(this.project_name);
        
        this.$store.dispatch('getTasksFromFirebase', {
            project_id: this.project_id
        });
	},

	mounted: function() {
		Object.freeze(this.STATES);
        Object.freeze(this.PRIORITIES);
        this.newTaskFixedData.assignees = this.projectUsers;
	},

	methods: {
        confirmDelete: function() {
            deleteTask.id = viewingTaskInfo.id;
            deleteTask.title = viewingTaskInfo.title,
            deleteTaskDialog = true;
        },
		resetValidation: function() {

		},
		validate: function() {

		},
		reset: function() {},
		getParentContainer: function(el) {
			return el.parentElement;
		},
		viewTaskDetails: function(container, index) {
			switch(container) {
				case this.STATES.BACKLOG:
					const backlogs = this.tasksBacklog;
					this.viewingTaskInfo = Object.assign({}, backlogs[index]);
					break;
				case this.STATES.TO_DO_NEXT:
					const to_do_next = this.tasksToDoNext;
					this.viewingTaskInfo = Object.assign({}, to_do_next[index]);
					break;
				case this.STATES.IN_PROGRESS:
					const in_progress = this.tasksInProgress;
					this.viewingTaskInfo = Object.assign({}, in_progress[index]);
					break;
				case this.STATES.DONE:
					const done = this.tasksDone;
					this.viewingTaskInfo = Object.assign({}, done[index]);
					break;
				default:
					break;
            }
            this.viewingTaskInfo.dueDate = new Date(this.viewingTaskInfo.dueDate).toISOString().split('T')[0];
            this.editTaskSideDialog = true;
        },
        getUserPhoto: function(userId) {
            return this.projectUsers.find( obj => {
                return obj.id === userId;
            }).photo_url;
        },
        getUserDisplayName: function(userId) {
            return this.projectUsers.find( obj => {
                return obj.id === userId;
            }).displayName;
        },
        saveNewTask: function() {
            let taskObj = Object.create(this.newTaskModel);

            taskObj.created_in = new Date().toISOString();
            taskObj.created_by = this.userDB.id;

            taskObj.assignee = taskObj.assignee.id;
            if(typeof taskObj.priority === "object")
                taskObj.priority = taskObj.priority.value;
            if(typeof taskObj.state === "object")
                taskObj.state = taskObj.state.value;

            if(taskObj.state === this.STATES.DONE)
                taskObj.finished_in = new Date().toISOString();
            
            let project_id = this.project_id;
            this.$store.dispatch('saveNewTaskToProject', {
                project_id: project_id,
                taskObj: taskObj
            });
            this.newTaskDialog = false;
            console.log(this.newTaskModel);
            this.resetNewTaskModel();
        },
        updateViewingTask: function() {
            console.log(this.viewingTaskInfo);
        },
        deleteTaskFromProject: function() {
            console.log(this.viewingTaskInfo);
        },
        resetNewTaskModel: function() {
            this.newTaskModel = {
                title: '',
                description: '',
                priority: { text: 'Normal', value: 1},
                dueDate: '',
                assignee: '',
                state: { text: 'Backlog', value: 1}
            };
        }
	}
}
</script>

<style >

    .v-dialog.task-edit-dialog {
        max-width: 600px;
        margin: 0;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        max-height: initial;
    }

    .task-edit-card {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 100%;
    }

    .taskCard {
        margin-bottom: 10px;
        cursor: pointer;
    }

    .task-counter {
        line-height: 50px;
        font-size: 1.5em;
        font-weight: 400;
    }

    .tasks-far-limit {
        color: green;
    }
    .tasks-close-limit {
        color: darkgoldenrod;
    }
    .tasks-limit {
        color: red;
    }

    .priority {
        height: 21px;
        border-radius: 50%;
        margin: 0 5px;
    }
    .priority.priority-1 .v-icon {
        display: none;
        color: lightgreen;
    }
    .priority.priority-2 .v-icon {
        color: lightgreen;
    }
    .priority.priority-3 .v-icon {
        color: yellow;
    }
    .priority.priority-4 .v-icon {
        color: darkorange;
    }
    .priority.priority-5 .v-icon {
        color: red;
    }

</style>
