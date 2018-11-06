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
        sideNav: false
        };
    },

    computed: {
        menuItems: function() {
            let menuItems = [];
            if(this.isUserAuthenticated) {
                menuItems = [
                    { icon: "supervisor_account", title: "Tasks", link: "/tasks" },
                    { icon: "supervisor_account", title: "Project", link: "/project" },        
                    { icon: "supervisor_account", title: "Timeline", link: "/timeline" },
                    { icon: "supervisor_account", title: "Sign Out", link: "/signout" }
                ]
            }else {
                menuItems = [
                    { icon: "supervisor_account", title: "About Us", link: "/about_us" },  
                    { icon: "supervisor_account", title: "Contact Us", link: "/contact_us" },
                    { icon: "supervisor_account", title: "Sign In", link: "/signin" }
                ]
            }
            return menuItems;
        },
        isUserAuthenticated: function() {
            return this.$store.getters.isUserAuthenticated;
        }
    },
    
    created: function() {

    },
     
    methods: {

    },

    watch: {}


};
</script>
