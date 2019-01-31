
<template>
    <v-container grid-list-lg>
        <div class="text-xs-center" id="loading_progress_bar">
            <h3 class="normal">Loading Data. Please wait... </h3>
            <v-progress-linear height="15" v-model="progressData.value" v-if="progressData.value > -1"></v-progress-linear>          
        </div>

        <v-layout row wrap>
            <v-flex xs6 v-for="(project, index) in userProjects" :key="index">
                <v-card class="mx-auto my-3" dark v-for="(obj,i) in cards" :key="i">
                    <v-list :style="'background-color:' + colors[index] + ';color:' + (hexToLuma(colors[index]) > 0.5 ? 'black' : 'white')">
                        <v-list-tile>
                            <v-list-tile-action>
                                <v-icon :color="(hexToLuma(colors[index]) > 0.5 ? 'black' : 'white')" x-large>{{ obj.icon }}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title >{{ project.name + " " + obj.text}}</v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                {{ obj.func(project) }}
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
            colors: ['#336B87', '#BA5536', '#505160', '#598234', '#FFBB00', '#5BC8AC', '#F18D9E'],
            cards: [
                {
                    icon: 'supervisor_account',
                    text: 'Number of Users',
                    func: function projectNumberOfUsers(project) {
                            const n_admin = project.admin.length;
                            const n_clients = project.clients.length;
                            const n_project_managers = project.project_managers.length;
                            const n_associates = project.associates.length;

                            return n_admin + n_clients + n_project_managers + n_associates;
                        }
                },
                {
                    icon: 'insert_drive_file',
                    text: 'Number of Files',
                    func: function projectNumberOfFiles(project) {
                            return project.files.length || 0;
                        }
                },
                {
                    icon: 'work',
                    text: 'Number of Tasks',
                    func: function projectNumberOfTasks(project) {
                            return project.tasks.length || 0;
                        }
                }
            ]

            /*             
            firstChart: {
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
            }  
            */               
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
        },
        hexToLuma: (colour) => {
            const hex   = colour.replace(/#/, '');
            const r     = parseInt(hex.substr(0, 2), 16);
            const g     = parseInt(hex.substr(2, 2), 16);
            const b     = parseInt(hex.substr(4, 2), 16);

            return [
                0.299 * r,
                0.587 * g,
                0.114 * b
            ].reduce((a, b) => a + b) / 255;
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

