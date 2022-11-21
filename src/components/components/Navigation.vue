<template>
  <div class="navigation">
    <div class="container">
      <router-link active-class="active" class="logo" tag="div" to="/" exact>
        <svg class="logo-svg">
          <use href="#logo"></use>
        </svg>
        <span class="title">MusicApp</span>
      </router-link>
      <div class="links">
        <span class="menu">MENU</span>
        <router-link active-class="active" class="link" tag="div" to="/" exact>
          <svg class="link-svg">
            <use href="#home"></use>
          </svg>
          <span>HOME</span>
        </router-link>
        <router-link active-class="active" class="link" tag="div" to="/playlists" exact>
          <svg class="link-svg">
            <use href="#playlists"></use>
          </svg>
          <span>PLAYLISTS</span>
        </router-link>
        <router-link active-class="active" class="link" tag="div" to="/favorites" exact>
          <svg class="link-svg">
            <use href="#favorites"></use>
          </svg>
          <span>FAVORITES</span>
        </router-link>
        <router-link active-class="active" class="link" tag="div" to="/albums" exact>
          <svg class="link-svg">
            <use href="#albums"></use>
          </svg>
          <span>ALBUMS</span>
        </router-link>
        <router-link active-class="active" class="link" tag="div" to="/artists" exact>
          <svg class="link-svg">
            <use href="#artists"></use>
          </svg>
          <span>ARTISTS</span>
        </router-link>
        <router-link active-class="active" class="link" tag="div" to="/genres" exact>
          <svg class="link-svg">
            <use href="#genres"></use>
          </svg>
          <span>GENRES</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'Navigation',
  computed: {
    ...mapGetters([
      'profile'
    ])
  },
  data () {
    return {
      showDropdown: false
    }
  },
  methods: {
    ...mapActions(['setSearchQuery']),
    search (event) {
      const enterKey = 13
      if (event.keyCode === enterKey) {
        const type = this.$route.query.type || 'SONGS'
        if (this.$route.name !== 'Search') {
          this.$router.push({name: 'Search', query: { type, term: event.target.value}})
        } else {
          this.setSearchQuery({ type, term: event.target.value})
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
.navigation {
  height: 100vh;
  width: 240px;
  display: flex;
  justify-content: center;
  background: $background-alternate;
  z-index: 520;
  flex-basis: 20%;
  min-width: 240px;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 70px;
  align-items: center;
}
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px;
  cursor: pointer;
  .logo-svg {
    width: 45px;
    height: 45px;
    fill: $color-normal;
    margin-right: 10px;
  }
  .title {
    font: $font-large-bold;
    color: $font-normal;
  }
  &:hover {
    transition: $transition;
    transform: scale(1.04);
  }
}
.links {
  display: flex;
  flex-direction: column;
  width: 70%;
}
.menu {
  font: $font-regular;
  color: $font-dull;
}
.link {
  width: 100%;
  height: 10%;
  min-height: 60px;
  max-height: 100px;
  font: $font-regular-bold;
  color: $font-normal;
  display: flex;
  align-items: center;
  transition: $transition;
  .link-svg {
    fill: $color-normal;
    transition: $transition;
    width: 24px;
    height: 24px;
    margin-right: 7px;
  }
  &:hover {
    cursor: pointer;
    color: $font-accent;
    .link-svg {
      fill: $color-accent;
    }
  }
  &.active {
    color: $font-accent;
    .link-svg {
      fill: $color-accent;
    }
  }
}
</style>
