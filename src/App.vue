<template>
 <ComponentePeliculas></ComponentePeliculas>
</template>

<script>
import ComponentePeliculas from './components/ComponentePeliculas.vue'

export default {
  name: 'App',
  components: {
    ComponentePeliculas
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
