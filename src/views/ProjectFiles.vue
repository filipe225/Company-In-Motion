<template>

    <v-container fluid grid-list-md>

        <v-data-iterator content-tag="v-layout" content-class="layout"
            :items="filteredFiles" name="data_iterator" item-key="files.fileId"
            :rows-per-page-items="rowsPerPageItems" 
            :pagination.sync="pagination">
            <v-toolbar slot="header" class="mb-2 bg-transparent" flat>        
                <v-toolbar-title><h4>{{ project_name }} Files</h4></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn small flat v-bind:class="'btn-filter-all ' + selectedFilter" @click="selectedFilter = 'all'">All</v-btn>
                <v-btn small flat v-bind:class="'btn-filter-pending ' + selectedFilter" @click="selectedFilter = 'pending'">Pending</v-btn>
                <v-btn small flat v-bind:class="'btn-filter-approved ' + selectedFilter" @click="selectedFilter = 'approved'">Approved</v-btn>
                <v-btn small flat v-bind:class="'btn-filter-rejected ' + selectedFilter" @click="selectedFilter = 'rejected'">Rejected</v-btn>
                
            </v-toolbar>
                <v-flex slot="item" slot-scope="props" xs12 sm3 md3 lg3>
                    <v-card class="elevation-4 hover-me bg-green-light my-card">

                        <v-card-title ref="ref_file_id" style="padding: 10px;"
                            v-bind:data-fileId="props.item.fileId">
                            <h5 class="normal" >
                                <v-btn class="file-title" 
                                    v-bind:to="'/projects/My Precious/project_files/file_review/' + props.item.fileId" flat>
                                    {{ props.item.title }}
                                </v-btn>
                            </h5>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-title>
                            <div class="file-extension">
                                <p class="bigger">{{ props.item.description }}</p>
                            </div>
                        </v-card-title>
                        <!-- <img src="@/assets/file_placeholder_html.png" class="files-images" /> -->
                        <v-divider></v-divider>

                        <v-card-title>
                            <p class="bigger">.{{ props.item.fileExtension }}</p>
                        </v-card-title>
                        <v-divider></v-divider>

                        <v-card-title>
                            <p class="bigger">{{ new Date(props.item.created_in).toDateString('yyyy-MM-dd') }}</p>
                        </v-card-title>
                        <v-divider></v-divider>

                        <v-card-title>
                            <p v-bind:class="'color-' + props.item.state + ' bigger'">{{ props.item.state.toUpperCase() }}</p>
                        </v-card-title>
                        <v-divider></v-divider>  

                        <v-card-actions>
                            <v-btn icon title="Download file" :href="props.item.fileDownloadUrl"
                                v-bind:data-fileIndex="props.index">
                                <v-icon>cloud_download</v-icon>
                            </v-btn>
                            <v-btn icon title="Delete file from Project" v-bind:data-fileIndex="props.index"><v-icon>delete_forever</v-icon></v-btn>
                            <v-btn icon title="Send Email for file revisition"
                                v-if="props.item.state === 'pending'"
                                v-bind:data-fileIndex="props.index"><v-icon>email</v-icon></v-btn>
                            <v-btn icon title="View File Comments" v-bind:to="'/projects/My Precious/project_files/file_review/' + props.item.fileId" v-bind:data-fileIndex="props.index"><v-icon>pageview</v-icon></v-btn>                      
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
            selectedFilter: 'all'           
        };
    },

    computed: {
        files: function() {
            return this.$store.getters.getProjectFiles(this.project_name);
        },
        filteredFiles: function() {
            let copy = this.files.slice();

            let filter = this.selectedFilter;

            if(filter === "all") return copy;

            let filtered = copy.filter( file => {
                return file.state === filter;
            });

            return filtered;
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
        // NOT IN USE 
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

            file_index = button_clicked.dataset.fileindex;
            let ref_file_id = this.files[file_index].fileId;
            let coiso = this.files[file_index].title;

            this.$router.push('/projects/'+  this.project_name + '/project_files/file_review/' + ref_file_id);
        },
        deleteFileFromProject: function() {
            deletingFile = false;
        }
    }
};
</script>


<style scoped>

    .file-extension {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .files-images {
        width: 100%;
        max-width: 150px;
        max-height: 150px;
        margin: 5px auto;
    }

    .file-title {
        padding: 0;
        font-size: 1.4rem;
        word-break: break-word;
        text-decoration: underline;
        text-decoration-color: black;
        display: inline-block;
        margin: 0 10px;
    }

    .hover-me:hover {
        background-color: #20d3c1 !important;
    }

    .bigger {
        font-size: 1.3em;
        margin-bottom: 0px;
    }

    .btn-filter-all { border: 1px solid black; }
    .btn-filter-pending { border: 1px solid darkgoldenrod; }
    .btn-filter-approved { border: 1px solid darkgreen; }
    .btn-filter-rejected { border: 1px solid darkred; }

    .btn-filter-all.all { background-color: black; color: #FFF; }
    .btn-filter-pending.pending { background-color: darkgoldenrod; color: #FFF; }
    .btn-filter-approved.approved { background-color: darkgreen; color: #FFF; }
    .btn-filter-rejected.rejected { background-color: darkred; color: #FFF; }

    .color-pending {
        color: darkgoldenrod;
    }
    .color-approved {
        color: darkgreen;
    }
    .color-rejected {
        color: darkred;
    }

</style>
