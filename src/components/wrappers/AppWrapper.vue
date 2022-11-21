<template>
  <div id="app-wrapper">
    <navigation/>
    <!-- <Header/> -->
    <svgs/>
    <router-view class="view" v-if="loaded"></router-view>
    <AddToPlaylistModal v-if="showAddPlaylistModal"/>
    <CreatePlaylistWrap v-if="showCreatePlaylistModal"/>
    <EditPlaylistModal v-if="showEditPlaylistModal"/>
    <Player v-if="getCurrentSong"/>
  </div>
</template>

<script>
import Navigation from '../components/Navigation.vue'
import AddToPlaylistModal from '../modals/AddToPlaylistModal.vue'
import CreatePlaylistWrap from '../modals/CreatePlaylistWrap.vue'
import EditPlaylistModal from '../modals/EditPlaylistModal.vue'
import Svgs from '../svg/Svgs'
import Player from '../components/Player.vue';
import {mapActions, mapGetters} from 'vuex'
// import Header from '../components/Header.vue'
export default {
  name: 'AppWrapper',
  components: {
    Navigation,
    Svgs,
    AddToPlaylistModal,
    CreatePlaylistWrap,
    EditPlaylistModal,
    Player
    // Header
  },
  computed: {
    ...mapGetters([
      'showAddPlaylistModal', 'showCreatePlaylistModal', 'showEditPlaylistModal', 'getCurrentSong'
    ])
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
  background: $background;
  position: relative;
  display: flex;
  height: 100vh;
  max-height: 100%;
  z-index: 450;
}
</style>
