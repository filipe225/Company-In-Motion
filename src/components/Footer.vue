<template>
    <v-container fluid style="padding: 0;">
        <v-footer dark height="auto">
            <v-card class="flex" flat tile>
                <v-card-title class="teal">
                    <strong class="subheading">
                        <v-layout row wrap>
                            <v-flex xs12 sm7>
                                Do you use this website regularly?<br/>
                                Then consider donating. It would help me to continue to improve its features.
                            </v-flex>
                            <v-flex xs12 sm5>
                                <v-btn large class="indigo darken-1">DONATE</v-btn>
                            </v-flex>
                        </v-layout>
                    </strong>

                    <v-spacer></v-spacer>

                    <v-btn
                        v-for="link in links"
                        :key="link"
                        color="white"
                        flat
                        round>
                        {{ link }}
                    </v-btn>
                </v-card-title>

                <v-card-actions class="grey darken-3 justify-center">
                    &copy; 2018 — {{ new Date().getFullYear() }}
                    <strong>
                        <v-btn flat href="www.linkedin.com" style="text-decoration: underline;">@ Filipe Sousa</v-btn>
                    </strong>
                </v-card-actions>
            </v-card>
        </v-footer>
    </v-container>
</template>

<script>
  export default {
    data: () => ({
        links: [
            'Home',
            'About Us',
            'Contact Us'
        ]
    })
  }
</script>