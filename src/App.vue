<template>
  <!-- <TrackinPage/> -->
  <ThreeCube/>
</template>

<script>
// import TrackinPage from './components/tracking/TrackinPage01.vue'
import ThreeCube from './components/three/ThreeCube.vue';
export default {
  name: 'App',
  components: {
    // TrackinPage,
    ThreeCube
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
