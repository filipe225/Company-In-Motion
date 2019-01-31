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
                <v-list-tile v-if="isUserAuthenticated" router v-bind:to="'/user_list/cWzernzqOQV7A3IV8IAeipK86iU2'" style="cursor: pointer;">
                    <v-list-tile-action>
                        <v-icon class="pr-1">how_to_reg</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>Profile</v-list-tile-content>                       
                </v-list-tile>
                <v-list-tile style="cursor: pointer;">
                    <v-list-tile-action  @click="userLogout">
                        <v-icon class="pr-1">exit_to_app</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>Sign Out</v-list-tile-content>                       
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app color="teal" dark>
            <v-toolbar-side-icon class="hidden-md-and-up" @click.native.stop="sideNav = !sideNav"></v-toolbar-side-icon>
            <v-toolbar-title>
                <router-link to="/" tag="span" style="cursor: pointer"> Company In Motion </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down" >
                <v-btn flat v-for="(menuItem, i) in menuItems" v-bind:key=i router v-bind:to="menuItem.link">
                    <v-icon class="pr-1">{{ menuItem.icon }}</v-icon>
                    {{ menuItem.title }}
                </v-btn>
                <v-btn flat v-if="isUserAuthenticated">
                    <v-menu open-on-hover bottom offset-y z-index="9999">
                        <v-btn slot="activator" color="teal" flat dark>
                            <img width="50" 
                                src="https://firebasestorage.googleapis.com/v0/b/companysimplify-1992.appspot.com/o/users_avatars%2Fdefault%2Fuser_avatar_default.png?alt=media&token=b6883e32-5b03-48d2-9d9a-3c802e0e359b" alt="avatar"> <!-- getUserDb.avatar -->
                        </v-btn>

                        <v-list color="teal" dark>
                            <v-list-tile :to="'/users_profile/' + userDB.id">
                                <v-list-tile-action>
                                    <v-icon class="pr-1">how_to_reg</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>Profile</v-list-tile-content>                       
                            </v-list-tile>
                            <v-list-tile  @click="userLogout">
                                <v-list-tile-action>
                                    <v-icon class="pr-1">exit_to_app</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>Sign Out</v-list-tile-content>                       
                            </v-list-tile>
                        </v-list>
                    </v-menu>
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
                    { icon: "dashboard", title: "Dashboard", link: "/dashboard" },
                    { icon: "supervisor_account", title: "Relax", link: "/relax" },
                    { icon: "assignment", title: "Tasks", link: "/tasks" },
                    { icon: "supervisor_account", title: "Projects", link: "/projects" },        
                    /*{ icon: "receipt", title: "Budget", link: "/projects/project_name/budget" },*/

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
        },
        userDB: function() {
            if(this.isUserAuthenticated)
                return this.$store.getters.getUserDB;
            else return null;
        }
    },
    
    created: function() {

    },

    mounted: function() {
        console.log(this.isUserAuthenticated);
        console.log(this.userDB);
    },
     
    methods: {
        userLogout: function() {
            this.$store.dispatch('firebaseUserLogout');
            this.$router.push('/');
        }
    },

    watch: {}


};
</script>
