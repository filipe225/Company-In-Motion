
<template>
    <v-container grid-list-sm>
        <div class="text-xs-center" id="loading_progress_bar">
            <h3 class="normal">Loading Data. Please wait... </h3>
            <v-progress-linear height="15" v-model="progressData.value" v-if="progressData.value > -1"></v-progress-linear>          
        </div>

        <v-layout row wrap>
            <v-flex xs6  v-for="(project, index) in userProjects" :key="index">
                <v-card class="mx-auto" dark>
                    <v-list>
                        <v-list-tile>
                            <v-list-tile-action>
                                <v-icon color="pink" x-large>star</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title >{{ project.name }} Number of users</v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                {{ projectNumberOfUsers(project) }}
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>


<!--         <fusioncharts
            :type="firstChart.type"
            :width="firstChart.width"
            :height="firstChart.height"
            :dataFormat="firstChart.dataFormat"
            :dataSource="firstChart">
        </fusioncharts> -->
    </v-container>
</template>


<script>
export default {
    data: function() {
        return {
/*             firstChart: {
                width: '100%',
                height: '400',
                type: 'column2d',
                dataFormat: 'json',
                "chart": {
                    "caption": "Countries With Most Oil Reserves [2017-18]",
                    "subCaption": "In MMbbl = One Million barrels",
                    "xAxisName": "Country",
                    "yAxisName": "Reserves (MMbbl)",
                    "numberSuffix": "K",
                    "theme": "fusion"
                },
                "data": [{
                    "label": "Venezuela",
                    "value": "290"
                }, {
                    "label": "Saudi",
                    "value": "260"
                }, {
                    "label": "Canada",
                    "value": "180"
                }, {
                    "label": "Iran",
                    "value": "140"
                }, {
                    "label": "Russia",
                    "value": "115"
                }, {
                    "label": "UAE",
                    "value": "100"
                }, {
                    "label": "US",
                    "value": "30"
                }, {
                    "label": "China",
                    "value": "30"
                }]
            }  */               
        }

    },

    computed: {
        progressData: function() {
            return this.$store.getters.getLoadingProgress;
        },
        userProjects: function() {
            return this.$store.getters.getProjects;
        }
    },

    watch: {
        progressData: {
            handler: function(newVal, oldVal) {
                if(newVal.value >= 100 || newVal.value === -1) {
                    document.getElementById('loading_progress_bar').style.display = "none";
                }else {
                    document.getElementById('loading_progress_bar').style.display = "block";
                }
            }.bind(this),
            deep: true
        } 
    },

    methods: {
        projectNumberOfUsers: function(project) {
            const n_admin = project.admin.length;
            const n_clients = project.clients.length;
            const n_project_managers = project.project_managers.length;
            const n_associates = project.associates.length;

            return n_admin + n_clients + n_project_managers + n_associates;
        },
        projectNumberOfFiles: function(project) {
            return project.files.length;
        }
    },

    mounted: function() {
        console.log(this.progressData);
        if(this.progressData.value === -1)
            document.getElementById('loading_progress_bar').style.display = "none";

    }
}
</script>


<style scoped>
    .block-ui {
        position: relative;
        width: 100vw;
        height: 100vh;
        background-color: #ddd;
        border:1px solid red;
        box-sizing: border-box;
        z-index: 999;
    }
</style>

