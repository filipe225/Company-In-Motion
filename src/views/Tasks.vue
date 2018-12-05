<template>
    <v-container fluid grid-list-md>
        <v-layout row wrap>
            <v-flex d-flex xs12 sm5 md4>
                <Notes v-bind:userNotes:="userDBNotes"></Notes>
            </v-flex>
            <v-flex d-flex xs12 sm7 md8>
                <Tasks></Tasks>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Notes from '@/components/Notes.vue';
import Tasks from '@/components/Tasks.vue';

export default {

    components: {
        Notes,
        Tasks
    },
    
    data: function() {
        return {

        }
    },
    
    computed: {
        userDB: function() {
            return this.$store.getters.getUserDB;
        },
        userDBNotes: function() {
            return this.userDB.notes;
        },
        projects: function() {
            this.$store.getters.getProjects;
        },
        getUserAssignedTasks: function() {
            let tasks = this.projects.reduce( (tasksArray, project) => {
                let project_tasks = project.tasks;
                tasksArray.push(project_tasks);
                return tasksArray;
            }, []);

            let filteredTasks = tasks.filter(project_tasks => {
                return project_tasks.filter( task => task.assignee === this.userDB.id);
            });

            console.log(filteredTasks);
        }
    }

}
</script>
