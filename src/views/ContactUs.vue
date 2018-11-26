
<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title>Contact Us</v-card-title>
                    <v-form v-model="valid">
                        <v-text-field v-model="contact.email" label="Email" required></v-text-field>
                        <v-text-field v-model="contact.subject" label="Subject" required></v-text-field>
                        <v-textarea v-model="contact.content" label="Body" required></v-textarea>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn type="reset" color="blue darken-1" flat >Reset</v-btn>
                            <v-btn color="teal darken-1" flat @click="sendEmailContactUs" v-bind:disabled="!valid">Send Email</v-btn>
                        </v-card-actions>

                    </v-form>    
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
            contact: {
                email: '',
                subject: '',
                content: ''
            }
        }
    },

    methods: {
        sendEmailContactUs: function() {
            console.log(1)
        }
    }
}
</script>

<style scoped>

</style>

