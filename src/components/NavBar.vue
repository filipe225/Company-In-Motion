<template>
    <v-layout>
        <v-navigation-drawer absolute temporary v-model="sideNav">
            <v-list>
                <v-list-tile v-for="(menuItem, i) in menuItems" v-bind:key=i router v-bind:to="menuItem.link">
                    <v-list-tile-action>
                        <v-icon>{{ menuItem.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>{{ menuItem.title }}</v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar color="orange darken-3" dark>
            <v-toolbar-side-icon class="hidden-md-and-up" @click.native.stop="sideNav = !sideNav"></v-toolbar-side-icon>
            <v-toolbar-title>
                <router-link to="/" tag="span" style="cursor: pointer"> Title </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down" >
                <v-btn flat v-for="(menuItem, i) in menuItems" v-bind:key=i router v-bind:to="menuItem.link">{{ menuItem.title }}</v-btn>
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
        { icon: "supervisor_account", title: "Tasks", link: "/tasks" },
        { icon: "supervisor_account", title: "Project", link: "/project" },        
        { icon: "supervisor_account", title: "Timeline", link: "/timeline" },
        { icon: "supervisor_account", title: "Sign In", link: "/signin" }

      ]
    };
  }
};
</script>
