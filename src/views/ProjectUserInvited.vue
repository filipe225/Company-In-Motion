
<template>
    <v-container >

        <!-- REGISTRATION FORM -->
        <v-layout row wrap grid-list-md v-if="showRegistration && !userAddedToProject">
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-container class="pa-0">
							<v-layout row wrap>
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

                                        <v-checkbox v-bind:label="register.userType" 
                                            v-model="register.checkbox" disabled required>
                                        </v-checkbox>

										<v-btn large @click="userRegister" 
                                                v-bind:disabled="registerValid"
                                                dark class="mx-0 right teal darken-1">Register</v-btn>
									</v-form>
								</v-flex>
                                <v-flex xs12 class="text-xs-right">
                                    <p>Already registered ?
                                        <v-btn flat style="color: blue;" @click="showRegistration = false"><span>Sign In Now!</span></v-btn>
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
                        <v-container class="pa-0">
                            <v-layout row wrap>
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
                                <v-flex xs12 class="text-xs-right">
                                    <p>Not registered yet?
                                        <v-btn flat style="color: blue;" @click="showRegistration = true">
                                            <span>Register Now!</span>
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
            <v-flex xs6 offset-xs3 text-xs-center>
                    {{ user_type }} YOU HAVE BEEN ADDED TO THE PROJECT  {{ project_name }}                
            </v-flex>
            <v-flex xs6 offset-xs2>
                <v-btn flat>
                    <router-link tag="span" :to="`/${project_name}`">Go to Projects</router-link>
                </v-btn>
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
                userType: null,
                checkbox: true
            }
        }
    },

    computed: {
        comparePasswords: function() {
            return this.register.password !== this.register.confirmPassword
                ? "Password do not match!"
                : "";
        }

    },

    created: function() {
        this.project_id = this.$route.params.project_id;
        let user_type = this.$route.params.user_type;
        this.user_id = this.$route.params.user_id;
        let user_email = this.$route.params.email;

        this.register.email = user_email;
        this.signin.email = user_email;
        this.register.userType = user_type;

    },

    methods: {
        userSignIn: function() {

            // No sign in é necessario verificar se a conta do utlizador
            // corresponde ao pedido enviado por email.

            this.$store.dispatch('firebaseAddUserToProject', { 
                project_name: this.project_name, 
                user_type: this.user_type, 
                user_id: this.user_id
            });
        },

        userRegister: function() {
            this.$store.dispatch('firebaseAddUserToProject', { 
                project_id: this.project_id,
                project_name: this.project_name, 
                user_type: this.user_type, 
                user_id: this.user_id
            });
        }
    }
}
</script>


<style scoped>

</style>
