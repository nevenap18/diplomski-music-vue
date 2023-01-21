<template>
  <div>
    <PlaylistDescription
      v-if="loaded"
      :playlist="playlistInfo"
      @delete="deletePlaylist"
      @edit="openEditPlaylistModal({playlistId: playlistInfo.id, title: playlistInfo.title, description: playlistInfo.description})"
    />
    <SongList @playSong="setPlayContent" v-if="playlistInfo" :songs="playlistInfo.songs" />
  </div>
</template>
<script>
import PlaylistRepo from '@/helpers/repo/Playlist.js'
import PlaylistDescription from '@/components/components/description/PlaylistDescription'
import SongList from '@/components/components/SongList'
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'Playlist',
  components: {
    PlaylistDescription,
    SongList
  },
  props: {
    id: {
      type: [String, Number]
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
  watch: {
    showEditPlaylistModal (val) {
      if (!val) {
        this.getPlaylistInfo()
      }
    }
  },
  methods: {
    ...mapActions([
      'openEditPlaylistModal', 'setPlayerSongs'
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
    },
    setPlayContent () {
      this.setPlayerSongs(this.playlistInfo.songs.map(song => {
        return {
          song,
          artist: song.artist
        }
      }))
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
