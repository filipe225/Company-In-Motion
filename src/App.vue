<template>
  <div id="app">
      <navbar></navbar>
      <router-view />
  </div>
</template>

<style>
    .container.grid-list-md .layout .flex {
        padding: 4px;
        height: fit-content;
        max-height: 100%;
    }
    .texto-primario {
        color: black!important;
    }
    .texto-secundario {
        color: rgba(0, 0, 0, 0.6);
    }
</style>


<!--
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
-->