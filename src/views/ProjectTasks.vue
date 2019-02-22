<template>
  <v-container fluid grid-list-lg>
	<v-dialog v-model="newTaskDialog" max-width="500">
	  <v-card>
		<h4 class="pa-3">New Task</h4>
		<v-form v-model="newTaskValid" class="px-3 pb-2">
		  <v-text-field v-model="newTaskModel.name" :counter="75" :rules="newTaskRules.nameRules" label="Name" required></v-text-field>

		  <v-text-field v-model="newTaskModel.email" :rules="newTaskRules.emailRules" label="E-mail" required></v-text-field>

		  <v-btn :disabled="!newTaskValid" color="success" @click="validate">Validate</v-btn>

		  <v-btn color="error" @click="reset">Reset Form</v-btn>

		  <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>
		</v-form>
	  </v-card>
	</v-dialog>

	<v-layout>
	  <v-flex xs12>
		<header style="height: 50px; margin-bottom: 30px;">
		  <h3 class="left">{{ project_name }} Tasks</h3>
		  <v-btn flat class="page-main-button right"
			v-if="tasks.length < 50"
			@click="newTaskDialog = true;">New Task
			<v-icon right>add_circle</v-icon>
		  </v-btn>
		  <div class="right">
			<p
			  v-bind:class="'task-counter ' + (tasks.length === 50 ? 'tasks-limit' : tasks.length>30 ? 'tasks-close-limit' : 'tasks-far-limit')">{{ tasks.length }}/50</p>
		  </div>
		</header>
	  </v-flex>
	</v-layout>

	<v-layout row>
	  <v-flex md3 justify-center class="droppable-area">
		<h4 class="text-xs-center">BackLog</h4>
		<v-divider style="margin-bottom: 10px;"></v-divider>
		<v-card title="double click me to open" v-bind:id="'coiso-' + index"
		  class="taskCard" v-for="(task, index) in tasksBacklog"
		  v-bind:key="index" @dblclick="viewTaskDetails(1, index)">
		  <v-card-title>{{task.title}}</v-card-title>
		  <v-card-actions>
			<div>{{task.deadline.split(" ").slice(0,3).join(" ") }}</div>
			<div v-bind:class="'priority priority-' + task.priority">
				<v-icon flat>arrow_upward</v-icon>
			</div>
			<v-spacer></v-spacer>
			<div>{{task.created_in}}</div>
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
				<div>{{task.deadline.split(" ").slice(0,3).join(" ") }}</div>
				<div v-bind:class="'priority priority-' + task.priority">
					<v-icon flat>arrow_upward</v-icon>
				</div>
				<v-spacer></v-spacer>
				<div>{{task.created_in}}</div>
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
				<div>{{task.deadline.split(" ").slice(0,3).join(" ") }}</div>
				<div v-bind:class="'priority priority-' + task.priority">
					<v-icon flat>arrow_upward</v-icon>
				</div>
				<v-spacer></v-spacer>
				<div>{{task.created_in}}</div>
			</v-card-actions>
			</v-card>
	  </v-flex>
	  <v-flex md3 justify-center class="droppable-area">
			<h4 class="text-xs-center">Done</h4>
			<v-divider style="margin-bottom: 10px;"></v-divider>
			<v-card	title="double click me to open"
				id="myid" class="taskCard"
				v-for="(task, index) in tasksDone"
				v-bind:key="index" @dblclick="viewTaskDetails(4, index)">
			<v-card-title>{{task.title}}</v-card-title>
			<v-card-actions>
				<div>{{task.deadline.split(" ").slice(0,3).join(" ") }}</div>
				<div v-bind:class="'priority priority-' + task.priority">
					<v-icon flat>arrow_upward</v-icon>
				</div>
				<v-spacer></v-spacer>
				<div>{{task.created_in}}</div>
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
			newTaskDialog: false,
			newTaskValid: true,
			newTaskModel: {
				name: '',
				email: ''
			},
			newTaskRules: {
				nameRules: [v => !!v || "Required"],
				emailRules: [v=> !!v || "Required"]
			},
			viewTaskDialog: false,
			viewTask: null,

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
			return this.$store.getters.getTasks
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
		}
	},

	created: function() {
		this.project_name = this.$route.params.project_name;
		this.project_users = this.$store.getters.getProjectAllUsers(this.project_name);
		console.log(this.project_users);
	},

	mounted: function() {
		Object.freeze(this.STATES);
		Object.freeze(this.PRIORITIES);
	},

	methods: {
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
					this.viewTask = backlogs[index];
					break;
				case this.STATES.TO_DO_NEXT:
					const to_do_next = this.tasksToDoNext;
					this.viewTask = to_do_next[index];
					break;
				case this.STATES.IN_PROGRESS:
					const in_progress = this.tasksInProgress;
					this.viewTask = in_progress[index];
					break;
				case this.STATES.DONE:
					const done = this.tasksDone;
					this.viewTask = done[index];
					break;
				default:
					break;
			}
		}
	}
}
</script>

<style scoped>
.taskCard {
  	margin-bottom: 10px;
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
