<template>
  <div>
    <AlbumDescription
      v-if="albumInfo"
      :album="albumInfo"
      :description="albumInfo.description"
      :isAlbumInFavorites="isInFavorites"
      @changeFav="addRemoveFavAlbum"
    />
    <SongList v-if="albumInfo" @playSong="setPlayContent" :songs="albumInfo.songs" :artist="albumInfo.artist" />
  </div>
</template>
<script>
import AlbumRepo from '@/helpers/repo/Album.js'
import AlbumDescription from '@/components/components/description/AlbumDescription'
import {mapActions, mapGetters} from 'vuex'
import SongList from '../../components/SongList.vue'

export default {
  name: 'Album',
  components: {
    AlbumDescription,
    SongList
  },
  props: {
    id: {
      type: [String, Number]
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
      'addRemoveFavoriteAlbum', 'setPlayerSongs'
    ]),
    async addRemoveFavAlbum () {
      try {
        await this.addRemoveFavoriteAlbum({favId: this.albumInfo.id, value: !this.isInFavorites})
      } catch (e) {
        console.log(e)
      }
    },
    setPlayContent () {
      this.setPlayerSongs(this.albumInfo.songs.map(song => {
        return {
          song,
          artist: this.albumInfo.artist
        }
      }))
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
