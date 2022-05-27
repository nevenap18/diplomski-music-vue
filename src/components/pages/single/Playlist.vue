<template>
  <div>
    <Description
      v-if="playlistInfo"
      :title="playlistInfo.title"
      :year="playlistInfo.year"
      :image="playlistInfo.image"
      :artist="playlistInfo.artist"
      :description="playlistInfo.description"
    />
    <div v-if="playlistInfo" class="songs">
      <div class="title">
        <h1>SONGS</h1>
      </div>
      <Song v-for="(song, index) in playlistInfo.songs" :key="index" :artist="song.artist" :song="song" />
    </div>
  </div>
</template>
<script>
import PlaylistRepo from '@/helpers/repo/Playlist.js'
import Description from '@/components/components/Description'
import Song from '@/components/components/Song'
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
  },
  data () {
    return {
      playlistInfo: null,
      loaded: false
    }
  },
  methods: {
  },
  async created () {
    const playlist = new PlaylistRepo()
    try {
      await playlist.getPlaylist(this.id).then(res => {
        this.playlistInfo = res
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