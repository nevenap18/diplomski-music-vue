<template>
  <div>
    <Description v-if="artistInfo" :title="artistInfo.name" :image="artistInfo.image" :description="artistInfo.description"/>
    <CardRow v-if="artistInfo" :items="artistInfo.albums" :type="'albums'"/>
  </div>
</template>
<script>
import ArtistRepo from '@/helpers/repo/Artist.js'
import Description from '@/components/components/Description'
import CardRow from '@/components/cards/CardRow.vue'

export default {
  name: 'Artist',
  components: {
    Description,
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