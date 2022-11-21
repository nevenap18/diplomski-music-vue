<template>
  <div class="songs">
    <div class="title">
      <h1>SONGS</h1>
    </div>
    <SongItem v-for="(song, index) in songs" class="song" @playSong="$emit('playSong')" :key="index" :artist="artist" :item="song" />
    <span v-if="!songs.length" class="message">Sorry, no songs here.</span>
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
    methods: {
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
  font: $font-regular-bold;
  display: inline-block;
}
.message {
  color: $color-dull;
  font: $font-regular-bold;
}
</style>
