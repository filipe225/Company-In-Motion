
<template>
    <v-timeline>
        <v-timeline-item v-for="(event, i) in events" :color="event.color" :key="i" small>
        <span slot="opposite" :class="`headline font-weight-bold ${event.color}--text`" v-text="event.date"></span>
        <div class="py-3">
            <!--<h2 :class="`headline font-weight-light mb-3 ${event.color}--text`">{{ event.date }}</h2>-->
            <div>
                <p>{{ event.event }}</p>.
            </div>
        </div>
        </v-timeline-item>
    </v-timeline>
</template>

<script>
export default {
    name: 'project-timeline',
    data: () => ({
        events: [
            {
                color: 'cyan',
                date: new Date().toDateString('yyyy-MM-dd hh:mm:ss'),
                event: 'Project Cargobid created'
            },
            {
                color: 'green',
                date: new Date().toDateString('yyyy-MM-dd hh:mm:ss'),
                event: 'File #1 to Approval'
            },
            {
                color: 'pink',
                date: new Date().toDateString('yyyy-MM-dd hh:mm:ss'),
                event: 'File #2 to Approval'
            },
            {
                color: 'amber',
                date: new Date().toDateString('yyyy-MM-dd hh:mm:ss'),
                event: 'Approved File #1'
            },
            {
                color: 'orange',
                date: new Date().toDateString('yyyy-MM-dd hh:mm:ss'),
                event: 'Approved File #2'
            }
            ]
    }),

    computed: {

    },

    created: function() {

    },

    methods: {

    }
}
</script>