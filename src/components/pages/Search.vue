<template>
  <div class="search-container">
    <div class="search-nav">
      <div class="tab" :class="{active: activeTab === 'SONGS'}" @click="changeTab('SONGS')"> SONGS </div>
      <div class="tab" :class="{active: activeTab === 'ARTISTS'}" @click="changeTab('ARTISTS')"> ARTISTS </div>
      <div class="tab" :class="{active: activeTab === 'ALBUMS'}" @click="changeTab('ALBUMS')"> ALBUMS </div>
    </div>
    <div v-if="ready" class="ready">
      <div v-if="result && result.length > 0 && activeTab === 'SONGS'" class="collection">
        <SongItem @playSong="setPlayContent" v-for="(item, index) in result" :key="index" :item="item" />
      </div>
      <CardRow
        v-else-if="result && result.length > 0"
        :items="result"
        :hideTitle="true"
        :type="getType"
      />
      <div class="no-results" v-else>
        <span>sorry, nothing to show :D</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import SearchRepo from '@/helpers/repo/Search.js'
import CardRow from '@/components/cards/CardRow'
import SongItem from '../components/SongItem.vue'
export default {
  name: 'Search',
  components: {
    CardRow,
    SongItem
  },
  computed: {
    ...mapGetters([
      'searchQuery'
    ]),
    getType () {
      if (this.activeTab === 'SONGS') {
        return 'songs'
      } else if (this.activeTab === 'ARTISTS') {
        return 'artists'
      } else {
        return 'albums'
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
      'setSearchQuery', 'setPlayerSongs'
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
    setPlayContent () {
      this.setPlayerSongs(this.result.map(song => {
        return {
          song,
          artist: song.artist
        }
      }))
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
.search-nav {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  color: $font-normal;
  font: $font-large-bold;
  .tab {
    margin-right: 12px;
    &:hover {
      transition: $transition;
      cursor: pointer;
      color: $font-accent;
    }
    &.active {
      color: $font-accent;
      pointer-events: none;
    }
  }
}
.active {
  color: $favorite;
}
.no-results {
  color: $color-dull;
  font: $font-medium-bold;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

