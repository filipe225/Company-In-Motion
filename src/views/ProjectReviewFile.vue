<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs4 offset-xs2>
                <p>{{ this. project_name }}</p>
                <p>{{ this.file_index }}</p>
                <p>                            
                    <v-btn icon title="Download file" v-bind:data-fileIndex="props.index"><v-icon>cloud_download</v-icon></v-btn>
                    <v-btn icon title="Delete file from Project" v-bind:data-fileIndex="props.index"><v-icon>delete_forever</v-icon></v-btn>
                    <v-btn icon title="Send Email for file revisition" v-bind:data-fileIndex="props.index"><v-icon>email</v-icon></v-btn>
                </p>
            </v-flex>
            <v-flex xs12 v-for="(comment, index) in viewingProjectFile.comments" v-bind:key="index">
                <v-layout row wrap>
                    <v-flex xs3>
                        <img v-bind:src="comment.user.avatar">                        
                    </v-flex>
                    <v-flex xs7>
                        <label>{{ comment.content }}</label>                        
                    </v-flex>
                    <v-flex xs2>                    
                    </v-flex>
                </v-layout>

            </v-flex>
            <v-flex xs12>
                <v-textarea v-model="newComment" placeholder="New Comment"></v-textarea>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
export default {
    data: function() {
        return {

        }
    },

    computed: {
        viewingProjectFile: function() {
            return this.$store.getProjectFile(this.project_name, this.file_index);
        } 
    },

    created: function() {
        this.project_name = this.$route.params.project_name;
        //this.file_index = this.$route.params.file_index;
        this.project_id = this.$route.params.file_id;
    },

    mounted: function() {
        console.log(this.project_name);
        console.log(this.project_id);
    },

    methods: {
        aproveFile: function() {

        },
        disaproveFile: function() {

        },
        addNewComment: function() {

        }
    }
}
</script>


<style scoped>

</style>
