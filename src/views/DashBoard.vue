
<template>
    <v-container>
        <div class="text-xs-center" id="loading_progress_bar">
            <h3 class="normal">Loading Data. Please wait... </h3>
            <v-progress-linear height="15" v-model="progressData.value" v-if="progressData.value > -1"></v-progress-linear>          
        </div>

        DASHBOARD
            <fusioncharts
                :type="firstChart.type"
                :width="firstChart.width"
                :height="firstChart.height"
                :dataFormat="firstChart.dataFormat"
                :dataSource="firstChart">
            </fusioncharts>
    </v-container>
</template>


<script>
export default {
    data: function() {
        return {
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
        }

    },

    computed: {
        progressData: function() {
            return this.$store.getters.getLoadingProgress;
        }
    },

    watch: {
        progressData: {
            handler: function(newVal, oldVal) {
                if(newVal.value >= 100) {
                    document.getElementById('loading_progress_bar').style.display = "none";
                }
            }.bind(this),
            deep: true
        } 
    },

    mounted: function() {
        setTimeout(() => {
            console.log(this.progressData);
        }, 3000);
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

