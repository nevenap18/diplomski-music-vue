<template>
  <div class="songs">
    <div class="title">
      <h1>SONGS</h1>
    </div>
    <SongItem v-show="index < maxVisibleSongs" v-for="(song, index) in songs" class="song" @playSong="$emit('playSong')" :key="index" :artist="artist" :item="song" />
    <span v-if="!songs.length" class="message">Sorry, no songs here.</span>
    <div
      v-if="songs && songs.length > maxVisibleSongs  && !hideShowMoreSongsButton"
      class="show-more"
      @click="showMoreSongs()"
    >
      {{'&#11167;'}}
    </div>
  </div>
</template>

<script>
import SongItem from './SongItem.vue';
  export default {
    name: 'SongList',
    components: {
      SongItem
    },
    props: {
      songs: {
        type: Array,
        required: true
      },
      artist: {
        type: Object,
        required: false,
        default: null
      }
    },
    data () {
      return {
        maxVisibleSongs: 5,
        hideShowMoreSongsButton: false
      }
    },
    methods: {
      showMoreSongs() {
        const addMoreNum = 5
        if (this.maxVisibleSongs < this.songs.length) {
          this.maxVisibleSongs += addMoreNum
          if (this.maxVisibleSongs >= this.songs.length) {
            this.hideShowMoreSongsButton = true
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
.songs {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title {
  margin-bottom: 15px;
  margin-top: 35px;
  color: $font-normal;
  font: var(--font-regular-bold);
  display: inline-block;
}
.message {
  color: $color-dull;
  font: var(--font-regular-bold);
}
.show-more {
  color: $color-normal;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  min-width: 300px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    transition: $transition;
    color: $color-accent;
  }
}
</style>
