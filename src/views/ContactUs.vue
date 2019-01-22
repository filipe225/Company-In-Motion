
<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 class="bg-green-light">
                <v-card class="bg-transparent">
                    <v-card-title><h1>Contact Us</h1></v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-layout row>
                                <v-flex xs12>                    
                                    <v-form v-model="valid">
										<v-text-field v-model="contact.email" label="Your Email" required></v-text-field>
										<v-text-field v-model="contact.subject" label="Subject" required></v-text-field>
										<v-textarea v-model="contact.content" label="Body" required></v-textarea>

										<v-card-actions>
											<v-spacer></v-spacer>
											<v-btn type="reset" color="blue darken-1" flat >Reset</v-btn>
											<v-btn class="page-main-button" flat @click="sendEmailContactUs" v-bind:disabled="!valid">Send Email</v-btn>
										</v-card-actions>

									</v-form>   
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
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
				email: "",
				subject: "",
				content: ""
			}
		};
	},

	methods: {
		sendEmailContactUs: function() {
		console.log(1);
		}
	}
};
</script>

<style scoped>
</style>

