<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <v-layout row>
                                <v-flex xs12>
                                    <h1>Sign In</h1>
                                    <v-form v-model="signinValid">     
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
                                        <v-btn large @click="userSignIn" class="mx-0 right">Sign In</v-btn>
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
                this.$router.push('/');
            }
        }
    },

    created: function() {},

    methods: {
        userSignIn: function() {
            console.log( {
                email: this.signin.email,
                password: this.signin.password
            })
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
