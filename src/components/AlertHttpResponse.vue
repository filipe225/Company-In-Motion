<template>
    <v-alert v-model="show" dismissible class="fix-alert" v-bind:type="alertType">
        {{msg}}
    </v-alert>
</template>


<script>
export default {
    data: function() {
        return {
            show: false,
            msg: '',
            alertType: 'info'
        }
    },

    computed: {
        newHttpCall: function() {
            return this.$store.getters.getHttpCallResponse;
        }
    },

    watch: {
        newHttpCall: {
            handler: function(value, oldValue) {
                //console.log('newHttpCall Watcher');
                //console.log(arguments);
                switch(value.response) {
                    case 200:
                        this.show = true;
                        this.msg = value.msg;
                        this.alertType = "success";
                        break;
                    case 500:
                        this.show = true;
                        this.msg = value.msg;
                        this.alertType = "error"
                        break;
                    default:
                        this.show = false;
                        this.alertType = "info"
                        break;
                }
                setTimeout(function() {
                    this.show = false;
                    this.msg = "";
                }.bind(this), 2000);
            },
            deep: true
        }
    },

    created: function() {
        console.log("coiso", this.newHttpCall);
    },

    methods: {

    }
}
</script>

<style scoped>
    .fix-alert {
        width: 60%;
        margin: 5px auto;
        padding: 10px 16px;
        max-height: 50px;
        border: 1px solid gray;
        background-color: lawngreen;
    }
</style>

