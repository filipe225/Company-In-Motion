<template>
    <v-layout row wrap>
        <v-container fluid>

            <v-dialog v-model="dialogNewUser" max-width="500px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Invite User</span>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field
                            v-model="newUserEmail"
                            label="Email"
                        ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn flat @click="dialogNewUser=false">Close</v-btn>
                        <v-btn color="primary" flat @click="inviteUser">Send Invite</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

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
                                        <v-btn  
                                            ref="invite_client"
                                            v-bind:data-projectName="project.name" 
                                            @click="dialogNewUser = true" flat>Invite Client</v-btn>
                                    </v-list-tile>
                                    <v-divider></v-divider>
                                    <v-list-tile v-if="userDB.type === 'admin'">
                                        <v-btn 
                                            ref="invite_associate"
                                            v-bind:data-projectName="project.name" 
                                            @click="dialogNewUser = true" flat>Invite Associate</v-btn>
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
                                        <v-btn flat>
                                            <router-link tag="span" v-bind:to="'/projects/' + project.name + '/project_tasks'">View Tasks</router-link> 
                                        </v-btn>    
                                    </v-list-tile>
                                    <v-divider></v-divider>
                                    <v-list-tile v-if="userDB.type === 'client'" >
                                        <v-btn flat>
                                            <router-link tag="span" v-bind:to="'/projects/' + project.name + '/file_approval'">Approve File</router-link> 
                                        </v-btn>    
                                    </v-list-tile>
                                    <v-divider></v-divider>
                                    <v-list-tile>
                                        <v-btn flat>
                                            <router-link tag="span" v-bind:to="'/projects/' + project.name + '/project_files'">Project Files</router-link> 
                                        </v-btn>    
                                    </v-list-tile>
                                    <v-divider></v-divider>
                                    <v-list-tile v-if="userDB.type === 'admin'">
                                        <v-btn flat>
                                            <router-link tag="span" @click="dialogDeleteProject = true">Delete Project</router-link></v-btn>
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
            dialogDeleteProject: false,
            dialogNewUser: false,
            newUserEmail: '',
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
        inviteAssociate: function() {
            console.log(this.$refs);
            let projectName = this.$refs.invite_associate[0].$el.dataset.projectname;
            let obj =  {
                mail_to: this.newUserEmail,
                project_name: projectName,
                main_link: "http://localhost:8080/" + projectName + "/invitation"             
            };
            console.log(obj);
            this.$store.dispatch('firebaseInviteAssociateClient', obj)
        },
        inviteClient: function() {

        },
        inviteUser: function() {
            console.log(this.newUserEmail);
        },
        showProjects: function() {
            console.log(this.projects);
        },
        deleteProject: function() {
            console.log("deleteProject");
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
