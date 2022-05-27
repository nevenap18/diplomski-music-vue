<template>
  <div>
    <Description
      v-if="genreInfo"
      :title="genreInfo.title"
      :year="genreInfo.year"
      :image="genreInfo.image"
      :artist="genreInfo.artist"
      :description="genreInfo.description"
    />
    <div v-if="genreInfo" class="songs">
      <div class="title">
        <h1>SONGS</h1>
      </div>
      <Song v-for="(song, index) in genreInfo.songs" :key="index" :artist="song.artist" :song="song" />
    </div>
  </div>
</template>
<script>
import GenreRepo from '@/helpers/repo/Genre.js'
import Description from '@/components/components/Description'
import Song from '@/components/components/Song'
export default {
  name: 'Genre',
  components: {
    Description,
    Song
  },
  props: {
    id: {
      type: String
    }
  },
  computed: {
  },
  data () {
    return {
      genreInfo: null,
      loaded: false
    }
  },
  methods: {
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
<style lang="scss" scoped>
@import '@/styles/variables.scss';
.songs {
  width: 60%;
}
.title {
  margin: 30px 0;
  color: $forest;
  font: $font-regular-bold;
  display: inline-block;
}
</style>