<template>

    <v-container fluid grid-list-md>

        <v-data-iterator content-tag="v-layout" content-class="layout"
            :items="files" name="data_iterator" item-key="files.fileId"
            :rows-per-page-items="rowsPerPageItems" 
            :pagination.sync="pagination">
            <v-toolbar slot="header" class="mb-2" color="indigo darken-5" dark flat>        
                <v-toolbar-title>This is a header</v-toolbar-title>
            </v-toolbar>
                <v-flex slot="item" slot-scope="props" xs12 sm3 md3 lg3>
                    <v-card class="elevation-12 hover-me">
                        <v-card-title ref="ref_file_id" v-bind:data-fileId="props.item.fileId"><h4>{{ props.item.title }}</h4></v-card-title>
                        <v-divider></v-divider>
                        <img src="@/assets/file_placeholder_html.png" class="files-images" />
                        <v-divider></v-divider>
                        <v-card-title><h5>{{ props.item.fileId }}</h5></v-card-title>
                        <v-divider></v-divider>
                        <v-card-title><h5>{{ new Date().toDateString('yyyy-MM-dd') }}</h5></v-card-title>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-btn icon title="Download file" v-bind:data-fileIndex="props.index"><v-icon>cloud_download</v-icon></v-btn>
                            <v-btn icon title="Delete file from Project" v-bind:data-fileIndex="props.index"><v-icon>delete_forever</v-icon></v-btn>
                            <v-btn icon title="Send Email for file revisition" v-bind:data-fileIndex="props.index"><v-icon>email</v-icon></v-btn>
                            <v-btn icon title="View File Comments" @click="openFileDetails" v-bind:data-fileIndex="props.index"><v-icon>pageview</v-icon></v-btn>                      
                        </v-card-actions>
                    </v-card>
                </v-flex>
        </v-data-iterator>


        <v-dialog v-model="deletingFile">
            <v-card>
                <v-card-title class="headline">Deleting File from project!</v-card-title>

                <v-card-text>
                    This file, and all information related to it is about to be deleted.
                    Are you positive you want to proceed?
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click="deletingFile = false"> Disagree </v-btn>
                    <v-btn color="green darken-1" flat="flat" @click="deleteFileFromProject"> Agree</v-btn>
                </v-card-actions>
            </v-card>
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
import { file_placeholder_html } from "@/assets/file_placeholder_html.png";

export default {
    data: function() {
        return {
            deletingFile: false,
            rowsPerPageItems: [4, 8, 12],
            pagination: {
                rowsPerPage: 8
            },
            selectedFile: null,           
        };
    },

    computed: {
        files: function() {
            return this.$store.getters.getProjectFiles(this.project_name);
        },
        fileteredFiles: function() {
            return this.$store.getters.getProjectFiles(this.project_name);
        }
    },

    created: function() {
        this.project_name = this.$route.params.project_name;
        console.log(this.project_name);
    },

    mounted: function() {
        //console.log('Mounted Files!');
        console.log(this.files);
    },

    methods: {
        openFileDetails: function(e) {
            const target = e.target;
            let file_index = null;
            let button_clicked = null;
            switch(target.tagName) {
                case "I":
                    button_clicked = target.parentElement.parentElement;
                    break;
                case "DIV":
                    button_clicked = target.parentElement;
                    break;
                default: 
                    button_clicked = target;
            }

            console.log(e.target)
            console.log(button_clicked);
            file_index = button_clicked.dataset.fileindex;
            let ref_file_id = this.files[file_index].fileId;
            let coiso = this.files[file_index].title;
            console.log(ref_file_id);
            this.$router.push('/projects/'+  this.project_name + '/project_files/file_review/' + ref_file_id);
        },
        deleteFileFromProject: function() {
            deletingFile = false;
        }
    }
};
</script>


<style scoped>

    .files-images {
        width: 100%;
        max-width: 150px;
        max-height: 150px;
        margin: 5px auto;
    }

    .hover-me:hover {
        background-color: aqua;
    }

</style>
