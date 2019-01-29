
<template>
    <v-container>
        <div class="text-xs-center" id="loading_progress_bar">
            <h3 class="normal">Loading Data. Please wait... </h3>
            <v-progress-linear height="15" v-model="progressData.value" v-if="progressData.value > -1"></v-progress-linear>          
        </div>

        DASHBOARD

        <v-card
            class="mx-auto"
            color="#26c6da"
            dark
            max-width="400"
        >
            <v-card-title>
            <v-icon
                large
                left
            >
                mdi-twitter
            </v-icon>
            <span class="title font-weight-light">Twitter</span>
            </v-card-title>

            <v-card-text class="headline font-weight-bold">
            "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
            </v-card-text>

            <v-card-actions>
            <v-list-tile class="grow">
                <v-list-tile-avatar color="grey darken-3">
                <v-img
                    class="elevation-6"
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                ></v-img>
                </v-list-tile-avatar>

                <v-list-tile-content>
                <v-list-tile-title>Evan You</v-list-tile-title>
                </v-list-tile-content>

                <v-layout
                align-center
                justify-end
                >
                <v-icon class="mr-1">mdi-heart</v-icon>
                <span class="subheading mr-2">256</span>
                <span class="mr-1">·</span>
                <v-icon class="mr-1">mdi-share-variant</v-icon>
                <span class="subheading">45</span>
                </v-layout>
            </v-list-tile>
            </v-card-actions>
        </v-card>

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
                if(newVal.value >= 100 || newVal.value === -1) {
                    document.getElementById('loading_progress_bar').style.display = "none";
                }else {
                    document.getElementById('loading_progress_bar').style.display = "block";
                }
            }.bind(this),
            deep: true
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

