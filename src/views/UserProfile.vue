
<template>
	<v-container fluid>
		<v-layout row v-if="viewing_user === userDB.id">
			<v-flex xs12>
				<v-btn class="page-main-button">Edit Profile</v-btn>
			</v-flex>
		</v-layout>
		<v-container>
			<v-layout row wrap>
				<v-flex xs12>
					<v-card>
						<v-card-title>{{ user}}</v-card-title>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</v-container>
</template>


<script>
export default {
  data: function() {
    return {};
  },

  computed: {
    userDB: function() {
      this.$store.getters.getUserDB;
    }
  },

  created: function() {
    this.viewing_user = this.$router.params.user_id;
  },

  mounted: function() {}
};
</script>


<style scoped>
</style>
