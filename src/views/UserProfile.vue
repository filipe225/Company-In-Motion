
<template>
  <v-container fluid>
    <!-- MODAL EDIT PROFILE -->
    <v-dialog v-model="editProfile" width="500">
      <v-card class="bg-green-light pa-5">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>

          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
		
			

          <v-checkbox
            v-model="checkboxNewsletter"
            label="Receive Newsletter?"
          ></v-checkbox>

          <v-checkbox
            v-model="checkboxEmailFiles"
            label="Receive email on new file?"
          ></v-checkbox>

          <v-checkbox
            v-model="checkboxEmailTasks"
            label="Receive email on new task?"
          ></v-checkbox>

          <v-checkbox
            v-model="checkboxEmailAppointment"
            label="Receive email on new appointment?"
          ></v-checkbox>

          <v-btn flat class="left">Cancel</v-btn>
          <v-btn flat class="page-main-button right">Save</v-btn>
        </v-form>
      </v-card>
    </v-dialog>

    <v-layout row wrap>
      <v-btn flat class="page-main-button" @click="editProfile = true;">Edit Profile</v-btn>
	  <v-btn flat>Email/Password</v-btn>
    </v-layout>

    <v-layout row v-if="viewing_user === userDB.id">
      <v-flex xs12>
        <v-btn class="page-main-button">Edit Profile</v-btn>
      </v-flex>
    </v-layout>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm6>
          <v-list class="bg-transparent">
            <v-template>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-list-tile avatar class="text-xs-center py-3">
                    <v-list-tile-title class="my-2 user-display-name">
                      <h4 class="normal" style="line-height: 56px;">{{ viewing_user.displayName }}</h4>
                    </v-list-tile-title>
                  </v-list-tile>
                </v-flex>
                <v-flex xs12>
                  <v-list-tile avatar class="user-display-avatar">
                    <v-avatar size="200" color="grey lighten-4">
                      <img v-bind:src="viewing_user.photo_url" alt="avatar">
                    </v-avatar>
                  </v-list-tile>
                </v-flex>
              </v-layout>
            </v-template>
          </v-list>
        </v-flex>
        <v-flex xs12 sm6 class="fix-margin-top">
          <v-list class="bg-transparent">
            <v-list-tile>
              <v-list-tile-sub-title>Description :</v-list-tile-sub-title>
              <v-list-tile-title>{{ viewing_user.description }}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-sub-title>Member since :</v-list-tile-sub-title>
              <v-list-tile-title>{{ new Date(viewing_user.created_in).toDateString() }}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-sub-title>Company title :</v-list-tile-sub-title>
              <v-list-tile-title>{{ viewing_user.company_title }}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-sub-title>Location :</v-list-tile-sub-title>
              <v-list-tile-title>{{ viewing_user.location }}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-sub-title>User type :</v-list-tile-sub-title>
              <v-list-tile-title>{{ viewing_user.type }}</v-list-tile-title>
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
      editProfile: false
    };
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
