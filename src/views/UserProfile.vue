
<template>
  <v-container fluid>

    <!-- MODAL EDIT PROFILE -->
    <v-dialog v-model="editProfileDialog" width="500">
      <v-card class="bg-green-light pa-5">
        <v-form ref="form" lazy-validation>
          <v-text-field
            v-model="editProfile.displayName"
            :rules="editProfile.displayNameRules"
            label="Name"
            required
          ></v-text-field>

          <v-text-field v-model="editProfile.description" label="Description" required></v-text-field>

          <v-text-field v-model="editProfile.location" label="Location" required></v-text-field>

          <v-text-field v-model="editProfile.description" label="Company" required></v-text-field>

          <v-text-field v-model="editProfile.company_title" label="Company Title" required></v-text-field>

          <v-checkbox v-model="editProfile.checkboxNewsletter" label="Receive Newsletter?"></v-checkbox>

          <v-checkbox v-model="editProfile.checkboxEmailFiles" label="Receive email on new file?"></v-checkbox>

          <v-checkbox v-model="editProfile.checkboxEmailTasks" label="Receive email on new task?"></v-checkbox>

          <v-checkbox
            v-model="editProfile.checkboxEmailAppointment"
            label="Receive email on new appointment?"
          ></v-checkbox>

          <v-btn flat class="left">Cancel</v-btn>
          <v-btn flat class="page-main-button right">Save</v-btn>
        </v-form>
      </v-card>
    </v-dialog>

	<!-- MODAL CHANGE EMAIL -->
	<v-dialog v-model="changeEmailDialog" width="500">
		<h3>Change Email</h3>
		<v-form class="bg-green-light pa-5">
			<v-text-field
				v-model="changeEmail.currentEmail"
				:rules="[rules.required, rules.email]"
				label="Current E-mail"></v-text-field>
			<v-text-field
				v-model="changeEmail.newEmail"
				:rules="[rules.required, rules.email]"
				label="New E-mail"></v-text-field>
		</v-form>
	</v-dialog>

	<!-- MODAL CHANGE PASSWORD -->
	<v-dialog v-model="changePasswordDialog" width="500">
		<h3>Change Password</h3>
		<v-form class="bg-green-light pa-5">
			<v-text-field
				v-model="changePassword.currentPassword"
				:rules="[rules.required, rules.min]"
				type="password"
				name="input-current-password"
				label="Normal with hint text"
				hint="At least 8 characters"></v-text-field>
			<v-text-field
				v-model="changePassword.newPassword"
				:rules="[rules.required, rules.min]"
				type="password"
				name="input-new-password"
				label="Normal with hint text"
				hint="At least 8 characters"></v-text-field>
			<v-text-field
				v-model="changePassword.repeatPassword"
				:rules="[rules.required, rules.min]"
				type="password"
				name="input-repeat-password"
				label="Normal with hint text"
				hint="At least 8 characters"></v-text-field>
		</v-form>
	</v-dialog>

    <v-layout row wrap v-if="this.viewing_user.id === this.userDB.id">
		<v-btn flat class="page-main-button" @click="editProfileDialog = true;">Edit Profile</v-btn>
		<v-btn flat>Change Email</v-btn>
		<v-btn flat>Change Password</v-btn>
    </v-layout>

    <v-layout row v-if="viewing_user === userDB.id">
      <v-flex xs12>
        <v-btn class="page-main-button">Edit Profile</v-btn>
      </v-flex>
    </v-layout>

    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm6 > <!-- class="fix-margin-top" -->
          <v-list class="bg-transparent">
            <v-list-tile-title class="my-2 user-display-name">
              <h4 class="normal" style="line-height: 56px;">{{ viewing_user.displayName }}</h4>
            </v-list-tile-title>
            <v-list-tile dense="true">
              <v-list-tile-title style="text-align: center;">Description</v-list-tile-title>
            </v-list-tile>
			<v-list-tile dense="true">
				<v-list-tile-title v-html="viewing_user.description || '<em>No description available</em>'"></v-list-tile-title>
			</v-list-tile>
            <v-list-tile dense="true">
              <v-list-tile-title style="text-align: center;">Member since</v-list-tile-title>
            </v-list-tile>
			<v-list-tile dense="true">
				<v-list-tile-title>{{ new Date(viewing_user.created_in).toDateString() }}</v-list-tile-title>
			</v-list-tile>
            <v-list-tile dense="true">
              <v-list-tile-title style="text-align: center;">Company title</v-list-tile-title> 
            </v-list-tile>
			<v-list-tile dense="true">
				<v-list-tile-title>{{ viewing_user.company_title }}</v-list-tile-title>
			</v-list-tile>
            <v-list-tile dense="true">
              <v-list-tile-title style="text-align: center;">Location</v-list-tile-title>
            </v-list-tile>
			<v-list-tile dense="true">
				<v-list-tile-title>{{ viewing_user.location }}</v-list-tile-title>
			</v-list-tile>
            <v-list-tile dense="true">
              <v-list-tile-title style="text-align: center;">User type</v-list-tile-title>          
            </v-list-tile>
			<v-list-tile dense="true">
				<v-list-tile-title>{{ viewing_user.type }}</v-list-tile-title>
			</v-list-tile>
          </v-list>
        </v-flex>
        <v-flex xs12 sm6>
			<v-avatar size="200" color="grey lighten-4">
				<img v-bind:src="viewing_user.photo_url" alt="avatar">
			</v-avatar>
        </v-flex>
      </v-layout>

    </v-container>
  </v-container>
</template>


<script>
export default {
  data: function() {
    return {
		editProfileDialog: false,
		changeEmailDialog: false,
		changePasswordDialog: false,
		editProfile: {
			displayName: "",
			description: "",
			location: "",
			company: "",
			company_title: "",
			checkboxNewsletter: false,
			checkboxEmailFiles: false,
			checkboxEmailTasks: false
		},
		editProfileRules: {
			displayName: [v => !!v || "Choose a name to display"]
		},
		changeEmail: {
			currentEmail: '',
			newEmail: ''
		},
		changePassword: {
			currentPassword: '',
			newPassword: '',
			repeatPassword: ''
		},
		rules: {
			required: value => !!value || 'Required.',
			counter: value => value.length <= 20 || 'Max 20 characters',
			email: value => {
				const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				return pattern.test(value) || 'Invalid e-mail.'
			}
		}
    }
  },

  computed: {
    userDB: function() {
      return this.$store.getters.getUserDB;
    }
  },

  created: function() {
    this.viewing_user = null;
    this.params_user = this.$route.params.user_id;
    this.project_name = this.$route.params.project_name;

    if (this.project_name && this.params_user) {
      this.viewing_user = this.$store.getters.getUserInProject(
        this.project_name,
        this.params_user
      );
    } else if (this.params_user) {
      this.viewing_user = this.userDB;
    }
  },

  mounted: function() {
	console.log(this.$store);
	console.log(this.viewing_user);
	console.log(1);
  }
};
</script>


<style scoped>
.theme--light.v-list .v-list__tile__sub-title {
  color: rgba(0, 0, 0, 0.75);
}

.user-display-name {
  height: 100%;
  text-align: center;
}

.user-display-avatar {
  height: auto;
  justify-content: center;
}

@media (min-width: 600px) {
  .fix-margin-top {
    margin-top: 60px;
  }
}
</style>
