<template>
    <div>
        <v-navigation-drawer v-model="sideNav">
            <v-list>
                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon>supervisor_account</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>Home</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon>supervisor_account</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>Timeline</v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar>
            <v-toolbar-side-icon  @click.native.stop="sideNav = !sideNav"></v-toolbar-side-icon>
            <v-toolbar-title>Title</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn flat><router-link to="/">Home</router-link></v-btn>
                <v-btn flat><router-link to="/timeline">TimeLine</router-link></v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </div>
</template>

<script>
export default {
    name: 'navbar',
    data: function() {
        return {
            sideNav: false
        }
    }
}
</script>
