<template>
  <div id="app-wrapper">
    <navigation/>
    <!-- <Header/> -->
    <svgs/>
    <router-view v-if="loaded"></router-view>
  </div>
</template>

<script>
import Navigation from '../components/Navigation.vue'
import Svgs from '../svg/Svgs'
import {mapActions} from 'vuex'
// import Header from '../components/Header.vue'
export default {
  name: 'AppWrapper',
  components: {
    Navigation,
    Svgs,
    // Header
  },
  methods: {
    ...mapActions([
      'getFavorites', 'getProfile'
    ])
  },
  data () {
    return {
      loaded: false
    }
  },
  async created () {
    await this.getFavorites()
    await this.getProfile()
    this.loaded = true
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
#app-wrapper {
  background: $cream;
  position: relative;
  height: 100vh;
  max-height: 100%;
  z-index: 450;
  overflow-y: scroll;
}
</style>
