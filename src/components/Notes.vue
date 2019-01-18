<template>

    <v-card transition="slide-x-transition card-main-bgcolor" >
        <v-toolbar class="card-main-bgcolor">
            <v-toolbar-title><h4>Notes</h4></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="toggleNotes" title="Toggle Notes">
                <v-icon ref="btn_toggle_notes">visibility_off</v-icon>
            </v-btn>
            <v-btn icon @click="dialogNotes = true" title="Add New Note">
                <v-icon>add_circle</v-icon>
            </v-btn>
        </v-toolbar>
        <v-layout row wrap v-if="newNote">
            <v-flex xs12>
                <v-form ref="form" v-model="valid" lazy-validation class="px-3 py-1"> 
                    <v-text-field
                        v-model="newNoteContent"
                        label="Name"
                        required></v-text-field>

                    <v-btn small v-bind:disabled="!valid" @click.prevent="addNewNote">submit</v-btn>
                </v-form>               
            </v-flex>
        </v-layout>

        <v-list ref="notes_list" class="hidden"> 
            <template v-for="(item, index) in items">
                <v-list-tile  :key="item.title" ripple>
                    <v-list-tile-content>
                        <small>{{ item.date }}</small>
                        <p>{{ item.content }}</p>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-btn icon><v-icon>edit</v-icon></v-btn>
                        <v-btn icon><v-icon>delete_forever</v-icon></v-btn>
                    </v-list-tile-action>
                </v-list-tile>

                <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>

            </template>
        </v-list>

        <!-- MODAL NEW NOTE -->
        <v-dialog v-model="dialogNotes" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">User Profile</span>
                </v-card-title>
                <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                            <v-text-field label="Legal first name*" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field
                            label="Legal last name*"
                            hint="example of persistent helper text"
                            persistent-hint
                            required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field label="Email*" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field label="Password*" type="password" required></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
                <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="dialogNotes = false">Close</v-btn>
                <v-btn color="blue darken-1" flat @click.native="dialogNotes = false">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
                
        <!-- MODAL NEW TASK -->
        <v-dialog v-model="dialogNotes" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">User Profile</span>
                </v-card-title>
                <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                            <v-text-field label="Legal first name*" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field
                            label="Legal last name*"
                            hint="example of persistent helper text"
                            persistent-hint
                            required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field label="Email*" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field label="Password*" type="password" required></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
                <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="dialogNotes = false">Close</v-btn>
                <v-btn color="blue darken-1" flat @click.native="dialogNotes = false">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-card>

</template>

<script>
export default {
    props: ["userNotes"],
    data: function() {
        return {
            newNote: false,
            newNoteContent: "",
            valid: true,
            dialogNotes: false,
            dialogTasks: false
        }
    },

    computed: {
        items () {
            return this.userNotes;
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
        },
        toggleNotes: function() {
            let notes_list = this.$refs.notes_list.$el;
            let btn_toggle_notes = this.$refs.btn_toggle_notes.$el;
            console.dir(btn_toggle_notes);
            if(notes_list.classList.contains("hidden")) {
                notes_list.classList.remove("hidden");
                btn_toggle_notes.innerText = "visibility";
            }else {
                notes_list.classList.add("hidden");
                btn_toggle_notes.innerText = "visibility_off";
            }

        }
    }
}

</script>


<style scoped>
    .v-list__tile__action .v-btn--icon {
        margin: -3px;
    }
    .auto-height {
        height: auto!important;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .v-list--two-line .v-list__tile {
        height: auto!important;
    }
    .v-list__tile__title, .v-list__tile__sub-title {
        white-space: normal;
        overflow: visible;
        text-overflow: initial;
    }
</style>
