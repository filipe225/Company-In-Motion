<template>

    <v-card>
        <v-toolbar color="orange darken-1" dark>
            <v-toolbar-title>Notes</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="showNewTaskForm">
                <v-icon>add_circle</v-icon>
            </v-btn>
        </v-toolbar>
        <v-layout row v-if="newTask">
            <v-flex d-flex xs12>
                <v-textarea outline
                    name="inputNewNote" 
                    hint="note content" 
                    v-model="newTaskContent">
                </v-textarea>                
            </v-flex>
            <v-flex d-flex xs12>
                <v-btn icon @click="addNewTask">
                    <v-icon>check_circle</v-icon>
                </v-btn>                
            </v-flex>
            
            <v-divider></v-divider>
        </v-layout>

        <v-list two-line>
          <template v-for="(item, index) in items">
            <v-list-tile :key="item.title" avatar ripple>

                <v-list-tile-content>
                    <v-list-tile-sub-title>
                        {{ item.content }}
                    </v-list-tile-sub-title>
                    <v-list-tile-action-text v-text="item.content"></v-list-tile-action-text>
                </v-list-tile-content>

                <v-list-tile-action>
                    <v-list-tile-action-text>{{ item.date }}</v-list-tile-action-text>
                </v-list-tile-action>

            </v-list-tile>

            <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
          </template>
        </v-list>
    </v-card>

</template>

<script>
export default {
    data () {
        return {
            newTask: true,
            newTaskContent: ""
        }
    },

    computed: {
        items () {
            return this.$store.getters.getNotes
        }
    },

    created: function() {

    },

    methods: {
        addNewTask: function() {
            console.log(this.newTaskContent);
        },
        showNewTaskForm: function() {
            this.newTask = !this.newTask;
        }
    }
}

</script>