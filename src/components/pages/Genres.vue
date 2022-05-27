<template>
  <div class="genres-container">
    <div class="title"><h1>GENRES</h1></div>
    <div class="collection">
      <Card v-for="(item, index) in genres" :key="index" :item="item" :index="index" type="genres"/>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Card from '../cards/Card.vue'
export default {
  name: 'Genres',
  components: {
    Card
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

