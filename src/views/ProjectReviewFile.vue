<template>
    <v-container fluid grid-list-md>

        <!-- MODAL APPROVE FILE -->
        <v-dialog v-model="dialogApproveFile" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">APPROVE FILE {{ viewingProjectFile.name }}</span>
                </v-card-title>
                <v-card-text>
                    YOU CAN NOT REVERT THIS DECISION! <br/>
                    ARE YOU SURE YOU WANT TO <span class="color-approve">APPROVE</span> THIS FILE ?
                </v-card-text>
                <v-card-actions style="justify-content: space-between;">
                    <v-btn flat @click="dialogApproveFile = false">Cancel</v-btn>
                    <v-btn color="page-main-button" flat @click="approveFile">DELETE</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- MODAL REJECT FILE -->
        <v-dialog v-model="dialogRejectFile" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">REJECT FILE {{ viewingProjectFile.name }}</span>
                </v-card-title>
                <v-card-text>
                    YOU CAN NOT REVERT THIS DECISION! <br/>
                    ARE YOU SURE YOU WANT TO <span class="color-reject">REJECT</span> THIS FILE ?
                </v-card-text>
                <v-card-actions style="justify-content: space-between;">
                    <v-btn flat @click="dialogRejectFile = false">Cancel</v-btn>
                    <v-btn color="page-main-button" flat @click="rejectFile">DELETE</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-layout row wrap>
            <v-flex xs12 sm8>
                <v-card>
                    <v-list class="no-background elevation-12">

                        <v-list-tile>
                            <v-list-tile-title>{{ this.project_name }}</v-list-tile-title>
                        </v-list-tile>

                        <v-list-tile>
                            <v-list-tile-sub-title>
                                <label v-bind:class="viewingProjectFile.state">{{ viewingProjectFile.state.toUpperCase() }}</label>
                            </v-list-tile-sub-title>                        
                        </v-list-tile>

                        <v-list-tile-action>                    
                            <v-btn icon title="Download file" ><v-icon large>cloud_download</v-icon></v-btn>
                            <v-btn icon title="Delete file from Project" ><v-icon large>delete_forever</v-icon></v-btn>
                            <v-btn icon title="Send Email for file revisition" v-if="viewingProjectFile.state === 'pending'"><v-icon large>email</v-icon></v-btn>
                        </v-list-tile-action>

                        <v-list-tile-action>
                            <v-btn flat @click="$router.back()">Cancel</v-btn>
                            <v-btn v-if="((viewingProjectFile.uploaderUserType === 'admin' ||
                                        viewingProjectFile.uploaderUserType === 'project_manager') &&
                                        userDB.type === 'client')  ||
                                        (viewingProjectFile.uploaderUserType === 'client' &&
                                        (userDB.type === 'project_manager' ||
                                        userDB.type === 'admin'))" 
                                @click="dialogApproveFile = true">APPROVE</v-btn>
                            <v-btn v-if="((viewingProjectFile.uploaderUserType === 'admin' ||
                                        viewingProjectFile.uploaderUserType === 'project_manager') &&
                                        userDB.type === 'client')  ||
                                        (viewingProjectFile.uploaderUserType === 'client' &&
                                        (userDB.type === 'project_manager' ||
                                        userDB.type === 'admin'))" 
                                @click="dialogRejectFile = true;">Reject</v-btn>
                        </v-list-tile-action>

                    </v-list>                    
                </v-card>

                <v-layout row wrap>
                    <v-flex xs10 offset-xs1>
                        <v-textarea v-model="newComment" placeholder="New Comment"></v-textarea>
                    </v-flex>
                    <v-flex xs10 offset-xs1 v-for="(comment, index) in testcomments" v-bind:key="index">
                        <v-list class="no-background">
                            <v-list-tile avatar>
                                <v-list-tile-avatar>
                                    <img :src="comment.user.avatar">
                                </v-list-tile-avatar>
                                <v-list-tile-title>
                                    {{ comment.user.display_name }}
                                </v-list-tile-title>

                                <v-list-tile-action>
                                    <label for="">{{ comment.created_in }}</label>
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title v-html="comment.content"></v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                        <v-divider></v-divider>

                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex sm4 hidden-xs-only fixed>
                <v-list class="bg-transparent">
                    <v-list-tile-title class="text-xs-center mt-2">
                        <h4 class="normal">{{ uploaderInfo.displayName }}</h4>
                    </v-list-tile-title>
                    <v-list-tile justify-center class="my-4">
                        <image-with-dashes></image-with-dashes>
                    </v-list-tile>
                    <v-list-tile-title class="text-xs-center">
                        <h6 class="normal">{{ new Date(viewingProjectFile.created_in).toDateString() }}</h6>
                    </v-list-tile-title>
                </v-list>
            </v-flex>

        </v-layout>
    </v-container>
</template>


<script>
export default {
    data: function() {
        return {
            dialogApproveFile: false,
            dialogRejectFile: false,
            newComment: null,
            testcomments: [
                {
                    user: {
                        avatar: 'https://firebasestorage.googleapis.com/v0/b/companysimplify-1992.appspot.com/o/users_avatars%2Fdefault%2Fuser_avatar_default.png?alt=media&token=b6883e32-5b03-48d2-9d9a-3c802e0e359b',
                        display_name: 'Filipe #1'
                    },
                    created_in: new Date().toDateString('yyyy-MM-dd'),
                    content: 'Some simple commentary just to test stuff'
                },
                {
                    user: {
                        avatar: 'https://firebasestorage.googleapis.com/v0/b/companysimplify-1992.appspot.com/o/users_avatars%2Fdefault%2Fuser_avatar_default.png?alt=media&token=b6883e32-5b03-48d2-9d9a-3c802e0e359b',
                        display_name: 'Filipe #2'
                    },
                    created_in: new Date().toDateString('yyyy-MM-dd'),
                    content: 'Some simple commentary just to test stuff'
                },
                {
                    user: {
                        avatar: 'https://firebasestorage.googleapis.com/v0/b/companysimplify-1992.appspot.com/o/users_avatars%2Fdefault%2Fuser_avatar_default.png?alt=media&token=b6883e32-5b03-48d2-9d9a-3c802e0e359b',
                        display_name: 'Filipe #3'
                    },
                    created_in: new Date().toDateString('yyyy-MM-dd'),
                    content: 'Some simple commentary just to test stuff'
                },
                {
                    user: {
                        avatar: 'https://firebasestorage.googleapis.com/v0/b/companysimplify-1992.appspot.com/o/users_avatars%2Fdefault%2Fuser_avatar_default.png?alt=media&token=b6883e32-5b03-48d2-9d9a-3c802e0e359b',
                        display_name: 'Filipe #4'
                    },
                    created_in: new Date().toDateString('yyyy-MM-dd'),
                    content: 'Some simple commentary just to test stuff'
                }
            ]
        }
    },

    computed: {
        viewingProjectFile: function() {
            return this.$store.getters.getProjectFile({project_name: this.project_name, file_id: this.file_id});
        },
        userDB: function() {
            return this.$store.getters.getUserDB;
        },
        uploaderInfo: function() {
            return this.$store.getters.getUploaderInfo(this.project_name, this.viewingProjectFile.uploaderUserId);
        }
    },

    created: function() {
        this.project_name = this.$route.params.project_name;
        //this.file_index = this.$route.params.file_index;
        this.file_id = this.$route.params.file_id;
    },

    mounted: function() {
        console.log(this.viewingProjectFile, this.uploaderInfo);
    },

    methods: {
        approveFile: function() {
            /* this.$store.dispatch('firebaseAproveFile', {
                    project_name: this.project_name, 
                    file_id: this.file_id,
                    userDB: this.userDB
                }); */
        },
        rejectFile: function() {
            /* this.$store.dispatch('firebaseDisaproveFile', {
                    project_name: this.project_name, 
                    file_id: this.file_id,
                    userDB: this.userDB
                }); */
        },
        addNewComment: function() {
            let commentObject = {
                content: this.newComment,
                user: this.userDB.id,
                created_in: new Date().toISOString()
            }

            this.$store.dispatch('firebaseAddNewCommentToFile', {
                    project_name: this.project_name, 
                    file_id: this.file_id,
                    comment: commentObject,
                });
        }
    }
}
</script>


<style scoped>
    .no-background {
        background-color: transparent;
    }

    .v-list__tile__action { display: inline-block; }

    .pending {
        color: darkgoldenrod;
    }
    .aproved {
        color: darkgreen;
    }
    .disaproved {
        color: darkred;
    }

    .color-approve {
        color: darkgreen;
        text-decoration: underline;
    }
    .color-reject {
        color: darkred;
        text-decoration: underline;
    }
</style>
