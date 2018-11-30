<template>
    <v-layout>
        <v-navigation-drawer absolute temporary v-model="sideNav" app>
            <v-list>
                <v-list-tile v-for="(menuItem, i) in menuItems" v-bind:key=i router v-bind:to="menuItem.link" style="cursor: pointer;">
                    <v-list-tile-action>
                        <v-icon class="pr-1">{{ menuItem.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>{{ menuItem.title }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-if="isUserAuthenticated" @click="userLogout">
                    <v-list-tile-action>
                        <v-icon class="pr-1">exit_to_app</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>Sign Out</v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app color="primary" dark>
            <v-toolbar-side-icon class="hidden-md-and-up" @click.native.stop="sideNav = !sideNav"></v-toolbar-side-icon>
            <v-toolbar-title>
                <router-link to="/" tag="span" style="cursor: pointer"> Company Simplicity </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down" >
                <v-btn flat v-for="(menuItem, i) in menuItems" v-bind:key=i router v-bind:to="menuItem.link">
                    <v-icon class="pr-1">{{ menuItem.icon }}</v-icon>
                    {{ menuItem.title }}
                </v-btn>
                <v-btn flat v-if="isUserAuthenticated" @click="userLogout"> 
                    <v-icon class="pr-1">exit_to_app</v-icon>
                    Sign Out
                </v-btn>
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
            user: null,
            user_type: null
        };
    },

    computed: {
        menuItems: function() {
            let menuItems = [];
            if(this.isUserAuthenticated) {
                menuItems = [
                    { icon: "supervisor_account", title: "Relax", link: "/relax" },
                    { icon: "assignment", title: "Tasks", link: "/tasks" },
                    { icon: "supervisor_account", title: "Projects", link: "/projects" },        
                    { icon: "receipt", title: "Budget", link: "/projects/project_name/budget" },

                ]
            }else {
                menuItems = [
                    { icon: "supervisor_account", title: "Relax", link: "/relax" },
                    { icon: "supervisor_account", title: "About Us", link: "/about_us" },  
                    { icon: "contact_support", title: "Contact Us", link: "/contact_us" },
                    { icon: "assignment_ind", title: "Sign In", link: "/signin" },
                    { icon: "supervisor_account", title: "Register", link: "/register" }
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
        userLogout: function() {
            this.$store.dispatch('firebaseUserLogout');
        }
    },

    watch: {}


};
</script>
