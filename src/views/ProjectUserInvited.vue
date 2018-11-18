
<template>
    <v-container >
        {{ user_type }} YOU HAVE BEEN ADDED TO THE PROJECT  {{ project_name }}
    </v-container>
</template>

<script>
export default {
    data: function() {
        return {}
    },

    created: function() {
        this.project_name = this.$route.params.project_name;
        this.user_type = this.$route.params.user_type;
        this.user_id = this.$route.params.user_id;

        this.$store.dispatch('firebaseProjectAddUser', { 
            project_name: this.project_name, 
            user_type: this.user_type, user_id: 
            this.user_id 
        });
    }
}
</script>


<style scoped>

</style>
