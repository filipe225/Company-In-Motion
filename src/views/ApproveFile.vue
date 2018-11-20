<template>
    <v-container fluid grid-list-md>
        <v-layout row wrap>
            <v-flex sm5 class="hidden-xs-only">
                <v-card class="pa-3">
                    <v-card-title primary-title>
                        <span class="headline">{{ project_name }}</span>
                    </v-card-title>
                    <!--<project-timeline v-bind:timeline="timeline"></project-timeline>-->
                    <project-timeline></project-timeline>
                </v-card>
            </v-flex>
            <v-flex xs12 sm7>
                <v-card class="pa-3">
                    <v-card-title primary-title>
                        <span class="headline">{{ project_name}}</span>
                    </v-card-title>
                    <v-layout row>
                        <v-flex xs12 md8 offset-md2>
                            <v-form ref="form" v-model="valid" lazy-validation>
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
                                <v-layout row>
                                    <v-flex x12>
                                        <img v-bind:src="imageUrl" style="width: 200px; height: 200px;border: 1px solid black;" />
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex x12>
                                        <v-btn type="reset" info class="left">Reset</v-btn>
                                        <v-btn type="submit" primary @click.prevent="newFileToApproval" class="right">Submit</v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-form>                            
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
import timeline from '@/components/Timeline.vue'

export default {  
    data: function() {
        return {
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

    },

    created: function() {
        this.project_name = this.$route.params.project_name;
    },

    components: {
        projectTimeline: timeline
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
