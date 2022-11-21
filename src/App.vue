<template>
  <div id="app">
    <router-view></router-view>
    <!-- <Player v-if="getCurrentSong"/> -->
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
// import Player from './components/components/Player.vue';
export default {
  name: 'App',
  components: {
    // Player
  },
  computed: {
    ...mapGetters([
      'getCurrentSong'
    ])
  },
}
</script>

<style>
#app {
  font-family: 'Inter-Regular', sans-serif;
}
html, body {
  height: 100%;
  margin: 0;
}
</style>
