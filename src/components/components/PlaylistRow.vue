<template>
  <div class="playlist">
    <div class="info">
      <span class="title" @click="goToPlaylist">{{playlist.title}}</span>
    </div>
    <div class="actions">
      {{isInPlaylist}}
      <svg
        class="add-svg"
        @click="addRemoveFromPlaylist"
      >
        <use :href="isInPlaylist ? '#check' : '#add'"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'PlaylistRow',
  props: {
    playlist: {
      type: Object,
      required: true
    },
    songId: {
      type: Number,
      required: true
    }
  },
  computed: {
    isInPlaylist () {
      return !!this.playlist.songs.find(songId => songId === this.songId)
    }
  },
  methods: {
    ...mapActions([
      'addRemoveFavoriteSong', 'addRemoveSongFromPlaylist'
    ]),
    goToPlaylist () {
      if (this.$route.name === 'Playlist' && parseInt(this.$route.params.id, 10) === this.playlist.id) {
        return
      } else {
        this.$router.push({name: 'Playlist', props: {id: this.playlist.id}})
      }
      this.$emit('closePopup')
    },
    async addRemoveFromPlaylist () {
      try {
        await this.addRemoveSongFromPlaylist({
          action: !this.isInPlaylist,
          playlistId: this.playlist.id,
          songId: this.songId
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
.playlist {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font: $font-regular;
  color: $cream;
  border-bottom: 1px solid $cream;
}
.title {
  cursor: pointer;
  &:hover {
    color: $cream;
  }
}
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
svg {
  width: 17px;
  height: 17px;
  fill: $cream;
  margin-left: 10px;
  cursor: pointer;
}
</style>
