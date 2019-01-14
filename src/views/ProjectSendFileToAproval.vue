<template>
    <v-container fluid grid-list-md>
        <v-layout>
            <!-- FILE UPLOAD PROGRESS -->
            <v-dialog v-model="dialogFileUpload" max-width="500px">
                <v-card>
                    <v-card-title>
                        <span class="headline">File Uploading Progress</span>
                    </v-card-title>
                    <v-card-text class="text-xs-center">
                        <v-progress-circular
                            :rotate="-90"
                            :size="100"
                            :width="15"
                            :value="fileUploadProgress"
                            color="primary">
                                {{ fileUploadProgress }}
                        </v-progress-circular>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn flat @click="dialogFileUpload = false;">Close</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
        <v-layout row wrap>
            <v-flex sm5 class="hidden-xs-only">
                <v-card class="pa-3">
                    <v-card-title primary-title>
                        <span class="headline">{{ project_name }}</span>
                    </v-card-title>
                    <!--<project-timeline v-bind:timeline="timeline"></project-timeline>-->
                    <project-timeline v-bind:events="projectEvents"></project-timeline>
                </v-card>
            </v-flex>
            <v-flex xs12 sm7>
                <v-card class="pa-3">
                    <v-card-title primary-title>
                        <span class="headline">{{ project_name}}</span>
                    </v-card-title>
                    <v-form ref="form_new_file" v-model="valid" lazy-validation>
                    <v-layout row>
                        <v-flex xs12 md8 offset-md2>
                            <v-text-field
                                v-model="title"
                                label="Title"
                                required></v-text-field>
                            <v-textarea
                                v-model="description"
                                label="Description"
                                required></v-textarea>
                            <v-layout row>
                                <v-flex x12>
                                    <v-btn raised @click="pickFile" class="ml-0"> Upload File</v-btn>
                                    <label>{{ imageFileName }}</label>
                                    <input ref="fileInput" 
                                        type="file"
                                        required
                                        accept="image/*"
                                        style="display: none"
                                        @change="onFilePicked" />
                                </v-flex>
                            </v-layout>                 
                        </v-flex>
                    </v-layout>
                    <v-layout row class="pt-5">
                        <v-flex x12>
                            <v-btn type="reset" info class="left">Reset</v-btn>
                            <v-btn type="submit" primary @click.prevent="newFileToApproval" class="right">Submit</v-btn>
                        </v-flex>
                    </v-layout>
                </v-form>  

                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
import timeline from '@/components/Timeline.vue'

export default {  
    components: {
        projectTimeline: timeline
    },

    data: function() {
        return {
            dialogFileUpload: false,
            valid: true,
            project_name: '',
            title: null,
            description: null,
            imageUrl: null,
            imageFileName: '',
            image: null,
            fileToApproval: null,
            fileRules: [
                v => !!v
            ]
        }
    },

    computed: {
        fileUploadProgress: function() {
            return this.$store.getters.getFileUploadProgress;
        },
        projectEvents: function() {
            return this.$store.getters.getProjectEvents(this.project_name);
        }
    },

    watch: {
        fileUploadProgress: function(value) {
            if(value >= 100) {
                this.dialogFileUpload = false;
                this.$refs.form_new_file.reset();
                this.imageFileName = "";
            }
        }
    },

    created: function() {
        this.project_name = this.$route.params.project_name;
    },

    mounted: function() {
        console.log(this.projectEvents);
    },

    methods: {
        newFileToApproval: function() {
            if(!this.title || !this.description || !this.image) return;

            const newApproval = {
                project_name: this.project_name,
                title: this.title,
                description: this.description,
                image: this.image,
                imageName: this.image.name
            }
            console.log(newApproval);
            this.dialogFileUpload = true;
            this.$store.dispatch('firebaseNewFileToApproval', newApproval);

        },
        pickFile: function() {
            this.$refs.fileInput.click();
        },
        onFilePicked: function(event) {
            const files = event.target.files;
            console.log(files);
            let filename = files[0].name;
            if(filename.lastIndexOf('.') === -1) {
                return alert('Please add a valid file');
            }
            const fileReader = new FileReader();
            fileReader.addEventListener('load', () => {
                this.imageUrl = fileReader.result;
                this.imageFileName = filename;
                this.image = files[0];
            })
            fileReader.readAsDataURL(files[0]);

        }
    }
}
</script>


<style scoped>

</style>
