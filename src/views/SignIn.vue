<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <v-layout row>
                                <v-flex xs12 v-if="isSigningIn"> 
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
                                        <v-btn large @click="userSignIn">Sign In</v-btn>
                                    </v-form>
                                </v-flex>
                                <v-flex xs12 v-else>
                                    <v-form v-model="registerValid">                   
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
        isSigningIn: true,
        signinValid: true,
        registerValid: true,
        signin: {
            email: "",
            emailRules: [
            v => !!v || "E-mail is required",
            v => /.+@.+/.test(v) || "E-mail must be valid"
            ],
            password: "",
            passwordRules: [
                v => !!v || "Password is required",
                v => v.length <=6 || "Password must have at least 7 characters"
            ]
        },
        register: {
            email: "",
            emailRules: [
            v => !!v || "E-mail is required",
            v => /.+@.+/.test(v) || "E-mail must be valid"
            ],
            password: "",
            passwordRules: [
                v => !!v || "Password is required",
                v => v.length <=6 || "Password must have at least 7 characters"
            ],
            confirmPassword: "",
            confirmPasswordRules: [
                v => !!v || "Password is required",
                v => v.length <=6 || "Password must have at least 7 characters"
            ]
        }
    };
  },

  computed: {
      comparePasswords: function() {
          return this.register.password !== this.register.confirmPassword ?
                    "Password do not match!" : "";
      }
  },

  created: function() {},

  methods: {
      userSignIn: function() {
          console.log( {
              email: this.signin.email,
              password: this.signin.password
          })
      }
  }
};
</script>


<style scoped>
</style>
