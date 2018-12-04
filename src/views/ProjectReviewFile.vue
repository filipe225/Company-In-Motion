<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs10 offset-xs1>
                <v-list class="no-background elevation-12">

                    <v-list-tile>
                        <v-list-tile-title>{{ this.project_name }}</v-list-tile-title>
                    </v-list-tile>

                    <v-list-tile>
                        <v-list-tile-sub-title>{{ this.file_id }}</v-list-tile-sub-title>                        
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
                        <v-btn v-if="userDB.type !== viewingProjectFile.uploaderUserType">APROVE</v-btn>
                        <v-btn v-if="userDB.type !== viewingProjectFile.uploaderUserType">DISAPROVE</v-btn>
                    </v-list-tile-action>

                </v-list>
            </v-flex>
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
    </v-container>
</template>


<script>
export default {
    data: function() {
        return {
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
        }
    },

    created: function() {
        this.project_name = this.$route.params.project_name;
        //this.file_index = this.$route.params.file_index;
        this.file_id = this.$route.params.file_id;
    },

    mounted: function() {
        console.log(this.viewingProjectFile);
    },

    methods: {
        aproveFile: function() {
            this.$store.dispatch('firebaseAproveFile', {project_name: this.project_name, file_id: this.file_id});
        },
        disaproveFile: function() {
            this.$store.dispatch('firebaseDisaproveFile', {project_name: this.project_name, file_id: this.file_id});
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
</style>
