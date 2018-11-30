
<template>
    <v-timeline>
        <v-timeline-item v-for="(event, i) in events" color="blue" :key="i" small>
        <span slot="opposite" :class="`headline font-weight-bold purple--text`" v-text="new Date(event.created_in).toDateString('yyyy-MM-dd')"></span>
        <div class="py-3">
            <!--<h2 :class="`headline font-weight-light mb-3 ${event.color}--text`">{{ event.date }}</h2>-->
            <div>
                <p>{{ event.title }}</p>.
            </div>
        </div>
        </v-timeline-item>
    </v-timeline>
</template>

<script>
export default {
    name: 'project-timeline',
    props: ['events'],
    data: () => {
        return {
            events: this.events,
            colors: ['blue', 'green', 'red', 'purple', 'pink', 'orange', 'yellow']      
        }
    },

    computed: {

    },

    created: function() {

    },

    mounted: function() {
        console.log(this.projectEvents);
        console.log(this.colors[0])
    },

    methods: {

    }
}
</script>