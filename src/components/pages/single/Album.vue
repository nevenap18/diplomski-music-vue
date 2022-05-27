<template>
  <div>
    <Description
      v-if="albumInfo"
      :title="albumInfo.title"
      :year="albumInfo.year"
      :image="albumInfo.image"
      :artist="albumInfo.artist"
      :description="albumInfo.description"
      :showFavButton="true"
      :isAlbumInFavorites="isInFavorites"
      @changeFav="addRemoveFavAlbum"
    />
    <div v-if="albumInfo" class="songs">
      <div class="title">
        <h1>SONGS</h1>
      </div>
      <Song v-for="(song, index) in albumInfo.songs" :key="index" :artist="albumInfo.artist" :song="song" />
    </div>
  </div>
</template>
<script>
import AlbumRepo from '@/helpers/repo/Album.js'
import Description from '@/components/components/Description'
import Song from '@/components/components/Song'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'Album',
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
    ...mapGetters([
      'favoriteAlbums'
    ]),
    isInFavorites () {
      return !!this.favoriteAlbums.find(id => id === this.albumInfo.id)
    }
  },
  data () {
    return {
      albumInfo: null,
      loaded: false
    }
  },
  methods: {
    ...mapActions([
      'addRemoveFavoriteAlbum'
    ]),
    async addRemoveFavAlbum () {
      try {
        await this.addRemoveFavoriteAlbum({favId: this.albumInfo.id, value: !this.isInFavorites})
      } catch (e) {
        console.log(e)
      }
    }
  },
  async created () {
    const album = new AlbumRepo()
    try {
      await album.getAlbum(this.id).then(res => {
        this.albumInfo = res
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