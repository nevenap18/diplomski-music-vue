<template>
  <div class="artists-container">
    <CardRow :items="artists" :disableTitleNavigation="true" type="artists" />
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import CardRow from '../cards/CardRow.vue'
export default {
  name: 'Artists',
  components: {
    CardRow
  },
  computed: {
    ...mapGetters([
      'artists'
    ])
  },
  data () {
    return {
      loaded: false
    }
  },
  methods: {
    ...mapActions([
      'getArtists'
    ])
  },
  async created () {
    await this.getArtists()
    this.$nextTick(() => {
      this.loaded = true
    })
  }
}
</script>


