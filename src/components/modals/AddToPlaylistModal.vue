<template>
  <div class="container" @click.self="closeModal">
    <div class="modal">
      <div class="container-top">
        <svg
          class="close-svg"
          @click="closeAddPlaylistModal"
        >
          <use href="#close"></use>
        </svg>
        <div class="modal-name"> PLAYLISTS </div>
      </div>
      <div class="playlists" v-if="playlistsList.length > 0">
        <PlaylistRow
          v-for="(playlist, index) in playlistsList"
          :key="index"
          :songId="playlistModalData.songId"
          :playlist="playlist"
          @closePopup="closeAddPlaylistModal"
        />
      </div>
      <div class="create">
        <button class="button-create" @click="openCreatePlaylistModal">Create Playlist</button>
      </div>
    </div>
    <CreatePlaylistModal v-if="showCreatePlaylistModal" />
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import PlaylistRow from '@/components/components/PlaylistRow'
import CreatePlaylistModal from '@/components/modals/CreatePlaylistModal'
export default {
  name: 'AddToPlaylistModal',
  data () {
    return {
    }
  },
  components: {
    PlaylistRow,
    CreatePlaylistModal
  },
  computed: {
    ...mapGetters([
      'playlistModalData', 'playlistsList', 'showCreatePlaylistModal'
    ])
  },
  methods: {
    ...mapActions([
      'closeAddPlaylistModal', 'getPlaylists', 'openCreatePlaylistModal', 'closeCreatePlaylistModal'
    ]),
    closeModal () {
      if (this.showCreatePlaylistModal) {
        this.closeCreatePlaylistModal()
        return
      }
      this.closeAddPlaylistModal()
    }
  },
  async created () {
    try {
      await this.getPlaylists()
      // this.$nextTick(() => {
      console.log(this.playlistsList)
      // })
    } catch (e) {
      console.log(e)
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
.modal {
  padding: 20px;
  border-radius: 3px;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  background: $moss;
  width: 40vw;
  height: 60vh;
  max-height: 800px;
  max-width: 500px;
  min-height: 400px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.playlists {
  max-height: 500px;
  width: 100%;
  overflow-y: auto;
}
.container-top {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.svg {
  align-self: center;
}
svg {
  width: 17px;
  height: 17px;
  fill: $cream;
  margin-left: 10px;
  cursor: pointer;
}
button {
  display: inline-block;
  padding: 10px 30px;
  margin-right: 15px;
  background: transparent;
  border: transparent;
  border-radius: 4px;
  background: $forest;
  font: $font-regular;
  color: $cream;
  cursor: pointer;
}
</style>
