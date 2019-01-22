<template>
    <v-container fluid grid-list-lg>
        <v-layout row wrap>
            <v-flex xs12 sm6>
                <v-card class="bg-green-light elevation-2 pb-3">
                    <v-card-title> <h3>User Comparison</h3> </v-card-title>
                    <table class="check-table pa-2">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Associate</th>
                                <th>Project Manager</th>
                                <th>Client</th>
                                <th>Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="text-xs-right">Create User Notes</td>
                                <td class="text-xs-center"><v-icon>check_circle_outline</v-icon></td>
                                <td class="text-xs-center"><v-icon>check_circle_outline</v-icon></td>
                                <td class="text-xs-center"><v-icon>check_circle_outline</v-icon></td>
                                <td class="text-xs-center"><v-icon>check_circle_outline</v-icon></td>
                            </tr>
                            <tr>
                                <td class="text-xs-right">Create Projects</td>
                                <td class="text-xs-center"><v-icon></v-icon></td>
                                <td class="text-xs-center"><v-icon></v-icon></td>
                                <td class="text-xs-center"><v-icon></v-icon></td>
                                <td class="text-xs-center"><v-icon>check_circle_outline</v-icon></td>
                            </tr>
                            <tr>
                                <td class="text-xs-right">Invite users to projects</td>
                                <td class="text-xs-center"><v-icon></v-icon></td>
                                <td class="text-xs-center"><v-icon>check_circle_outline</v-icon></td>
                                <td class="text-xs-center"><v-icon></v-icon></td>
                                <td class="text-xs-center"><v-icon>check_circle_outline</v-icon></td>
                            </tr>
                            <tr>
                                <td class="text-xs-right">Create Project Tasks</td>
                                <td class="text-xs-center"><v-icon>check_circle_outline</v-icon></td>
                                <td class="text-xs-center"><v-icon>check_circle_outline</v-icon></td>
                                <td class="text-xs-center"><v-icon>check_circle_outline</v-icon></td>
                                <td class="text-xs-center"><v-icon>check_circle_outline</v-icon></td>
                            </tr>
                            <tr>
                                <td class="text-xs-right">Send Files for Aproval</td>
                                <td class="text-xs-center"><v-icon></v-icon></td>
                                <td class="text-xs-center"><v-icon>check_circle_outline</v-icon></td>
                                <td class="text-xs-center"><v-icon>check_circle_outline</v-icon></td>
                                <td class="text-xs-center"><v-icon>check_circle_outline</v-icon></td>
                            </tr>
                            <tr>
                                <td class="text-xs-right">Aprove / Disaprove Files</td>
                                <td class="text-xs-center"><v-icon></v-icon></td>
                                <td class="text-xs-center"><v-icon>check_circle_outline</v-icon></td>
                                <td class="text-xs-center"><v-icon>check_circle_outline</v-icon></td>
                                <td class="text-xs-center"><v-icon>check_circle_outline</v-icon></td>
                            </tr>
                            <tr>
                                <td class="text-xs-right">Create project budget</td>
                                <td class="text-xs-center"><v-icon></v-icon></td>
                                <td class="text-xs-center"><v-icon></v-icon></td>
                                <td class="text-xs-center"><v-icon></v-icon></td>
                                <td class="text-xs-center"><v-icon>check_circle_outline</v-icon></td>
                            </tr>
                            <tr>
                                <td class="text-xs-right">Delete Projects</td>
                                <td class="text-xs-center"><v-icon></v-icon></td>
                                <td class="text-xs-center"><v-icon></v-icon></td>
                                <td class="text-xs-center"><v-icon></v-icon></td>
                                <td class="text-xs-center"><v-icon>check_circle_outline</v-icon></td>
                            </tr>
                        </tbody>
                    </table>
                </v-card>
            </v-flex>
            <v-flex xs12 sm6>
                <v-card class="bg-green-light elevation-6">
                    <v-card-text>
                        <v-layout>
                            <v-flex xs12 class="bg-green-light">
                                <h1>Register</h1>
                                <v-form v-model="registerValid" class="mt-4 bg-transparent">
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
                                    <v-radio-group v-model="register.userType">
                                        <v-radio label="Project Admin" value="admin"></v-radio>
                                        <v-radio label="Project Manager" value="project_manager"></v-radio>
                                        <v-radio label="Project Associate" value="associate" ></v-radio>
                                        <v-radio label="Project Client" value="client"></v-radio>
                                    </v-radio-group>
                                    <v-btn large @click="userRegister" 
                                            v-bind:disabled="registerValid"
                                            dark class="mx-0 right page-main-button">Register</v-btn>
                                </v-form>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm6 offset-sm6 class="text-xs-right">
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
</template>


<script>
export default {
  data: function() {
    return {
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
    };
  },

  computed: {
    comparePasswords: function() {
      return this.register.password !== this.register.confirmPassword
        ? "Password do not match!"
        : "";
    },
    user: function() {
      return this.$store.getters.getUser;
    }
  },

  watch: {
    user: function(value) {
      if (value !== null) {
        this.$router.push("/signin");
      }
    }
  },

  created: function() {},

  methods: {
    userRegister: function() {
      let obj = {
        displatName: this.register.displayName,
        email: this.register.email,
        password: this.register.password,
        confirmPassword: this.register.confirmPassword,
        type: this.register.userType
      };
      for (let o in obj) {
        if (!obj[o]) return;
      }
      this.$store.dispatch("firebaseRegisterUser", {
        displayName: obj.displatName,
        email: obj.email,
        password: obj.password,
        type: obj.type
      });
    }
  }
};
</script>


<style scoped>

    .check-table {
        width: 100%;
    }
    .check-table th, .check-table td {
        padding: 5px;
    }
    .check-table tbody tr:hover td {
        background-color: lightgrey;
    }

</style>
