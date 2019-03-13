<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 sm8 lg6 offset-sm2 offset-lg-3 class="bg-green-light">
                <v-card class="bg-transparent">
                    <v-card-text>
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
                                    <v-btn large @click="userSignIn" 
                                        dark class="mx-0 right page-main-button">Sign In</v-btn>
                                </v-form>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm8 lg6 offset-sm2 offset-lg-3>
                <v-layout row wrap>
                    <v-flex xs6>
                        <div class="text-xs-left">
                            <p>
                                <v-btn flat>
                                    forgot password?
                                </v-btn>
                            </p>
                        </div>                        
                    </v-flex>
                    <v-flex xs6>
                        <div class="text-xs-right">
                            <p>Not registered yet?
                                <v-btn flat>
                                    <router-link tag="span" v-bind:to="'/register'" style="color: blue;">
                                        Register Now!
                                    </router-link>
                                </v-btn>
                            </p>    
                        </div>   
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
export default {
    data: function() {
        return {
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
            }
        };
    },

    computed: {  
        user: function() {
            return this.$store.getters.getUser
        }
    },

    watch: {
        user: function(value) {
            if(value !== null) {
                this.$router.push('/dashboard');
            }
        }
    },

    created: function() {},

    methods: {
        userSignIn: function() {
            this.$store.dispatch('firebaseSignInUser', {
                email: this.signin.email,
                password: this.signin.password
            });
        }
    }
};
</script>


<style scoped>
</style>
