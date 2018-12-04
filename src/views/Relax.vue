
<template>
    <v-container fluid>
        <audio controls>
            <source src="@/assets/relax_song.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
        <v-layout row>
            <v-flex xs12>
                <div ref="div_background_content" class="background-content" style="width: 100vw; height: 100vh"></div>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
export default {
    data: function() {
        return {}
    },

    created: function() {
        this.changeBackground();
    },

    methods: {
        changeBackground: function() {
            console.log(this.$refs);

            let el = this.$refs.div_background_content;
            console.log(el);
            setTimeout(function() {
                this.$refs.div_background_content.style.backgroundImage = "none";
                //this.$refs.div_background_content.style.-webkit-transition: background-image 0.2s ease-in-out;
                this.$refs.div_background_content.style.transition = "background-image 1s ease-in-out";
                //this.$router.push( {path: '/projects'});
            }.bind(this), 2000);



        }
    }
}
</script>

<style scoped>

.background-content {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to top, #fcc5e4 0%, #fda34b 15%, #ff7882 35%, #c8699e 52%, #7046aa 71%, #0c1db8 87%, #020f75 100%);
}

</style>

