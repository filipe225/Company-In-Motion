<template>
    <v-layout row wrap>
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
                                <v-text-field label="Project Name *" required v-model="project_creation.name"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-textarea 
                                    label="Project Description *" 
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
                <v-flex xs12 sm4 offset-sm1  v-for="(project, index) in projects" v-bind:key="index">
                    <v-card class="orange darken-1" dark>
                        <v-card-title>
                            <span class="headline">{{ project.name}}</span>

                            <v-spacer></v-spacer>

                            <v-menu bottom right>
                                <v-btn slot="activator" dark icon>
                                    <v-icon>more_vert</v-icon>
                                </v-btn>

                                <v-list>
                                    <v-list-tile v-if="userDB.type === 'admin'">
                                        <v-btn flat>Invite Client</v-btn>
                                    </v-list-tile>
                                    <v-divider></v-divider>
                                    <v-list-tile v-if="userDB.type === 'admin'">
                                        <v-btn flat>Invite Associate</v-btn>
                                    </v-list-tile>
                                    <v-divider></v-divider>
                                    <v-list-tile v-if="userDB.type === 'admin' || userDB.type === 'associate'">
                                        <v-btn flat>
                                            <router-link tag="span" v-bind:to="'/projects/' + project.name + '/file_approval'">
                                            File to Approval</router-link>
                                        </v-btn>
                                    </v-list-tile>
                                    <v-divider></v-divider>
                                    <v-list-tile v-if="userDB.type === 'admin' || userDB.type === 'associate'">
                                        <v-btn flat>View Tasks</v-btn>
                                    </v-list-tile>
                                    <v-divider></v-divider>
                                    <v-list-tile v-if="userDB.type === 'client'" >
                                        <router-link v-bind:to="'/projects/' + project.name + '/file_approval'">Approve File</router-link>
                                    </v-list-tile>
                                    <v-divider></v-divider>
                                    <v-list-tile>
                                        <v-btn flat>Project Files</v-btn>
                                    </v-list-tile>
                                    <v-list-tile v-if="userDB.type === 'admin'">
                                        <v-btn flat>Delete Project</v-btn>
                                    </v-list-tile>
                                </v-list>
                            </v-menu>
                        </v-card-title>
                        <v-list>
                            <v-list-tile>
                                {{ project.description }}
                            </v-list-tile>
                            <v-list-tile>
                                Clients:
                                <v-list-tile-title v-for="(client, index) in project.clients" v-bind:key="index">
                                    {{ project.client.name}}
                                </v-list-tile-title>
                            </v-list-tile>
                            <v-divider></v-divider>
                            <v-list-tile >
                                Associates:
                                <v-list-tile-title v-for="(associate, i) in project.associates" v-bind:key="i">
                                    {{ associate.name }}
                                </v-list-tile-title>
                            </v-list-tile>
                            <!--
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
                            -->
                        </v-list>
                    </v-card>
                </v-flex>
            </v-layout>

        </v-container>
    </v-layout>
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
            project_creation: {
                name: '',
                description: ''
            },
            items: [
                { title: 'Click Me' },
                { title: 'Click Me' },
                { title: 'Click Me' },
                { title: 'Click Me 2' }
            ]
        }
    },
    
    computed: {
        userDB: function() {
            return this.$store.getters.getUserDB;
        },
        projects: function() {
            return this.$store.getters.getProjects;
        }
    },

    created: function() {

    },

    methods: {
        createNewProject: function() {
            let project =  {
                name: this.project_creation.name,
                description: this.project_creation.description
            }
            this.$store.dispatch('firebaseAddNewProject', project);
        },
        showProjects: function() {
            console.log(this.projects);
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
