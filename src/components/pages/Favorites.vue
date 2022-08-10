<template>
  <div>
    <div class="albums-container">
      <div class="title"><h1>FAVORITE ALBUMS</h1></div>
      <div class="collection">
        <albums-results v-for="(item, index) in favoriteAlbumsList" :key="index" :item="item" :index="index"/>
      </div>
    </div>
    <div class="albums-container">
      <div class="title"><h1>FAVORITE SONGS</h1></div>
      <div class="collection">
        <songs-results v-for="(item, index) in favoriteSongsList" :key="index" :item="item"/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import AlbumsResults from '../components/AlbumsResults.vue'
import SongsResults from '../components/SongsResults.vue'
export default {
  name: 'Albums',
  components: {
    SongsResults,
    AlbumsResults
  },
  computed: {
    ...mapGetters([
      'favoriteSongsList', 'favoriteAlbumsList'
    ])
  },
  data () {
    return {
      loaded: false
    }
  },
  methods: {
    ...mapActions([
      'getFavorites'
    ])
  },
  async created () {
    await this.getFavorites()
    this.$nextTick(() => {
      console.log('ALUBUMS', this.favoriteSongs)
      this.loaded = true
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.title {
  margin: 30px 0;
  color: $forest;
  font: $font-regular-bold;
  display: inline-block;
}
.collection {
}
</style>

