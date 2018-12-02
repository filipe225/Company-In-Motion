<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs4 offset-xs2>
                <p>{{ this. project_name }}</p>
                <p>{{ this.file_index }}</p>
                <v-btn icon>
                    <v-icon>cloud_download</v-icon>
                </v-btn>
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
        this.file_index = this.$route.params.file_index;
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
