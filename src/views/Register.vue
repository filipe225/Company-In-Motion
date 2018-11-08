<template>
        <v-container>
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-container>
							<v-layout>
								<v-flex xs12>
									<h1>Register</h1>
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
										<v-btn large @click="userRegister" class="mx-0 right">Register</v-btn>
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
      registerValid: true,
      register: {
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
      console.log({
        email: this.register.email,
        password: this.register.password,
        confirmPassword: this.register.confirmPassword
      });
      this.$store.dispatch("firebaseRegisterUser", {
        email: this.register.email,
        password: this.register.password
      });
    }
  }
};
</script>


<style scoped>
</style>
