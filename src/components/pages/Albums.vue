<template>
  <div class="albums-container">
    <CardRow :items="albums" :disableTitleNavigation="true" type="albums" />
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import CardRow from '../cards/CardRow.vue'
export default {
  name: 'Albums',
  components: {
    CardRow
  },
  computed: {
    ...mapGetters([
      'albums'
    ])
  },
  data () {
    return {
      loaded: false
    }
  },
  methods: {
    ...mapActions([
      'getAlbums'
    ])
  },
  async created () {
    await this.getAlbums()
    this.$nextTick(() => {
      this.loaded = true
    })
  }
}
</script>
