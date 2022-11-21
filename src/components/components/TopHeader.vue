<template>
  <div class="header">
    <div class="search-container">
      <Input
        class="input"
        placeholder="Search"
        id="search"
        @keydown="search"
        autocomplete="off"
      />
    </div>
    <div class="profile-container">
      <router-link to="/settings" tag="div" class="profile" exact>
        <img class="profile-img" v-if="profile" alt="avatar" :src="profile.image"/>
      </router-link>
    </div>
  </div>
</template>

<script>
import Input from './Input'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'TopHeader',
  components: {
    Input
  },
  computed: {
    ...mapGetters([
      'profile'
    ])
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
    },
    goToProfile () {
      this.$router.push({name: 'Settings'})
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
.header {
  position: relative;
  width: 100%;
  height: 100px;
  background: $background;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.search-container {
  margin-left: 50px;
  width: 300px;
}

.profile-container {
  margin-right: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.settings-button {
  margin-right: 10px;
}
.profile {
  border-radius: 50%;
  width: 70px;
  height: 70px;
  background: $input-background;
  position: relative;
  &:hover {
    box-shadow: 0 0 2px 2px $color-accent;
  }
}
.profile-img {
  object-fit: cover;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  cursor: pointer;
}
</style>
