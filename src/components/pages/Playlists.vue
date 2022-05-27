<template>
  <div class="playlists-container">
    <div class="title"><h1>PLAYLISTS</h1></div>
    <div class="playlists">
      <div class="collection">
        <Card :item="item" :index="index" type="playlists" v-for="(item, index) in playlistsList" :key="index"/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Card from '../cards/Card.vue'
export default {
  name: 'Playlists',
  components: {
    Card
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
      'getPlaylists'
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

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.page-container {
}
.title {
  margin: 30px 0;
  color: $forest;
  font: $font-regular-bold;
  display: inline-block;
}
.collection {
  display: grid;
  grid-auto-columns: max-content;
  grid-auto-flow: dense;
  grid-auto-rows: minmax(100px, auto);
  grid-gap: 25px;
  grid-template-columns: repeat(6, 1fr);
  margin: 20px auto;
  max-width: 100%;
}
</style>

