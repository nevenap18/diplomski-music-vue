<template>
  <div class="genres-container">
    <CardRow :items="genres" :disableTitleNavigation="true" type="genres" />
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import CardRow from '../cards/CardRow.vue'
export default {
  name: 'Genres',
  components: {
    CardRow
  },
  computed: {
    ...mapGetters([
      'genres'
    ])
  },
  data () {
    return {
      loaded: false
    }
  },
  methods: {
    ...mapActions([
      'getGenres'
    ])
  },
  async created () {
    await this.getGenres()
    this.$nextTick(() => {
      this.loaded = true
    })
  }
}
</script>

