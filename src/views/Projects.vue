<template>
    <v-container fluid>
        <!-- MODAL NEW PROJECT -->
        <v-dialog v-model="newProjectCreation" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">New Project Creation</span>
                </v-card-title>
                <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field label="Project Title*" required v-model="project_creation.title"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-textarea 
                                label="Project Description*" 
                                required
                                v-model="project_creation.description"></v-textarea>
                        </v-flex>
                    </v-layout>
                </v-container>
                <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="newProjectCreation = false">Close</v-btn>
                <v-btn color="teal darken-1" flat @click="createNewProject">Create</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-layout row wrap>
            <v-flex xs12 sm4 offset-sm3 v-if="projects.length === 0 && userDB.type === 'admin'">
                <p> NO PROJECTS CREATED. CREATE A NEW ONE</p>
                <v-btn @click="newProjectCreation = true">CREATE PROJECT</v-btn>
            </v-flex>
            <v-flex xs12 sm4 offset-sm3 v-else-if="projects.length === 0 && userDB.type === 'associate'">
                <p> NO PROJECTS JOINED. ASSOCIATE TO A NEW ONE</p>
                <v-btn @click="newProjectCreation = true">ASSOCIATE PROJECT</v-btn>
            </v-flex>
            <v-flex xs12 sm4 offset-sm3 v-if="projects.length === 0 && userDB.type === 'client'">
                <p> NO PROJECTS JOINED. BECOME THE CLIENT OF A NEW ONE</p>
                <v-btn @click="newProjectCreation = true">JOIN PROJECT</v-btn>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1 v-else v-for="(project, index) in projects" v-bind:key="index">
                <v-card  class="my-3">

                    <v-toolbar color="orange darken-1" dark>
                        <v-toolbar-title>{{ project.name }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <small>{{ project.date }}</small>
                    </v-toolbar>
                    <v-list>
                        <v-list-tile>
                            <v-list-tile-title>
                                Client: {{ project.client.name}}
                            </v-list-tile-title>
                        </v-list-tile>
                        <v-divider></v-divider>
                        <v-list-tile v-for="(associate, i) in project.associates" v-bind:key="i">
                            <v-list-tile-title>
                                Associate: {{ associate.name }}
                            </v-list-tile-title>
                        </v-list-tile>
                        <v-divider></v-divider>
                        <v-list-tile>
                            <v-list-tile-title>
                                Files to Approve: {{ project.filesAwatingApproval }}
                            </v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-title>
                                Files Approved: {{ project.filesApproved }}
                            </v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>

const events = ["Project [name] created", "Client [name] associated", "File [name] to approval", "File [name] approved", "Project [name] Concluded"]
const event = {
    name: '',
    date: new Date().toDateString("yyyy-MM-dd")
}

export default {
    data: function() {
        return {
            newProjectCreation: false,
            projects: [],
            project_creation: {
                title: '',
                description: '',
                clients: [],
                associates: []
            }
        }
    },
    
    computed: {
        userDB: function() {
            return this.$store.getters.getUserDB;
        }
    },

    created: function() {

    },

    methods: {
        createNewProject: function() {
            console.log("New Project");
        }
    }
}
</script>

<!--
[
    {
        name: 'Project #1',
        date: new Date().toDateString("yyyy-MM-dd"),
        client: {
            name: 'Client #1',
            profile: "/"
        },
        associates: [
            {
                name: 'Associate #1',
                profile: "/"
            },
            {
                name: 'Associate #2',
                profile: "/"
            },
            {
                name: 'Associate #3',
                profile: "/"
            }
        ],
        filesAwatingApproval: 2,
        filesApproved: 4
    },
    {
        name: 'Project #2',
        date: new Date().toDateString("yyyy-MM-dd"),
        client: {
            name: 'Client #2',
            profile: "/"
        },
        associates: [
            {
                name: 'Associate #1',
                profile: "/"
            },
            {
                name: 'Associate #2',
                profile: "/"
            },
            {
                name: 'Associate #3',
                profile: "/"
            }
        ],
        filesAwatingApproval: 3,
        filesApproved: 5
    },
    {
        name: 'Project #3',
        date: new Date().toDateString("yyyy-MM-dd"),
        client: {
            name: 'Client #3',
            profile: "/"
        },
        associates: [
            {
                name: 'Associate #1',
                profile: "/"
            },
            {
                name: 'Associate #2',
                profile: "/"
            },
            {
                name: 'Associate #3',
                profile: "/"
            }
        ],
        filesAwatingApproval: 1,
        filesApproved: 6
    }
]

-->

<style scoped>

</style>
