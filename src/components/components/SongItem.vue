<template>
  <div class="song">
    <div class="info-container">
      <div class="image">
        <img :alt="item.title" class="image" :src="item.imageUrl"/>
      </div>
      <div class="info">
        <div class="title" @click="playSong">{{item.title}}</div>
      </div>
    </div>
    <div class="artist" @click="goToArtist">{{getArtist.name}}</div>
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
      <svg class="play-svg" @click="playSong">
        <use href="#play"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'SongItem',
  components: {
    // Card
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    artist: {
      type: Object,
      required: false,
      default: null
    }
  },
  computed: {
    ...mapGetters([
      'favoriteSongs'
    ]),
    isInFavorites () {
      return !!this.favoriteSongs.find(id => id === this.item.songId)
    },
    getArtist () {
      return this.artist ? this.artist : this.item.artist
    }
  },
  methods: {
    ...mapActions([
      'updateCurrentSong', 'addRemoveFavoriteSong', 'openAddPlaylistModal'
    ]),
    goToArtist () {
      this.$router.push({name: 'Artist', params: {id: this.item.artistId}})
    },
    async addRemoveFavSong () {
      try {
        await this.addRemoveFavoriteSong({favId: this.item.songId, value: !this.isInFavorites})
      } catch (e) {
        console.log(e)
      }
    },
    addToPlaylist () {
      this.openAddPlaylistModal({
        songId: this.item.songId
      })
    },
    playSong () {
      this.$emit('playSong')
      this.updateCurrentSong({song: this.item, artist: this.getArtist})
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
  font: var(--font-medium);
  color: $color-normal;
  border-bottom: 1px solid $color-dull;
}
.image {
  width: 50px;
  height: 50px;
  margin-right: 20px;
}
.info-container {
  display: flex;
  align-items: center;
  font: var(--font-medium-bold);
  width: 30%;
}
.title {
  color: $font-normal;
  &:hover {
    cursor: pointer;
    transition: $transition;
    color: $color-accent;
  }
}
.artist {
  cursor: pointer;
  color: $font-dull;
  &:hover {
    transition: $transition;
    color: $color-dull-hover;
  }
}
.actions {
  display: flex;
  align-items: center;
  gap: 15px;
}
svg {
  width: 21px;
  height: 21px;
  fill: $color-normal;
  cursor: pointer;
  &:hover {
    transition: $transition;
    fill: $color-accent;
  }
}
.fav-svg {
  &.active {
    fill: $favorite;
    &:hover {
      transition: $transition;
      fill: $favorite-hover;
    }
  }
  &:hover {
    transition: $transition;
    fill: $color-normal;
  }
}
@media (min-width: 2000px) {
  svg {
    width: 28px;
    height: 28px;
  }
}
</style>
