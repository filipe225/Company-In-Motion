<template>

    <v-container fluid grid-list-md>
        <v-layout row wrap>
            <v-data-iterator :items="files" name="data_iterator"
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination">
                <v-flex slot="item" slot-scope="props" xs12 sm6 md4 lg3>
                    <v-card>
                    <v-card-title><h4>{{ props.item.name }}</h4></v-card-title>
                    <v-divider></v-divider>
                    <!--
                    <v-list dense>
                        <v-list-tile>
                            <v-list-tile-content>Calories:</v-list-tile-content>
                            <v-list-tile-content class="align-end">{{ props.item.calories }}</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>Fat:</v-list-tile-content>
                            <v-list-tile-content class="align-end">{{ props.item.fat }}</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>Carbs:</v-list-tile-content>
                            <v-list-tile-content class="align-end">{{ props.item.carbs }}</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>Protein:</v-list-tile-content>
                            <v-list-tile-content class="align-end">{{ props.item.protein }}</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>Sodium:</v-list-tile-content>
                            <v-list-tile-content class="align-end">{{ props.item.sodium }}</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>Calcium:</v-list-tile-content>
                            <v-list-tile-content class="align-end">{{ props.item.calcium }}</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>Iron:</v-list-tile-content>
                            <v-list-tile-content class="align-end">{{ props.item.iron }}</v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                    -->
                    </v-card>
                </v-flex>
            </v-data-iterator>
        </v-layout>
    </v-container>

</template>


<script>
export default {
    data: function() {
        return {
            rowsPerPageItems: [4, 8, 12],
            pagination: {
                rowsPerPage: 8
            },
        };
    },

    computed: {
        files: function() {
            return this.$store.getters.getProjectFiles(this.project_name);
        }
    },

    created: function() {
        this.project_name = this.$route.params.project_name;
        console.log(this.project_name);
    }
};
</script>


<style scoped>
</style>
