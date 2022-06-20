<template>
  <div class="navigation">
    <div class="container">
      <div class="logo" @click="goTo('/')">
        <svg class="logo-svg">
          <use href="#logo"></use>
        </svg>
        <span class="title">MusicApp</span>
      </div>
      <div class="links">
        <div @click="goTo('/')" class="link">
          <svg class="link-svg">
            <use href="#home"></use>
          </svg>
          <span>HOME</span>
        </div>
        <div @click="goTo('/playlists')" class="link">
          <svg class="link-svg">
            <use href="#playlists"></use>
          </svg>
          <span>PLAYLISTS</span>
        </div>
        <div @click="goTo('/favorites')" class="link">
          <svg class="link-svg">
            <use href="#favorites"></use>
          </svg>
          <span>FAVORITES</span>
        </div>
        <div @click="goTo('/albums')" class="link">
          <svg class="link-svg">
            <use href="#albums"></use>
          </svg>
          <span>ALBUMS</span>
        </div>
        <div @click="goTo('/artists')" class="link">
          <svg class="link-svg">
            <use href="#artists"></use>
          </svg>
          <span>ARTISTS</span>
        </div>
        <div @click="goTo('/genres')" class="link">
          <svg class="link-svg">
            <use href="#genres"></use>
          </svg>
          <span>GENRES</span>
        </div>
      </div>
      <input type="text" id="search-input"
        placeholder="Search"
        @keydown="search" maxLength="50"
      >
      <div class="bottom-actions">
        <div class="profile">
          <img class="profile-img" @click="dropdownAction" v-if="profile" alt="avatar" :src="profile.image"/>
          <ProfileDropdown v-if="showDropdown" @closeDropdown="showDropdown = false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileDropdown from './ProfileDropdown'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'Navigation',
  components: {
    ProfileDropdown
  },
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
      if (event.keyCode === 13) {
        this.setSearchQuery({ type: 'SONGS', term: event.target.value})
        if (this.$route.name !== 'Search') {
          console.log('aaaaaaaaaaaaaaaaaaaaaaaa')
          this.$router.push({name: 'Search'})
        }
      }
    },
    goTo (path) {
      if (this.$route.path !== path) {
        this.$router.push({path})
      }
    },
    dropdownAction () {
      this.showDropdown = !this.showDropdown
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
.navigation {
  height: 90px;
  min-width: 100%;
  display: flex;
  justify-content: center;
  background: $forest;
  z-index: 520;
  position: absolute;
  top: 0;
}
.container {
  width: 100%;
  height: 100%;
  max-width: 2024px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
  cursor: pointer;
  .logo-svg {
    width: 40px;
    height: 40px;
    fill: $cream;
    margin-right: 10px;
  }
  .title {
    font: $font-large-bold;
    color: $cream;
  }
  &:hover {
    transition: $transition;
    transform: scale(1.04);
  }
}
.links {
  display: flex;
}
.link {
  width: 100%;
  height: 10%;
  min-height: 60px;
  max-height: 100px;
  font: $font-regular-bold;
  color: $cream;
  display: flex;
  align-items: center;
  transition: $transition;
  .link-svg {
    fill: $cream;
    transition: $transition;
    width: 24px;
    height: 24px;
    margin-left: 25px;
    margin-right: 5px;
  }
  &:hover {
    cursor: pointer;
    color: $dark-cream;
    .link-svg {
      fill: $dark-cream;
    }
  }
}
.bottom-actions {
  padding: 0 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.settings-button {
  margin-right: 10px;
}
.profile {
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background-color: grey;
  position: relative;
}
.profile-img {
  object-fit: cover;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
}
</style>
