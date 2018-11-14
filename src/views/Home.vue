<template>
    <v-layout>
        <v-container fluid>
            HOME
            <v-menu offset-y>
                <v-btn
                    slot="activator"
                    color="primary"
                    dark>
                    Dropdown
                </v-btn>
                <v-list>
                    <v-list-tile
                        v-for="(item, index) in items"
                        :key="index">
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-container>
    </v-layout>

<!--     <v-container fluid grid-list-md>
        <v-layout row wrap>
            <v-flex xs12> 
                HOME
            </v-flex>
        </v-layout>
    </v-container> -->
</template>

<script>
export default {
  name: "home",
  data: function() {
    return {
      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" }
      ]
    };
  },
  components: {}
};
</script>
