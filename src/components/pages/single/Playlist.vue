<template>
  <div>
    <Description
      v-if="loaded"
      :title="playlistInfo.title"
      :image="playlistInfo.image"
      :description="playlistInfo.description"
      :isPlaylist="true"
      @delete="deletePlaylist"
      @edit="openEditPlaylistModal({playlistId: playlistInfo.id, title: playlistInfo.title, description: playlistInfo.description})"
    />
    <div v-if="playlistInfo" class="songs">
      <div class="title">
        <h1>SONGS</h1>
      </div>
      <div class="songs-container" v-if="playlistInfo.songs.length > 0">
        <Song v-for="(song, index) in playlistInfo.songs" class="song" :key="index" :artist="song.artist" :song="song" />
      </div>
      <span class="message" v-else>Sorry, playlist is empty.</span>
    </div>
  </div>
</template>
<script>
import PlaylistRepo from '@/helpers/repo/Playlist.js'
import Description from '@/components/components/Description'
import Song from '@/components/components/Song'
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'Playlist',
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
      'showEditPlaylistModal'
    ])
  },
  data () {
    return {
      playlistInfo: null,
      loaded: false
    }
  },
  methods: {
    ...mapActions([
      'openEditPlaylistModal'
    ]),
    deletePlaylist () {
      if (window.confirm('Are you sure?')) {
        this.playlist.deletePlaylist(this.playlistInfo.id).then(() => {
          this.$router.push({name: 'Playlists'})
        })
      }
    },
    getPlaylistInfo () {
      this.playlist.getPlaylist(this.id).then(res => {
        this.playlistInfo = res
        this.loaded = true
      }).catch(() => {
        this.loaded = false
      })
    }
  },
  beforeCreate () {
    this.playlist = new PlaylistRepo()
  },
  created () {
    this.getPlaylistInfo()
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
  align-items: center;
}
.songs-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.song {
  width: 60%;
}
.title {
  margin: 30px 0;
  color: $forest;
  font: $font-regular-bold;
  display: inline-block;
}
.message {
  color: $forest;
  font: $font-regular-bold;
}
</style>
