<template>
  <div>
    <div class="container">
      <div class="title"><h1>FAVORITE SONGS</h1></div>
      <div v-if="favoriteSongsList && favoriteSongsList.length" class="collection">
        <SongItem
          v-for="(item, index) in favoriteSongsList"
          :key="index"
          :item="item"
          v-show="index < maxVisibleSongs"
          @playSong="setPlayContent"
        />
      </div>
      <div class="message" v-else>No favorite songs.</div>
      <div
        v-if="favoriteSongsList && favoriteSongsList.length > maxVisibleSongs  && !hideShowMoreSongsButton"
        class="show-more"
        @click="showMoreSongs()"
      >
        {{'&#11167;'}}
      </div>
    </div>
    <div class="container">
      <CardRow
        v-if="favoriteAlbumsList && favoriteAlbumsList.length"
        :items="favoriteAlbumsList"
        :disableTitleNavigation="true"
        type="favorite albums"
      />
      <div class="message" v-else>No favorite albums.</div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import SongItem from '../components/SongItem.vue'
import CardRow from '../cards/CardRow.vue'
const addMoreNum = 5
export default {
  name: 'Albums',
  components: {
    SongItem,
    CardRow
},
  computed: {
    ...mapGetters([
      'favoriteSongsList', 'favoriteSongs', 'favoriteAlbumsList'
    ])
  },
  data () {
    return {
      loaded: false,
      maxVisibleSongs: 5,
      hideShowMoreSongsButton: false
    }
  },
  methods: {
    ...mapActions([
      'getFavorites', 'setPlayerSongs'
    ]),
    showMoreSongs() {
      if (this.maxVisibleSongs < this.favoriteSongsList.length) {
        this.maxVisibleSongs += addMoreNum
        if (this.maxVisibleSongs >= this.favoriteSongsList.length) {
          this.hideShowMoreSongsButton = true
        }
      }
    },
    setPlayContent () {
      this.setPlayerSongs(this.favoriteSongsList.map(song => {
        return {
          song,
          artist: song.artist
        }
      }))
    }
  },
  async created () {
    await this.getFavorites()
    this.$nextTick(() => {
      this.loaded = true
      console.log(this.favoriteAlbumsList, this.favoriteSongs)
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.title {
  margin: 30px 0;
  color: $color-normal;
  font: $font-regular-bold;
  display: inline-block;
}
.show-more {
  color: $color-normal;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  min-width: 300px;
  cursor: pointer;


  &:hover {
    transition: $transition;
    color: $color-accent;
  }
}
.message {
  color: $forest;
  font: $font-regular-bold;
}
</style>

