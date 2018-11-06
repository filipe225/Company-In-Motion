<template>

    <v-card transition="slide-x-reverse-transition">
        
        <v-toolbar color="orange darken-2" dark>
            <v-toolbar-title>Tasks</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon><v-icon>add_circle</v-icon></v-btn>
        </v-toolbar>

        <v-list two-line>
          <template v-for="(item, index) in items">
            <v-list-tile :key="item.title" avatar ripple>
                <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ item.content }}</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                    <v-list-tile-action-text>{{ item.date }}</v-list-tile-action-text>
                    <v-list-tile-action-text>{{ item.deadline }}</v-list-tile-action-text>
                    <v-list-tile-action-text>{{ item.status }}</v-list-tile-action-text>
                </v-list-tile-action>

            </v-list-tile>
            <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
          </template>
        </v-list>

    </v-card>

</template>

<script>
export default {
    data() {
        return {};
    },

    computed: {
        items () {
            return this.$store.getters.getTasks;
        }
    },

    created: function() {
        console.log(this.$store);
    },

    methods: {
        toggle(index) {
            const i = this.selected.indexOf(index);

            if (i > -1) {
            this.selected.splice(i, 1);
            } else {
            this.selected.push(index);
            }
        }
    }
};
</script>