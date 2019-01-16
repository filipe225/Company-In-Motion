<template>
    <div id="app">
        <v-app>
            <navbar></navbar>
            <v-content>
                <my-alert></my-alert>
                <router-view />
            </v-content>
            <footer-bar></footer-bar>          
        </v-app>
    </div>
</template>

<style>
    .container.grid-list-md .layout .flex {
        padding: 4px;
        height: fit-content;
        max-height: 100%;
    }

    .my-card {
        border-top: 4px solid #009688!important;
    }

    .bg-transparent {
        background-color: transparent!important;
    }

    .v-content {
        background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%);
        height: 100%;
    }

    .v-card {
        -webkit-box-shadow: 2px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 2px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
        box-shadow: 2px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 2px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
    }

    /* CENAS PARA APAGAR */
    .texto-primario {
        color: black!important;
    }
    .texto-secundario {
        color: rgba(0, 0, 0, 0.6);
    }

    .v-messages__message { color: red; }

    .coiso {
        background: #c850c0;
        background: -webkit-linear-gradient(45deg, #4158d0, #c850c0);
        background: -o-linear-gradient(45deg, #4158d0, #c850c0);
        background: -moz-linear-gradient(45deg, #4158d0, #c850c0);
        background: linear-gradient(45deg, #4158d0, #c850c0);
    }

    .coiso2 {
        background: rgb(105,155,200);
        background: -moz-radial-gradient(top left, ellipse cover, rgba(105,155,200,1) 0%, rgba(181,197,216,1) 57%);
        background: -webkit-gradient(radial, top left, 0px, top left, 100%, color-stop(0%,rgba(105,155,200,1)), color-stop(57%,rgba(181,197,216,1)));
        background: -webkit-radial-gradient(top left, ellipse cover, rgba(105,155,200,1) 0%,rgba(181,197,216,1) 57%);
        background: -o-radial-gradient(top left, ellipse cover, rgba(105,155,200,1) 0%,rgba(181,197,216,1) 57%);
        background: -ms-radial-gradient(top left, ellipse cover, rgba(105,155,200,1) 0%,rgba(181,197,216,1) 57%);
        background: radial-gradient(ellipse at top left, rgba(105,155,200,1) 0%,rgba(181,197,216,1) 57%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#699bc8', endColorstr='#b5c5d8',GradientType=1 );
    }

    .gorgeous-background {
        background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
    }

    form .container { padding-top: 0; }
</style>