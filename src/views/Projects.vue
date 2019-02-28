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
                    <v-card-actions style="justify-content: space-between">
                        <v-btn flat @click="dialogNewProjectManager=false; projectSelectedIndex = null">Close</v-btn>
                        <v-btn class="page-main-button" dark flat @click="inviteProjectManager">Send Invite</v-btn>
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
                    <v-card-actions style="justify-content: space-between">
                        <v-btn flat @click="dialogNewClient=false; projectSelectedIndex = null">Close</v-btn>
                        <v-btn class="page-main-button" dark flat @click="inviteClient">Send Invite</v-btn>
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
                    <v-card-actions style="justify-content: space-between">
                        <v-btn flat @click="dialogNewAssociate=false; projectSelectedIndex = null">Close</v-btn>
                        <v-btn class="page-main-button" dark flat @click="inviteAssociate">Send Invite</v-btn>
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
                            <v-btn flat type="reset" ref="reset_project_creation">Reset Form</v-btn>
                            <v-btn color="" flat @click.native="newProjectCreation = false">Close</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn class="page-main-button" flat @click="createNewProject" 
                            v-bind:disabled="!newProjectValid" style="">Create</v-btn>
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
                    <v-card-actions style="justify-content: space-between;">
                        <v-btn flat @click="dialogDeleteProject = false">Cancel</v-btn>
                        <v-btn color="page-main-button" flat @click="deleteProject">DELETE</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-layout row wrap>
                <v-flex xs12 v-if="userDB.type === 'admin'">
                    <v-layout row wrap>
                        <v-flex xs6>
                            <v-btn left>REFRESH PROJECTS</v-btn>
                        </v-flex>
                        <v-flex xs6>
                            <v-btn @click="newProjectCreation = true" class="page-main-button right">CREATE NEW PROJECT</v-btn>
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
            </v-layout>

            <v-layout row wrap align-start justify-space-around fill-height>  
                <v-flex xs12 sm5 md4 lg3 v-for="(project, index) in projects" 
                    v-bind:key="index" class="my-3 bg-green-light">
                    <v-card class="bg-transparent my-card">
                        <v-layout row wrap align-center="true" justify-center="true">
                            <v-flex xs12>
                                <h2 class="text-xs-center">{{ project.name }}</h2>
                            </v-flex>
                            <div class="corner-menu">
                                <v-menu bottom right>
                                    <v-btn slot="activator" light icon>
                                        <v-icon style="font-size: 2.2em;">more_vert</v-icon>
                                    </v-btn>

                                    <v-list>
                                        <v-list-tile v-if="userDB.type === 'admin' || userDB.type === 'project_manager'">
                                            <v-btn 
                                                @click="dialogNewProjectManager = true; projectSelectedIndex = index" flat>
                                                    <v-btn flat icon>
                                                        <v-icon>send</v-icon>
                                                    </v-btn>
                                                    Invite Project Manager</v-btn>
                                        </v-list-tile>
                                        <v-divider></v-divider>
                                        <v-list-tile v-if="userDB.type === 'admin' || userDB.type === 'project_manager'">
                                            <v-btn  
                                                @click="dialogNewClient = true; projectSelectedIndex = index" flat>
                                                    <v-btn flat icon>
                                                        <v-icon>send</v-icon>
                                                    </v-btn>
                                                    Invite Client</v-btn>
                                        </v-list-tile>
                                        <v-divider></v-divider>
                                        <v-list-tile v-if="userDB.type === 'admin' || userDB.type === 'project_manager'">
                                            <v-btn 
                                                @click="dialogNewAssociate = true; projectSelectedIndex = index" flat>
                                                    <v-btn flat icon>
                                                        <v-icon>send</v-icon>
                                                    </v-btn>
                                                    Invite Associate</v-btn>
                                        </v-list-tile>
                                        <v-divider></v-divider>
                                        <v-list-tile>
                                            <v-btn flat>
                                                <router-link tag="span" v-bind:to="'/projects/' + project.name + '/project_calendar'">
                                                    <v-btn flat icon>
                                                        <v-icon>calendar_today</v-icon>
                                                    </v-btn>
                                                    Calendar</router-link> 
                                            </v-btn>    
                                        </v-list-tile>
                                        <v-divider></v-divider>
                                        <v-list-tile v-if="userDB.type === 'admin' || userDB.type === 'project_manager' || userDB.type === 'client'">
                                            <v-btn flat>
                                                <router-link tag="span" v-bind:to="'/projects/' + project.name + '/send_file_to_approval'">
                                                    <v-btn flat icon>
                                                        <v-icon>file_copy</v-icon>
                                                    </v-btn>
                                                    Send File to Approval</router-link>
                                            </v-btn>
                                        </v-list-tile>
                                        <v-divider></v-divider>
                                        <v-list-tile v-if="userDB.type === 'admin' || userDB.type === 'project_manager' || userDB.type === 'client'">
                                            <v-btn flat>
                                                <router-link tag="span" v-bind:to="'/projects/' + project.name + '/file_approval'">
                                                    <v-btn flat icon>
                                                        <v-icon>file_copy</v-icon>
                                                    </v-btn>
                                                    Approve File</router-link> 
                                            </v-btn>    
                                        </v-list-tile>
                                        <v-divider></v-divider>
                                        <v-list-tile>
                                            <v-btn flat>
                                                <router-link tag="span" v-bind:to="'/projects/' + project.name + '/project_files'">
                                                    <v-btn flat icon>
                                                        <v-icon>file_copy</v-icon>
                                                    </v-btn>
                                                    Project Files</router-link> 
                                            </v-btn>
                                        </v-list-tile>
                                        <v-divider></v-divider>
                                        <v-list-tile v-if="userDB.type == 'admin' || userDB.type === 'associate' || userDB.type === 'project_manager'">
                                            <v-btn flat>
                                                <router-link tag="span" v-bind:to="'/projects/' + project.name + '/project_tasks'">
                                                    <v-btn flat icon>
                                                        <v-icon>schedule</v-icon>
                                                    </v-btn>
                                                    View Tasks</router-link> 
                                            </v-btn>    
                                        </v-list-tile>
                                        <v-divider></v-divider>
                                        <v-list-tile v-if="userDB.type === 'admin'">
                                            <v-btn flat @click="showDeleteProjectDialog(index)">
                                                <v-btn flat icon>
                                                    <v-icon>delete_forever</v-icon>
                                                </v-btn>
                                                Delete Project</v-btn>
                                        </v-list-tile>
                                    </v-list>
                                </v-menu>
                            </div>
                        </v-layout>
                                
                        <v-list class="bg-transparent">
                            <v-list-tile justify-center>
                                <!--<v-flex xs3 align-self-center="true">-->
                                <image-with-dashes></image-with-dashes>
                            </v-list-tile>
                        </v-list>

                        <v-list class="bg-transparent">
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ project.description }}</v-list-tile-title>
                                    <v-list-tile-sub-title><small>{{ new Date(project.created_in).toDateString('yyyy-MM-dd') }}</small></v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>

                        <!-- SPACE FOR ADMIN -->
                        <h6 class="text-xs-center" style="display: block;width: 100%;">Admin:</h6>
                        <v-list class="bg-transparent">
                            <template v-for="(a, index) in project.admin">
                                <v-list-tile avatar v-bind:key="index">
                                    <v-list-tile-avatar>
                                        <img v-bind:src="a.photo_url">
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                        <v-list-tile-title v-html="a.displayName"></v-list-tile-title>
                                        <v-list-tile-sub-title v-html="new Date(a.created_in).toDateString()"></v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-list-tile-action>
                                        <v-menu bottom right>
                                            <v-btn slot="activator" light icon>
                                                <v-icon style="font-size: 2.2em;">more_vert</v-icon>
                                            </v-btn>
                                            <v-list>
                                                <v-list-tile>
                                                    <v-btn flat :to="project.name + '/users_profile/' + a.id">
                                                        <v-btn flat icon>
                                                            <v-icon>account_circle</v-icon>
                                                        </v-btn>
                                                        View Profile</v-btn>
                                                </v-list-tile>
                                                <v-divider></v-divider>
                                                <v-list-tile v-if="userDB.type === 'admin' || userDB.type === 'project_manager'">
                                                    <v-btn flat>
                                                        <v-btn flat icon>
                                                            <v-icon>delete_forever</v-icon>
                                                        </v-btn>
                                                        Remove From Project</v-btn>
                                                </v-list-tile>
                                            </v-list>
                                        </v-menu>
                                    </v-list-tile-action>
                                </v-list-tile>
                            </template>
                        </v-list>

                        <!-- SPACE FOR CLIENTS -->
                        <h6 class="text-xs-center" style="display: block;width: 100%;">Clients:</h6>
                        <v-list v-if="project.clients.length == 0" class="bg-transparent">
                            <p class="text-xs-center"><em>No clients in this project...</em></p>
                        </v-list>
                        <v-list v-else class="bg-transparent">
                            <template v-for="(client, index) in project.clients">
                                <v-list-tile avatar v-bind:key="index">
                                    <v-list-tile-avatar>
                                        <img v-bind:src="client.photo_url">
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                        <v-list-tile-title v-html="client.displayName"></v-list-tile-title>
                                        <v-list-tile-sub-title v-html="new Date(client.created_in).toDateString()"></v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-list-tile-action>
                                        <v-menu bottom right>
                                            <v-btn slot="activator" light icon>
                                                <v-icon style="font-size: 2.2em;">more_vert</v-icon>
                                            </v-btn>
                                            <v-list>
                                                <v-list-tile>
                                                    <v-btn flat :to="project.name + '/users_profile/' + client.id">
                                                        <v-btn flat icon>
                                                            <v-icon>account_circle</v-icon>
                                                        </v-btn>
                                                        View Profile</v-btn>
                                                </v-list-tile>
                                                <v-divider></v-divider>
                                                <v-list-tile v-if="userDB.type === 'admin' || userDB.type === 'project_manager'">
                                                    <v-btn flat>
                                                        <v-btn flat icon>
                                                            <v-icon>delete_forever</v-icon>
                                                        </v-btn>
                                                        Remove From Project</v-btn>
                                                </v-list-tile>
                                            </v-list>
                                        </v-menu>
                                    </v-list-tile-action>
                                </v-list-tile>
                            </template>
                        </v-list>

                        <!-- SPACE FOR PROJECT MANAGERS -->
                        <h6 class="text-xs-center" style="display: block;width: 100%;">Project Managers:</h6>
                        <v-list v-if="project.project_managers.length == 0" class="bg-transparent">
                            <p class="text-xs-center"><em>No project managers in this project...</em></p>
                        </v-list>
                        <v-list v-else avatar class="bg-transparent">
                            <template v-for="(project_manager, index) in project.project_managers">
                                <v-list-tile avatar v-bind:key="index">
                                    <v-list-tile-avatar>
                                        <img v-bind:src="project_manager.photo_url">
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                        <v-list-tile-title v-html="project_manager.displayName"></v-list-tile-title>
                                        <v-list-tile-sub-title v-html="new Date(project_manager.created_in).toDateString()"></v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-list-tile-action>
                                        <v-menu bottom right>
                                            <v-btn slot="activator" light icon>
                                                <v-icon style="font-size: 2.2em;">more_vert</v-icon>
                                            </v-btn>
                                            <v-list>
                                                <v-list-tile>
                                                    <v-btn flat :to="project.name + '/users_profile/' + project_manager.id">
                                                        <v-btn flat icon>
                                                            <v-icon>account_circle</v-icon>
                                                        </v-btn>
                                                        View Profile</v-btn>
                                                </v-list-tile>
                                                <v-divider></v-divider>
                                                <v-list-tile v-if="userDB.type === 'admin' || userDB.type === 'project_manager'">
                                                    <v-btn flat>
                                                        <v-btn flat icon>
                                                            <v-icon>delete_forever</v-icon>
                                                        </v-btn>
                                                        Remove From Project</v-btn>
                                                </v-list-tile>
                                            </v-list>
                                        </v-menu>
                                    </v-list-tile-action>
                                </v-list-tile>
                            </template>
                        </v-list>

                        <!-- SPACE FOR ASSOCIATES -->
                        <h6 class="text-xs-center" style="display: block;width: 100%;">Associates:</h6>
                        <v-list v-if="project.associates.length == 0" class="bg-transparent">
                            <p class="text-xs-center"><em>No associates in this project...</em></p>
                        </v-list>
                        <v-list v-else avatar class="bg-transparent">
                            <template v-for="(associate, index) in projects.associates">
                                <v-list-tile avatar v-bind:key="index">
                                    <v-list-tile-avatar>
                                        <img v-bind:src="associate.photo_url">
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                        <v-list-tile-title v-html="associate.displayName"></v-list-tile-title>
                                        <v-list-tile-sub-title v-html="new Date(associate.created_in).toDateString()"></v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-list-tile-action>
                                        <v-menu bottom right>
                                            <v-btn slot="activator" light icon>
                                                <v-icon style="font-size: 2.2em;">more_vert</v-icon>
                                            </v-btn>
                                            <v-list>
                                                <v-list-tile>
                                                    <v-btn flat :to="project.name + '/users_profile/' + associate.id">
                                                        <v-btn flat icon>
                                                            <v-icon>account_circle</v-icon>
                                                        </v-btn>
                                                        View Profile</v-btn>
                                                </v-list-tile>
                                                <v-divider></v-divider>
                                                <v-list-tile v-if="userDB.type === 'admin' || userDB.type === 'project_manager'">
                                                    <v-btn flat>
                                                        <v-btn flat icon>
                                                            <v-icon>delete_forever</v-icon>
                                                        </v-btn>
                                                        Remove From Project</v-btn>
                                                </v-list-tile>
                                            </v-list>
                                        </v-menu>
                                    </v-list-tile-action>
                                </v-list-tile>
                            </template>
                        </v-list>
                    </v-card>
                </v-flex>
            </v-layout>

        </v-container>
    </v-layout>
<!--
ref="invite_associate"
v-bind:data-pid="project.id" 
-->
</template>

<script>
import { ImageWithDashes } from "@/components/ImageWithDashes.vue";
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
        console.log(this.projects);
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
            let project_index = this.projectSelectedIndex;
            console.log(project_index);
            if(project_index !== null) {
                let projectID = this.projects[project_index].id;
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
                this.projectSelectedIndex = null;
            }
        },
        inviteClient: function() {
            let project_index = this.projectSelectedIndex;
            console.log(project_index);
            if(project_index !== null) {
                let projectID = this.projects[project_index].id;
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
                this.projectSelectedIndex = null;      
            }
        },
        inviteProjectManager: function() {
            let project_index = this.projectSelectedIndex;
            console.log(project_index);
            if(project_index !== null) {
                let projectID = this.projects[project_index].id;
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
                this.projectSelectedIndex = null;      
            }
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

    .corner-menu {
        position: absolute;
        top: 0;
        right: 0;
    }
</style>
