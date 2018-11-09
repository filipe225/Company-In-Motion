<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs12 sm4 offset-sm1 v-for="(project, index) in projects" v-bind:key="index">
                <v-card  class="my-3">
                    <v-toolbar color="orange darken-1" dark>
                        <v-toolbar-title>{{ project.name }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <small>{{ project.date }}</small>
                    </v-toolbar>
                    <v-list>
                        <v-list-tile>
                            <v-list-tile-title>
                                Client: {{ project.client.name}}
                            </v-list-tile-title>
                        </v-list-tile>
                        <v-divider></v-divider>
                        <v-list-tile v-for="(associate, i) in project.associates" v-bind:key="i">
                            <v-list-tile-title>
                                Associate: {{ associate.name }}
                            </v-list-tile-title>
                        </v-list-tile>
                        <v-divider></v-divider>
                        <v-list-tile>
                            <v-list-tile-title>
                                Files to Approve: {{ project.filesAwatingApproval }}
                            </v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-title>
                                Files Approved: {{ project.filesApproved }}
                            </v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>

const events = ["Project [name] created", "Client [name] associated", "File [name] to approval", "File [name] approved", "Project [name] Concluded"]
const event = {
    name: '',
    date: new Date().toDateString("yyyy-MM-dd")
}

export default {
    data: function() {
        return {
            projects: [
                {
                    name: 'Project #1',
                    date: new Date().toDateString("yyyy-MM-dd"),
                    client: {
                        name: 'Client #1',
                        profile: "/"
                    },
                    associates: [
                        {
                            name: 'Associate #1',
                            profile: "/"
                        },
                        {
                            name: 'Associate #2',
                            profile: "/"
                        },
                        {
                            name: 'Associate #3',
                            profile: "/"
                        }
                    ],
                    filesAwatingApproval: 2,
                    filesApproved: 4
                },
                {
                    name: 'Project #2',
                    date: new Date().toDateString("yyyy-MM-dd"),
                    client: {
                        name: 'Client #2',
                        profile: "/"
                    },
                    associates: [
                        {
                            name: 'Associate #1',
                            profile: "/"
                        },
                        {
                            name: 'Associate #2',
                            profile: "/"
                        },
                        {
                            name: 'Associate #3',
                            profile: "/"
                        }
                    ],
                    filesAwatingApproval: 3,
                    filesApproved: 5
                },
                {
                    name: 'Project #3',
                    date: new Date().toDateString("yyyy-MM-dd"),
                    client: {
                        name: 'Client #3',
                        profile: "/"
                    },
                    associates: [
                        {
                            name: 'Associate #1',
                            profile: "/"
                        },
                        {
                            name: 'Associate #2',
                            profile: "/"
                        },
                        {
                            name: 'Associate #3',
                            profile: "/"
                        }
                    ],
                    filesAwatingApproval: 1,
                    filesApproved: 6
                }
            ]
        }
    },
    
    computed: {},

    created: function() {

    },

    methods: {}
}
</script>


<style scoped>

</style>
