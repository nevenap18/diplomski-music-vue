<template>
  <div class="playlists-container">
    <CardRow :items="playlistsList" :disableTitleNavigation="true" type="playlists">
      <template slot="action-card">
        <CreatePlaylistCard></CreatePlaylistCard>
      </template>
    </CardRow>/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import CardRow from '../cards/CardRow.vue'
import CreatePlaylistCard from '../cards/CreatePlaylistCard.vue'
export default {
  name: 'Playlists',
  components: {
    CardRow,
    CreatePlaylistCard
},
  computed: {
    ...mapGetters([
      'playlistsList'
    ])
  },
  data () {
    return {
      loaded: false
    }
  },
  methods: {
    ...mapActions([
      'getPlaylists', 'openCreatePlaylistModal'
    ])
  },
  async created () {
    await this.getPlaylists()
    this.$nextTick(() => {
      this.loaded = true
    })
  }
}
</script>


