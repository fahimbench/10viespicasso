<template>
  <div id="app">
    <Game/>
  </div>
</template>

<script>
  import Game from './components/Game.vue'

  export default {
    name: 'App',
    components: {
      Game
    }
  }
</script>

<style>
  body {
    margin:0;
    padding: 0;
    overflow: hidden;
  }
  #app {
    font-family: Alice, 'Crush Shine', Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
