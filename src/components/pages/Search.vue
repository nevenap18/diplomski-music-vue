<template>
  <div class="search-container">
    <div class="search-nav">
      <div class="tab" :class="{active: activeTab === 'SONGS'}" @click="changeTab('SONGS')"> SONGS </div>
      <div class="tab" :class="{active: activeTab === 'ARTISTS'}" @click="changeTab('ARTISTS')"> ARTISTS </div>
      <div class="tab" :class="{active: activeTab === 'ALBUMS'}" @click="changeTab('ALBUMS')"> ALBUMS </div>
    </div>
    <div v-if="ready" class="ready">
      <div v-if="result && result.length > 0" class="collection">
        <component :is="component" v-for="(item, index) in result" :key="index" :item="item"/>
      </div>
      <div class="no-results" v-else>
        <span>sorry, nothing to show :D</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import SearchRepo from '@/helpers/repo/Search.js'
import SongsResults from '@/components/components/SongsResults'
import ArtistsResults from '@/components/components/ArtistsResults'
import AlbumsResults from '@/components/components/AlbumsResults'
export default {
  name: 'Search',
  components: {
  },
  computed: {
    ...mapGetters([
      'searchQuery'
    ]),
    component () {
      if (this.activeTab === 'SONGS') {
        return SongsResults
      } else if (this.activeTab === 'ARTISTS') {
        return ArtistsResults
      } else {
        return AlbumsResults
      }
    }
  },
  data () {
    return {
      searchTerm: '',
      activeTab: 'SONGS',
      search: new SearchRepo(),
      result: [],
      ready: false
    }
  },
  methods: {
    ...mapActions([
      'setSearchQuery'
    ]),
    getResults () {
      this.ready = false
      if (!this.searchTerm) {
        this.result = []
        this.ready = true
        return
      }
      if (this.activeTab === 'SONGS') {
        this.search.searchSongs(this.searchTerm).then(res => {
          this.result = res
          this.ready = true
        })
      } else if (this.activeTab === 'ARTISTS') {
        this.search.searchArtists(this.searchTerm).then(res => {
          this.result = res
          this.ready = true
        })
      } else {
        this.search.searchAlbums(this.searchTerm).then(res => {
          this.result = res
          this.ready = true
        })
      }
    },
    changeTab (tab) {
      this.setSearchQuery({
        type: tab,
        term: this.searchTerm
      })
    }
  },
  watch: {
    'searchQuery': {
      handler (oldVal, newVal) {
        if (oldVal.type !== newVal.type || oldVal.term !== newVal.term) {
          this.activeTab = this.searchQuery.type
          this.searchTerm = this.searchQuery.term
          this.getResults()
          this.$router.replace({query: {
            type: this.activeTab,
            term: this.searchTerm
          }})
        }
      }
    }
  },
  created () {
    this.activeTab = this.$route.query.type || 'SONGS'
    this.searchTerm = this.$route.query.term
    this.getResults()
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
.search-nav {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  color: $forest;
  font: $font-medium-bold;
  .tab {
    margin-right: 12px;
    &:hover {
      cursor: pointer;
      color: $moss;
    }
    &.active {
      color: $moss;
    }
  }
}
.active {
  color: red;
}
.no-results {
  color: $moss;
  font: $font-medium-bold;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

