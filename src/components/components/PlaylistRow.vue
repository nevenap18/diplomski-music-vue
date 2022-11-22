<template>
  <div class="playlist">
    <div class="info">
      <div class="title" @click="goToPlaylist">{{playlist.title}}</div>
      <div class="count">{{songCount}} {{countText}}</div>
    </div>
    <div class="actions">
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
    },
    num: {
      type: Number,
      required: true
    }
  },
  computed: {
    isInPlaylist () {
      return !!this.playlist.songs.find(songId => songId === this.songId)
    },
    songCount () {
      if (this.playlist.songs && this.playlist.songs.length) {
        return this.playlist.songs.length
      } else {
        return '0'
      }
    },
    countText () {
      if (this.songCount === 1) {
        return 'song'
      } else {
        return 'songs'
      }
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
        this.$router.push({name: 'Playlist', params: {id: this.playlist.id}})
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
  margin: 0 15px;
  font: var(--font-medium);
  color: $font-normal;
  border-bottom: 1px solid $color-dull;
}
.title {
  cursor: pointer;
  &:hover {
    transition: $transition;
    color: $font-accent;
  }
}
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.count {
  font: var(--font-regular);
  color: $font-dull;
}
svg {
  width: 20px;
  height: 20px;
  fill: $color-normal;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    transition: $transition;
    fill: $color-accent;
  }
}
@media (min-width: 2000px) {
  svg {
    width: 30px;
    height: 30px;
  }
  .close-svg {
    width: 40px;
    height: 40px;
  }
}
</style>
