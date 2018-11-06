<template>

    <v-card>
        <v-toolbar color="orange darken-1" dark>
            <v-toolbar-title>Notes</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="showNewNoteForm">
                <v-icon>add_circle</v-icon>
            </v-btn>
        </v-toolbar>
        <v-layout row v-if="newNote">
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                    v-model="newNoteContent"
                    label="Name"
                    required></v-text-field>
               
                <v-btn :disabled="!valid" @click.prevent="addNewNote">submit</v-btn>
                <v-btn @click="clear">clear</v-btn>
            </v-form>
        </v-layout>

        <v-list two-line>
          <template v-for="(item, index) in items">
            <v-list-tile :key="item.title" avatar ripple>

                <v-list-tile-content>
                    <v-list-tile-action>{{ item.date }}</v-list-tile-action>
                    <v-list-tile-action-text>
                        <v-card-text> {{ item.content }} </v-card-text>
                    </v-list-tile-action-text>
                </v-list-tile-content>

            </v-list-tile>

            <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
          </template>
        </v-list>
    </v-card>

</template>

<script>
export default {
    data () {
        return {
            newNote: true,
            newNoteContent: "",
            valid: true
        }
    },

    computed: {
        items () {
            return this.$store.getters.getNotes
        }
    },

    created: function() {

    },

    methods: {
        addNewNote: function() {
            //if (this.$refs.form.validate()) {}
            console.log(this.newNoteContent);
            alert("hehe");
        },
        showNewNoteForm: function() {
            this.newNote = !this.newNote;
        },
        clear: function() {
            this.$refs.form.reset()
        }
    }
}

</script>