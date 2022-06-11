<template>
  <div class="song">
    <div class="info">
      <span><span class="artist" @click="goToArtist">{{artist.name}}</span> - {{song.title}}</span>
    </div>
    <div class="actions">
      <svg
        :class="{active: isInFavorites}"
        class="fav-svg"
        @click="addRemoveFavSong"
      >
        <use href="#heart"></use>
      </svg>
      <svg
        class="add-svg"
        @click="addToPlaylist"
      >
        <use href="#add"></use>
      </svg>
      <svg class="play-svg">
        <use href="#play"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'Song',
  props: {
    song: {
      type: Object,
      required: true
    },
    artist: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'favoriteSongs'
    ]),
    isInFavorites () {
      return this.favoriteSongs.find(id => id === this.song.songId)
    }
  },
  methods: {
    ...mapActions([
      'addRemoveFavoriteSong', 'openAddPlaylistModal'
    ]),
    goToArtist () {
      this.$router.push({name: 'Artist', props: {id: this.artist.artistId}})
    },
    async addRemoveFavSong () {
      try {
        await this.addRemoveFavoriteSong({favId: this.song.songId, value: !this.isInFavorites})
      } catch (e) {
        console.log(e)
      }
    },
    addToPlaylist () {
      this.openAddPlaylistModal({
        songId: this.song.songId
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
.song {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font: $font-regular;
  color: $forest;
  border-bottom: 1px solid $moss;
}
.artist {
  cursor: pointer;
  &:hover {
    color: $moss;
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
  fill: $moss;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    fill: $forest;
  }
}
.fav-svg {
  &.active {
    fill: red;
  }
}
</style>
