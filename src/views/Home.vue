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
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Notes from '@/components/Notes.vue';
import Tasks from '@/components/Tasks.vue';

export default {
	name: "home",
	components: {
        HelloWorld,
        Notes,
        Tasks
	}
};
</script>
