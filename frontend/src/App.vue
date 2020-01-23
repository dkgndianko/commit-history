<template>
  <div id="app">
    <commit-index/>
  </div>
</template>

<script>
import CommitIndex from './components/CommitIndex.vue'

export default {
  name: 'app',
  components: {
    CommitIndex
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
