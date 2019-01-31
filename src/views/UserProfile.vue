
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
					<v-card class="bg-transparent">
						<v-card-title>{{ viewing_user.toString() }}</v-card-title>
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
			return this.$store.getters.getUserDB;
		}
	},

	created: function() {
		this.viewing_user = null;
		this.params_user = this.$route.params.user_id;
		this.project_name = this.$route.params.project_name;

		if(this.project_name && this.params_user) {
			this.viewing_user = this.$store.getters.getUserInProject(this.project_name, this.params_user);
		}
	},

	mounted: function() {
		console.log(this.$store);
	}
};
</script>


<style scoped>
</style>
