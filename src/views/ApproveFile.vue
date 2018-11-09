<template>
    <v-container fluid grid-list-md>
        <v-layout row wrap>
            <v-flex xs12 sm9>
                <v-card class="pa-3">
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
                                <v-btn raised @click="pickFile"> Upload File</v-btn>
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
                        <v-btn type="submit" primary @click.prevent="newFileToApproval">Submit</v-btn>
                        <v-btn type="reset" info>Reset</v-btn>
                    </v-form>
                </v-card>
            </v-flex>
            <v-flex sm3 class="hidden-xs">
                <v-card>
                    INFORMAÇÃO DO CLIENTE ???
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
export default {  
    data: function() {
        return {
            valid: true,
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

    },

    methods: {
        newFileToApproval: function() {
            if(!this.title || !this.description || !this.image) return;

            const newApproval = {
                title: this.title,
                description: this.description,
                image: this.image
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
