<template>
    <v-container fluid grid-list-md>
        <v-layout row wrap>
            <v-flex d-flex xs12 sm5 md4>
                <Notes></Notes>
            </v-flex>
            <v-flex d-flex xs12 sm7 md8>
                <Tasks></Tasks>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Notes from '@/components/Notes.vue';
import Tasks from '@/components/Tasks.vue';

export default {
    data: function() {
        return {

        }
    },
    
    computed: {

    },

    components: {
        Notes,
        Tasks
    }
}
</script>
