
<template>
  <v-container fluid>

    <!-- MODAL EDIT PROFILE -->
    <v-dialog v-model="editProfileDialog" width="500">
      <v-card class="bg-green-light px-5 py-3">
          <h4 class="normal">Edit User Profile</h4>
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
            </v-form>
            <v-card-actions style="justify-content: space-between;">
                <v-btn flat @click="editProfileDialog = false">Cancel</v-btn>
                <v-btn flat class="page-main-button" @click="saveProfileChanges">Save</v-btn>
            </v-card-actions>
      </v-card>
    </v-dialog>

	<!-- MODAL CHANGE EMAIL -->
	<v-dialog v-model="changeEmailDialog" width="500">
        <v-card class="bg-green-light pa-5">
            <h4>Change Email</h4>
            <v-form class="bg-green-light pa-5">
                <v-text-field
                    v-model="changeEmail.currentEmail"
                    label="Current E-mail"></v-text-field>
                <v-text-field
                    v-model="changeEmail.newEmail"
                    label="New E-mail"></v-text-field>
            </v-form>
        </v-card>
	</v-dialog>

	<!-- MODAL CHANGE PASSWORD -->
	<v-dialog v-model="changePasswordDialog" width="500">
        <v-card class="bg-green-light pa-5">
            <h4>Change Password</h4>
            <v-form class="bg-green-light pa-5">
                <v-text-field
                    v-model="changePassword.currentPassword"
                    type="password"
                    name="input-current-password"
                    label="Normal with hint text"
                    hint="At least 8 characters"></v-text-field>
                <v-text-field
                    v-model="changePassword.newPassword"
                    type="password"
                    name="input-new-password"
                    label="Normal with hint text"
                    hint="At least 8 characters"></v-text-field>
                <v-text-field
                    v-model="changePassword.repeatPassword"
                    type="password"
                    name="input-repeat-password"
                    label="Normal with hint text"
                    hint="At least 8 characters"></v-text-field>
            </v-form>
        </v-card>
	</v-dialog>

    <v-layout row wrap v-if="this.viewing_user.id === this.userDB.id">
        <v-flex xs12 justify-end>
            <v-btn flat class="page-main-button right" @click="editUserProfile">Edit Profile</v-btn>
            <v-btn flat class=" right" @click="changeAvatarDialog = true">Change Avatar</v-btn>
            <v-btn flat class=" right" @click="changeEmailDialog = true">Change Email</v-btn>
            <v-btn flat class=" right" @click="changePasswordDialog = true">Change Password</v-btn>
        </v-flex>
    </v-layout>

    <v-layout row v-if="viewing_user === userDB.id">
      <v-flex xs12>
        <v-btn class="page-main-button">Edit Profile</v-btn>
      </v-flex>
    </v-layout>

    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm6 style="text-align: center; margin-top: 30px;"> <!-- class="fix-margin-top" -->
			<v-avatar size="200" color="grey lighten-4">
				<img v-bind:src="viewing_user.photo_url" alt="avatar">
			</v-avatar>
        </v-flex>
        <v-flex xs12 sm6 >
            <v-list class="bg-transparent">
                <v-list-tile-title class="my-2 user-display-name">
                    <h4 class="normal centered" style="line-height: 56px;">{{ viewing_user.displayName }}</h4>
                </v-list-tile-title>
                <v-list-tile dense="true" class="smaller-tile">
                    <v-list-tile-title  class="my-small-centered-title">Description</v-list-tile-title>
                </v-list-tile>
                <v-list-tile dense="true">
                    <v-list-tile-title class="centered" v-html="viewing_user.description || '<em>No description available</em>'"></v-list-tile-title>
                </v-list-tile>
                <v-list-tile dense="true" class="smaller-tile">
                    <v-list-tile-title class="my-small-centered-title">Member since</v-list-tile-title>
                </v-list-tile>
                <v-list-tile dense="true">
                    <v-list-tile-title class="centered">{{ new Date(viewing_user.created_in).toDateString() }}</v-list-tile-title>
                </v-list-tile>
                <v-list-tile dense="true" class="smaller-tile">
                    <v-list-tile-title class="my-small-centered-title">Company title</v-list-tile-title> 
                </v-list-tile>
                <v-list-tile dense="true">
                    <v-list-tile-title class="centered" v-html="viewing_user.company_title || '<em>No company title available</em>'"></v-list-tile-title>
                </v-list-tile>
                <v-list-tile dense="true" class="smaller-tile">
                    <v-list-tile-title class="my-small-centered-title">Location</v-list-tile-title>
                </v-list-tile>
                <v-list-tile dense="true">
                    <v-list-tile-title class="centered" v-html="viewing_user.location || '<em>No location available</em>'">{{ viewing_user.location }}</v-list-tile-title>
                </v-list-tile>
                <v-list-tile dense="true" class="smaller-tile">
                    <v-list-tile-title class="my-small-centered-title">User type</v-list-tile-title>          
                </v-list-tile>
                <v-list-tile dense="true">
                    <v-list-tile-title class="centered">{{ viewing_user.type }}</v-list-tile-title>
                </v-list-tile>
            </v-list>
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
            changeAvatarDialog: false,
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
            changeEmailRules: {
                currentEmail: [
                    v => !!v || "Current E-mail is required",
                ],
                newEmail: [
                    v => !!v || "New E-mail is required",
                ]
            },
            changePassword: {
                currentPassword: '',
                newPassword: '',
                repeatPassword: ''
            },
            changePasswordRules: {
                currentPassword: [
                    v => !!v || "Current password is required",
                ],
                newPassword: [
                    v => !!v || "New password is required",
                ],
                repeatPassword: [
                    v => !!v || "Repeat password is required",
                ]
            }
        }
    },

    computed: {
        comparePasswords: function() {
            return this.register.password !== this.register.confirmPassword
                ? "Password do not match!"
                : "";
        },
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

    mounted: function() {},

    methods: {
        editUserProfile: function() {   
            this.editProfile.displayName = this.userDB.displayName;
            this.editProfile.description = this.userDB.description;
            this.editProfile.location = this.userDB.location;
            this.editProfile.company = this.userDB.company;
            this.editProfile.company_title = this.userDB.company_title;
            this.editProfile.checkboxNewsletter = this.userDB.newsletter;
            this.editProfile.checkboxEmailFiles = this.userDB.email_new_file;
            this.editProfile.checkboxEmailTasks = this.userDB.email_new_task;

            this.editProfileDialog = true;
        },
        saveProfileChanges: function() {
            this.$store.dispatch('updateUserProfile', {
                user_id: this.userDB.id,
                profile: this.editProfile
            })
        }
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

    .smaller-tile { max-height: 26px!important; }
    .smaller-tile > div.v-list__tile { height: 26px!important; }
    .my-small-centered-title {
        height: auto;
        text-align: center;
        color: rgba(0, 0, 0, 0.6);
    }

    .centered { text-align: center; }

    @media (min-width: 600px) {
        .fix-margin-top {
            margin-top: 60px;
        }
    }
</style>
