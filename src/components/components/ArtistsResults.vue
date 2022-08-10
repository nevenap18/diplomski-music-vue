<template>
  <div class="song">
    <div class="image">
      <img class="image" :src="item.image"/>
    </div>
    <div class="info">
      <span class="artist" @click="goToArtist">{{item.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArtistsResults',
  components: {
    // Card
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    goToArtist () {
      this.$router.push({name: 'Artist', props: {id: this.item.artist.artistId}})
    }
  },
  created () {
    console.log(this.item)
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
.song {
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font: $font-medium;
  color: $forest;
  border-bottom: 1px solid $moss;
}
.image {
  width: 50px;
  height: 50px;
  margin-right: 20px;
}
.artist {
  cursor: pointer;
  &:hover {
    color: $moss;
  }
}
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
svg {
  width: 17px;
  height: 17px;
  fill: $moss;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    fill: $forest;
  }
}
</style>
