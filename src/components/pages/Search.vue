<template>
  <div class="search-container">
    <div class="search-nav">
      <div class="tab" :class="{active: activeTab === 'SONGS'}" @click="changeTab('SONGS')"> SONGS </div>
      <div class="tab" :class="{active: activeTab === 'ARTISTS'}" @click="changeTab('ARTISTS')"> ARTISTS </div>
      <div class="tab" :class="{active: activeTab === 'ALBUMS'}" @click="changeTab('ALBUMS')"> ALBUMS </div>
    </div>
    <div v-if="result.length > 0" class="collection">
      {{ activeTab }} {{ result }}
    </div>
    <div v-else> No results </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import SearchRepo from '@/helpers/repo/Search.js'
export default {
  name: 'Search',
  components: {
    // Card
  },
  computed: {
    ...mapGetters([
      'searchQuery'
    ])
  },
  data () {
    return {
      searchTerm: 'Taylor',
      activeTab: 'SONGS',
      search: new SearchRepo(),
      result: []
    }
  },
  methods: {
    ...mapActions([
      'setSearchQuery'
    ]),
    getResults () {
      if (this.activeTab === 'SONGS') {
        this.search.searchSongs(this.searchTerm).then(res => {
          this.result = res
        })
      } else if (this.activeTab === 'ARTISTS') {
        this.search.searchArtists(this.searchTerm).then(res => {
          this.result = res
        })
      } else {
        this.search.searchAlbums(this.searchTerm).then(res => {
          this.result = res
        })
      }
    },
    changeTab (tab) {
      this.setSearchQuery({
        type: tab,
        term: this.searchTerm
      })
      this.getResults()
    }
  },
  watch: {
    'searchQuery.term': {
      handler (old, value) {
        console.log('TERM', old, value)
        this.searchTerm = this.searchQuery.term
        // this.activeTab = this.searchQuery.type
        this.getResults()
        this.$router.replace({query: {
          ...this.$route.query,
          term: this.searchTerm
        }})
      },
      immediate: true
    },
    'searchQuery.type': {
      handler (old, value) {
        console.log('TYPE', old, value)
        // this.searchTerm = this.searchQuery.term
        this.activeTab = this.searchQuery.type
        this.getResults()
        this.$router.replace({query: {
          ...this.$route.query,
          type: this.activeTab
        }})
      },
      immediate: true
    }
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
.active {
  color: red;
}
</style>

