
<template>
    <v-container >

        <!-- REGISTRATION FORM -->
        <v-layout row wrap grid-list-md v-if="showRegistration && !userAddedToProject">
            <v-flex xs12 sm6>
                <v-card>
                    <v-card-text>
                        <v-container>
							<v-layout>
								<v-flex xs12>
									<h1>Register</h1>
									<v-form v-model="registerValid" class="mt-4">
                                        <v-text-field
											v-model="register.displayName"
											label="Display Name"
											required>
										</v-text-field>               
										<v-text-field
											v-model="register.email"
											v-bind:rules="register.emailRules"
											label="E-mail"
											required>
										</v-text-field>
										<v-text-field
											type="password"
											v-model="register.password"
											v-bind:rules="register.passwordRules"
											label="Password"
											required>
										</v-text-field>
										<v-text-field
											type="password"
											v-model="register.confirmPassword"
											v-bind:rules="[comparePasswords]"
											label="Confirm Password"
											required>
										</v-text-field>

                                        <v-checkbox v-bind:label="userType" 
                                            v-model="checkbox" disabled="true" required>
                                        </v-checkbox>

										<v-btn large @click="userRegister" 
                                                v-bind:disabled="registerValid"
                                                dark class="mx-0 right teal darken-1">Register</v-btn>
									</v-form>
								</v-flex>
                                <v-flex xs12 sm6 class="text-xs-right">
                                    <p>Already registered ?
                                        <v-btn flat>
                                            <router-link tag="span" v-bind:to="'/signin'" style="color: blue;">
                                                Sign In Now!
                                            </router-link>
                                        </v-btn>
                                    </p>
                                </v-flex>
							</v-layout>
						</v-container>
                    </v-card-text>
                </v-card>
            </v-flex>            
        </v-layout>


        <!-- SIGN IN FORM -->
        <v-layout row wrap v-else-if="!showRegistration && !userAddedToProject">
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <v-layout row>
                                <v-flex xs12>
                                    <h1>Sign In</h1>
                                    <v-form v-model="signinValid" class="mt-4">     
                                        <v-text-field
                                            v-model="signin.email"
                                            v-bind:rules="signin.emailRules"
                                            label="E-mail"
                                            required>
                                        </v-text-field>
                                        <v-text-field
                                            type="password"
                                            v-model="signin.password"
                                            v-bind:rules="signin.passwordRules"
                                            label="Password"
                                            required>
                                        </v-text-field>
                                        <v-btn large @click="userSignIn" dark class="mx-0 right teal darken-1">Sign In</v-btn>
                                    </v-form>
                                </v-flex>
                                <v-flex xs12 sm6 offset-sm3 class="text-xs-right">
                                    <p>Not registered yet?
                                        <v-btn flat>
                                            <router-link tag="span" v-bind:to="'/register'" style="color: blue;">
                                                Register Now!
                                            </router-link>
                                        </v-btn>
                                    </p>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>

        </v-layout>


        <!-- SHOW WHEN USER GETS ADDED TO THE PROJECT CORRECTLY -->
        <v-layout row wrap v-else-if="userAddedToProject">
            <v-flex xs12 text-xs-center>
                    {{ user_type }} YOU HAVE BEEN ADDED TO THE PROJECT  {{ project_name }}                
            </v-flex>
        </v-layout>



    </v-container>
</template>

<script>
export default {
    data: function() {
        return {

            userAddedToProject: false,
            showRegistration: true,

            signinValid: true,
            signin: {
                email: "",
                emailRules: [
                v => !!v || "E-mail is required",
                v => /.+@.+/.test(v) || "E-mail must be valid"
                ],
                password: "",
                passwordRules: [
                    v => !!v || "Password is required",
                    v => v.length > 6 || "Password must have at least 7 characters"
                ]
            },

            registerValid: false,
            register: {
                displayName: "",
                email: "",
                emailRules: [
                v => !!v || "E-mail is required",
                v => /.+@.+/.test(v) || "E-mail must be valid"
                ],
                password: "",
                passwordRules: [
                v => !!v || "Password is required",
                v => v.length > 6 || "Password must have at least 7 characters"
                ],
                userType: null
            }
        }
    },

    created: function() {
        this.project_name = this.$route.params.project_name;
        this.user_type = this.$route.params.user_type;
        this.user_id = this.$route.params.user_id;
        let user_email = this.$route.params.email;

        this.register.email = user_email;
        this.signin.email = user_email;

    },

    methods: {
        userSignIn: function() {

            // No sign in é necessario verificar se a conta do utlizador
            // corresponde ao pedido enviado por email.

            this.$store.dispatch('firebaseProjectAddUser', { 
                project_name: this.project_name, 
                user_type: this.user_type, user_id: 
                this.user_id
            });
        },

        userRegister: function() {
            this.$store.dispatch('firebaseProjectAddUser', { 
                project_name: this.project_name, 
                user_type: this.user_type, user_id: 
                this.user_id 
            });
        }
    }
}
</script>


<style scoped>

</style>
