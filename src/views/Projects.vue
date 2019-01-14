<template>
    <v-layout row wrap>
        <v-container fluid>

            <!-- MODAL INVITE PROJECT MANAGER -->
            <v-dialog v-model="dialogNewProjectManager" max-width="500px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Invite Project Manager</span>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field
                            v-model="newUserEmail"
                            label="Email"
                        ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn flat @click="dialogNewProjectManager=false; projectSelectedIndex = null">Close</v-btn>
                        <v-btn color="primary" flat @click="inviteProjectManager">Send Invite</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!-- MODAL INVITE CLIENT -->
            <v-dialog v-model="dialogNewClient" max-width="500px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Invite New Client</span>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field
                            v-model="newUserEmail"
                            label="Email"
                        ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn flat @click="dialogNewClient=false; projectSelectedIndex = null">Close</v-btn>
                        <v-btn color="primary" flat @click="inviteClient">Send Invite</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!-- MODAL INVITE ASSOCIATE -->
            <v-dialog v-model="dialogNewAssociate" max-width="500px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Invite New Associate</span>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field
                            v-model="newUserEmail"
                            label="Email"
                        ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn flat @click="dialogNewAssociate=false; projectSelectedIndex = null">Close</v-btn>
                        <v-btn color="primary" flat @click="inviteAssociate">Send Invite</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!-- MODAL NEW PROJECT -->
            <v-dialog v-model="newProjectCreation" persistent max-width="600px">
                <v-form v-model="newProjectValid">  
                    <v-card>
                        <v-card-title>
                            <span class="headline">New Project Creation</span>
                        </v-card-title>
                        <v-card-text>
                        <v-container grid-list-md>
                            
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field label="Project Name *" required 
                                        v-model="project_creation.name" 
                                        v-bind:rules="project_creation.nameRules"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-textarea 
                                        label="Project Description *" 
                                        required
                                        v-model="project_creation.description"
                                        v-bind:rules="project_creation.descriptionRules"></v-textarea>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <small>*indicates required field</small>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat type="reset" ref="reset_project_creation">Reset Form</v-btn>
                            <v-btn color="blue darken-1" flat @click.native="newProjectCreation = false">Close</v-btn>
                            <v-btn color="teal darken-1" flat @click="createNewProject" v-bind:disabled="!newProjectValid">Create</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-dialog>

            <!-- MODAL DELETE PROJECT -->
            <v-dialog v-model="dialogDeleteProject" max-width="500px">
                <v-card>
                    <v-card-title v-if="selectedIndex !== -1">
                        <span class="headline">DELETE PROJECT {{projects[selectedIndex].name}}</span>
                    </v-card-title>
                    <v-card-text>
                        ARE YOU SURE YOU WANT TO DELETE THIS PROJECT AND ALL ITS INFORMATION ?
                    </v-card-text>
                    <v-card-actions>
                        <v-btn flat @click="dialogDeleteProject = false">Cancel</v-btn>
                        <v-btn color="primary" flat @click="deleteProject" class="right">DELETE</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-layout row wrap class="mt-5">
                <v-flex xs12 v-if="userDB.type === 'admin'">
                    <v-layout row wrap>
                        <v-flex xs6>
                            <v-btn left>REFRESH PROJECTS</v-btn>
                        </v-flex>
                        <v-flex xs6>
                            <v-btn @click="newProjectCreation = true" class="right">CREATE NEW PROJECT</v-btn>
                        </v-flex>
                    </v-layout>                  
                </v-flex>
                <v-flex xs12 sm4 offset-sm1 v-else-if="projects.length === 0 && userDB.type === 'associate'">
                    <p> NO PROJECTS JOINED. ASSOCIATE TO A NEW ONE</p>
                    <v-btn @click="newProjectCreation = true">ASSOCIATE PROJECT</v-btn>
                </v-flex>
                <v-flex xs12 sm4 offset-sm1 v-if="projects.length === 0 && userDB.type === 'client'">
                    <p> NO PROJECTS JOINED. BECOME THE CLIENT OF A NEW ONE</p>
                    <v-btn @click="newProjectCreation = true">JOIN PROJECT</v-btn>
                </v-flex>
                <v-flex xs12 sm4 offset-sm1  v-for="(project, index) in projects" v-bind:key="index" style="margin-top: 10px; margin-bottom: 10px;">
                    <v-card class="orange darken-1" dark>
                        <v-card-title>
                            <span class="headline">{{ project.name}}</span>

                            <v-spacer></v-spacer>

                            <v-menu bottom right>
                                <v-btn slot="activator" dark icon>
                                    <v-icon>more_vert</v-icon>
                                </v-btn>

                                <v-list>
                                    <v-list-tile v-if="userDB.type === 'admin' || userDB.type === 'project_manager'">
                                        <v-btn 
                                            ref="invite_project_manager"
                                            v-bind:data-pid="project.id" 
                                            @click="dialogNewProjectManager = true; projectSelectedIndex = index" flat>
                                                Invite Project Manager</v-btn>
                                    </v-list-tile>
                                    <v-divider></v-divider>
                                    <v-list-tile v-if="userDB.type === 'admin' || userDB.type === 'project_manager'">
                                        <v-btn  
                                            ref="invite_client"
                                            v-bind:data-pid="project.id" 
                                            @click="dialogNewClient = true; projectSelectedIndex = index" flat>
                                                Invite Client</v-btn>
                                    </v-list-tile>
                                    <v-divider></v-divider>
                                    <v-list-tile v-if="userDB.type === 'admin' || userDB.type === 'project_manager'">
                                        <v-btn 
                                            ref="invite_associate"
                                            v-bind:data-pid="project.id" 
                                            @click="dialogNewAssociate = true; projectSelectedIndex = index" flat>
                                                Invite Associate</v-btn>
                                    </v-list-tile>
                                    <v-divider></v-divider>
                                    <v-list-tile v-if="userDB.type === 'admin' || userDB.type === 'project_manager' || userDB.type === 'client'">
                                        <v-btn flat>
                                            <router-link tag="span" v-bind:to="'/projects/' + project.name + '/send_file_to_approval'">
                                                Send File to Approval</router-link>
                                        </v-btn>
                                    </v-list-tile>
                                    <v-divider></v-divider>
                                    <v-list-tile v-if="userDB.type == 'admin' || userDB.type === 'associate' || userDB.type === 'project_manager'">
                                        <v-btn flat>
                                            <router-link tag="span" v-bind:to="'/projects/' + project.name + '/project_tasks'">
                                                View Tasks</router-link> 
                                        </v-btn>    
                                    </v-list-tile>
                                    <v-divider></v-divider>
                                    <v-list-tile v-if="userDB.type === 'admin' || userDB.type === 'project_manager' || userDB.type === 'client'">
                                        <v-btn flat>
                                            <router-link tag="span" v-bind:to="'/projects/' + project.name + '/file_approval'">
                                                Approve File</router-link> 
                                        </v-btn>    
                                    </v-list-tile>
                                    <v-divider></v-divider>
                                    <v-list-tile>
                                        <v-btn flat>
                                            <router-link tag="span" v-bind:to="'/projects/' + project.name + '/project_files'">
                                                Project Files</router-link> 
                                        </v-btn>
                                    </v-list-tile>
                                    <v-divider></v-divider>
                                    <v-list-tile v-if="userDB.type === 'admin'">
                                        <v-btn flat @click="showDeleteProjectDialog(index)">
                                            Delete Project</v-btn>
                                    </v-list-tile>
                                </v-list>
                            </v-menu>
                        </v-card-title>
                        <v-list>
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-sub-title>Description:</v-list-tile-sub-title>
                                    <v-list-tile-title>{{ project.description }}</v-list-tile-title>
                                    <v-list-tile-sub-title><small>{{ new Date(project.created_in).toDateString('yyyy-MM-dd') }}</small></v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                Clients:
                                <v-list-tile-title v-for="(client, index) in project.clients" v-bind:key="index">
                                    {{ project.client.name}}
                                </v-list-tile-title>
                            </v-list-tile>
                            <v-divider></v-divider>
                            <v-list-tile >
                                Project Managers:
                                <v-list-tile-title v-for="(project_manager, index) in project.project_managers" v-bind:key="index">
                                    {{ project_manager.name }}
                                </v-list-tile-title>
                            </v-list-tile>
                            <v-divider></v-divider>
                            <v-list-tile >
                                Associates:
                                <v-list-tile-title v-for="(associate, index) in project.associates" v-bind:key="index">
                                    {{ associate.name }}
                                </v-list-tile-title>
                            </v-list-tile>
                            <!-- CONTENT FOR LIST OF CLIENTS AND ASSOCIATES -->
                            <!-- 
                                <v-divider
                                v-else-if="item.divider"
                                :inset="item.inset"
                                :key="index"
                                ></v-divider>

                                <v-list-tile
                                v-else
                                :key="item.title"
                                avatar
                                @click=""
                                >
                                <v-list-tile-avatar>
                                    <img :src="item.avatar">
                                </v-list-tile-avatar>

                                <v-list-tile-content>
                                    <v-list-tile-title v-html="item.title"></v-list-tile-title>
                                    <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                                </v-list-tile-content>
                                </v-list-tile>
                            -->

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
            selectedIndex: -1,
            dialogDeleteProject: false,
            dialogNewClient: false,
            dialogNewAssociate: false,
            dialogNewProjectManager: false,
            newUserEmail: '',
            newProjectCreation: false,
            newProjectValid: false,
            projectSelectedIndex: null,
            project_creation: {
                name: '',
                nameRules : [
                    v => { 
                        let index = this.projects.findIndex( project => project.name === this.project_creation.name);
                        return index === -1 || "Name not available. Choose another."; 
                    }
                ],
                description: '',
                descriptionRules: [
                    v => !!v || "Description is required"
                ]
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

    mounted: function() {
        //console.log(this.projects);
        //console.log(this.userDB);
    },

    methods: {
        createNewProject: function() {
            let project =  {
                name: this.project_creation.name,
                description: this.project_creation.description
            }
            this.$store.dispatch('firebaseCreateNewProject', project);
            this.newProjectCreation = false;
            this.project_creation.name = '';
            this.project_creation.description = '';
        },
        checkNameAvailable: function() {
            let index = this.projects.findIndex( project => project.name === this.project_creation.name);
            return index === -1;
        },
        inviteAssociate: function() {
            console.log(this.$refs);
            let projectID = this.$refs.invite_associate[0].$el.dataset.pid;
            let project_index = this.projects.findIndex(project => project.id === projectID);
            let projectName = this.projects[project_index].name;

            let obj =  {
                inviter: this.userDB.id,
                mail_to: this.newUserEmail,
                project_name: projectName,
                main_link: "http://localhost:8080/projects/" + projectID + "/associate/invitation/" + this.userDB.id            
            };
            console.log(obj);
            this.$store.dispatch('firebaseInviteAssociateClientManager', obj);

            this.dialogNewAssociate = false;
            this.newUserEmail = "";
        },
        inviteClient: function() {
            let projectID = this.$refs.invite_client[0].$el.dataset.pid;
            let project_index = this.projects.findIndex(project => project.id === projectID);
            let projectName = this.projects[project_index].name;

            let obj =  {
                inviter: this.userDB.id,
                mail_to: this.newUserEmail,
                project_name: projectName,
                main_link: "http://localhost:8080/projects/" + projectID + "/client/invitation/" + this.userDB.id            
            };
            console.log(obj);
            this.$store.dispatch('firebaseInviteAssociateClientManager', obj);

            this.dialogNewClient = false;
            this.newUserEmail = "";
        },
        inviteProjectManager: function() {
            console.log(this.$refs);

            let projectID = this.$refs.invite_project_manager[0].$el.dataset.pid;
            let project_index = this.projects.findIndex(project => project.id === projectID);
            let projectName = this.projects[project_index].name;

            let obj =  {
                inviter: this.userDB.id,
                mail_to: this.newUserEmail,
                project_name: projectName,
                main_link: "http://localhost:8080/projects/" + projectID + "/project_manager/invitation/" + this.userDB.id            
            };
            this.$store.dispatch('firebaseInviteAssociateClientManager', obj);

            this.dialogNewProjectManager = false;
            this.newUserEmail = "";

        },
        deleteProject: function() {
            console.log("deleteProject");

            this.$store.dispatch('firebaseDeleteProject', {project_index: this.selectedIndex});
            this.selectedIndex = -1;

        },
        showDeleteProjectDialog: function(index) {
            this.dialogDeleteProject = true;
            this.selectedIndex = index;
        }
    }
}
</script>

<style scoped>
    .v-card__title {
        padding: 8px 10px;
    }
</style>
