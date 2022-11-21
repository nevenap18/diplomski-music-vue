
<template>
  <div :class="{hidden: showCreatePlaylistModal}" class="container" @click.self="closeAddPlaylistModal">
    <div class="edit-modal">
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
          :num="index+1"
          :songId="playlistModalData.songId"
          :playlist="playlist"
          @closePopup="closeAddPlaylistModal"
        />
      </div>
      <Button styleType="accent" label="Create playlist" @click.native="openCreatePlaylistModal"></Button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import PlaylistRow from '@/components/components/PlaylistRow'
import Button from '../components/Button.vue'
export default {
  name: 'AddToPlaylistModal',
  data () {
    return {
    }
  },
  components: {
    PlaylistRow,
    Button
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
.edit-modal {
  padding: 20px;
  border-radius: 3px;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  background: $background-alternate;
  width: 30vw;
  max-width: 500px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: $radius;
}
.container-top {
  width: 100%;
  display: flex;
  height: 50px;
  justify-content: center;
  align-items: center;
  position: relative;
  font: $font-medium-bold;
  color: $font-normal;
  margin-bottom: 50px;
}
.playlists {
  width: 80%;
  max-height: 400px;
  overflow-y: auto;
}
::-webkit-scrollbar {
  width: 7px;
}

/* Track */
::-webkit-scrollbar-track {
  background: $background-alternate;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: $color-normal;
  border-radius: 4px;
}
button {
  display: block;
  width: 80%;
  margin-top: 24px;
  margin-bottom: 50px;
}
.hidden {
  visibility: hidden;
}
.close-svg {
  position: absolute;
  top: 7px;
  right: 7px;
  width: 35px;
  height: 35px;
  fill: $color-normal;
  margin-left: 10px;
  cursor: pointer;
}
.error {
  color: $error;
  &:first-letter {
    text-transform: uppercase;
  }
}
</style>
