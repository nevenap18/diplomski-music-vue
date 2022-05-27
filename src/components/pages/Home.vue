<template>
  <div class="home-container">
    <div v-for="(item, index) in landingPage" :key="index">
      <CardRow :items="item" :type="index"/>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import CardRow from '../cards/CardRow.vue'
export default {
  name: 'Home',
  components: {
    CardRow
  },
  computed: {
    ...mapGetters([
      'landingPage'
    ])
  },
  data () {
    return {
      loaded: false
    }
  },
  methods: {
    ...mapActions([
      'getLandingPage'
    ])
  },
  async created () {
    await this.getLandingPage()
    this.$nextTick(() => {
      this.loaded = true
    })
  }
}
</script>

<style lang="scss" scoped>
</style>

