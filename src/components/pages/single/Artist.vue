<template>
  <div>
    <ArtistDescription v-if="artistInfo" :artist="artistInfo"/>
    <CardRow v-if="artistInfo" :items="artistInfo.albums" :type="'albums'"/>
  </div>
</template>
<script>
import ArtistRepo from '@/helpers/repo/Artist.js'
import ArtistDescription from '@/components/components/description/ArtistDescription'
import CardRow from '@/components/cards/CardRow.vue'

export default {
  name: 'Artist',
  components: {
    ArtistDescription,
    CardRow
  },
  props: {
    id: {
      type: [String, Number]
    }
  },
  computed: {
  },
  data () {
    return {
      artistInfo: null,
      loaded: false
    }
  },
  methods: {
  },
  async created () {
    const artist = new ArtistRepo()
    try {
      await artist.getArtist(this.id).then(res => {
        this.artistInfo = res
        this.loaded = true
      })
    } catch (e) {
      this.loaded = false
    }
  }
}
</script>