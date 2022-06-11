<template>
  <div class="container" @click.self="closeModal">
    <CreatePlaylistModal />
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import CreatePlaylistModal from '@/components/modals/CreatePlaylistModal'
export default {
  name: 'CreatePlaylistWrap',
  data () {
    return {
    }
  },
  components: {
    CreatePlaylistModal
  },
  computed: {
    ...mapGetters([
      'playlistModalData', 'playlistsList', 'showCreatePlaylistModal'
    ])
  },
  methods: {
    ...mapActions([
      'closeCreatePlaylistModal'
    ]),
    closeModal () {
      this.closeCreatePlaylistModal()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
.container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba($color: black, $alpha: 0.3);
  z-index: 522;
}
</style>
