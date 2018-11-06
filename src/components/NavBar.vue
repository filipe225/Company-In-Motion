<template>
    <v-layout>
        <v-navigation-drawer absolute temporary v-model="sideNav">
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
            <v-toolbar-side-icon class="hidden-md-and-up" @click.native.stop="sideNav = !sideNav"></v-toolbar-side-icon>
            <v-toolbar-title>
                <router-link to="/" tag="span" style="cursor: pointer"> Title </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn flat><router-link to="/" tag="span">Home</router-link></v-btn>
                <v-btn flat><router-link to="/timeline" tag="span">TimeLine</router-link></v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </v-layout>
</template>

<script>
export default {
  name: "navbar",
  data: function() {
    return {
      sideNav: false,
      menuItems: [
        { icon: "supervisor_account", title: "Tasks", link: "" },
        { icon: "supervisor_account", title: "Project", link: "" },
        { icon: "supervisor_account", title: "Sign In", link: "" },
        { icon: "supervisor_account", title: "Register", link: "" }
      ]
    };
  }
};
</script>
