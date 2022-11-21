<template>
  <div>
    <GenreDescription
      v-if="genreInfo"
      :genre="genreInfo"
    />
    <SongList @playSong="setPlayContent" v-if="genreInfo" :songs="genreInfo.songs" />
  </div>
</template>
<script>
import GenreRepo from '@/helpers/repo/Genre.js'
import GenreDescription from '@/components/components/description/GenreDescription'
import SongList from '@/components/components/SongList'
import {mapActions} from 'vuex'
export default {
  name: 'Genre',
  components: {
    GenreDescription,
    SongList
  },
  props: {
    id: {
      type: [String, Number]
    }
  },
  methods: {
    ...mapActions([
      'setPlayerSongs'
    ]),
    setPlayContent () {
      this.setPlayerSongs(this.genreInfo.songs.map(song => {
        return {
          song,
          artist: song.artist
        }
      }))
    }
  },
  data () {
    return {
      genreInfo: null,
      loaded: false
    }
  },
  async created () {
    const genre = new GenreRepo()
    try {
      await genre.getGenre(this.id).then(res => {
        this.genreInfo = res
        this.loaded = true
      })
    } catch (e) {
      this.loaded = false
    }
  }
}
</script>
