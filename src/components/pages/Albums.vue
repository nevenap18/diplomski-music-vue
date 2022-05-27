<template>
  <div class="albums-container">
    <div class="title"><h1>ALBUMS</h1></div>
    <div class="collection">
      <Card v-for="(item, index) in albums" :key="index" :item="item" :index="index" type="albums"/>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Card from '../cards/Card.vue'
export default {
  name: 'Albums',
  components: {
    Card
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

<style lang="scss" scoped>
@import '@/styles/variables.scss';
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

