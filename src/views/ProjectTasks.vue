<template>
    <v-container fluid grid-list-lg>

        <v-dialog v-model="newTaskDialog">
            <h4>New Task</h4>
            <v-form>

            </v-form>
        </v-dialog>

        <v-layout>
            <v-flex xs12>
                <header style="height: 50px; margin-bottom: 30px;">
                    <h3 class="left">{{ project_name }} Tasks</h3>
                    <v-btn flat class="page-main-button right" v-if="tasks.length < 50">
                        New Task <v-icon right>add_circle</v-icon>
                        </v-btn>
                    <div class="right">
                        <p v-bind:class="'task-counter ' + (tasks.length === 50 ? 'tasks-limit' : tasks.length>30 ? 'tasks-close-limit' : 'tasks-far-limit')">
                            {{ tasks.length }}/50</p>
                    </div>
                </header>
            </v-flex>
        </v-layout>

        <v-layout row>
            <v-flex md3 justify-center v-on:drop="ondrop">
                <h4 class="text-xs-center">BackLog</h4>
                <v-divider style="margin-bottom: 10px;"></v-divider>
                <v-card title="double click me to open" draggable="true"
                    v-on:dragstart="drag" id="myid"
                    v-for="(task, index) in tasks" v-bind:key="index">
                    <v-card-title>{{task.title}}</v-card-title>
                    <v-card-actions>
                        <div>{{task.deadline.split(" ").slice(0,3).join(" ") }}</div>
                        <div v-bind:class="'priority priority-' + task.priority"></div>
                        <v-spacer></v-spacer>
                        <div>{{task.created_in}}</div>
                    </v-card-actions>
                </v-card>
            </v-flex>
            <v-flex md3 justify-center v-on:drop="ondrop" v-on:dragover="mydragover">
                <h4 class="text-xs-center">To Do Next</h4>
                <v-divider style="margin-bottom: 10px;"></v-divider>
            </v-flex>
            <v-flex md3 justify-center v-on:drop="ondrop">
                <h4 class="text-xs-center">In Progress</h4>
                <v-divider style="margin-bottom: 10px;"></v-divider>
            </v-flex>
            <v-flex md3 justify-center v-on:drop="ondrop">
                <h4 class="text-xs-center">Done</h4>
                <v-divider style="margin-bottom: 10px;"></v-divider>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

var taskExample = {
    id: 'ANI334JWDN1921',
    title: 'lorem lorem lorem ipsum',
    description: 'jbe ihqeoikdn as dhqpwo qndqpwdaskdm q dqhwidcbdbi poqjeqd',
    state: 2,
    priority: 4,
    created_in: new Date().toDateString(),
    deadline: new Date().toDateString(),
    created_by: 'JKSHD712B2UO3Y',
    assignee: 'OHI23IH1231',
    tags: '',
    watchers: []
}

export default {
    data: function() {
        return {
            newTaskDialog: false,
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
            let all_tasks = [];
            for(let i=0; i<38; i++) {
                let newTask = JSON.parse(JSON.stringify(taskExample));
                all_tasks.push(taskExample)
            }
            return all_tasks;
        }
    },

    created: function() {
        this.project_name = this.$route.params.project_name;
    },

    mounted: function() {
        Object.freeze(this.STATES);
    },

    methods: {
        drag: function(ev) {
            ev.dataTransfer.setData("text", ev.target.id);
        },
        mydragover: function(e) {
            e.preventDefault();
            console.log(e);
        },
        mydragstart: function(e) {
            console.log("drag start");
        },
        ondrop: function(e) {
            e.preventDefault();
            console.log("On Drop");
        }
    }
}
</script>

<style scoped>
    .task-counter {
        line-height: 50px;
        font-size: 1.5em;
        font-weight: 400;
    }

    .tasks-far-limit { color: green; }
    .tasks-close-limit { color: darkgoldenrod; }
    .tasks-limit { color: red; }

    .priority { 
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin: 0 5px;
    }
    .priority.priority-1 { background-color: lightgreen; }
    .priority.priority-2 { background-color: green; }
    .priority.priority-3 { background-color: darkgoldenrod; }
    .priority.priority-4 { background-color: darkorange; }
    .priority.priority-5 { background-color: red; }
    
</style>
