<template>

    <v-container fluid grid-list-md>
        <v-layout row wrap>
            <v-data-iterator :items="files" name="data_iterator"
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination">
                <v-flex slot="item" slot-scope="props" xs12 sm6 md4 lg3>
                    <v-card>
                        <v-card-title><h4>{{ props.item.title }}</h4></v-card-title>
                        <v-divider></v-divider>
                        <v-img src="..\assets\file_placeholder_doc.png" aspect-ratio="2.75"></v-img>
                        <v-divider></v-divider>
                        <v-card-title><h5>{{ props.item.fileId }}</h5></v-card-title>
                        <v-divider></v-divider>
                        <v-card-title><h5>{{ new Date().toDateString('yyy-MM-dd') }}</h5></v-card-title>
                        <v-divider></v-divider>
                        <v-card-tile>
                            <v-btn icon title="Download file"><v-icon>cloud_download</v-icon></v-btn>
                            <v-btn icon title="Delete file from Project"><v-icon>delete_forever</v-icon></v-btn>
                            <v-btn icon title="Send Email for file revisition"><v-icon>email</v-icon></v-btn>                            
                        </v-card-tile>
                        <v-divider></v-divider>
                        <v-card-actions class="text-xs-center">
                            <v-btn>View</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-data-iterator>
        </v-layout>

        <v-dialog v-model="deletingFile">

        </v-dialog>
    </v-container>

</template>

<!--
    comments: []
    description: "Um primeiro teste neste alegre projecto"
    fileId: "waterfall.jpg"
    fileUrl: "gs://companysimplify-1992.appspot.com/hOZADEfJPTNcnInSWPxM/waterfall.jpg"
    state: "pending"
    title: "Primeiro Ficheiro"
    uploaderUserType: "admin"
-->

<script>
export default {
    data: function() {
        return {
            deletingFile: false,
            rowsPerPageItems: [4, 8, 12],
            pagination: {
                rowsPerPage: 8
            },
        };
    },

    computed: {
        files: function() {
            return this.$store.getters.getProjectFiles(this.project_name);
        }
    },

    created: function() {
        this.project_name = this.$route.params.project_name;
        console.log(this.project_name);
    },

    mounted: function() {
        //console.log('Mounted Files!');
        //console.log(this.files);
    }
};
</script>


<style scoped>
</style>
